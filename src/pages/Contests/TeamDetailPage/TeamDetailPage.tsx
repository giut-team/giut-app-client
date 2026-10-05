import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContestDetail } from "../../../api/contests";
import {
  fetchProfileRoles,
  getProfileRoleName,
  type ProfilePrimaryRole,
} from "../../../api/profiles";
import {
  addTeamScrap,
  fetchTeamDetail,
  fetchTeamMembers,
  removeTeamScrap,
} from "../../../api/teams";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./TeamDetailPage.styles";

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

export function TeamDetailPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data", teamId = "data-seoul" } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
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
  const { data: members = [] } = useQuery({
    queryKey: ["teamMembers", numericTeamId],
    queryFn: () => fetchTeamMembers(numericTeamId),
    enabled: Boolean(team),
  });
  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContestDetail(contestId),
    enabled: Boolean(contestId),
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
    roleCode ? profileRoleNamesByCode[roleCode] ?? getProfileRoleName(roleCode) : "역할 미정";
  const isMyTeam = Boolean(
    contest?.teams.some(
      (contestTeam) => contestTeam.teamId === numericTeamId && contestTeam.myTeam,
    ),
  );

  useEffect(() => {
    if (!isMyTeam) return;

    navigate(`/contests/${contestId}/teams/${teamId}/manage`, { replace: true });
  }, [contestId, isMyTeam, navigate, teamId]);
  const { isPending: isTeamScrapPending, mutate: toggleTeamScrap } = useMutation({
    mutationFn: (scrapped: boolean) => (
      scrapped ? removeTeamScrap(numericTeamId) : addTeamScrap(numericTeamId)
    ),
    onSuccess: (response) => setIsBookmarked(response.scrapped),
  });

  if (isTeamLoading) {
    return (
      <S.Page aria-busy="true">
        <S.Content>
          <PageHeader onBack={() => navigate(-1)} title="팀 상세" />
          <S.Section>
            <S.Introduction>팀 정보를 불러오는 중입니다.</S.Introduction>
          </S.Section>
        </S.Content>
      </S.Page>
    );
  }

  if (isTeamError || !team) {
    return (
      <S.Page>
        <S.Content>
          <PageHeader onBack={() => navigate(-1)} title="팀 상세" />
          <S.Section>
            <S.Introduction>팀 정보를 불러오지 못했습니다.</S.Introduction>
          </S.Section>
        </S.Content>
      </S.Page>
    );
  }

  if (isMyTeam) {
    return (
      <S.Page aria-busy="true">
        <S.Content>
          <PageHeader onBack={() => navigate(-1)} title="팀 상세" />
          <S.Section>
            <S.Introduction>팀 관리 화면으로 이동 중입니다.</S.Introduction>
          </S.Section>
        </S.Content>
      </S.Page>
    );
  }

  const remainingSlots = Math.max(0, team.maxMemberCount - team.currentMemberCount);
  const recruitmentProgress = team.maxMemberCount
    ? Math.min(100, (team.currentMemberCount / team.maxMemberCount) * 100)
    : 0;
  const recruitments = Array.isArray(team.recruitments) ? team.recruitments : [];
  const teamMembers = Array.isArray(members) ? members : [];

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          onBack={() => navigate(-1)}
          rightContent={
            <S.BookmarkButton
              aria-label={isBookmarked ? "팀 찜 해제" : "팀 찜하기"}
              aria-pressed={isBookmarked}
              disabled={isTeamScrapPending}
              onClick={() => toggleTeamScrap(isBookmarked)}
              type="button"
            >
              <Icon
                name="bookmark"
                size={20}
                weight={isBookmarked ? "fill" : "regular"}
              />
            </S.BookmarkButton>
          }
          title="팀 상세"
        />

        <S.Hero>
          <S.TitleRow>
            <S.TeamTitle>{team.name}</S.TeamTitle>
            <S.CountBadge>{team.currentMemberCount}/{team.maxMemberCount}명</S.CountBadge>
          </S.TitleRow>
          <S.ContestName>{contest?.title ?? "공모전 정보"}</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue $value={recruitmentProgress} />
          </S.ProgressTrack>
          <S.Remaining>{remainingSlots}자리 남았어요</S.Remaining>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>팀 소개</S.SectionTitle>
          <S.Introduction>{team.description}</S.Introduction>
        </S.Section>

        <S.Section>
          <S.SectionTitle>포지션별 모집 현황</S.SectionTitle>
          {recruitments.map((recruitment) => (
            <S.RecruitmentCard key={recruitment.recruitmentId}>
              <div>
                <S.RecruitmentRole>{getTeamRoleName(recruitment.roleCode)}</S.RecruitmentRole>
                <S.RecruitmentMeta>
                  필요 {recruitment.requiredCount}명 · 현재 {recruitment.filledCount}명
                </S.RecruitmentMeta>
              </div>
              <S.RecruitingBadge>
                {recruitment.filledCount < recruitment.requiredCount ? "모집 중" : "모집 완료"}
              </S.RecruitingBadge>
            </S.RecruitmentCard>
          ))}
          {!recruitments.length && (
            <S.Introduction>등록된 모집 분야가 없습니다.</S.Introduction>
          )}
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
            {!teamMembers.length && <S.Introduction>등록된 팀원이 없습니다.</S.Introduction>}
          </S.MemberList>
        </S.Section>
      </S.Content>

      <S.ActionBar>
        <S.ChatButton aria-label="팀장에게 문의하기" type="button">
          <Icon name="chat" size={19} weight="regular" />
        </S.ChatButton>
        <S.ApplyButton onClick={() => setIsApplyModalOpen(true)} type="button">
          팀 지원하기
        </S.ApplyButton>
      </S.ActionBar>
      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsApplyModalOpen(false)}
        open={isApplyModalOpen}
        primaryAction={{
          label: "지원하기",
          onClick: () =>
            navigate(`/contests/${contestId}/teams/${teamId}/apply`),
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsApplyModalOpen(false),
        }}
        title="이 팀에 지원하시겠습니까?"
      />
    </S.Page>
  );
}
