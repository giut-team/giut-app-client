import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { PageHeader } from "../../components/PageHeader";
import { PillButton } from "../../components/PillButton";
import { S } from "./ContestsPage.styles";

type ContestCategory = "전체" | "IT/과학" | "기획" | "디자인" | "개발" | "영상" | "창업";
type CategoryTone = "blue" | "orange" | "purple" | "green" | "yellow" | "pink";
type SortOption = "views" | "scraps" | "latest" | "deadline";

type Contest = {
  id: string;
  category: Exclude<ContestCategory, "전체">;
  categoryTone: CategoryTone;
  comments: number;
  dDay: string;
  organization: string;
  scraps: number;
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

const isSortOption = (value: string | null): value is SortOption =>
  sortOptions.some((option) => option.value === value);

const contests: Contest[] = [
  {
    id: "seoul-data",
    category: "IT/과학",
    categoryTone: "blue",
    comments: 128,
    dDay: "D-15",
    organization: "서울특별시 · 교내 공지 RSS",
    scraps: 1240,
    title: "2026 서울시 데이터 활용 공모전",
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
    scraps: 842,
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
    scraps: 713,
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
    scraps: 456,
    title: "제 12회 핀테크 해커톤",
    verified: false,
    views: "12,277",
  },
  {
    id: "creator-contest",
    category: "영상",
    categoryTone: "pink",
    comments: 38,
    dDay: "D-28",
    organization: "한국콘텐츠진흥원 · 콘텐츠코리아",
    scraps: 321,
    title: "청년 콘텐츠 크리에이터 공모전",
    verified: true,
    views: "9,834",
  },
];

function ContestCard({
  contest,
  onClick,
}: {
  contest: Contest;
  onClick: () => void;
}) {
  return (
    <S.ContestCard onClick={onClick} type="button">
      <S.CardTopline>
        <S.TagGroup>
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
        <S.TeamCount>모집 중인 팀 {contest.id === "environment-idea" ? 5 : contest.id === "fintech-hackathon" ? 4 : contest.id === "esg-campaign" ? 2 : 3}</S.TeamCount>
        <S.Stats aria-label={`조회 ${contest.views}, 댓글 ${contest.comments}`}>
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

export function ContestsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const sortParam = searchParams.get("sort");
  const sortOption = isSortOption(sortParam) ? sortParam : "views";

  const visibleContests = useMemo(() => {
    const filtered =
      activeCategory === "전체"
        ? contests
        : contests.filter((contest) => contest.category === activeCategory);

    return [...filtered].sort((left, right) => {
      if (sortOption === "views") {
        return Number(right.views.replace(",", "")) - Number(left.views.replace(",", ""));
      }

      if (sortOption === "scraps") return right.scraps - left.scraps;
      if (sortOption === "latest") return contests.indexOf(right) - contests.indexOf(left);

      return Number(left.dDay.slice(2)) - Number(right.dDay.slice(2));
    });
  }, [activeCategory, sortOption]);

  const sortLabel = sortOptions.find((option) => option.value === sortOption)?.label;

  return (
    <S.Page>
      <PageHeader onBack={() => navigate("/")} title="공모전" />
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

        <S.ContestList>
          {visibleContests.map((contest) => (
            <ContestCard
              contest={contest}
              key={contest.id}
              onClick={() => navigate(`/contests/${contest.id}`)}
            />
          ))}
          {visibleContests.length === 0 && (
            <S.EmptyState>선택한 분야의 공모전이 없어요.</S.EmptyState>
          )}
        </S.ContestList>
      </S.Content>

      <BottomSheet
        minHeight="292px"
        onClose={() => setIsSortSheetOpen(false)}
        open={isSortSheetOpen}
        showHeaderDivider={false}
        title="정렬"
        variant="compact"
      >
        <S.SortOptions aria-label="공모전 정렬 기준">
          {sortOptions.map((option) => {
            const selected = option.value === sortOption;

            return (
              <S.SortOption
                $selected={selected}
                aria-pressed={selected}
                key={option.value}
                onClick={() => {
                  setSearchParams({ sort: option.value }, { replace: true });
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
