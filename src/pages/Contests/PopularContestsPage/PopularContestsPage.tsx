import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { S } from "./PopularContestsPage.styles";

type ContestCategory = "전체" | "IT/과학" | "기획" | "디자인" | "개발" | "영상" | "창업";
type CategoryTone = "blue" | "orange" | "purple" | "green" | "pink" | "yellow";
type SortOption = "views" | "scraps" | "latest" | "deadline";

type Contest = {
  category: Exclude<ContestCategory, "전체">;
  categoryTone: CategoryTone;
  comments: number;
  dDay: string;
  id: string;
  organization: string;
  teamCount: number;
  title: string;
  verified: boolean;
  views: string;
};

const categories: ContestCategory[] = [
  "전체",
  "IT/과학",
  "기획",
  "디자인",
  "개발",
  "영상",
  "창업",
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "조회수순", value: "views" },
  { label: "스크랩순", value: "scraps" },
  { label: "최신순", value: "latest" },
  { label: "마감임박순", value: "deadline" },
];

const popularContests: Contest[] = [
  {
    id: "seoul-data",
    category: "IT/과학",
    categoryTone: "blue",
    comments: 128,
    dDay: "D-15",
    organization: "서울특별시 · 교내 공지 RSS",
    teamCount: 3,
    title: "2024 서울시 데이터 활용 공모전",
    verified: true,
    views: "41,852",
  },
  {
    id: "environment-idea",
    category: "기획",
    categoryTone: "orange",
    comments: 96,
    dDay: "D-3",
    organization: "환경부 · K-Startup",
    teamCount: 5,
    title: "대학생 환경 아이디어 챌린지",
    verified: true,
    views: "28,104",
  },
  {
    id: "esg-campaign",
    category: "디자인",
    categoryTone: "purple",
    comments: 74,
    dDay: "D-10",
    organization: "한국디자인진흥원 · 콘텐츠코리아",
    teamCount: 2,
    title: "디자인으로 만드는 ESG 캠페인",
    verified: true,
    views: "19,430",
  },
  {
    id: "fintech-hackathon",
    category: "개발",
    categoryTone: "green",
    comments: 61,
    dDay: "D-21",
    organization: "금융위원회 · 학생 제보",
    teamCount: 4,
    title: "제 12회 핀테크 해커톤",
    verified: false,
    views: "12,277",
  },
  {
    id: "creator-contest",
    category: "영상",
    categoryTone: "pink",
    comments: 44,
    dDay: "D-28",
    organization: "문화체육관광부 · 콘텐츠코리아",
    teamCount: 1,
    title: "청년 콘텐츠 크리에이터 공모전",
    verified: true,
    views: "9,842",
  },
];

const allContests: Contest[] = [
  {
    id: "public-api",
    category: "IT/과학",
    categoryTone: "blue",
    comments: 38,
    dDay: "D-31",
    organization: "행정안전부 · 교내 공지 RSS",
    teamCount: 7,
    title: "공공 API 활용 서비스 개발전",
    verified: true,
    views: "8,510",
  },
  {
    id: "campus-startup",
    category: "창업",
    categoryTone: "yellow",
    comments: 29,
    dDay: "D-19",
    organization: "중소벤처기업부 · K-Startup",
    teamCount: 3,
    title: "캠퍼스 창업 아이템 경진대회",
    verified: true,
    views: "7,206",
  },
  {
    id: "living-policy",
    category: "기획",
    categoryTone: "orange",
    comments: 21,
    dDay: "D-24",
    organization: "국무조정실 · 학생 제보",
    teamCount: 2,
    title: "생활 속 규제 개선 제안 공모",
    verified: false,
    views: "5,981",
  },
];

function ContestCard({ contest, rank }: { contest: Contest; rank?: number }) {
  return (
    <S.ContestCard>
      <S.CardTopline>
        <S.TagGroup>
          {rank && <S.RankBadge>{rank}</S.RankBadge>}
          <S.CategoryBadge $tone={contest.categoryTone}>
            {contest.category}
          </S.CategoryBadge>
          <S.VerifiedBadge $verified={contest.verified}>
            {contest.verified ? (
              <>
                <Icon name="check" size={8} weight="bold" />
                인증
              </>
            ) : (
              "미검증"
            )}
          </S.VerifiedBadge>
        </S.TagGroup>
        <S.DDay>{contest.dDay}</S.DDay>
      </S.CardTopline>
      <S.ContestTitle>{contest.title}</S.ContestTitle>
      <S.Organization>{contest.organization}</S.Organization>
      <S.CardFooter>
        <S.TeamCount>모집 중인 팀 {contest.teamCount}</S.TeamCount>
        <S.Stats aria-label={`조회 ${contest.views}, 북마크 ${contest.comments}`}>
          <S.Stat>
            <Icon name="eye" size={9} weight="regular" />
            {contest.views}
          </S.Stat>
          <S.Stat>
            <Icon name="bookmark" size={9} weight="regular" />
            {contest.comments}
          </S.Stat>
        </S.Stats>
      </S.CardFooter>
      <S.CardCaret aria-hidden="true">
        <Icon name="caret-right" size={14} weight="bold" />
      </S.CardCaret>
    </S.ContestCard>
  );
}

