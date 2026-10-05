import { useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRecruitingTeams,
  fetchTeamDetail,
  type RecruitingTeam,
} from "../../../api/teams";
import { fetchContestDetail } from "../../../api/contests";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./RecruitingTeamsPage.styles";

const activityModeLabels = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  HYBRID: "온·오프라인 혼합",
};

export function RecruitingTeamsPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data" } = useParams();
  const competitionId = Number(contestId);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [applyTargetTeam, setApplyTargetTeam] = useState<RecruitingTeam | null>(
    null,
  );
  const { data, isError, isLoading } = useQuery({
    queryKey: ["recruitingTeams", competitionId],
    queryFn: () => fetchRecruitingTeams(competitionId),
    enabled: Number.isInteger(competitionId) && competitionId > 0,
  });
  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContestDetail(contestId),
    enabled: Boolean(contestId),
  });
  const visibleTeams = data?.teams ?? [];
  const teamDetailQueries = useQueries({
    queries: visibleTeams.map((team) => ({
      queryKey: ["team", team.teamId],
      queryFn: () => fetchTeamDetail(team.teamId),
      staleTime: Infinity,
    })),
  });
  const teamDetailsById = useMemo(
    () =>
      Object.fromEntries(
        teamDetailQueries.flatMap((query) =>
          query.data ? [[query.data.teamId, query.data]] : [],
        ),
      ),
    [teamDetailQueries],
  );

  const isMyTeam = (teamId: number) => Boolean(
    contest?.teams.some(
      (contestTeam) => contestTeam.teamId === teamId && contestTeam.myTeam,
    ),
  );
  const getTeamDetailPath = (team: RecruitingTeam) =>
    `/contests/${contestId}/teams/${team.teamId}${isMyTeam(team.teamId) ? "/manage" : ""}`;

  const toggleFavorite = (teamId: number) => {
    setFavoriteIds((current) =>
      current.includes(teamId)
        ? current.filter((id) => id !== teamId)
        : [...current, teamId],
    );
  };

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate(-1)} title="팀원 모집" />

        <S.ContestSummary>
          <S.ContestBadges>
            <S.CategoryBadge>IT/과학</S.CategoryBadge>
            <S.VerifiedBadge>
              <Icon name="check" size={12} weight="bold" /> 인증
            </S.VerifiedBadge>
          </S.ContestBadges>
          <S.ContestTitle>2026 서울시 데이터 활용 공모전</S.ContestTitle>
          <S.ContestMeta>
            <S.MetaItem>
              <Icon name="calendar" size={16} weight="regular" />
              2026.09.30 (수) 마감
            </S.MetaItem>
            <S.DDay>D-15</S.DDay>
          </S.ContestMeta>
        </S.ContestSummary>

        <S.TeamSection>
          <S.SectionHeader>
            <S.SectionTitle>팀원 모집 중 {visibleTeams.length}팀</S.SectionTitle>
          </S.SectionHeader>

          <S.TeamList>
            {isLoading && <S.TeamDescription>팀 목록을 불러오는 중입니다.</S.TeamDescription>}
            {isError && <S.TeamDescription>팀 목록을 불러오지 못했습니다.</S.TeamDescription>}
            {!isLoading && !isError && !visibleTeams.length && (
              <S.TeamDescription>모집 중인 팀이 없습니다.</S.TeamDescription>
            )}
            {visibleTeams.map((team) => {
              const favorite = favoriteIds.includes(team.teamId);
              const teamDetail = teamDetailsById[team.teamId];
              const myTeam = isMyTeam(team.teamId);

              return (
                <S.TeamCard
                  key={team.teamId}
                  onClick={() => navigate(getTeamDetailPath(team))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(getTeamDetailPath(team));
                    }
                  }}
                  role="link"
                  tabIndex={0}
                >
                  <S.TicketTop>
                    <S.CardHeading>
                      <S.TitleGroup>
                        <S.TeamTitle>{team.name}</S.TeamTitle>
                        {myTeam && (
                          <S.RelationshipBadge $type="owner">
                            내가 만든 팀
                          </S.RelationshipBadge>
                        )}
                      </S.TitleGroup>
                      <S.FavoriteButton
                        $favorite={favorite}
                        aria-label={favorite ? "팀 찜 해제" : "팀 찜하기"}
                        aria-pressed={favorite}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(team.teamId);
                        }}
                        type="button"
                      >
                        <Icon
                          name="bookmark"
                          size={21}
                          weight={favorite ? "fill" : "regular"}
                        />
                      </S.FavoriteButton>
                    </S.CardHeading>
                    <S.TeamDescription>
                      {teamDetail?.description ?? `${activityModeLabels[team.activityMode]}으로 활동하는 팀입니다.`}
                    </S.TeamDescription>
                  </S.TicketTop>
                  <S.TicketDivider aria-hidden="true">
                    <S.TicketNotch $side="left" />
                    <S.TicketNotch $side="right" />
                  </S.TicketDivider>
                  <S.CardFooter>
                    <S.MemberCount>
                      <Icon name="person" size={17} weight="regular" />
                      {team.currentMemberCount}/{team.maxMemberCount}명
                    </S.MemberCount>
                    <S.ApplyButton
                      onClick={(event) => {
                        event.stopPropagation();
                        if (myTeam) {
                          navigate(getTeamDetailPath(team));
                          return;
                        }

                        setApplyTargetTeam(team);
                      }}
                      type="button"
                    >
                      {myTeam ? "팀 관리" : "지원하기"}
                    </S.ApplyButton>
                  </S.CardFooter>
                </S.TeamCard>
              );
            })}
          </S.TeamList>
        </S.TeamSection>
      </S.Content>
      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setApplyTargetTeam(null)}
        open={Boolean(applyTargetTeam)}
        primaryAction={{
          label: "지원하기",
          onClick: () => {
            if (!applyTargetTeam) return;

            navigate(`/contests/${contestId}/teams/${applyTargetTeam.teamId}/apply`);
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setApplyTargetTeam(null),
        }}
        title="이 팀에 지원하시겠습니까?"
      />
    </S.Page>
  );
}
