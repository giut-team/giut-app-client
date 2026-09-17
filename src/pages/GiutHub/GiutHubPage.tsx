import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileStudent from "../../assets/giut-hub/profile-student.png";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { PillButton } from "../../components/PillButton";
import { S } from "./GiutHubPage.styles";

type Category = "전체" | "기획" | "디자인" | "개발" | "마케팅" | "창업";
type FilterName = "포지션" | "활동 지역" | "현재 상태";

const categories: Category[] = ["전체", "기획", "디자인", "개발", "마케팅", "창업"];

const profiles = [
  {
    id: "minjae",
    category: "개발" as const,
    name: "김민재",
    position: "개발",
    department: "컴퓨터과학부 · 3학년",
    introduction: "AI로 더 편리한 캠퍼스 서비스를 만들고 싶어요.",
    tags: ["AI/ML", "프론트엔드"],
    states: ["팀 찾는 중", "포폴 쌓는 중"],
  },
  {
    id: "seoyeon",
    category: "기획" as const,
    name: "이서연",
    position: "기획",
    department: "경영학부 · 3학년",
    introduction: "사용자의 문제를 쉽게 푸는 기획을 좋아해요.",
    tags: ["서비스 기획", "시장 분석"],
    states: ["팀 찾는 중", "오프라인 선호"],
  },
  {
    id: "jiwoo",
    category: "디자인" as const,
    name: "박지우",
    position: "디자인",
    department: "산업디자인학과 · 2학년",
    introduction: "아이디어를 이해하기 쉬운 경험으로 만드는 데 관심 있어요.",
    tags: ["UX/UI", "Figma"],
    states: ["둘러보는 중", "온라인 선호"],
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
          <S.SectionTitle>프로필 완성도가 가장 높은 팀원</S.SectionTitle>
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
              <S.ProfileCard key={profile.id}>
                <S.StatusList>
                  {profile.states.map((state) => <S.StatusBadge key={state}>{state}</S.StatusBadge>)}
                </S.StatusList>
                <S.ProfileMain>
                  <S.ProfileImage alt="" src={profileStudent} />
                  <S.ProfileDetails>
                    <S.NameRow>
                      <S.Name>{profile.name}</S.Name>
                      <S.Verified><Icon name="check" size={11} weight="bold" /></S.Verified>
                    </S.NameRow>
                    <S.InfoRow><span>포지션</span><strong>{profile.position}</strong></S.InfoRow>
                    <S.InfoRow><span>학과</span><strong>{profile.department}</strong></S.InfoRow>
                    <S.Introduction>{profile.introduction}</S.Introduction>
                  </S.ProfileDetails>
                  <S.DetailButton aria-label={`${profile.name} 프로필 보기`} type="button">
                    <Icon name="caret-right" size={20} weight="bold" />
                  </S.DetailButton>
                </S.ProfileMain>
                <S.TagList aria-label={`${profile.name} 관심 분야`}>
                  {profile.tags.map((tag) => <S.Tag key={tag}>{tag}</S.Tag>)}
                </S.TagList>
              </S.ProfileCard>
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
