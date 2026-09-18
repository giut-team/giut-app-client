import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import designerFemale from "../../assets/default_image/designer-female.png";
import designerMale from "../../assets/default_image/designer-male.png";
import developerFemale from "../../assets/default_image/developer-female.png";
import developerMale from "../../assets/default_image/developer-male.png";
import marketingFemale from "../../assets/default_image/marketing-female.png";
import marketingMale from "../../assets/default_image/marketing-male.png";
import plannerFemale from "../../assets/default_image/planner-female.png";
import plannerMale from "../../assets/default_image/planner-male.png";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { PillButton } from "../../components/PillButton";
import { S } from "./GiutHubPage.styles";

type Category = "전체" | "기획" | "디자인" | "개발" | "마케팅" | "창업";
type FilterName = "포지션" | "활동 지역" | "현재 상태";

type Profile = {
  id: string;
  category: Exclude<Category, "전체" | "창업">;
  name: string;
  available: boolean;
  summary: string;
  introduction: string;
  tags: string[];
  projectCount: string;
  lastActiveAt: string;
  avatarFallback: string;
  avatarTone: "blue" | "purple" | "orange" | "green";
  avatarSrc?: string;
};

const categories: Category[] = ["전체", "기획", "디자인", "개발", "마케팅", "창업"];

const mockRecentAccessAt = (hoursAgo: number) =>
  new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

const getResponseStatus = (lastActiveAt: string) => {
  const elapsedHours = Math.max(
    0,
    Math.floor((Date.now() - new Date(lastActiveAt).getTime()) / (60 * 60 * 1000)),
  );

  return {
    elapsedHours,
    isFast: elapsedHours <= 12,
    label: elapsedHours <= 12 ? "응답 빠름" : "응답 느림",
  };
};

