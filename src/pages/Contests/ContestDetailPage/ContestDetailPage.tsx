import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addContestScrap,
  fetchContestDetail,
  removeContestScrap,
  type Contest,
} from "../../../api/contests";
import {
  addTeamScrap,
  fetchMyTeamApplications,
  fetchRecruitingTeams,
  fetchTeamDetail,
  removeTeamScrap,
  type RecruitingTeam,
} from "../../../api/teams";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { Toast } from "../../../components/Toast/Toast";
import { S } from "./ContestDetailPage.styles";

type DetailTab = "overview" | "guide";

const activityModeLabels = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  HYBRID: "온·오프라인 혼합",
};

export function ContestDetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { contestId } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [savedOverride, setSavedOverride] = useState<boolean | null>(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [teamScrapOverrides, setTeamScrapOverrides] = useState<Record<number, boolean>>({});
  const [applyTargetTeam, setApplyTargetTeam] = useState<RecruitingTeam | null>(null);
  const [isTeamCreationModalOpen, setIsTeamCreationModalOpen] = useState(false);
  const [existingMyTeamId, setExistingMyTeamId] = useState<number | null>(null);
  const teamCreationState = location.state as {
    fromTeamCreation?: boolean;
    backPath?: string;
  } | null;
  const [toastMessage, setToastMessage] = useState("");
  const {
    data: contest,
    isError: isContestError,
    isPending: isContestLoading,
  } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContestDetail(contestId ?? ""),
    enabled: Boolean(contestId),
  });
  const competitionId = Number(contestId);
  const {
    data: recruitingTeams,
    isError: isRecruitingTeamsError,
    isLoading: isRecruitingTeamsLoading,
  } = useQuery({
    queryKey: ["recruitingTeams", competitionId],
    queryFn: () => fetchRecruitingTeams(competitionId),
    enabled: Number.isInteger(competitionId) && competitionId > 0,
  });
  const { data: myTeamApplications = [] } = useQuery({
    queryKey: ["myTeamApplications"],
    queryFn: fetchMyTeamApplications,
  });
  const displayedTeams = recruitingTeams?.teams ?? [];
  const teamDetailQueries = useQueries({
    queries: displayedTeams.map((team) => ({
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
  const { isPending: isScrapPending, mutate: toggleScrap } = useMutation({
    mutationFn: (scrapped: boolean) => (
      scrapped ? removeContestScrap(contestId ?? "") : addContestScrap(contestId ?? "")
    ),
    onSuccess: (response, wasScrapped) => {
      setSavedOverride(response.scrapped);
      const scrapCountChange = response.scrapped === wasScrapped
        ? 0
        : response.scrapped ? 1 : -1;

      for (const queryKey of [["contests"], ["popularContests"], ["closingSoonContests"]]) {
        queryClient.setQueriesData<Contest[]>({ queryKey }, (contests) => (
          contests?.map((item) => (
            item.id === response.competitionId
              ? { ...item, scrapCount: Math.max(0, item.scrapCount + scrapCountChange) }
              : item
          ))
        ));
      }
      setToastMessage(response.scrapped ? "스크랩했어요." : "스크랩을 취소했어요.");
    },
    onError: () => setToastMessage("스크랩 상태를 변경하지 못했어요. 잠시 후 다시 시도해 주세요."),
  });
  const { isPending: isTeamScrapPending, mutate: toggleTeamScrap } = useMutation({
    mutationFn: ({ teamId, scrapped }: { teamId: number; scrapped: boolean }) => (
      scrapped ? removeTeamScrap(teamId) : addTeamScrap(teamId)
    ),
    onSuccess: (response) => {
      setTeamScrapOverrides((current) => ({
        ...current,
        [response.teamId]: response.scrapped,
      }));
      setToastMessage(response.scrapped ? "팀을 스크랩했어요." : "팀 스크랩을 취소했어요.");
    },
    onError: () => setToastMessage("팀 스크랩 상태를 변경하지 못했어요. 잠시 후 다시 시도해 주세요."),
  });
  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);
  useEffect(() => {
    if (!contest) return;

    for (const queryKey of [["contests"], ["popularContests"], ["closingSoonContests"]]) {
      queryClient.setQueriesData<Contest[]>({ queryKey }, (contests) => (
        contests?.map((item) => (
          item.id === contest.id ? { ...item, viewCount: contest.viewCount } : item
        ))
      ));
    }
  }, [contest, queryClient]);
  const handleBack = () => {
    if (teamCreationState?.fromTeamCreation) {
      navigate(teamCreationState.backPath ?? "/", { replace: true });
      return;
    }

    navigate(-1);
  };

  const handleShare = () => {
    setIsShareSheetOpen(true);
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setToastMessage("링크를 복사했어요.");
    } catch {
      setToastMessage("링크를 복사하지 못했어요.");
    }
  };

  const handleShareMore = async () => {
    const shareData = {
      title: "2026 서울시 데이터 활용 공모전",
      text: "2026 서울시 데이터 활용 공모전을 확인해 보세요.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyShareLink();
    } catch {
      // 공유 시트를 닫은 경우에는 별도의 피드백을 표시하지 않습니다.
    }
  };
  const isMyTeam = (teamId: number) => Boolean(
    contest?.teams.some(
      (contestTeam) => contestTeam.teamId === teamId && contestTeam.myTeam,
    ),
  );
  const isPendingApplication = (teamId: number) => myTeamApplications.some(
    (application) => application.teamId === teamId && application.status === "PENDING",
  );
  const getTeamPath = (team: RecruitingTeam) =>
    `teams/${team.teamId}${isMyTeam(team.teamId) ? "/manage" : ""}`;

  const handleTeamCreationClick = () => {
    const existingTeam = contest?.teams.find(
      (team) => team.myTeam && team.status === "RECRUITING",
    );

    if (existingTeam) {
      setExistingMyTeamId(existingTeam.teamId);
      return;
    }

    setIsTeamCreationModalOpen(true);
  };

  const formatDate = (value: string) => new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value)).replaceAll(". ", ".").replace(".", ".");
  const applicationPeriod = contest
    ? `${formatDate(contest.applicationStartAt)} - ${formatDate(contest.applicationEndAt)}`
    : "";
  const sourceUrl = contest?.urls.find((url) => url.primary)?.url ?? contest?.primaryUrl;
  const isSaved = savedOverride ?? contest?.scrapped ?? false;
  const displayScrapCount = !contest
    ? 0
    : contest.scrapCount + (savedOverride === true && !contest.scrapped ? 1 : 0)
      - (savedOverride === false && contest.scrapped ? 1 : 0);

  const handleScrap = () => {
    toggleScrap(isSaved);
  };

  const getTeamScrapped = (team: RecruitingTeam) =>
    teamScrapOverrides[team.teamId] ?? team.scrapped;

  const toggleTeamFavorite = (team: RecruitingTeam) => {
    toggleTeamScrap({
      teamId: team.teamId,
      scrapped: getTeamScrapped(team),
    });
  };

  if (isContestLoading) {
    return (
      <S.Page aria-busy="true">
        <S.Content>
          <S.Header>
            <S.HeaderButton
              aria-label="뒤로 가기"
              onClick={handleBack}
              type="button"
            >
              <Icon name="arrow-left" size={20} weight="regular" />
            </S.HeaderButton>
            <S.HeaderActions>
              <S.HeaderButton aria-label="공모전 스크랩" disabled type="button">
                <Icon name="bookmark" size={18} weight="regular" />
              </S.HeaderButton>
              <S.HeaderButton aria-label="공유하기" disabled type="button">
                <Icon name="share" size={18} weight="regular" />
              </S.HeaderButton>
            </S.HeaderActions>
          </S.Header>
          <S.SkeletonContent aria-label="공모전 정보를 불러오는 중">
            <S.SkeletonBlock $height="24px" />
            <S.SkeletonBlock $height="98px" />
            <S.SkeletonBlock $height="132px" />
            <S.SkeletonBlock $height="160px" />
          </S.SkeletonContent>
        </S.Content>
      </S.Page>
    );
  }

  if (isContestError || !contest) {
    return <S.Page><S.Content><S.InfoSection>공모전 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</S.InfoSection></S.Content></S.Page>;
  }

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.HeaderButton
            aria-label="뒤로 가기"
            onClick={handleBack}
            type="button"
          >
            <Icon name="arrow-left" size={20} weight="regular" />
          </S.HeaderButton>
          <S.HeaderActions>
            <S.HeaderButton
              aria-label={isSaved ? "공모전 스크랩 취소하기" : "공모전 스크랩하기"}
              aria-pressed={isSaved}
              disabled={isScrapPending}
              onClick={handleScrap}
              type="button"
            >
              <Icon
                name="bookmark"
                size={18}
                weight={isSaved ? "fill" : "regular"}
              />
            </S.HeaderButton>
            <S.HeaderButton
              aria-label="공유하기"
              aria-pressed={isShareSheetOpen}
              onClick={handleShare}
              type="button"
            >
              <Icon
                name="share"
                size={18}
                weight={isShareSheetOpen ? "fill" : "regular"}
              />
            </S.HeaderButton>
          </S.HeaderActions>
        </S.Header>

        <S.Hero>
          <S.HeroTags>
            <S.Category>{contest.categoryName}</S.Category>
          </S.HeroTags>
          <S.HeroTitle>
            {contest.title}
          </S.HeroTitle>
          <S.Host>주최 · {contest.hostOrganization}</S.Host>
          <S.HeroStats>
            <span>
              <Icon name="eye" size={11} weight="regular" />
              {contest.viewCount.toLocaleString("ko-KR")}
            </span>
            <span>
              <Icon name="bookmark" size={11} weight="regular" />
              {displayScrapCount.toLocaleString("ko-KR")}
            </span>
          </S.HeroStats>
          <S.DDay>{contest.dDay}</S.DDay>
        </S.Hero>

        <S.InfoSection>
          <S.InfoList>
            <S.InfoRow>
              <span>접수 기간</span>
              <strong>{applicationPeriod}</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>참가 대상</span>
              <strong>{contest.targetParticipant}</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>원문</span>
              {sourceUrl ? (
                <S.SourceLink href={sourceUrl} rel="noreferrer" target="_blank">
                  원문 보기 ↗
                </S.SourceLink>
              ) : <strong>원문 링크 없음</strong>}
            </S.InfoRow>
          </S.InfoList>
          <S.Notice>
            {contest.recruitmentStatusName} 공모전입니다. 신청 마감일과 원문 링크를
            확인해 주세요.
          </S.Notice>
        </S.InfoSection>

        <S.TabList aria-label="공모전 상세 탭" role="tablist">
          <S.TabButton
            $active={activeTab === "overview"}
            aria-selected={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            role="tab"
            type="button"
          >
            개요
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "guide"}
            aria-selected={activeTab === "guide"}
            onClick={() => setActiveTab("guide")}
            role="tab"
            type="button"
          >
            상세 안내
          </S.TabButton>
        </S.TabList>

        <S.TabContent role="tabpanel">
          {activeTab === "overview" ? (
            <S.Description>
              {contest.summary}
            </S.Description>
          ) : (
            <S.Description>
              자세한 모집 요건과 제출 방법은 원문 링크에서 확인해 주세요.
            </S.Description>
          )}
        </S.TabContent>

        <S.TeamsHeader>
          <S.SectionHeader>
            <S.SectionTitle>
              모집 중인 팀 <S.TeamTotal>{recruitingTeams?.totalElements ?? contest.recruitingTeamCount}</S.TeamTotal>
            </S.SectionTitle>
            <S.ViewAll onClick={() => navigate("teams")} type="button">
              전체 보기 ›
            </S.ViewAll>
          </S.SectionHeader>
        </S.TeamsHeader>
          <S.TeamsSection>
          <S.TeamList>
            {isRecruitingTeamsLoading && (
              <S.TeamDescription>팀 목록을 불러오는 중입니다.</S.TeamDescription>
            )}
            {isRecruitingTeamsError && (
              <S.TeamDescription>팀 목록을 불러오지 못했습니다.</S.TeamDescription>
            )}
            {!isRecruitingTeamsLoading && !isRecruitingTeamsError && !displayedTeams.length && (
              <S.TeamDescription>모집 중인 팀이 없습니다.</S.TeamDescription>
            )}
            {displayedTeams.slice(0, 3).map((team) => {
              const favorite = getTeamScrapped(team);
              const teamDetail = teamDetailsById[team.teamId];
              const myTeam = isMyTeam(team.teamId);
              const pendingApplication = isPendingApplication(team.teamId);

              return (
                <S.TeamCard
                  key={team.teamId}
                  onClick={() => navigate(getTeamPath(team))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(getTeamPath(team));
                    }
                  }}
                  role="link"
                  tabIndex={0}
                >
                  <S.TeamTicketTop>
                    <S.TeamTitleRow>
                      <S.TeamTitleGroup>
                        <S.TeamTitle>{team.name}</S.TeamTitle>
                        {myTeam && <S.OwnerBadge>내가 만든 팀</S.OwnerBadge>}
                        {!myTeam && pendingApplication && (
                          <S.ApplicationBadge>지원 검토중</S.ApplicationBadge>
                        )}
                      </S.TeamTitleGroup>
                      <S.TeamFavoriteButton
                        $favorite={favorite}
                        aria-label={favorite ? "팀 찜 해제" : "팀 찜하기"}
                        aria-pressed={favorite}
                        disabled={isTeamScrapPending}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleTeamFavorite(team);
                        }}
                        type="button"
                      >
                        <Icon
                          name="bookmark"
                          size={21}
                          weight={favorite ? "fill" : "regular"}
                        />
                      </S.TeamFavoriteButton>
                    </S.TeamTitleRow>
                    <S.TeamDescription>
                      {teamDetail?.description ?? `${activityModeLabels[team.activityMode]}으로 활동하는 팀입니다.`}
                    </S.TeamDescription>
                  </S.TeamTicketTop>
                  <S.TeamTicketDivider aria-hidden="true">
                    <S.TeamTicketNotch $side="left" />
                    <S.TeamTicketNotch $side="right" />
                  </S.TeamTicketDivider>
                  <S.TeamFooter>
                    <S.TeamMemberCount>
                      <Icon name="person" size={17} weight="regular" />
                      {team.currentMemberCount}/{team.maxMemberCount}명
                    </S.TeamMemberCount>
                    <S.TeamApplyButton
                      disabled={pendingApplication}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (myTeam || pendingApplication) {
                          navigate(getTeamPath(team));
                          return;
                        }

                        setApplyTargetTeam(team);
                      }}
                      type="button"
                    >
                      {myTeam ? "팀 관리" : pendingApplication ? "지원 검토중" : "지원하기"}
                    </S.TeamApplyButton>
                  </S.TeamFooter>
                </S.TeamCard>
              );
            })}
          </S.TeamList>
        </S.TeamsSection>
      </S.Content>

      <BottomSheet
        minHeight="180px"
        onClose={() => setIsShareSheetOpen(false)}
        open={isShareSheetOpen}
        showCloseButton
        showHeaderDivider={false}
        title="공유하기"
        variant="compact"
      >
        <S.ShareLinkRow>
          <S.ShareLinkText>{window.location.href}</S.ShareLinkText>
          <S.CopyButton onClick={copyShareLink} type="button">복사</S.CopyButton>
        </S.ShareLinkRow>
        <S.ShareActions>
          <S.ShareActionButton
            onClick={() => setToastMessage("카카오톡 공유를 준비 중이에요.")}
            type="button"
          >
            <S.ShareActionIcon $tone="kakao">
              <RiKakaoTalkFill aria-hidden="true" size={18} />
            </S.ShareActionIcon>
            카카오톡
          </S.ShareActionButton>
          <S.ShareActionButton
            onClick={() => setToastMessage("문자 공유를 준비 중이에요.")}
            type="button"
          >
            <S.ShareActionIcon $tone="neutral">
              <Icon name="chat" size={18} weight="regular" />
            </S.ShareActionIcon>
            문자
          </S.ShareActionButton>
          <S.ShareActionButton onClick={handleShareMore} type="button">
            <S.ShareActionIcon $tone="neutral">
              <Icon name="more" size={19} weight="bold" />
            </S.ShareActionIcon>
            더보기
          </S.ShareActionButton>
        </S.ShareActions>
      </BottomSheet>

      <S.ActionBar>
        <S.ApplyButton
          onClick={handleTeamCreationClick}
          type="button"
        >
          팀 구성하기
        </S.ApplyButton>
      </S.ActionBar>
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

            navigate(`${getTeamPath(applyTargetTeam)}/apply`);
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setApplyTargetTeam(null),
        }}
        title="이 팀에 지원하시겠습니까?"
      />
      <Modal
        description="이 공모전에는 이미 모집 중인 내가 만든 팀이 있어요."
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setExistingMyTeamId(null)}
        open={existingMyTeamId !== null}
        primaryAction={{
          label: "팀 관리하기",
          onClick: () => {
            if (existingMyTeamId === null) return;

            navigate(`/contests/${contestId}/teams/${existingMyTeamId}/manage`);
          },
        }}
        secondaryAction={{
          label: "확인",
          onClick: () => setExistingMyTeamId(null),
        }}
        title="이미 만든 팀이 있어요"
      />
      <Modal
        description="팀을 만들고 함께할 팀원을 모집해 보세요."
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsTeamCreationModalOpen(false)}
        open={isTeamCreationModalOpen}
        primaryAction={{
          label: "팀 만들기",
          onClick: () => {
            setIsTeamCreationModalOpen(false);
            navigate(`/contests/${contestId}/teams/create?from=detail`);
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsTeamCreationModalOpen(false),
        }}
        title="팀을 만들까요?"
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
