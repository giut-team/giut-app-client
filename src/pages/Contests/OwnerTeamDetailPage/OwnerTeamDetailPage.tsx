import { useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContestDetail } from "../../../api/contests";
import {
  fetchProfileRoles,
  getProfileRoleName,
  type ProfilePrimaryRole,
} from "../../../api/profiles";
import { fetchTeamDetail, fetchTeamMembers } from "../../../api/teams";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { Toast } from "../../../components/Toast/Toast";
import { Icon } from "../../../components/icons";
import idInviteIcon from "../../../assets/team-invite/id-invite.svg";
import messageSendIcon from "../../../assets/team-invite/message-send.svg";
import { S } from "./OwnerTeamDetailPage.styles";

const activityModeLabels = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  HYBRID: "온라인 + 오프라인",
};

const meetingPlaceLabels = {
  CAMPUS: "교내",
  SEOUL: "서울 전체",
  METROPOLITAN_AREA: "수도권",
  ANYWHERE: "상관없음",
};

const avatarTones = ["green", "blue", "purple"] as const;
const profilePrimaryRoles: ProfilePrimaryRole[] = [
  "DEVELOPMENT",
  "DESIGN",
  "PLANNING",
  "MARKETING",
];

const formatDate = (value?: string) => {
  if (!value) return "미정";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "미정";

  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date).replaceAll(". ", ".");
};

const inviteCandidates = [
  {
    id: "hyunjin_k",
    initial: "김",
    name: "김현진",
    position: "백엔드 개발자",
    profile: "서울시립대 컴퓨터공학부 3학년 · 백엔드 개발자",
    skills: ["Python", "SQL", "Spring"],
  },
  {
    id: "hyunjin_dev",
    initial: "김",
    name: "김현지",
    position: "데이터 엔지니어",
    profile: "경영학부 데이터경영학과 4학년 · 데이터 분석",
    skills: ["Python", "Tableau"],
  },
  {
    id: "hyunjinww",
    initial: "현",
    name: "현진욱",
    position: "데이터 엔지니어",
    profile: "서울시립대 통계학과 2학년 · 데이터 엔지니어",
    skills: ["SQL", "Airflow"],
  },
];

const defaultInviteMessage = "백엔드 파트 함께해요!";

type ActionMenuState = "closed" | "opening";

const getInviteExpiry = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  return `${String(expiryDate.getMonth() + 1).padStart(2, "0")}.${String(
    expiryDate.getDate(),
  ).padStart(2, "0")}까지`;
};

