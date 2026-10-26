import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminProfileReport,
  fetchAdminProfileReports,
  reviewAdminProfileReport,
  type ProfileReportReason,
  type ProfileReportStatus,
} from "../../api/adminReports";
import { clearAdminSession } from "../../api/adminClient";
import { Icon } from "../../components/icons";
import { OverlayShell } from "../../components/OverlayShell/OverlayShell";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./AdminProfileReportsPage.styles";

const PAGE_SIZE = 5;

const reasonLabels: Record<ProfileReportReason, string> = {
  SPAM_ADVERTISING: "스팸 · 광고",
  FALSE_INFORMATION_IMPERSONATION: "허위 정보 · 사칭",
  INAPPROPRIATE_BEHAVIOR: "부적절한 콘텐츠",
  OTHER: "기타",
};

const statusLabels: Record<ProfileReportStatus, string> = {
  PENDING: "검토 대기",
  ACTIONED: "승인",
  DISMISSED: "반려",
};

const statusFilters: Array<{ label: string; value: ProfileReportStatus | "" }> = [
  { label: "전체", value: "" },
  { label: "검토 대기", value: "PENDING" },
  { label: "승인", value: "ACTIONED" },
  { label: "반려", value: "DISMISSED" },
];

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (number: number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function AdminProfileReportsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ProfileReportStatus | "">("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [reviewModalAction, setReviewModalAction] = useState<"ACTIONED" | "DISMISSED" | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  const reportsQuery = useQuery({
    queryKey: ["admin-profile-reports", status, page],
    queryFn: () => fetchAdminProfileReports({ status: status || undefined, page, size: PAGE_SIZE }),
  });
  const reports = useMemo(() => reportsQuery.data?.reports ?? [], [reportsQuery.data?.reports]);

  const detailQuery = useQuery({
    queryKey: ["admin-profile-report", selectedReportId],
    queryFn: () => fetchAdminProfileReport(selectedReportId!),
    enabled: selectedReportId !== null,
  });

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (!isFilterOpen) return;
    const closeFilter = (event: PointerEvent) => {
      if (event.target instanceof Node && !filterRef.current?.contains(event.target)) setIsFilterOpen(false);
    };
    const closeFilterWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };
    window.addEventListener("pointerdown", closeFilter);
    window.addEventListener("keydown", closeFilterWithEscape);
    return () => {
      window.removeEventListener("pointerdown", closeFilter);
      window.removeEventListener("keydown", closeFilterWithEscape);
    };
  }, [isFilterOpen]);

  const reviewMutation = useMutation({
    mutationFn: ({ nextStatus, note }: { nextStatus: "ACTIONED" | "DISMISSED"; note: string }) =>
      reviewAdminProfileReport({
        reportId: selectedReportId!,
        status: nextStatus,
        reviewNote: note.trim() || (nextStatus === "ACTIONED" ? "신고 내용을 확인하여 승인했습니다." : "신고 내용을 확인하여 반려했습니다."),
      }),
    onSuccess: (report) => {
      queryClient.setQueryData(["admin-profile-report", report.id], report);
      void queryClient.invalidateQueries({ queryKey: ["admin-profile-reports"] });
      setReviewModalAction(null);
      setReviewNote("");
      setToastMessage(report.status === "ACTIONED" ? "신고를 승인 처리했습니다." : "신고를 반려 처리했습니다.");
    },
    onError: () => setToastMessage("검토 결과를 저장하지 못했습니다."),
  });

  const detail = detailQuery.data;
  const totalPages = reportsQuery.data?.totalPages ?? 0;
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => {
    const start = Math.min(Math.max(page - 1, 0), Math.max(totalPages - 3, 0));
    return start + index;
  });

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  const closeReviewModal = () => {
    if (reviewMutation.isPending) return;
    setReviewModalAction(null);
    setReviewNote("");
  };

  const reviewModal = detail && reviewModalAction && (
    <OverlayShell ariaLabel="신고 검토 확인" maxWidth="400px" onClose={closeReviewModal} open placement="center">
      <S.ApprovalModal>
        <S.ApprovalTitle>신고를 {reviewModalAction === "ACTIONED" ? "승인" : "반려"}할까요?</S.ApprovalTitle>
        <S.ApprovalDescription>
          {reviewModalAction === "ACTIONED" ? "신고 내용이 사실로 확인되어 해당 프로필에 조치가 진행됩니다." : "위반 사항이 확인되지 않아 신고를 종료합니다."}
        </S.ApprovalDescription>
        <S.ApprovalSummary>
          <dt>신고 번호</dt><dd>#{detail.id}</dd>
          <dt>사유</dt><dd>{reasonLabels[detail.reason]}</dd>
          <dt>대상</dt><dd>{detail.snapshotNickname || "이름 없음"} <span>(유저 ID: {detail.reportedProfileUserId})</span></dd>
        </S.ApprovalSummary>
        <S.MemoLabel htmlFor="admin-review-note">검토 메모</S.MemoLabel>
        <S.MemoTextarea
          id="admin-review-note"
          onChange={(event) => setReviewNote(event.target.value)}
          placeholder={reviewModalAction === "ACTIONED" ? "예) 프로필 이미지 위반 확인, 비공개 처리" : "예) 스냅샷 기준 위반 사항 없음"}
          value={reviewNote}
        />
        <S.ApprovalActions>
          <S.ModalButton $primary disabled={reviewMutation.isPending} onClick={() => reviewMutation.mutate({ nextStatus: reviewModalAction, note: reviewNote })} type="button">
            {reviewMutation.isPending ? "처리 중" : reviewModalAction === "ACTIONED" ? "승인" : "반려"}
          </S.ModalButton>
          <S.ModalButton disabled={reviewMutation.isPending} onClick={closeReviewModal} type="button">취소</S.ModalButton>
        </S.ApprovalActions>
      </S.ApprovalModal>
    </OverlayShell>
  );

  if (selectedReportId !== null) {
    return (
      <S.DetailPage data-admin-page>
        <S.DetailTopbar>
          <S.BackButton onClick={() => setSelectedReportId(null)} type="button">
            <Icon name="arrow-left" size={17} weight="bold" /> 신고 내역
          </S.BackButton>
        </S.DetailTopbar>

        {detailQuery.isPending && <S.Loading>신고 상세를 불러오는 중입니다.</S.Loading>}
        {detailQuery.isError && <S.Loading>신고 상세를 불러오지 못했습니다.</S.Loading>}
        {detail && (
          <S.DetailContent>
            <S.DetailIntro>
              <S.StatusBadge $status={detail.status}>{statusLabels[detail.status]}</S.StatusBadge>
              <S.DetailTitle>{reasonLabels[detail.reason]}</S.DetailTitle>
              <S.ReceivedAt>{formatDateTime(detail.createdAt)} 접수</S.ReceivedAt>
            </S.DetailIntro>

            <S.Subsection>
              <S.SubsectionHeader><h2>신고 당시 프로필</h2><span>접수 시점 스냅샷</span></S.SubsectionHeader>
              <S.ProfileCard>
                <S.Avatar>
                  {detail.snapshotProfileImageUrl ? <img alt="" src={detail.snapshotProfileImageUrl} /> : detail.snapshotNickname?.slice(0, 1) || "?"}
                </S.Avatar>
                <S.ProfileInfo>
                  <strong>{detail.snapshotNickname || "이름 없음"}</strong>
                  <S.UserId>유저 ID: {detail.reportedProfileUserId}</S.UserId>
                  <p>{detail.snapshotBio || "등록된 자기소개가 없습니다."}</p>
                </S.ProfileInfo>
              </S.ProfileCard>
            </S.Subsection>

            <S.Subsection>
              <S.SubsectionHeader><h2>신고 내용</h2></S.SubsectionHeader>
              <S.ReportDescription>{detail.description || "신고 내용이 없습니다."}</S.ReportDescription>
            </S.Subsection>

            <S.Facts>
              <dt>신고자 ID</dt><dd>{detail.reporterUserId}</dd>
              <dt>접수일시</dt><dd>{formatDateTime(detail.createdAt)}</dd>
              {detail.reviewedByUserId && <><dt>처리자 ID</dt><dd>{detail.reviewedByUserId}</dd></>}
              {detail.reviewedAt && <><dt>처리일시</dt><dd>{formatDateTime(detail.reviewedAt)}</dd></>}
            </S.Facts>

            {detail.status !== "PENDING" && <S.ReviewNote>{statusLabels[detail.status]} · {detail.reviewNote || "검토가 완료되었습니다."}</S.ReviewNote>}
          </S.DetailContent>
        )}

        {detail?.status === "PENDING" && (
          <S.BottomActions>
            <S.ActionButton $primary onClick={() => setReviewModalAction("ACTIONED")} type="button">승인</S.ActionButton>
            <S.ActionButton onClick={() => setReviewModalAction("DISMISSED")} type="button">반려</S.ActionButton>
          </S.BottomActions>
        )}
        {reviewModal}
        <Toast message={toastMessage} open={Boolean(toastMessage)} />
      </S.DetailPage>
    );
  }

  return (
    <S.Page data-admin-page>
      <S.Header>
        <S.Title>프로필 신고</S.Title>
        <S.LogoutButton onClick={handleLogout} type="button">로그아웃</S.LogoutButton>
      </S.Header>

      <S.ListPanel>
        <S.ListHeader>
          <S.SectionTitle>신고 내역</S.SectionTitle>
          <S.FilterWrap ref={filterRef}>
            <S.FilterButton aria-expanded={isFilterOpen} aria-haspopup="menu" onClick={() => setIsFilterOpen((open) => !open)} type="button">
              상태 · {status ? statusLabels[status] : "전체"}
              <Icon name="filter" size={15} weight="bold" />
            </S.FilterButton>
            {isFilterOpen && (
              <S.FilterMenu aria-label="신고 상태 필터" role="menu">
                {statusFilters.map((filter) => (
                  <S.FilterOption
                    $selected={status === filter.value}
                    aria-checked={status === filter.value}
                    key={filter.value || "ALL"}
                    onClick={() => { setStatus(filter.value); setPage(0); setIsFilterOpen(false); }}
                    role="menuitemradio"
                    type="button"
                  >
                    {filter.label}
                    {status === filter.value && <Icon name="check" size={18} weight="bold" />}
                  </S.FilterOption>
                ))}
              </S.FilterMenu>
            )}
          </S.FilterWrap>
        </S.ListHeader>

        <S.ReportList aria-label="프로필 신고 목록">
          {reportsQuery.isPending && <S.Loading>신고 내역을 불러오는 중입니다.</S.Loading>}
          {reportsQuery.isError && <S.Loading>신고 내역을 불러오지 못했습니다.</S.Loading>}
          {!reportsQuery.isPending && !reportsQuery.isError && reports.length === 0 && <S.Loading>해당 상태의 신고가 없습니다.</S.Loading>}
          {reports.map((report) => (
            <S.ReportItem key={report.id} onClick={() => setSelectedReportId(report.id)} type="button">
              <S.ReportTop>
                <strong>{reasonLabels[report.reason]}</strong>
                <S.StatusBadge $status={report.status}>{statusLabels[report.status]}</S.StatusBadge>
              </S.ReportTop>
              <S.ReportMeta>
                <span>신고 대상 ID: <strong>{report.reportedProfileUserId}</strong></span>
                <span>신고자 ID: <strong>{report.reporterUserId}</strong></span>
              </S.ReportMeta>
              <S.ReportMeta>
                <span>신고 번호: <strong>#{report.id}</strong></span>
                <span>접수 일시: <strong>{formatDateTime(report.createdAt)}</strong></span>
              </S.ReportMeta>
            </S.ReportItem>
          ))}
        </S.ReportList>

        <S.Pagination aria-label="신고 목록 페이지">
          <S.PageButton aria-label="이전 페이지" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))} type="button"><Icon name="arrow-left" size={14} weight="bold" /></S.PageButton>
          {pageNumbers.map((pageNumber) => (
            <S.PageButton $active={pageNumber === page} aria-label={`${pageNumber + 1}페이지`} key={pageNumber} onClick={() => setPage(pageNumber)} type="button">{pageNumber + 1}</S.PageButton>
          ))}
          <S.PageButton aria-label="다음 페이지" disabled={page + 1 >= totalPages} onClick={() => setPage((current) => current + 1)} type="button"><Icon name="caret-right" size={14} weight="bold" /></S.PageButton>
        </S.Pagination>
      </S.ListPanel>

      <S.BottomNav aria-label="관리자 메뉴">
        <S.BottomNavItem $active type="button">신고</S.BottomNavItem>
        <S.BottomNavItem onClick={() => navigate("/admin/contests")} type="button">공모전</S.BottomNavItem>
      </S.BottomNav>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