const profiles: Profile[] = [
  {
    id: "minjae",
    category: "개발" as const,
    name: "김민재",
    available: true,
    summary: "개발 · 컴퓨터과학부 3학년",
    introduction: "AI로 더 편리한 캠퍼스 서비스를 만들고 싶어요.\n포트폴리오 프로젝트에 관심 있어요.",
    tags: ["AI/ML", "프론트엔드"],
    projectCount: "프로젝트 2회",
    // 최근 접속 12시간 전: 목업 기준 '응답 빠름'으로 표시됩니다.
    lastActiveAt: mockRecentAccessAt(12),
    avatarFallback: "김",
    avatarTone: "blue",
    avatarSrc: developerMale,
  },
  {
    id: "seoyeon",
    category: "기획" as const,
    name: "이서연",
    available: true,
    summary: "기획 · 경영학부 3학년",
    introduction: "사용자의 문제를 쉽게 푸는 기획을 좋아해요.",
    tags: ["서비스 기획", "시장 분석"],
    projectCount: "프로젝트 4회",
    lastActiveAt: mockRecentAccessAt(4),
    avatarFallback: "이",
    avatarTone: "purple",
    avatarSrc: plannerFemale,
  },
  {
    id: "jiwoo",
    category: "디자인" as const,
    name: "박지우",
    available: false,
    summary: "디자인 · 산업디자인학과 2학년",
    introduction: "아이디어를 이해하기 쉬운 경험으로 만드는 데 관심 있어요.\n다음 공모전을 천천히 둘러보고 있어요.",
    tags: ["UX/UI", "Figma"],
    projectCount: "프로젝트 3회",
    lastActiveAt: mockRecentAccessAt(18),
    avatarFallback: "박",
    avatarTone: "orange",
    avatarSrc: designerFemale,
  },
  {
    id: "junseo",
    category: "개발",
    name: "최준서",
    available: true,
    summary: "개발 · 소프트웨어학부 2학년",
    introduction: "완성도 높은 서비스를 함께 만들 동료를 찾고 있어요.",
    tags: ["백엔드", "Spring"],
    projectCount: "프로젝트 3회",
    lastActiveAt: mockRecentAccessAt(9),
    avatarFallback: "최",
    avatarTone: "blue",
    avatarSrc: developerFemale,
  },
  {
    id: "dohyun",
    category: "기획",
    name: "정도현",
    available: true,
    summary: "기획 · 행정학과 4학년",
    introduction: "팀의 방향을 함께 찾고 끝까지 실행하는 걸 좋아해요.",
    tags: ["서비스 기획", "리서치"],
    projectCount: "프로젝트 5회",
    lastActiveAt: mockRecentAccessAt(13),
    avatarFallback: "정",
    avatarTone: "purple",
    avatarSrc: plannerMale,
  },
  {
    id: "hayoon",
    category: "디자인",
    name: "김하윤",
    available: true,
    summary: "디자인 · 시각디자인학과 3학년",
    introduction: "브랜드의 이야기를 설득력 있는 화면으로 풀어내고 싶어요.",
    tags: ["브랜딩", "UI 디자인"],
    projectCount: "프로젝트 2회",
    lastActiveAt: mockRecentAccessAt(2),
    avatarFallback: "김",
    avatarTone: "orange",
    avatarSrc: designerMale,
  },
  {
    id: "soomin",
    category: "마케팅",
    name: "한수민",
    available: true,
    summary: "마케팅 · 경영학부 2학년",
    introduction: "사람들의 마음을 움직이는 캠페인을 만들어 보고 싶어요.",
    tags: ["콘텐츠", "SNS 마케팅"],
    projectCount: "프로젝트 3회",
    lastActiveAt: mockRecentAccessAt(12),
    avatarFallback: "한",
    avatarTone: "green",
    avatarSrc: marketingFemale,
  },
  {
    id: "minho",
    category: "마케팅",
    name: "이민호",
    available: false,
    summary: "마케팅 · 경제학부 3학년",
    introduction: "데이터와 아이디어를 연결하는 마케팅을 좋아합니다.",
    tags: ["데이터 분석", "광고 기획"],
    projectCount: "프로젝트 4회",
    lastActiveAt: mockRecentAccessAt(24),
    avatarFallback: "이",
    avatarTone: "green",
    avatarSrc: marketingMale,
  },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function GiutHubPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const visibleProfiles = useMemo(
    () =>
      activeCategory === "전체"
        ? profiles
        : profiles.filter((profile) => profile.category === activeCategory),
    [activeCategory],
  );

  const resetFilters = () => {
    setActiveCategory("전체");
    setActiveFilter(null);
  };

  const recommendationTitle =
    activeCategory === "전체"
      ? "이루매님에게 잘 맞는 팀원이에요"
      : `${activeCategory} 분야에서 주목받는 팀원이에요`;

  return (
    <S.Page>
      <S.Content>
        <S.Hero>
          <S.HubLabel>기웃허브</S.HubLabel>
          <S.Title>
            공모전부터 창업까지,
            <br />
            함께할 팀원을 찾아보세요
          </S.Title>
          <S.ResetButton onClick={resetFilters} type="button">
            <Icon name="arrows-down-up" size={15} weight="bold" />
            필터 초기화
          </S.ResetButton>
          <S.FilterPanel aria-label="팀원 탐색 필터">
            {(["포지션", "활동 지역", "현재 상태"] as FilterName[]).map((filter) => (
              <S.FilterButton
                $active={activeFilter === filter}
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setActiveFilter((current) => current === filter ? null : filter)}
                tone="secondary"
                type="button"
                width="100%"
              >
                {filter}
              </S.FilterButton>
            ))}
          </S.FilterPanel>
        </S.Hero>

        <S.Results>
          <S.SectionTitle>{recommendationTitle}</S.SectionTitle>
          <S.CategoryList aria-label="팀원 직무 필터">
            {categories.map((category) => (
              <PillButton
                active={activeCategory === category}
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </PillButton>
            ))}
          </S.CategoryList>

          <S.ProfileList>
            {visibleProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
            {visibleProfiles.length === 0 && <S.EmptyState>선택한 분야의 팀원을 준비하고 있어요.</S.EmptyState>}
          </S.ProfileList>
        </S.Results>
      </S.Content>

      <BottomNavigation
        activeKey="hub"
        items={navigationItems}
        onChange={(key) => {
          if (key === "home") navigate("/home");
          if (key === "mypage") navigate("/my-team");
        }}
      />
    </S.Page>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const responseStatus = getResponseStatus(profile.lastActiveAt);

  return (
    <S.ProfileCard>
      <S.ProfileTop>
        <S.Avatar $tone={profile.avatarTone}>
          {profile.avatarSrc ? <img alt={`${profile.name} 프로필`} src={profile.avatarSrc} /> : profile.avatarFallback}
        </S.Avatar>
        <S.ProfileIdentity>
          <S.ProfileHeader>
            <S.Name>{profile.name}</S.Name>
            <S.Availability $available={profile.available}>
              <S.AvailabilityDot $available={profile.available} />
              {profile.available ? "합류 가능" : "현재 팀을 찾고 있지 않아요"}
            </S.Availability>
          </S.ProfileHeader>
          <S.ProfileSummary>{profile.summary}</S.ProfileSummary>
        </S.ProfileIdentity>
        <S.DetailButton aria-label={`${profile.name} 프로필 보기`} type="button">
          <Icon name="caret-right" size={20} weight="bold" />
        </S.DetailButton>
      </S.ProfileTop>
      <S.ProfileMeta aria-label={`${profile.name} 활동 정보`}>
        <span><Icon name="folder" size={14} weight="regular" />{profile.projectCount}</span>
        <S.ResponseMeta
          $fast={responseStatus.isFast}
          aria-label={`최근 접속 ${responseStatus.elapsedHours}시간 전, ${responseStatus.label}`}
        >
          <Icon name="lightning" size={14} weight="fill" />{responseStatus.label}
        </S.ResponseMeta>
      </S.ProfileMeta>
      <S.Introduction>{profile.introduction}</S.Introduction>
      <S.CardFooter>
        <S.TagList aria-label={`${profile.name} 관심 분야`}>
          <S.Tag>{profile.tags.join(" · ")}</S.Tag>
        </S.TagList>
        <S.ProfileLink type="button">프로필 보기 <Icon name="arrow-right" size={16} weight="bold" /></S.ProfileLink>
      </S.CardFooter>
    </S.ProfileCard>
  );
}