export function OwnerTeamDetailPage() {
  const navigate = useNavigate();
  const { contestId = "", teamId = "" } = useParams();
  const numericTeamId = Number(teamId);
  const {
    data: team,
    isError: isTeamError,
    isLoading: isTeamLoading,
  } = useQuery({
    queryKey: ["team", numericTeamId],
    queryFn: () => fetchTeamDetail(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContestDetail(contestId),
    enabled: Boolean(contestId),
  });
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["teamMembers", numericTeamId],
    queryFn: () => fetchTeamMembers(numericTeamId),
    enabled: Boolean(team),
  });
  const profileRoleQueries = useQueries({
    queries: profilePrimaryRoles.map((primaryRole) => ({
      queryKey: ["profileRoles", primaryRole],
      queryFn: () => fetchProfileRoles(primaryRole),
      enabled: Boolean(team),
      staleTime: Infinity,
    })),
  });
  const profileRoleNamesByCode = useMemo(
    () =>
      Object.fromEntries(
        profileRoleQueries.flatMap((query) =>
          (query.data ?? []).map(({ code, name }) => [code, name]),
        ),
      ),
    [profileRoleQueries],
  );
  const getTeamRoleName = (roleCode: string | null | undefined) =>
    roleCode
      ? profileRoleNamesByCode[roleCode] ?? getProfileRoleName(roleCode)
      : "역할 미정";
  const [toastMessage, setToastMessage] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [isCloseSheetOpen, setIsCloseSheetOpen] = useState(false);
  const [isInviteSheetOpen, setIsInviteSheetOpen] = useState(false);
  const [isIdInvitePageOpen, setIsIdInvitePageOpen] = useState(false);
  const [isIdInviteConfirmOpen, setIsIdInviteConfirmOpen] = useState(false);
  const [inviteQuery, setInviteQuery] = useState("hyunjin_k");
  const [selectedInviteCandidate, setSelectedInviteCandidate] = useState(
    inviteCandidates[0],
  );
  const [inviteMessage, setInviteMessage] = useState("");
  const [sentInviteCandidateIds, setSentInviteCandidateIds] = useState<
    string[]
  >([]);
  const [isCloseAcknowledged, setIsCloseAcknowledged] = useState(true);
  const [actionMenuState, setActionMenuState] =
    useState<ActionMenuState>("closed");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isTeamFull = Boolean(
    team && team.currentMemberCount >= team.maxMemberCount,
  );
  const isRecruitmentOpen = Boolean(
    team && team.status === "RECRUITING" && isRecruiting && !isTeamFull,
  );
  const isRecruitmentClosed = !isRecruitmentOpen;

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3200);
  };
  const isActionMenuOpen = actionMenuState === "opening";
  const toggleActionMenu = () => {
    setActionMenuState((current) =>
      current === "closed" ? "opening" : "closed",
    );
  };
  const inviteLink = `${window.location.origin}/contests/${contestId}/teams/${teamId}`;
  const inviteExpiry = getInviteExpiry();
  const filteredInviteCandidates = inviteCandidates.filter((candidate) => {
    const normalizedQuery = inviteQuery.trim().toLowerCase();
    const idPrefix = normalizedQuery.split("_")[0];

    return (
      !normalizedQuery ||
      candidate.name.includes(normalizedQuery) ||
      candidate.id.includes(normalizedQuery) ||
      candidate.id.includes(idPrefix)
    );
  });

  if (isTeamLoading) {
    return (
      <S.Page aria-busy="true">
        <S.Content>
          <PageHeader onBack={() => navigate(-1)} title="팀 상세" />
          <S.Section><S.Introduction>팀 정보를 불러오는 중입니다.</S.Introduction></S.Section>
        </S.Content>
      </S.Page>
    );
  }

  if (isTeamError || !team) {
    return (
      <S.Page>
        <S.Content>
          <PageHeader onBack={() => navigate(-1)} title="팀 상세" />
          <S.Section><S.Introduction>팀 정보를 불러오지 못했습니다.</S.Introduction></S.Section>
        </S.Content>
      </S.Page>
    );
  }
  const openInviteConfirm = (candidate: (typeof inviteCandidates)[number]) => {
    setSelectedInviteCandidate(candidate);
    setInviteMessage("");
    setIsIdInviteConfirmOpen(true);
  };
  const copyInviteLink = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(inviteLink);
      showToast("초대 링크를 복사했습니다.");
    } catch {
      showToast("초대 링크를 복사해 주세요.");
    }
  };
  const shareInviteLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${team?.name ?? "팀"} 초대`,
          text: `${team?.name ?? "팀"}에 함께해요!`,
          url: inviteLink,
        });
        return;
      }

      await copyInviteLink();
    } catch {
      // 공유 시트를 닫은 경우에는 별도 안내를 표시하지 않습니다.
    }
  };

  if (isIdInvitePageOpen) {
    return (
      <S.IdInvitePage>
        <S.Content>
          <PageHeader
            onBack={() => {
              setIsIdInviteConfirmOpen(false);
              setIsIdInvitePageOpen(false);
            }}
            title="아이디로 초대"
          />
          <S.IdInviteContent>
            <S.IdInviteSearch>
              <Icon name="search" size={15} weight="bold" />
              <input
                aria-label="아이디 또는 닉네임 검색"
                onChange={(event) => setInviteQuery(event.target.value)}
                placeholder="아이디 또는 닉네임"
                value={inviteQuery}
              />
              {inviteQuery && (
                <button
                  aria-label="검색어 지우기"
                  onClick={() => setInviteQuery("")}
                  type="button"
                >
                  <Icon name="x" size={13} weight="bold" />
                </button>
              )}
            </S.IdInviteSearch>
            <S.IdInviteHelp>
              기존 아이디·닉네임으로 찾을 수 있어요.
            </S.IdInviteHelp>

            <S.IdInviteResultsHeader>
              <strong>검색 결과 {filteredInviteCandidates.length}명</strong>
            </S.IdInviteResultsHeader>
            <S.IdInviteResults>
              {filteredInviteCandidates.map((candidate) => (
                <S.IdInviteCandidate key={candidate.id}>
                  <S.ProfileNavigationHint aria-hidden="true">
                    <Icon name="caret-right" size={16} weight="bold" />
                  </S.ProfileNavigationHint>
                  <S.IdInviteCandidateTop>
                    <S.IdInviteAvatar>{candidate.initial}</S.IdInviteAvatar>
                    <S.IdInviteProfile>
                      <S.IdInviteName>
                        {candidate.name} <span>@{candidate.id}</span>
                      </S.IdInviteName>
                      <p>{candidate.profile}</p>
                      <S.SkillList>
                        {candidate.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </S.SkillList>
                    </S.IdInviteProfile>
                  </S.IdInviteCandidateTop>
                  <S.InviteCandidateAction>
                    <button
                      disabled={sentInviteCandidateIds.includes(candidate.id)}
                      onClick={() => openInviteConfirm(candidate)}
                      type="button"
                    >
                      {sentInviteCandidateIds.includes(candidate.id)
                        ? "초대 보냄"
                        : "초대 보내기"}
                    </button>
                  </S.InviteCandidateAction>
                </S.IdInviteCandidate>
              ))}
            </S.IdInviteResults>
            {filteredInviteCandidates.length === 0 && (
              <S.EmptyInviteResult>
                검색 결과가 없어요. 아이디 또는 닉네임을 다시 확인해 주세요.
              </S.EmptyInviteResult>
            )}
          </S.IdInviteContent>
        </S.Content>

        <BottomSheet
          footer={
            <S.SheetActions>
              <S.SheetButton
                $primary
                onClick={() => {
                  setIsIdInviteConfirmOpen(false);
                  setSentInviteCandidateIds((current) =>
                    current.includes(selectedInviteCandidate.id)
                      ? current
                      : [...current, selectedInviteCandidate.id],
                  );
                  showToast(
                    `${selectedInviteCandidate.name}님에게 초대를 보냈어요.`,
                  );
                }}
                type="button"
              >
                초대 보내기
              </S.SheetButton>
              <S.SheetButton
                onClick={() => setIsIdInviteConfirmOpen(false)}
                type="button"
              >
                취소
              </S.SheetButton>
            </S.SheetActions>
          }
          footerVariant="action"
          minHeight="347px"
          onClose={() => setIsIdInviteConfirmOpen(false)}
          open={isIdInviteConfirmOpen}
          showHeaderDivider={false}
          variant="compact"
        >
          <S.IdInviteConfirmIcon>
            <Icon name="check" size={20} weight="bold" />
          </S.IdInviteConfirmIcon>
          <S.SheetTitle>{selectedInviteCandidate.name}님에게</S.SheetTitle>
          <S.IdInviteConfirmTitle>초대를 보낼까요?</S.IdInviteConfirmTitle>
          <S.SheetDescription>
            수락하면 지원서 없이 바로 팀원이 됩니다. 초대는 7일 후 자동으로
            만료돼요.
          </S.SheetDescription>
          <S.Summary>
            <S.SummaryRow $darkLabels>
              <dt>초대 포지션</dt>
              <dd>
                <S.IdInviteTeamCount>
                  {selectedInviteCandidate.position}
                </S.IdInviteTeamCount>
              </dd>
            </S.SummaryRow>
            <S.SummaryRow $darkLabels>
              <dt>팀 인원</dt>
              <dd>
                <S.IdInviteTeamCount>
                  {team.currentMemberCount}명 → {Math.min(team.maxMemberCount, team.currentMemberCount + 1)}명 예정
                </S.IdInviteTeamCount>
              </dd>
            </S.SummaryRow>
          </S.Summary>
          <S.IdInviteConfirmNote>
            <strong>함께 보낼 메시지 · 선택</strong>
            <textarea
              aria-label="함께 보낼 메시지"
              maxLength={120}
              onChange={(event) => setInviteMessage(event.target.value)}
              placeholder={defaultInviteMessage}
              value={inviteMessage}
            />
          </S.IdInviteConfirmNote>
        </BottomSheet>
        <Toast message={toastMessage} open={Boolean(toastMessage)} />
      </S.IdInvitePage>
    );
  }

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          onBack={() => navigate(-1)}
          rightContent={
            isRecruitmentOpen ? (
              <S.HeaderActions>
                <S.MoreButton
                  aria-expanded={isActionMenuOpen}
                  aria-haspopup="menu"
                  aria-label="팀 관리 메뉴"
                  onClick={toggleActionMenu}
                  type="button"
                >
                  <Icon name="more" size={20} weight="bold" />
                </S.MoreButton>
                {actionMenuState !== "closed" && (
                  <S.ActionMenu $state={actionMenuState} role="menu">
                    <S.ActionMenuButton
                      $index={0}
                      $state={actionMenuState}
                      onClick={() => {
                        setActionMenuState("closed");
                        navigate(`/contests/${contestId}/teams/${teamId}/edit`);
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <Icon name="edit" size={14} weight="bold" />팀 수정하기
                    </S.ActionMenuButton>
                    <S.ActionMenuButton
                      $danger
                      $index={1}
                      $state={actionMenuState}
                      onClick={() => {
                        setActionMenuState("closed");
                        setIsDeleteModalOpen(true);
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <Icon name="trash" size={14} weight="bold" />팀 삭제하기
                    </S.ActionMenuButton>
                  </S.ActionMenu>
                )}
              </S.HeaderActions>
            ) : undefined
          }
          title="팀 상세"
        />

        <S.Hero>
          <S.HeroTopline>
            <S.OwnerBadge $closed={isRecruitmentClosed}>
              {isRecruitmentClosed ? "모집 마감" : "내가 만든 팀"}
            </S.OwnerBadge>
            <S.CountBadge $closed={isRecruitmentClosed}>
              {team.currentMemberCount}/{team.maxMemberCount}명
            </S.CountBadge>
          </S.HeroTopline>
          <S.TeamTitle>{team.name}</S.TeamTitle>
          <S.ContestName>{contest?.title ?? "공모전 정보"}</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue $closed={isRecruitmentClosed} />
          </S.ProgressTrack>
          <S.HeroMeta>
            {isRecruitmentClosed
              ? isTeamFull
                ? "모든 자리가 찼어요"
                : "모집이 마감되었어요"
              : `${Math.max(0, team.maxMemberCount - team.currentMemberCount)}자리 남았어요`}
          </S.HeroMeta>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>팀 소개</S.SectionTitle>
          <S.Introduction>{team.description}</S.Introduction>
        </S.Section>

        <S.Section>
          <S.SectionTitle>포지션별 모집 현황</S.SectionTitle>
          <S.PositionList>
            {(team.recruitments ?? []).map((recruitment) => {
              const open = isRecruitmentOpen
                && recruitment.filledCount < recruitment.requiredCount;

              return (
              <S.PositionCard
                $open={open}
                key={recruitment.recruitmentId}
              >
                <div>
                  <S.PositionName $open={open}>
                    {getTeamRoleName(recruitment.roleCode)}
                  </S.PositionName>
                  {open && (
                    <S.PositionInfo>
                      필요 {recruitment.requiredCount}명 · 현재 {recruitment.filledCount}명
                    </S.PositionInfo>
                  )}
                </div>
                <S.PositionStatus $open={open}>
                  {open ? "모집 중" : "마감"}
                </S.PositionStatus>
              </S.PositionCard>
              );
            })}
            {!(team.recruitments ?? []).length && (
              <S.Introduction>등록된 모집 분야가 없습니다.</S.Introduction>
            )}
          </S.PositionList>
        </S.Section>

        <S.Section>
          <S.InfoGrid>
            <S.InfoItem>
              <dt>활동 방식</dt>
              <dd>{activityModeLabels[team.activityMode]}</dd>
            </S.InfoItem>
            <S.InfoItem>
              <dt>모집 마감</dt>
              <dd>{formatDate(contest?.applicationEndAt)}</dd>
            </S.InfoItem>
            <S.InfoItem>
              <dt>주간 회의</dt>
              <dd>주 {team.weeklyMeetingCount}회 · {meetingPlaceLabels[team.meetingPlace]}</dd>
            </S.InfoItem>
          </S.InfoGrid>
        </S.Section>

        <S.Section $last>
          <S.SectionTitle>팀원 {teamMembers.length}명</S.SectionTitle>
          <S.MemberList>
            {teamMembers.map((member, index) => (
              <S.Member key={member.teamMemberId}>
                <S.Avatar $tone={avatarTones[index % avatarTones.length]}>
                  {(member.nickname || "?").slice(0, 1)}
                </S.Avatar>
                <div>
                  <S.MemberHeading>
                    <S.MemberName>{member.nickname || "알 수 없음"}</S.MemberName>
                    <S.RoleBadge>{member.role === "LEADER" ? "팀장" : "팀원"}</S.RoleBadge>
                  </S.MemberHeading>
                  <S.MemberRole>{getTeamRoleName(member.roleCode)}</S.MemberRole>
                </div>
              </S.Member>
            ))}
            {!teamMembers.length && (
              <S.Introduction>등록된 팀원이 없습니다.</S.Introduction>
            )}
            {inviteCandidates
              .filter((candidate) =>
                sentInviteCandidateIds.includes(candidate.id),
              )
              .map((candidate) => (
                <S.PendingInvite key={candidate.id}>
                  <S.PendingInviteAvatar>
                    {candidate.initial}
                  </S.PendingInviteAvatar>
                  <div>
                    <S.MemberHeading>
                      <S.MemberName>{candidate.name}</S.MemberName>
                      <S.InviteSentBadge>초대 보냄</S.InviteSentBadge>
                    </S.MemberHeading>
                    <S.MemberRole>
                      {candidate.position} · 초대 수락 대기 중
                    </S.MemberRole>
                  </div>
                </S.PendingInvite>
              ))}
          </S.MemberList>
        </S.Section>
      </S.Content>

      <S.ActionBar>
        {isRecruitmentClosed ? (
          <S.ClosedAction>
            <S.ChatButton aria-label="팀에 문의하기" type="button">
              <Icon name="chat" size={19} weight="regular" />
            </S.ChatButton>
            <S.ClosedRecruitmentButton disabled type="button">
              모집이 마감된 팀이에요
            </S.ClosedRecruitmentButton>
          </S.ClosedAction>
        ) : (
          <>
            <S.ApplicationsButton
              onClick={() => navigate("/my-team/applications")}
              type="button"
            >
              받은 지원 보기
            </S.ApplicationsButton>
            <S.SecondaryActions>
              <S.SecondaryButton
                onClick={() => setIsInviteSheetOpen(true)}
                type="button"
              >
                팀원 초대하기
              </S.SecondaryButton>
              <S.SecondaryButton
                onClick={() => setIsCloseSheetOpen(true)}
                type="button"
              >
                모집 마감하기
              </S.SecondaryButton>
            </S.SecondaryActions>
          </>
        )}
      </S.ActionBar>
      <BottomSheet
        footer={
          <S.SheetActions>
            <S.SheetButton
              $primary
              disabled={!isCloseAcknowledged}
              onClick={() => {
                setIsRecruiting(false);
                setIsCloseSheetOpen(false);
                showToast("모집을 마감했어요.");
              }}
              type="button"
            >
              모집 마감하기
            </S.SheetButton>
            <S.SheetButton
              onClick={() => setIsCloseSheetOpen(false)}
              type="button"
            >
              취소
            </S.SheetButton>
          </S.SheetActions>
        }
        footerVariant="action"
        minHeight="410px"
        onClose={() => setIsCloseSheetOpen(false)}
        open={isCloseSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.SheetIcon $tone="warning">
          <Icon name="warning" size={19} weight="fill" />
        </S.SheetIcon>
        <S.SheetTitle>모집을 마감할까요?</S.SheetTitle>
        <S.SheetDescription>
          마감하면 공모전 팀 목록에서 내려가고 새 지원을 받지 않아요. 대기 중인
          지원은 자동으로 거절됩니다.
        </S.SheetDescription>
        <S.Summary>
          <S.SummaryRow $darkLabels>
            <dt>현재 팀 인원</dt>
            <dd>{team.currentMemberCount} / {team.maxMemberCount}명</dd>
          </S.SummaryRow>
          <S.SummaryRow $darkLabels>
            <dt>남는 자리</dt>
            <dd>{Math.max(0, team.maxMemberCount - team.currentMemberCount)}자리 → 마감</dd>
          </S.SummaryRow>
        </S.Summary>
        <S.Acknowledgement>
          <input
            checked={isCloseAcknowledged}
            onChange={(event) => setIsCloseAcknowledged(event.target.checked)}
            type="checkbox"
          />
          대기 중인 지원자에게 개별 알림을 보낼게요
        </S.Acknowledgement>
      </BottomSheet>
      <BottomSheet
        footer={
          <S.SheetCloseButton
            onClick={() => setIsInviteSheetOpen(false)}
            type="button"
          >
            닫기
          </S.SheetCloseButton>
        }
        footerVariant="action"
        minHeight="402px"
        onClose={() => setIsInviteSheetOpen(false)}
        open={isInviteSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.SheetIcon $tone="primary">
          <Icon name="user-plus" size={19} weight="bold" />
        </S.SheetIcon>
        <S.SheetTitle>팀원 초대하기</S.SheetTitle>
        <S.SheetDescription>
          링크를 받은 사람은 지원서를 쓰지 않고 바로 합류해요. 남은 자리 {Math.max(0, team.maxMemberCount - team.currentMemberCount)}개까지
          초대할 수 있어요.
        </S.SheetDescription>
        <S.InviteLinkCard>
          <S.InviteLinkLabel>초대 링크</S.InviteLinkLabel>
          <S.InviteLinkRow>
            <S.InviteLink>{inviteLink}</S.InviteLink>
            <S.CopyButton
              onClick={() => {
                setIsInviteSheetOpen(false);
                void copyInviteLink();
              }}
              type="button"
            >
              복사
            </S.CopyButton>
          </S.InviteLinkRow>
          <S.InviteExpiry>
            유효 기간 <strong>7일 · {inviteExpiry}</strong>
          </S.InviteExpiry>
        </S.InviteLinkCard>
        <S.InviteOptions>
          <S.InviteOption onClick={() => void shareInviteLink()} type="button">
            <S.InviteOptionIcon $tone="white">
              <S.InviteOptionImage alt="" src={messageSendIcon} />
            </S.InviteOptionIcon>
            <S.InviteOptionCopy>
              <strong>메시지로 보내기</strong>
              <small>카카오톡 · 문자 등</small>
            </S.InviteOptionCopy>
            <S.InviteCaret>
              <Icon name="caret-right" size={13} weight="bold" />
            </S.InviteCaret>
          </S.InviteOption>
          <S.InviteOption
            onClick={() => {
              setIsInviteSheetOpen(false);
              setIsIdInvitePageOpen(true);
            }}
            type="button"
          >
            <S.InviteOptionIcon $tone="purple">
              <S.InviteOptionImage alt="" src={idInviteIcon} />
            </S.InviteOptionIcon>
            <S.InviteOptionCopy>
              <strong>아이디로 초대</strong>
              <small>이미 같이 하기로 한 팀원의 아이디로 추가해요</small>
            </S.InviteOptionCopy>
            <S.InviteCaret>
              <Icon name="caret-right" size={13} weight="bold" />
            </S.InviteCaret>
          </S.InviteOption>
        </S.InviteOptions>
      </BottomSheet>
      <Modal
        description="팀과 모집 정보가 삭제되며 되돌릴 수 없어요."
        icon={<Icon name="trash" size={22} weight="bold" />}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
        primaryAction={{
          label: "삭제하기",
          onClick: () => navigate(`/contests/${contestId}`, { replace: true }),
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsDeleteModalOpen(false),
        }}
        title="팀을 삭제할까요?"
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
