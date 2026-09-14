import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { S } from "./ClosingContestsPage.styles";

type ContestCategory =
  | "전체"
  | "IT/과학"
  | "기획"
  | "디자인"
  | "개발"
  | "영상"
  | "창업";
type CategoryTone = "blue" | "orange" | "purple" | "green" | "yellow";
type SortOption = "views" | "scraps" | "latest" | "deadline";

type Contest = {
  id: string;
  category: Exclude<ContestCategory, "전체">;
  categoryTone: CategoryTone;
  dDay: string;
  title: string;
  organization: string;
  teamCount: number;
  views: string;
  comments: number;
  scraps: number;
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

const contests: Contest[] = [
  {
    id: "environment-idea",
    category: "기획",
    categoryTone: "orange",
    dDay: "D-3",
    title: "대학생 환경 아이디어 챌린지",
    organization: "환경부 · K-Startup",
    teamCount: 5,
    views: "28,104",
    comments: 96,
    scraps: 842,
  },
  {
    id: "regional-campaign",
    category: "개발",
    categoryTone: "green",
    dDay: "D-5",
    title: "지역 상권 활성화 캠페인 공모",
    organization: "중소벤처기업부 · 콘텐츠코리아",
    teamCount: 6,
    views: "17,620",
    comments: 58,
    scraps: 618,
  },
  {
    id: "traffic-visualization",
    category: "IT/과학",
    categoryTone: "blue",
    dDay: "D-7",
    title: "교통 데이터 시각화 해커톤",
    organization: "한국교통연구원 · 교내 공지 RSS",
    teamCount: 9,
    views: "15,308",
    comments: 52,
    scraps: 529,
  },
  {
    id: "esg-campaign",
    category: "디자인",
    categoryTone: "purple",
    dDay: "D-10",
    title: "디자인으로 만드는 ESG 캠페인",
    organization: "한국디자인진흥원 · 콘텐츠코리아",
    teamCount: 2,
    views: "19,430",
    comments: 74,
    scraps: 713,
  },
  {
    id: "seoul-data",
    category: "IT/과학",
    categoryTone: "blue",
    dDay: "D-15",
    title: "2024 서울시 데이터 활용 공모전",
    organization: "서울특별시 · 교내 공지 RSS",
    teamCount: 3,
    views: "41,852",
    comments: 128,
    scraps: 1240,
  },
  {
    id: "campus-startup",
    category: "창업",
    categoryTone: "yellow",
    dDay: "D-19",
    title: "캠퍼스 창업 아이템 경진대회",
    organization: "중소벤처기업부 · K-Startup",
    teamCount: 3,
    views: "7,206",
    comments: 29,
    scraps: 306,
  },
];

const closingSoonIds = new Set([
  "environment-idea",
  "regional-campaign",
  "traffic-visualization",
]);

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "조회수순", value: "views" },
  { label: "스크랩순", value: "scraps" },
  { label: "최신순", value: "latest" },
  { label: "마감임박순", value: "deadline" },
];

function ContestCard({ contest }: { contest: Contest }) {
  return (
    <S.ContestCard>
      <S.CardTopline>
        <S.TagGroup>
          <S.CategoryBadge $tone={contest.categoryTone}>
            {contest.category}
          </S.CategoryBadge>
          <S.VerifiedBadge>
            <Icon name="check" size={8} weight="bold" />
            인증
          </S.VerifiedBadge>
        </S.TagGroup>
        <S.DDay>{contest.dDay}</S.DDay>
      </S.CardTopline>
      <S.ContestTitle>{contest.title}</S.ContestTitle>
      <S.Organization>{contest.organization}</S.Organization>
      <S.CardFooter>
        <S.TeamCount>모집 중인 팀 {contest.teamCount}</S.TeamCount>
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

export function ClosingContestsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("deadline");

  const filteredContests = useMemo(
    () =>
      activeCategory === "전체"
        ? contests
        : contests.filter((contest) => contest.category === activeCategory),
    [activeCategory],
  );
  const sortedContests = useMemo(() => {
    const contestsToSort = [...filteredContests];

    return contestsToSort.sort((left, right) => {
      if (sortOption === "views") {
        return (
          Number(right.views.replace(",", "")) -
          Number(left.views.replace(",", ""))
        );
      }

      if (sortOption === "scraps") return right.scraps - left.scraps;
      if (sortOption === "latest")
        return contests.indexOf(right) - contests.indexOf(left);

      return Number(left.dDay.slice(2)) - Number(right.dDay.slice(2));
    });
  }, [filteredContests, sortOption]);
  const closingSoonContests = sortedContests.filter((contest) =>
    closingSoonIds.has(contest.id),
  );
  const remainingContests = sortedContests.filter(
    (contest) => !closingSoonIds.has(contest.id),
  );

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="이번 주 마감" />
      <S.Content>
        <S.FilterArea>
          <S.Intro>7일 안에 접수가 끝나는 공모전이에요</S.Intro>

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
            {sortOptions.find((option) => option.value === sortOption)?.label}
            <Icon name="arrows-down-up" size={10} weight="regular" />
          </S.SortButton>
        </S.ListControls>

        <S.SectionHeading>
          <S.SectionTitle>
            이번 주 마감 {closingSoonContests.length}건
          </S.SectionTitle>
          <S.SectionMeta>7일 이내</S.SectionMeta>
        </S.SectionHeading>
        <S.ContestList>
          {closingSoonContests.map((contest) => (
            <ContestCard contest={contest} key={contest.id} />
          ))}
          {closingSoonContests.length === 0 && (
            <S.EmptyState>
              선택한 분야의 마감 임박 공모전이 없어요.
            </S.EmptyState>
          )}
        </S.ContestList>

        {remainingContests.length > 0 && (
          <>
            <S.SectionHeading $spaced>
              <S.SectionTitle>
                그 외 공모전 {remainingContests.length}건
              </S.SectionTitle>
              <S.SectionMeta>7일 이후</S.SectionMeta>
            </S.SectionHeading>
            <S.ContestList>
              {remainingContests.map((contest) => (
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
        <S.SortOptions aria-label="공모전 정렬 기준">
          {sortOptions.map((option) => {
            const selected = option.value === sortOption;

            return (
              <S.SortOption
                $selected={selected}
                aria-pressed={selected}
                key={option.value}
                onClick={() => {
                  if (option.value !== "deadline") {
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
          ‘인증’ 배지가 있는 공모전은 원문 링크가 확인된 항목으로, 정렬과
          무관하게 표시됩니다.
        </S.SortNotice>
      </BottomSheet>
    </S.Page>
  );
}
