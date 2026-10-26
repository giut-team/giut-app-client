import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "../../api/adminClient";
import {
  createAdminCompetition,
  deleteAdminCompetition,
  fetchAdminCompetitions,
  publishAdminCompetition,
  updateAdminCompetition,
  type AdminCompetitionCategory,
  type AdminCompetitionListItem,
  type AdminCompetitionPublicationStatus,
  type AdminCompetitionResponse,
  type UpsertAdminCompetitionRequest,
} from "../../api/adminContests";
import { Icon } from "../../components/icons";
import { OverlayShell } from "../../components/OverlayShell/OverlayShell";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./AdminContestsPage.styles";

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (number: number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatVerifiedAt = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

const categoryLabels: Record<AdminCompetitionCategory, string> = {
  PLANNING_IDEA: "기획·아이디어",
  ADVERTISING_MARKETING: "광고·마케팅",
  PAPER_REPORT: "논문·리포트",
  VIDEO_UCC_PHOTO: "영상·사진",
  DESIGN_CHARACTER_WEBTOON: "디자인·캐릭터·웹툰",
  WEB_MOBILE_IT: "웹·모바일·IT",
  GAME_SOFTWARE: "게임·소프트웨어",
  SCIENCE_ENGINEERING: "과학·공학",
  LITERATURE_WRITING_SCENARIO: "문학·글쓰기·시나리오",
  ARCHITECTURE_CONSTRUCTION_INTERIOR: "건축·건설·인테리어",
  NAMING_SLOGAN: "네이밍·슬로건",
  ENTERTAINMENT_ART_MUSIC: "예체능·미술·음악",
  ETC: "기타",
};

type ContestEditorForm = {
  title: string;
  category: AdminCompetitionCategory;
  hostOrganization: string;
  targetParticipants: string;
  summary: string;
  applicationStartAt: string;
  applicationEndAt: string;
  primaryUrl: string;
};

const emptyEditorForm: ContestEditorForm = {
  title: "",
  category: "WEB_MOBILE_IT",
  hostOrganization: "",
  targetParticipants: "",
  summary: "",
  applicationStartAt: "",
  applicationEndAt: "",
  primaryUrl: "",
};

const toDateTimeInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};

const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError<{ message?: string }>(error)) return fallback;
  return error.response?.data?.message || fallback;
};

const toListItem = (
  competition: AdminCompetitionResponse,
): AdminCompetitionListItem => ({
  ...competition,
  primaryUrl:
    competition.urls.find((url) => url.primary)?.url ??
    competition.urls[0]?.url ??
    "",
});

