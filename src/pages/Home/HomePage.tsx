import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPopularContests } from "../../api/contests";
import giutLogo from "../../assets/giut-logo.svg";
import trophyIcon from "../../assets/trophy.svg";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { SearchOverlay } from "../../components/SearchOverlay/SearchOverlay";
import { S } from "./HomePage.styles";

const shortcuts = [
  {
    destination: "/contests",
    icon: trophyIcon,
    iconType: "image" as const,
    title: "공모전 찾기",
    description: "분야 · 마감으로 한눈에",
  },
  {
    destination: "/matched-teams",
    icon: "👥",
    iconType: "text" as const,
    title: "팀원으로 지원하기",
    description: "원하는 팀을 빠르게",
  },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

const BANNER_AUTOPLAY_INTERVAL = 10000;

export function HomePage() {
  const navigate = useNavigate();
  const [activeNavigation, setActiveNavigation] = useState("home");
  const [activeBanner, setActiveBanner] = useState(0);
  const [isTeamButtonAnimating, setIsTeamButtonAnimating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    data: popularContests = [],
    isError: isPopularContestsError,
    isLoading: isPopularContestsLoading,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: fetchPopularContests,
  });
  const banners = [
    {
      eyebrow: "마감 임박",
      title: "이번 주 마감 공모전 \n놓치기 전에 팀 꾸리기",
      tone: "primary" as const,
    },
    {
      eyebrow: "내 포지션 추천",
      title: "내 포지션을 구하는\n팀이 5팀 있어요!",
      tone: "deep" as const,
    },
  ];
  const showNextBanner = () => {
    setActiveBanner((banner) => (banner + 1) % banners.length);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBanner((banner) => (banner + 1) % banners.length);
    }, BANNER_AUTOPLAY_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [banners.length]);

  const handleTeamNavigation = () => {
    if (isTeamButtonAnimating) return;

    setIsTeamButtonAnimating(true);
    window.setTimeout(() => navigate("/my-team"), 180);
  };

  return (
    <S.Page>
      <S.Content>
        <S.TopArea>
          <S.Header>
            <S.Brand aria-label="기웃">
              <span>기웃</span>
              <S.BrandMark alt="" aria-hidden="true" src={giutLogo} />
            </S.Brand>
            <S.HeaderActions>
              <S.HeaderButton
                aria-label="팀 페이지로 이동"
                $isTeamButtonAnimating={isTeamButtonAnimating}
                onClick={handleTeamNavigation}
                type="button"
              >
                <Icon name="users" size={16} weight="regular" />
                <S.HeaderBadge>3</S.HeaderBadge>
              </S.HeaderButton>
              <S.HeaderButton
                aria-label="검색"
                onClick={() => setIsSearchOpen(true)}
                type="button"
              >
                <Icon name="search" size={16} weight="regular" />
              </S.HeaderButton>
              <S.HeaderButton
                aria-label="알림"
                onClick={() => navigate("/notifications")}
                type="button"
              >
                <Icon name="bell" size={16} weight="regular" />
                <S.NotificationDot />
              </S.HeaderButton>
            </S.HeaderActions>
          </S.Header>

          <S.Greeting>이루매님, 안녕하세요</S.Greeting>
          <S.Title>
            지금, 함께할 팀을
            <br />
            찾아볼까요?
          </S.Title>
        </S.TopArea>

        <S.HeroViewport>
          <S.HeroTrack $active={activeBanner} $count={banners.length}>
            {banners.map((banner, index) => (
              <S.HeroBanner
                $slideCount={banners.length}
                $tone={banner.tone}
                key={banner.eyebrow}
              >
                <S.BannerCircle $position="top" />
                <S.BannerCircle $position="bottom" />
                <S.BannerContent>
                  <S.BannerEyebrow>{banner.eyebrow}</S.BannerEyebrow>
                  <S.BannerTitle>{banner.title}</S.BannerTitle>
                  <S.BannerButton
                    onClick={
                      index === 0
                        ? () => navigate("/closing-contests")
                        : () => navigate("/position-teams")
                    }
                    tone="secondary"
                    type="button"
                    width="fit-content"
                  >
                    지금 보기 <span aria-hidden="true">→</span>
                  </S.BannerButton>
                </S.BannerContent>
                <S.BannerNextButton
                  aria-label="다음 배너 보기"
                  onClick={showNextBanner}
                  type="button"
                >
                  <Icon name="caret-right" size={14} weight="bold" />
                </S.BannerNextButton>
              </S.HeroBanner>
            ))}
          </S.HeroTrack>
          <S.BannerPagination aria-label="배너 페이지">
            {banners.map((banner, index) => (
              <S.PaginationDot
                $active={index === activeBanner}
                aria-label={`${index + 1}번째 배너`}
                key={banner.eyebrow}
              />
            ))}
          </S.BannerPagination>
        </S.HeroViewport>

        <S.Shortcuts>
          {shortcuts.map((shortcut) => (
            <S.Shortcut
              key={shortcut.title}
              onClick={() => {
                if (shortcut.destination) navigate(shortcut.destination);
              }}
              type="button"
            >
              <S.ShortcutIcon>
                {shortcut.iconType === "image" ? (
                  <S.ShortcutIconImage alt="" src={shortcut.icon} />
                ) : (
                  shortcut.icon
                )}
              </S.ShortcutIcon>
              <S.ShortcutText>
                <S.ShortcutTitle>{shortcut.title}</S.ShortcutTitle>
                <S.ShortcutDescription>
                  {shortcut.description}
                </S.ShortcutDescription>
              </S.ShortcutText>
              <S.Caret aria-hidden="true">›</S.Caret>
            </S.Shortcut>
          ))}
        </S.Shortcuts>

        <S.SectionHeader>
          <S.SectionTitle>인기 공모전</S.SectionTitle>
          <S.ViewAll
            onClick={() => navigate("/contests/popular")}
            type="button"
          >
            전체 보기 ›
          </S.ViewAll>
        </S.SectionHeader>

        <S.ContestList>
          {isPopularContestsLoading && (
            <S.EmptyState>인기 공모전을 불러오는 중입니다.</S.EmptyState>
          )}
          {isPopularContestsError && (
            <S.EmptyState>인기 공모전을 불러오지 못했습니다.</S.EmptyState>
          )}
          {!isPopularContestsLoading && !isPopularContestsError && !popularContests.length && (
            <S.EmptyState>모집 중인 인기 공모전이 없습니다.</S.EmptyState>
          )}
          {popularContests.slice(0, 3).map((contest) => (
            <S.ContestCard
              key={contest.id}
              onClick={() => navigate(`/contests/${contest.id}`)}
              type="button"
            >
              <S.ContestTopline>
                <S.ContestCategoryGroup>
                  <S.Category $tone={contest.categoryTone}>
                    {contest.categoryName}
                  </S.Category>
                </S.ContestCategoryGroup>
                <S.DDay>{contest.dDay}</S.DDay>
              </S.ContestTopline>
              <S.ContestTitle>{contest.title}</S.ContestTitle>
              <S.ContestOrganization>
                {contest.hostOrganization}
              </S.ContestOrganization>
            </S.ContestCard>
          ))}
        </S.ContestList>
      </S.Content>

      <SearchOverlay
        onClose={() => setIsSearchOpen(false)}
        open={isSearchOpen}
      />

      <BottomNavigation
        activeKey={activeNavigation}
        items={navigationItems}
        onChange={(key) => {
          setActiveNavigation(key);
          if (key === "hub") navigate("/giut-hub");
          if (key === "chat") navigate("/chat");
          if (key === "mypage") navigate("/my-profile");
        }}
      />
    </S.Page>
  );
}
