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
import { clearAdminSession, getAdminSessionUser } from "../../api/adminClient";
import { Icon } from "../../components/icons";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./AdminProfileReportsPage.styles";

const PAGE_SIZE = 20;

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

const statusFilters: Array<{
  label: string;
  value: ProfileReportStatus | "";
}> = [
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
  const admin = getAdminSessionUser();
  const [status, setStatus] = useState<ProfileReportStatus | "">("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [requestedReportId, setRequestedReportId] = useState<number | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  const reportsQuery = useQuery({
    queryKey: ["admin-profile-reports", status, page],
    queryFn: () =>
      fetchAdminProfileReports({
        status: status || undefined,
        page,
        size: PAGE_SIZE,
      }),
  });

  const reports = useMemo(
    () => reportsQuery.data?.reports ?? [],
    [reportsQuery.data?.reports],
  );

  const selectedReportId =
    reports.find((report) => report.id === requestedReportId)?.id ??
    reports[0]?.id ??
    null;

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (!isFilterOpen) return;

    const closeFilter = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !filterRef.current?.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
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

  const detailQuery = useQuery({
    queryKey: ["admin-profile-report", selectedReportId],
    queryFn: () => fetchAdminProfileReport(selectedReportId!),
    enabled: selectedReportId !== null,
  });

  const reviewMutation = useMutation({
    mutationFn: (nextStatus: "ACTIONED" | "DISMISSED") =>
      reviewAdminProfileReport({
        reportId: selectedReportId!,
        status: nextStatus,
        reviewNote:
          nextStatus === "ACTIONED"
            ? "신고 내용을 확인하여 승인했습니다."
            : "신고 내용을 확인하여 반려했습니다.",
      }),
    onSuccess: (report) => {
      queryClient.setQueryData(["admin-profile-report", report.id], report);
      void queryClient.invalidateQueries({
        queryKey: ["admin-profile-reports"],
      });
      setToastMessage(
        report.status === "ACTIONED"
          ? "신고를 승인 처리했습니다."
          : "신고를 반려 처리했습니다.",
      );
    },
    onError: () => setToastMessage("검토 결과를 저장하지 못했습니다."),
  });

  const totalPages = reportsQuery.data?.totalPages ?? 0;
  const totalElements = reportsQuery.data?.totalElements ?? 0;
  const firstItem = totalElements === 0 ? 0 : page * PAGE_SIZE + 1;
  const lastItem = Math.min((page + 1) * PAGE_SIZE, totalElements);
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => {
      const start = Math.min(
        Math.max(page - 1, 0),
        Math.max(totalPages - 3, 0),
      );
      return start + index;
    },
  );
  const detail = detailQuery.data;
  const isPendingReview = detail?.status === "PENDING";

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <S.Page data-admin-page>
      <S.Sidebar>
        <S.Brand>
          <S.BrandMark>A</S.BrandMark>
          Admin Console
        </S.Brand>
        <S.NavLabel>운영</S.NavLabel>
        <S.Nav aria-label="관리자 메뉴">
          <S.NavItem $active type="button">
            프로필 신고
          </S.NavItem>
          <S.NavItem type="button">공모전</S.NavItem>
        </S.Nav>
        <S.Account>
          <S.AccountName>{admin?.nickname || "관리자"}</S.AccountName>
          <S.AccountId>{admin?.email || "Admin"}</S.AccountId>
          <S.LogoutButton onClick={handleLogout} type="button">
            로그아웃
          </S.LogoutButton>
        </S.Account>
      </S.Sidebar>

      <S.Main>
        <S.Header>
          <S.Title>프로필 신고</S.Title>
          <S.Description>
            사용자가 접수한 프로필 신고를 검토하고 처리합니다.
          </S.Description>
        </S.Header>

        <S.Workspace>
          <S.ListPanel>
            <S.ListHeader>
              <S.SectionTitle>신고 내역</S.SectionTitle>
              <S.FilterWrap ref={filterRef}>
                <S.FilterButton
                  aria-expanded={isFilterOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsFilterOpen((open) => !open)}
                  type="button"
                >
                  상태 · {status ? statusLabels[status] : "전체"}
                  <Icon name="filter" size={17} weight="bold" />
                </S.FilterButton>
                {isFilterOpen && (
                  <S.FilterMenu aria-label="신고 상태 필터" role="menu">
                    {statusFilters.map((filter) => (
                      <S.FilterOption
                        $selected={status === filter.value}
                        key={filter.value || "ALL"}
                        onClick={() => {
                          setStatus(filter.value);
                          setPage(0);
                          setRequestedReportId(null);
                          setIsFilterOpen(false);
                        }}
                        role="menuitemradio"
                        aria-checked={status === filter.value}
                        type="button"
                      >
                        {filter.label}
                        {status === filter.value && (
                          <Icon name="check" size={20} weight="bold" />
                        )}
                      </S.FilterOption>
                    ))}
                  </S.FilterMenu>
                )}
              </S.FilterWrap>
            </S.ListHeader>

            <S.ReportList aria-label="프로필 신고 목록">
              {reportsQuery.isPending && (
                <S.Loading>신고 내역을 불러오는 중입니다.</S.Loading>
              )}
              {reportsQuery.isError && (
                <S.Loading>신고 내역을 불러오지 못했습니다.</S.Loading>
              )}
              {!reportsQuery.isPending &&
                !reportsQuery.isError &&
                reports.length === 0 && (
                  <S.Loading>해당 상태의 신고가 없습니다.</S.Loading>
                )}
              {reports.map((report) => (
                <S.ReportItem
                  $selected={report.id === selectedReportId}
                  aria-pressed={report.id === selectedReportId}
                  key={report.id}
                  onClick={() => setRequestedReportId(report.id)}
                  type="button"
                >
                  <S.ReportTop>
                    <strong>{reasonLabels[report.reason]}</strong>
                    <S.StatusBadge $status={report.status}>
                      {statusLabels[report.status]}
                    </S.StatusBadge>
                  </S.ReportTop>
                  <S.ReportMeta>
                    대상 {report.reportedProfileUserId} 신고자{" "}
                    {report.reporterUserId}
                  </S.ReportMeta>
                  <S.ReportSubMeta>
                    #{report.id} &nbsp; {formatDateTime(report.createdAt)}
                  </S.ReportSubMeta>
                </S.ReportItem>
              ))}
            </S.ReportList>

            <S.Pagination>
              <span>
                {firstItem}–{lastItem} / {totalElements}건
              </span>
              <S.PageButtons>
                <S.PageButton
                  aria-label="이전 페이지"
                  disabled={page === 0}
                  onClick={() => setPage((current) => Math.max(0, current - 1))}
                  type="button"
                >
                  <Icon name="arrow-left" size={15} weight="bold" />
                </S.PageButton>
                {pageNumbers.map((pageNumber) => (
                  <S.PageButton
                    $active={pageNumber === page}
                    aria-label={`${pageNumber + 1}페이지`}
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    type="button"
                  >
                    {pageNumber + 1}
                  </S.PageButton>
                ))}
                <S.PageButton
                  aria-label="다음 페이지"
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  type="button"
                >
                  <Icon name="caret-right" size={15} weight="bold" />
                </S.PageButton>
              </S.PageButtons>
            </S.Pagination>
          </S.ListPanel>

          <S.DetailPanel>
            {selectedReportId === null && (
              <S.Loading>확인할 신고를 선택해 주세요.</S.Loading>
            )}
            {selectedReportId !== null && detailQuery.isPending && (
              <S.Loading>신고 상세를 불러오는 중입니다.</S.Loading>
            )}
            {detailQuery.isError && (
              <S.Loading>신고 상세를 불러오지 못했습니다.</S.Loading>
            )}
            {detail && (
              <>
                <S.DetailHeader>
                  <S.DetailEyebrow>
                    <span>신고 #{detail.id}</span>
                    <S.StatusBadge $status={detail.status}>
                      {statusLabels[detail.status]}
                    </S.StatusBadge>
                  </S.DetailEyebrow>
                  <S.DetailTitle>{reasonLabels[detail.reason]}</S.DetailTitle>
                </S.DetailHeader>

                <S.DetailBody>
                  <S.Subsection>
                    <S.SubsectionHeader>
                      <h3>신고 당시 프로필</h3>
                      <span>접수 시점 스냅샷</span>
                    </S.SubsectionHeader>
                    <S.ProfileCard>
                      <S.Avatar>
                        {detail.snapshotProfileImageUrl ? (
                          <img alt="" src={detail.snapshotProfileImageUrl} />
                        ) : (
                          detail.snapshotNickname?.slice(0, 1) || "?"
                        )}
                      </S.Avatar>
                      <S.ProfileInfo>
                        <strong>
                          {detail.snapshotNickname || "이름 없음"}
                        </strong>
                        <S.UserId>
                          UserId {detail.reportedProfileUserId}
                        </S.UserId>
                        <p>
                          {detail.snapshotBio || "등록된 자기소개가 없습니다."}
                        </p>
                      </S.ProfileInfo>
                    </S.ProfileCard>
                  </S.Subsection>

                  <S.Subsection>
                    <S.SubsectionHeader>
                      <h3>신고 내용</h3>
                    </S.SubsectionHeader>
                    <S.ReportDescription>
                      {detail.description || "신고 내용이 없습니다."}
                    </S.ReportDescription>
                  </S.Subsection>

                  <S.Facts>
                    <dt>신고자 ID</dt>
                    <dd>{detail.reporterUserId}</dd>
                    <dt>접수일시</dt>
                    <dd>{formatDateTime(detail.createdAt)}</dd>
                    {detail.reviewedByUserId && (
                      <>
                        <dt>처리자 ID</dt>
                        <dd>{detail.reviewedByUserId}</dd>
                      </>
                    )}
                    {detail.reviewedAt && (
                      <>
                        <dt>처리일시</dt>
                        <dd>{formatDateTime(detail.reviewedAt)}</dd>
                      </>
                    )}
                  </S.Facts>

                  <S.ReviewResult>
                    <h3>검토 결과</h3>
                    {isPendingReview ? (
                      <S.ReviewActions>
                        <S.ReviewButton
                          $primary
                          disabled={reviewMutation.isPending}
                          onClick={() => reviewMutation.mutate("ACTIONED")}
                          type="button"
                        >
                          승인
                        </S.ReviewButton>
                        <S.ReviewButton
                          disabled={reviewMutation.isPending}
                          onClick={() => reviewMutation.mutate("DISMISSED")}
                          type="button"
                        >
                          반려
                        </S.ReviewButton>
                      </S.ReviewActions>
                    ) : (
                      <S.ReviewNote>
                        {statusLabels[detail.status]} ·{" "}
                        {detail.reviewNote || "검토가 완료되었습니다."}
                      </S.ReviewNote>
                    )}
                  </S.ReviewResult>
                </S.DetailBody>
              </>
            )}
          </S.DetailPanel>
        </S.Workspace>
      </S.Main>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