export function PopularContestsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("views");

  const [visiblePopularContests, visibleAllContests] = useMemo(() => {
    const matchesCategory = (contest: Contest) =>
      activeCategory === "전체" || contest.category === activeCategory;
    const sortContests = (contests: Contest[]) =>
      [...contests].sort((left, right) => {
        if (sortOption === "views") {
          return (
            Number(right.views.replace(",", "")) -
            Number(left.views.replace(",", ""))
          );
        }

        if (sortOption === "scraps") return right.comments - left.comments;
        if (sortOption === "latest") return 0;

        return Number(left.dDay.slice(2)) - Number(right.dDay.slice(2));
      });

    return [
      sortContests(popularContests.filter(matchesCategory)),
      sortContests(allContests.filter(matchesCategory)),
    ];
  }, [activeCategory, sortOption]);
  const sortLabel = sortOptions.find((option) => option.value === sortOption)?.label;

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="인기 공모전" />
      <S.FilterArea>
        <S.FilterList aria-label="공모전 카테고리">
          {categories.map((category) => (
            <PillButton
              active={activeCategory === category}
              aria-pressed={activeCategory === category}
              key={category}
              onClick={() => setActiveCategory(category)}
              tone="dark"
            >
              {category}
            </PillButton>
          ))}
        </S.FilterList>
      </S.FilterArea>

      <S.Content>
        <S.ListControls>
          <S.RegisterButton type="button">
            <Icon name="plus" size={10} weight="bold" />
            공모전 등록
          </S.RegisterButton>
          <S.SortButton
            aria-expanded={isSortSheetOpen}
            aria-haspopup="dialog"
            onClick={() => setIsSortSheetOpen(true)}
            type="button"
          >
            {sortLabel}
            <Icon name="arrows-down-up" size={10} weight="regular" />
          </S.SortButton>
        </S.ListControls>

        <S.SectionHeading>
          <S.SectionTitle>인기 TOP {visiblePopularContests.length}</S.SectionTitle>
          <S.SectionMeta>이번 주 추천 기준</S.SectionMeta>
        </S.SectionHeading>
        <S.ContestList>
          {visiblePopularContests.map((contest, index) => (
            <ContestCard contest={contest} key={contest.id} rank={index + 1} />
          ))}
          {visiblePopularContests.length === 0 && (
            <S.EmptyState>선택한 분야의 인기 공모전이 없어요.</S.EmptyState>
          )}
        </S.ContestList>

        {visibleAllContests.length > 0 && (
          <>
            <S.SectionHeading $spaced>
              <S.SectionTitle>전체 공모전 128건</S.SectionTitle>
              <S.SectionMeta>조회수순</S.SectionMeta>
            </S.SectionHeading>
            <S.ContestList>
              {visibleAllContests.map((contest) => (
                <ContestCard contest={contest} key={contest.id} />
              ))}
            </S.ContestList>
          </>
        )}
      </S.Content>

      <BottomSheet
        minHeight="292px"
        onClose={() => setIsSortSheetOpen(false)}
        open={isSortSheetOpen}
        showHeaderDivider={false}
        title="정렬"
        variant="compact"
      >
        <S.SortOptions aria-label="인기 공모전 정렬 기준">
          {sortOptions.map((option) => {
            const selected = option.value === sortOption;

            return (
              <S.SortOption
                $selected={selected}
                aria-pressed={selected}
                key={option.value}
                onClick={() => {
                  if (option.value !== "views") {
                    navigate(`/contests?sort=${option.value}`);
                    return;
                  }

                  setSortOption(option.value);
                  setIsSortSheetOpen(false);
                }}
                type="button"
              >
                {option.label}
                {selected && <Icon name="check" size={14} weight="bold" />}
              </S.SortOption>
            );
          })}
        </S.SortOptions>
        <S.SortNotice>
          ‘인증’ 배지가 있는 공모전은 원문 링크가 확인된 항목으로, 정렬과 검색에 활용돼요.
        </S.SortNotice>
      </BottomSheet>
    </S.Page>
  );
}