export function AdminContestsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState("");
  const [showVerifiedContests, setShowVerifiedContests] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null);
  const [editingContestId, setEditingContestId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [editingPublicationStatus, setEditingPublicationStatus] =
    useState<AdminCompetitionPublicationStatus>("DRAFT");
  const [editorForm, setEditorForm] = useState<ContestEditorForm>(emptyEditorForm);

  const contestsQuery = useQuery({
    queryKey: ["admin-competitions"],
    queryFn: fetchAdminCompetitions,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const normalizedSearchKeyword = searchKeyword.trim().toLowerCase();
  const visibleContests = (contestsQuery.data ?? []).filter((contest) => {
    const matchesVerification = showVerifiedContests || contest.publicationStatus !== "PUBLISHED";
    const matchesSearch =
      !normalizedSearchKeyword ||
      [contest.title, contest.hostOrganization]
        .some((value) => value.toLowerCase().includes(normalizedSearchKeyword));
    return matchesVerification && matchesSearch;
  });

  const publishMutation = useMutation({
    mutationFn: publishAdminCompetition,
    onSuccess: (publishedCompetition) => {
      queryClient.setQueryData<AdminCompetitionListItem[]>(
        ["admin-competitions"],
        (current = []) =>
          current.map((competition) =>
            competition.id === publishedCompetition.id
              ? {
                  ...competition,
                  publicationStatus: publishedCompetition.publicationStatus,
                  verificationStatus: publishedCompetition.verificationStatus,
                  verifiedAt: publishedCompetition.verifiedAt,
                }
              : competition,
          ),
      );
      showToast("공모전 공개를 승인했습니다.");
    },
    onError: (error) =>
      showToast(getApiErrorMessage(error, "공모전 공개 승인에 실패했습니다.")),
  });

  const saveMutation = useMutation({
    mutationFn: ({
      mode,
      competitionId,
      request,
    }: {
      mode: "create" | "edit";
      competitionId: number | null;
      request: UpsertAdminCompetitionRequest;
    }) =>
      mode === "create"
        ? createAdminCompetition(request)
        : updateAdminCompetition({ competitionId: competitionId!, request }),
    onSuccess: (savedCompetition, variables) => {
      queryClient.setQueryData<AdminCompetitionListItem[]>(
        ["admin-competitions"],
        (current = []) => {
          const saved = toListItem(savedCompetition);
          return variables.mode === "create"
            ? [saved, ...current]
            : current.map((competition) =>
                competition.id === saved.id ? { ...competition, ...saved } : competition,
              );
        },
      );
      setEditorMode(null);
      setEditingContestId(null);
      setEditorForm(emptyEditorForm);
      showToast(
        variables.mode === "create"
          ? "공모전을 등록했습니다."
          : "공모전을 수정했습니다.",
      );
    },
    onError: (error) =>
      showToast(getApiErrorMessage(error, "공모전 정보를 저장하지 못했습니다.")),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAdminCompetition,
    onSuccess: (_, competitionId) => {
      queryClient.setQueryData<AdminCompetitionListItem[]>(
        ["admin-competitions"],
        (current = []) =>
          current.filter((competition) => competition.id !== competitionId),
      );
      setDeleteTarget(null);
      setEditorMode(null);
      setEditingContestId(null);
      setEditorForm(emptyEditorForm);
      showToast("공모전을 삭제했습니다.");
    },
    onError: (error) =>
      showToast(getApiErrorMessage(error, "공모전을 삭제하지 못했습니다.")),
  });

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  const openCreateEditor = () => {
    setEditorForm(emptyEditorForm);
    setEditingContestId(null);
    setEditingPublicationStatus("DRAFT");
    setEditorMode("create");
  };

  const openEditEditor = (contest: AdminCompetitionListItem) => {
    setEditorForm({
      title: contest.title,
      category: contest.category,
      hostOrganization: contest.hostOrganization,
      targetParticipants: contest.targetParticipants ?? "",
      summary: contest.summary,
      applicationStartAt: toDateTimeInput(contest.applicationStartAt),
      applicationEndAt: toDateTimeInput(contest.applicationEndAt),
      primaryUrl: contest.primaryUrl ?? "",
    });
    setEditingContestId(contest.id);
    setEditingPublicationStatus(contest.publicationStatus);
    setEditorMode("edit");
  };

  const closeEditor = () => {
    if (saveMutation.isPending || deleteMutation.isPending) return;
    setEditorMode(null);
    setEditingContestId(null);
  };

  const updateEditorField = <Key extends keyof ContestEditorForm>(
    key: Key,
    value: ContestEditorForm[Key],
  ) => setEditorForm((current) => ({ ...current, [key]: value }));

  const submitEditor = () => {
    if (!editorMode) return;
    if (!editorForm.title.trim() || !editorForm.summary.trim() || !editorForm.primaryUrl.trim()) {
      showToast("제목, 소개, 대표 URL을 입력해 주세요.");
      return;
    }
    if (!isValidHttpUrl(editorForm.primaryUrl.trim())) {
      showToast("대표 모집 URL을 https:// 또는 http://로 시작해 입력해 주세요.");
      return;
    }
    if (
      editorForm.applicationStartAt &&
      editorForm.applicationEndAt &&
      new Date(editorForm.applicationStartAt).getTime() >=
        new Date(editorForm.applicationEndAt).getTime()
    ) {
      showToast("접수 마감은 접수 시작보다 늦어야 합니다.");
      return;
    }
    saveMutation.mutate({
      mode: editorMode,
      competitionId: editingContestId,
      request: {
        title: editorForm.title.trim(),
        category: editorForm.category,
        hostOrganization: editorForm.hostOrganization.trim() || undefined,
        targetParticipants: editorForm.targetParticipants.trim() || undefined,
        summary: editorForm.summary.trim(),
        applicationStartAt: editorForm.applicationStartAt
          ? new Date(editorForm.applicationStartAt).toISOString()
          : undefined,
        applicationEndAt: editorForm.applicationEndAt
          ? new Date(editorForm.applicationEndAt).toISOString()
          : undefined,
        publicationStatus:
          editorMode === "create" ? "DRAFT" : editingPublicationStatus,
        urls: [
          {
            type: "RECRUITMENT",
            url: editorForm.primaryUrl.trim(),
            primary: true,
          },
        ],
      },
    });
  };

  return (
    <S.Page data-admin-page>
      <S.Main>
        <S.Header>
          <S.Title>공모전</S.Title>
          <S.HeaderActions>
            <S.CreateButton onClick={openCreateEditor} type="button">
              <Icon name="plus" size={14} weight="bold" /> 등록
            </S.CreateButton>
            <S.LogoutButton onClick={handleLogout} type="button">로그아웃</S.LogoutButton>
          </S.HeaderActions>
        </S.Header>

        <S.SearchBox>
          <Icon name="search" size={20} weight="regular" />
          <input
            aria-label="공모전 검색"
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="공모전명, 주최 기관 검색"
            type="search"
            value={searchKeyword}
          />
        </S.SearchBox>

        <S.ListToolbar>
          <span>{showVerifiedContests ? "전체 공모전" : "미인증 공모전"}</span>
          <S.VerifiedToggle>
            <input checked={showVerifiedContests} onChange={(event) => setShowVerifiedContests(event.target.checked)} type="checkbox" />
            <S.ToggleBox $checked={showVerifiedContests}>
              {showVerifiedContests && <Icon name="check" size={13} weight="bold" />}
            </S.ToggleBox>
            <span>인증된 공모전도 보기</span>
          </S.VerifiedToggle>
        </S.ListToolbar>

        <S.Table aria-label="관리자 공모전 목록">
          <S.TableBody>
            {contestsQuery.isPending && (
              <S.TableState>공모전 목록을 불러오는 중입니다.</S.TableState>
            )}
            {contestsQuery.isError && (
              <S.TableState>공모전 목록을 불러오지 못했습니다.</S.TableState>
            )}
            {!contestsQuery.isPending &&
              !contestsQuery.isError &&
              visibleContests.length === 0 && (
                <S.TableState>
                  {normalizedSearchKeyword
                    ? "검색 결과가 없습니다."
                    : showVerifiedContests
                    ? "등록된 공모전이 없습니다."
                    : "미인증 공모전이 없습니다."}
                </S.TableState>
              )}
            {visibleContests.map((contest) => (
              <S.Row key={contest.id}>
                <S.Status>
                  <S.StatusBadge $status={contest.publicationStatus}>
                    {contest.publicationStatus === "PUBLISHED" ? "인증" : "미인증"}
                  </S.StatusBadge>
                  {contest.publicationStatus === "PUBLISHED" && formatVerifiedAt(contest.verifiedAt) && (
                    <S.Verified><Icon name="check" size={10} weight="bold" /> 검증 {formatVerifiedAt(contest.verifiedAt)}</S.Verified>
                  )}
                </S.Status>
                <S.ContestInfo>
                  <strong>{contest.title}</strong>
                  <span>
                    {categoryLabels[contest.category]} · {contest.hostOrganization}
                    {contest.targetParticipants
                      ? ` · ${contest.targetParticipants}`
                      : ""}
                  </span>
                </S.ContestInfo>
                <S.Period>
                  접수 {formatDateTime(contest.applicationStartAt)} ~ {formatDateTime(contest.applicationEndAt)}
                </S.Period>
                <S.Actions>
                  {contest.publicationStatus === "DRAFT" && (
                    <S.ApproveButton
                      disabled={publishMutation.isPending}
                      onClick={() => publishMutation.mutate(contest.id)}
                      type="button"
                    >
                      공개 승인
                    </S.ApproveButton>
                  )}
                  <S.EditButton
                    $wide={contest.publicationStatus === "PUBLISHED"}
                    onClick={() => openEditEditor(contest)}
                    type="button"
                  >
                    수정
                  </S.EditButton>
                  <S.DeleteButton
                    disabled={deleteMutation.isPending}
                    onClick={() =>
                      setDeleteTarget({ id: contest.id, title: contest.title })
                    }
                    type="button"
                  >
                    삭제
                  </S.DeleteButton>
                </S.Actions>
              </S.Row>
            ))}
          </S.TableBody>
        </S.Table>
      </S.Main>

      <S.BottomNav aria-label="관리자 메뉴">
        <S.BottomNavItem onClick={() => navigate("/admin/profile-reports")} type="button">신고</S.BottomNavItem>
        <S.BottomNavItem $active type="button">공모전</S.BottomNavItem>
      </S.BottomNav>

      <OverlayShell
        ariaLabel={editorMode === "create" ? "공모전 등록" : "공모전 수정"}
        maxWidth="640px"
        onClose={closeEditor}
        open={editorMode !== null}
        placement="center"
      >
        {editorMode && (
          <S.Editor>
            <S.EditorTitle>
              {editorMode === "create" ? "공모전 등록" : "공모전 수정"}
            </S.EditorTitle>
            <S.EditorDescription>
              공모전 기본 정보와 대표 모집 URL을 입력해 주세요.
            </S.EditorDescription>
            <S.EditorForm onSubmit={(event) => event.preventDefault()}>
              <S.Field $wide>
                <span>공모전명</span>
                <input
                  onChange={(event) => updateEditorField("title", event.target.value)}
                  placeholder="공모전명을 입력해 주세요"
                  value={editorForm.title}
                />
              </S.Field>
              <S.Field>
                <span>카테고리</span>
                <select
                  onChange={(event) =>
                    updateEditorField(
                      "category",
                      event.target.value as AdminCompetitionCategory,
                    )
                  }
                  value={editorForm.category}
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </S.Field>
              <S.Field>
                <span>주최 기관</span>
                <input
                  onChange={(event) =>
                    updateEditorField("hostOrganization", event.target.value)
                  }
                  placeholder="주최 기관"
                  value={editorForm.hostOrganization}
                />
              </S.Field>
              <S.Field $wide>
                <span>참가 대상</span>
                <input
                  onChange={(event) =>
                    updateEditorField("targetParticipants", event.target.value)
                  }
                  placeholder="예) 전국 대학생 및 대학원생"
                  value={editorForm.targetParticipants}
                />
              </S.Field>
              <S.Field>
                <span>접수 시작</span>
                <input
                  onChange={(event) =>
                    updateEditorField("applicationStartAt", event.target.value)
                  }
                  type="datetime-local"
                  value={editorForm.applicationStartAt}
                />
              </S.Field>
              <S.Field>
                <span>접수 마감</span>
                <input
                  onChange={(event) =>
                    updateEditorField("applicationEndAt", event.target.value)
                  }
                  type="datetime-local"
                  value={editorForm.applicationEndAt}
                />
              </S.Field>
              <S.Field $wide>
                <span>공모전 소개</span>
                <textarea
                  onChange={(event) => updateEditorField("summary", event.target.value)}
                  placeholder="공모전 소개를 입력해 주세요"
                  value={editorForm.summary}
                />
              </S.Field>
              <S.Field $wide>
                <span>대표 모집 URL</span>
                <input
                  onChange={(event) =>
                    updateEditorField("primaryUrl", event.target.value)
                  }
                  placeholder="https://example.com/recruitment"
                  type="url"
                  value={editorForm.primaryUrl}
                />
              </S.Field>
            </S.EditorForm>
            <S.EditorActions>
              <S.EditorSubmit
                disabled={saveMutation.isPending || deleteMutation.isPending}
                onClick={submitEditor}
                type="button"
              >
                {saveMutation.isPending
                  ? "저장 중"
                  : editorMode === "create"
                    ? "등록"
                    : "수정"}
              </S.EditorSubmit>
              <S.EditorCancel
                disabled={saveMutation.isPending || deleteMutation.isPending}
                onClick={closeEditor}
                type="button"
              >
                취소
              </S.EditorCancel>
            </S.EditorActions>
          </S.Editor>
        )}
      </OverlayShell>

      <OverlayShell
        ariaLabel="공모전 삭제 확인"
        maxWidth="420px"
        onClose={() => {
          if (!deleteMutation.isPending) setDeleteTarget(null);
        }}
        open={deleteTarget !== null}
        placement="center"
      >
        {deleteTarget && (
          <S.DeleteDialog>
            <S.EditorTitle>공모전을 삭제할까요?</S.EditorTitle>
            <S.EditorDescription>
              ‘{deleteTarget.title}’ 공모전이 목록에서 삭제됩니다.
            </S.EditorDescription>
            <S.EditorActions>
              <S.DeleteConfirm
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(deleteTarget.id)}
                type="button"
              >
                {deleteMutation.isPending ? "삭제 중" : "삭제"}
              </S.DeleteConfirm>
              <S.EditorCancel
                disabled={deleteMutation.isPending}
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                취소
              </S.EditorCancel>
            </S.EditorActions>
          </S.DeleteDialog>
        )}
      </OverlayShell>

      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
