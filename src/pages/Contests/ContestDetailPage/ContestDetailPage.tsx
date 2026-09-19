import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { Toast } from "../../../components/Toast/Toast";
import { S } from "./ContestDetailPage.styles";

type DetailTab = "overview" | "guide";

const recruitTeams = [
  {
    id: "my-data-seoul",
    title: "데이터로 서울을",
    leader: "이서연 팀장 · 온라인 + 오프라인",
    description:
      "서울의 공공데이터로 시민이 체감할 수 있는 서비스를 기획하고 있어요.",
    members: "3/5명",
    positions: ["백엔드 개발자 모집", "데이터 엔지니어 모집"],
    isOwner: true,
  },
  {
    id: "data-seoul",
    title: "데이터로 서울을",
    leader: "이수현 팀장 · 온라인 + 오프라인",
    description:
      "서울시 데이터를 분석해 생활 문제를 해결할 서비스를 만들고 있어요.",
    members: "3/5명",
    positions: ["백엔드 모집", "프론트엔드 마감", "기획 마감"],
  },
  {
    id: "syrup-data-lab",
    title: "시립대 데이터랩",
    leader: "최유진 팀장 · 온라인",
    description:
      "시립대 학생에게 필요한 데이터를 쉽고 친절하게 연결하는 팀입니다.",
    members: "2/4명",
    positions: ["기획 모집", "디자인 모집"],
  },
  {
    id: "blending-3",
    title: "열린데이터 3기",
    leader: "박지윤 팀장 · 오프라인",
    description: "열린데이터를 활용한 캠페인 경험을 함께 만들어가고 있어요.",
    members: "4/5명",
    positions: ["마케팅 모집"],
  },
];

export function ContestDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contestId = "seoul-data" } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [favoriteTeamIds, setFavoriteTeamIds] = useState<string[]>([]);
  const [applyTargetTeam, setApplyTargetTeam] = useState<
    (typeof recruitTeams)[number] | null
  >(null);
  const [isTeamCreationModalOpen, setIsTeamCreationModalOpen] = useState(false);
  const teamCreationState = location.state as {
    fromTeamCreation?: boolean;
    backPath?: string;
  } | null;
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);
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
  const getTeamPath = (team: (typeof recruitTeams)[number]) =>
    team.isOwner ? `teams/${team.id}/manage` : `teams/${team.id}`;

  const toggleTeamFavorite = (teamId: string) => {
    setFavoriteTeamIds((current) =>
      current.includes(teamId)
        ? current.filter((id) => id !== teamId)
        : [...current, teamId],
    );
  };

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
              aria-label={isSaved ? "찜 취소하기" : "공모전 찜하기"}
              aria-pressed={isSaved}
              onClick={() => setIsSaved((current) => !current)}
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
            <S.Category>IT/과학</S.Category>
            <S.Verified>
              <Icon name="check" size={8} weight="bold" />
              인증
            </S.Verified>
          </S.HeroTags>
          <S.HeroTitle>
            2026 서울시
            <br />
            데이터 활용 공모전
          </S.HeroTitle>
          <S.Host>주최 · 서울특별시</S.Host>
          <S.HeroStats>
            <span>
              <Icon name="eye" size={11} weight="regular" />
              41,852
            </span>
            <span>
              <Icon name="bookmark" size={11} weight="regular" />
              128
            </span>
          </S.HeroStats>
          <S.DDay>D-15</S.DDay>
        </S.Hero>

        <S.InfoSection>
          <S.InfoList>
            <S.InfoRow>
              <span>접수 기간</span>
              <strong>2026.09.01 (화) - 09.30 (수)</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>참가 대상</span>
              <strong>서울 소재 대학 재/휴학생</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>시상 규모</span>
              <strong>총 상금 3,000만원</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>원문</span>
              <S.SourceLink
                href="https://contest.seoul.go.kr"
                rel="noreferrer"
                target="_blank"
              >
                contest.seoul.go.kr ↗
              </S.SourceLink>
            </S.InfoRow>
          </S.InfoList>
          <S.Notice>
            서울시립대 공지사항 RSS에서 자동 수집된 공고입니다. 필수 항목이 모두
            채워져 인증마크가 부여되었습니다.
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
              서울시가 보유한 공공데이터를 활용해 시민 생활 문제를 해결하는
              서비스·분석 아이디어를 제안하는 공모전입니다. 데이터 분석, 서비스
              기획, 개발이 모두 필요해 3~5인 팀 단위 참가를 권장합니다.
            </S.Description>
          ) : (
            <S.Description>
              1차 서면 심사 후 2차 발표 심사가 진행됩니다. 제출물은 기획서(PDF
              10p 이내)와 시연 영상(3분 이내)이며, 수상팀은 서울시 실증 사업
              참여 기회를 제공받습니다. 자세한 내용은 원문 링크를 확인하세요.
            </S.Description>
          )}
        </S.TabContent>

        <S.TeamsHeader>
          <S.SectionHeader>
            <S.SectionTitle>
              모집 중인 팀 <S.TeamTotal>5</S.TeamTotal>
            </S.SectionTitle>
            <S.ViewAll onClick={() => navigate("teams")} type="button">
              전체 보기 ›
            </S.ViewAll>
          </S.SectionHeader>
        </S.TeamsHeader>
        <S.TeamsSection>
          <S.TeamList>
            {recruitTeams.slice(0, 3).map((team) => {
              const favorite = favoriteTeamIds.includes(team.id);

              return (
                <S.TeamCard
                  key={team.id}
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
                        <S.TeamTitle>{team.title}</S.TeamTitle>
                        {team.isOwner && (
                          <S.OwnerBadge>내가 만든 팀</S.OwnerBadge>
                        )}
                      </S.TeamTitleGroup>
                      <S.TeamFavoriteButton
                        $favorite={favorite}
                        aria-label={favorite ? "팀 찜 해제" : "팀 찜하기"}
                        aria-pressed={favorite}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleTeamFavorite(team.id);
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
                    <S.TeamDescription>{team.description}</S.TeamDescription>
                  </S.TeamTicketTop>
                  <S.TeamTicketDivider aria-hidden="true">
                    <S.TeamTicketNotch $side="left" />
                    <S.TeamTicketNotch $side="right" />
                  </S.TeamTicketDivider>
                  <S.TeamFooter>
                    <S.TeamMemberCount>
                      <Icon name="person" size={17} weight="regular" />
                      {team.members}
                    </S.TeamMemberCount>
                    <S.TeamApplyButton
                      onClick={(event) => {
                        event.stopPropagation();
                        if (team.isOwner) {
                          navigate(getTeamPath(team));
                          return;
                        }

                        setApplyTargetTeam(team);
                      }}
                      type="button"
                    >
                      {team.isOwner ? "팀 관리" : "지원하기"}
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
          <S.ShareLinkText>giut.app/c/seoul-data-2026</S.ShareLinkText>
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
          onClick={() => setIsTeamCreationModalOpen(true)}
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
