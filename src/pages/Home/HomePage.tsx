import { useState } from "react";
import giutLogo from "../../assets/giut-logo.svg";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { S } from "./HomePage.styles";

const popularContests = [
  {
    category: "IT",
    categoryTone: "blue" as const,
    dDay: "D-15",
    title: "2024 서울시 데이터 활용 공모전",
    organization: "서울특별시",
  },
  {
    category: "기획",
    categoryTone: "orange" as const,
    dDay: "D-3",
    title: "대학생 환경 아이디어 챌린지",
    organization: "환경부",
  },
  {
    category: "디자인",
    categoryTone: "purple" as const,
    dDay: "D-10",
    title: "디자인으로 만드는 ESG 캠페인",
    organization: "한국디자인진흥원",
  },
];

const shortcuts = [
  { icon: "🏅", title: "공모전 찾기", description: "분야 · 마감으로 한눈에" },
  { icon: "👥", title: "팀원으로 지원하기", description: "원하는 팀을 빠르게" },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function HomePage() {
  const [activeNavigation, setActiveNavigation] = useState("home");
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    {
      eyebrow: "마감 임박",
      title: "이번 주 마감 공모전 3건\n놓치기 전에 필터링",
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

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.Brand aria-label="기웃">
            <span>기웃</span>
            <S.BrandMark alt="" aria-hidden="true" src={giutLogo} />
          </S.Brand>
          <S.HeaderActions>
            <S.HeaderButton aria-label="친구 찾기" type="button">
              <Icon name="users" size={16} weight="regular" />
              <S.HeaderBadge>3</S.HeaderBadge>
            </S.HeaderButton>
            <S.HeaderButton aria-label="검색" type="button">
              <Icon name="search" size={16} weight="regular" />
            </S.HeaderButton>
            <S.HeaderButton aria-label="알림" type="button">
              <Icon name="bell" size={16} weight="regular" />
              <S.NotificationDot />
            </S.HeaderButton>
          </S.HeaderActions>
        </S.Header>

        <S.Greeting>이루매님, 안녕하세요</S.Greeting>
        <S.Title>
          이번 방학엔
          <br />
          어떤 프로젝트를 할까요?
        </S.Title>

        <S.HeroViewport>
          <S.HeroTrack $active={activeBanner} $count={banners.length}>
            {banners.map((banner) => (
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
            <S.Shortcut key={shortcut.title} type="button">
              <S.ShortcutIcon>{shortcut.icon}</S.ShortcutIcon>
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
          <S.ViewAll type="button">전체보기 ›</S.ViewAll>
        </S.SectionHeader>

        <S.ContestList>
          {popularContests.map((contest) => (
            <S.ContestCard key={contest.title}>
              <S.ContestTopline>
                <S.Category $tone={contest.categoryTone}>
                  {contest.category}
                </S.Category>
                <S.DDay>{contest.dDay}</S.DDay>
              </S.ContestTopline>
              <S.ContestTitle>{contest.title}</S.ContestTitle>
              <S.ContestOrganization>
                {contest.organization}
              </S.ContestOrganization>
            </S.ContestCard>
          ))}
        </S.ContestList>
      </S.Content>

      <BottomNavigation
        activeKey={activeNavigation}
        items={navigationItems}
        onChange={setActiveNavigation}
      />
    </S.Page>
  );
}
