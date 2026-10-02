import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { categories, fetchContests, type Contest, type ContestCategory } from "../../api/contests";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { PageHeader } from "../../components/PageHeader";
import { PillButton } from "../../components/PillButton";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./ContestsPage.styles";

type SortOption = "views" | "scraps" | "deadline";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "조회수순", value: "views" },
  { label: "스크랩순", value: "scraps" },
  { label: "마감임박순", value: "deadline" },
];

const isSortOption = (value: string | null): value is SortOption =>
  sortOptions.some((option) => option.value === value);

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
            {contest.categoryName}
          </S.CategoryBadge>
        </S.TagGroup>
        <S.DDay aria-label={`마감까지 ${contest.dDay}`}>
          {contest.dDay === "-" ? "마감일 미정" : contest.dDay}
        </S.DDay>
      </S.CardTopline>
      <S.ContestTitle>{contest.title}</S.ContestTitle>
      <S.Organization>{contest.hostOrganization}</S.Organization>
      <S.CardFooter>
        <S.TeamCount>모집 중인 팀 {contest.teamCount ?? 0}</S.TeamCount>
        <S.Stats aria-label={`조회 ${contest.viewCount}, 스크랩 ${contest.scrapCount}`}>
          <S.Stat>
            <Icon name="eye" size={9} weight="regular" />
            {contest.viewCount.toLocaleString("ko-KR")}
          </S.Stat>
          <S.Stat>
            <Icon name="bookmark" size={9} weight="regular" />
            {contest.scrapCount.toLocaleString("ko-KR")}
          </S.Stat>
        </S.Stats>
      </S.CardFooter>
      <S.CardCaret aria-hidden="true">
        <Icon name="caret-right" size={14} weight="bold" />
      </S.CardCaret>
    </S.ContestCard>
  );
}

function ContestCardSkeleton() {
  return (
    <S.SkeletonCard aria-hidden="true">
      <S.SkeletonTopline>
        <S.SkeletonLine $height="17px" $width="68px" />
        <S.SkeletonLine $height="17px" $width="36px" />
      </S.SkeletonTopline>
      <S.SkeletonLine $height="14px" $width="64%" />
      <S.SkeletonLine $height="9px" $width="40%" />
      <S.SkeletonFooter>
        <S.SkeletonLine $height="17px" $width="71px" />
        <S.SkeletonLine $height="9px" $width="50px" />
      </S.SkeletonFooter>
    </S.SkeletonCard>
  );
}

export function ContestsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    (location.state as { toastMessage?: string } | null)?.toastMessage ?? "",
  );
  const sortParam = searchParams.get("sort");
  const sortOption = isSortOption(sortParam) ? sortParam : "views";
  const {
    data: contests = [],
    isPending: isContestsLoading,
    isError: isContestsError,
  } = useQuery({
    queryKey: ["contests", activeCategory],
    queryFn: () => fetchContests(activeCategory),
    staleTime: 60 * 1000,
  });

  const visibleContests = useMemo(() => {
    return [...contests].sort((left, right) => {
      if (sortOption === "views") {
        return right.viewCount - left.viewCount;
      }

      if (sortOption === "scraps") return right.scrapCount - left.scrapCount;

      const remainingDays = (dDay: string) => {
        if (dDay === "D-Day") return 0;
        return /^D-\d+$/.test(dDay) ? Number(dDay.slice(2)) : Infinity;
      };

      return remainingDays(left.dDay) - remainingDays(right.dDay);
    });
  }, [contests, sortOption]);

  const sortLabel = sortOptions.find((option) => option.value === sortOption)?.label;

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

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
          <S.RegisterButton
            onClick={() => navigate("/contests/register")}
            type="button"
          >
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
          {isContestsLoading && Array.from({ length: 4 }, (_, index) => (
            <ContestCardSkeleton key={index} />
          ))}
          {isContestsError && (
            <S.EmptyState>공모전 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</S.EmptyState>
          )}
          {!isContestsLoading && !isContestsError && visibleContests.map((contest) => (
            <ContestCard
              contest={contest}
              key={contest.id}
              onClick={() => navigate(`/contests/${contest.id}`)}
            />
          ))}
          {!isContestsLoading && !isContestsError && visibleContests.length === 0 && (
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
      </BottomSheet>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
