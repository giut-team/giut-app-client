import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPopularContests } from "../../api/contests";
import giutLogo from "../../assets/giut-logo.svg";
import trophyIcon from "../../assets/trophy.svg";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { SearchOverlay } from "../../components/SearchOverlay/SearchOverlay";
import { Toast } from "../../components/Toast/Toast";
import { useAuth } from "../../contexts/AuthContext";
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
  const location = useLocation();
  const { isAuthenticated, profile, universityVerified } = useAuth();
  const isUniversityUnverified = isAuthenticated && !universityVerified;
  const [activeNavigation, setActiveNavigation] = useState("home");
  const [activeBanner, setActiveBanner] = useState(0);
  const [isTeamButtonAnimating, setIsTeamButtonAnimating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    (location.state as { toastMessage?: string } | null)?.toastMessage ?? "",
  );
  const {
    data: popularContests = [],
    isError: isPopularContestsError,
    isPending: isPopularContestsLoading,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: fetchPopularContests,
    staleTime: 60 * 1000,
  });
  const homePopularContests = popularContests.slice(0, 3);
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
    if (isUniversityUnverified) return;

    const intervalId = window.setInterval(() => {
      setActiveBanner((banner) => (banner + 1) % banners.length);
    }, BANNER_AUTOPLAY_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [banners.length, isUniversityUnverified]);

  useEffect(() => {
    if (!toastMessage) return;

    if ((location.state as { toastMessage?: string } | null)?.toastMessage) {
      navigate(location.pathname, { replace: true, state: null });
    }

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.state, navigate, toastMessage]);

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
                aria-label={
                  isUniversityUnverified
                    ? "팀 페이지, 학교 인증 필요"
                    : "팀 페이지로 이동"
                }
                $isTeamButtonAnimating={isTeamButtonAnimating}
                $soft={isUniversityUnverified}
                disabled={isUniversityUnverified}
                onClick={handleTeamNavigation}
                type="button"
              >
                <Icon name="users" size={16} weight="regular" />
                {isUniversityUnverified ? (
                  <S.HeaderLock aria-hidden="true">
                    <Icon name="lock" size={8} weight="fill" />
                  </S.HeaderLock>
                ) : (
                  <S.HeaderBadge>3</S.HeaderBadge>
                )}
              </S.HeaderButton>
              <S.HeaderButton
                aria-label="검색"
                $soft={isUniversityUnverified}
                onClick={() => setIsSearchOpen(true)}
                type="button"
              >
                <Icon name="search" size={16} weight="regular" />
              </S.HeaderButton>
              <S.HeaderButton
                aria-label="알림"
                $soft={isUniversityUnverified}
                onClick={() => navigate("/notifications")}
                type="button"
              >
                <Icon name="bell" size={16} weight="regular" />
                {!isUniversityUnverified && <S.NotificationDot />}
              </S.HeaderButton>
            </S.HeaderActions>
          </S.Header>

          {!isUniversityUnverified && (
            <S.Greeting>
              {profile?.nickname
                ? `${profile.nickname}님, 안녕하세요`
                : "안녕하세요"}
            </S.Greeting>
          )}
          <S.Title>
            {isUniversityUnverified ? (
              <>
                학교 인증만 하면
                <br />
                팀에 지원할 수 있어요
              </>
            ) : (
              <>
                지금, 함께할 팀을
                <br />
                찾아볼까요?
              </>
            )}
          </S.Title>
        </S.TopArea>

        {isUniversityUnverified ? (
          <S.VerificationCard>
            <S.VerificationMeta>
              <S.VerificationBadge>인증 필요</S.VerificationBadge>
              <span>1분이면 끝나요</span>
            </S.VerificationMeta>
            <S.VerificationTitle>
              아직 학교 인증을 하지 않았어요
            </S.VerificationTitle>
            <S.VerificationDescription>
              같은 학교 학생끼리 안전하게 팀을 만들기 위해, 팀 지원·팀 만들기는
              학교 인증 후 이용할 수 있어요.
            </S.VerificationDescription>
            <S.VerificationButton
              onClick={() => setIsVerificationModalOpen(true)}
              type="button"
              width="100%"
            >
              학교 인증하기
            </S.VerificationButton>
          </S.VerificationCard>
        ) : (
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
        )}

        <S.Shortcuts>
          {shortcuts.map((shortcut) => {
            const isLocked =
              isUniversityUnverified &&
              shortcut.destination === "/matched-teams";

            return (
                <S.Shortcut
                  $locked={isLocked}
                  aria-label={
                    isLocked
                      ? `${shortcut.title}, 학교 인증 필요`
                      : shortcut.title
                  }
                  disabled={isLocked}
                  key={shortcut.title}
                  onClick={() => navigate(shortcut.destination)}
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
                      {isLocked
                        ? "학교 인증 후 이용할 수 있어요"
                        : shortcut.description}
                    </S.ShortcutDescription>
                  </S.ShortcutText>
                  {isLocked ? (
                    <S.ShortcutLock>
                      <Icon name="lock" size={13} weight="regular" />
                    </S.ShortcutLock>
                  ) : (
                    <S.Caret aria-hidden="true">›</S.Caret>
                  )}
                </S.Shortcut>
            );
          })}
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
          {isPopularContestsLoading &&
            Array.from({ length: 3 }, (_, index) => (
              <S.ContestSkeleton aria-hidden="true" key={index} />
            ))}
          {isPopularContestsError && (
            <S.ContestState>
              인기 공모전을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
            </S.ContestState>
          )}
          {!isPopularContestsLoading &&
            !isPopularContestsError &&
            homePopularContests.map((contest) => (
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
                    <S.VerifiedBadge aria-label="인증된 공모전">
                      <Icon name="check" size={8} weight="bold" />
                      인증
                    </S.VerifiedBadge>
                  </S.ContestCategoryGroup>
                  <S.DDay>{contest.dDay}</S.DDay>
                </S.ContestTopline>
                <S.ContestTitle>{contest.title}</S.ContestTitle>
                <S.ContestOrganization>
                  {contest.hostOrganization}
                </S.ContestOrganization>
              </S.ContestCard>
            ))}
          {!isPopularContestsLoading &&
            !isPopularContestsError &&
            homePopularContests.length === 0 && (
              <S.ContestState>현재 인기 공모전이 없어요.</S.ContestState>
            )}
        </S.ContestList>
      </S.Content>

      <SearchOverlay
        onClose={() => setIsSearchOpen(false)}
        open={isSearchOpen}
      />

      <Modal
        description="같은 학교 학생끼리 안전하게 팀을 만들기 위해, 기웃허브와 팀 지원은 학교 인증을 마친 뒤 이용할 수 있어요. 1분이면 끝나요."
        emphasizeDescription
        icon={<Icon name="lock" size={22} weight="regular" />}
        onClose={() => setIsVerificationModalOpen(false)}
        open={isVerificationModalOpen}
        primaryAction={{
          label: "학교 인증하기",
          onClick: () => navigate("/student-verification"),
        }}
        secondaryAction={{
          label: "다음에 하기",
          onClick: () => setIsVerificationModalOpen(false),
        }}
        title="학교 인증 후 볼 수 있어요"
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />

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
