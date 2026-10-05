import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { categories, fetchPopularContests, type Contest, type ContestCategory } from "../../../api/contests";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { S } from "./PopularContestsPage.styles";

function ContestCard({
  contest,
  onClick,
  rank,
}: {
  contest: Contest;
  onClick: () => void;
  rank?: number;
}) {
  return (
    <S.ContestCard onClick={onClick} type="button">
      <S.CardTopline>
        <S.TagGroup>
          {rank && <S.RankBadge>{rank}</S.RankBadge>}
          <S.CategoryBadge $tone={contest.categoryTone}>
            {contest.categoryName}
          </S.CategoryBadge>
        </S.TagGroup>
        <S.DDay>{contest.dDay}</S.DDay>
      </S.CardTopline>
      <S.ContestTitle>{contest.title}</S.ContestTitle>
      <S.Organization>{contest.hostOrganization}</S.Organization>
      <S.CardFooter>
        <S.TeamCount>모집 중인 팀 {contest.teamCount}</S.TeamCount>
        <S.Stats
          aria-label={`조회 ${contest.viewCount}, 북마크 ${contest.scrapCount}`}
        >
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

export function PopularContestsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const {
    data: popularContests = [],
    isError: isPopularContestsError,
    isPending: isPopularContestsLoading,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: fetchPopularContests,
    staleTime: 60 * 1000,
  });
  const visiblePopularContests = activeCategory === "전체"
    ? popularContests
    : popularContests.filter((contest) => contest.categoryName === activeCategory);
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
          <S.RegisterButton
            onClick={() => navigate("/contests/register")}
            type="button"
          >
            <Icon name="plus" size={10} weight="bold" />
            공모전 등록
          </S.RegisterButton>
        </S.ListControls>

        <S.SectionHeading>
          <S.SectionTitle>
            인기 TOP {visiblePopularContests.length}
          </S.SectionTitle>
        </S.SectionHeading>
        <S.ContestList>
          {isPopularContestsLoading && <S.EmptyState>인기 공모전을 불러오는 중이에요.</S.EmptyState>}
          {isPopularContestsError && (
            <S.EmptyState>인기 공모전을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</S.EmptyState>
          )}
          {!isPopularContestsLoading && !isPopularContestsError && visiblePopularContests.map((contest, index) => (
            <ContestCard
              contest={contest}
              key={contest.id}
              onClick={() => navigate(`/contests/${contest.id}`)}
              rank={index + 1}
            />
          ))}
          {!isPopularContestsLoading && !isPopularContestsError && visiblePopularContests.length === 0 && (
            <S.EmptyState>선택한 분야의 인기 공모전이 없어요.</S.EmptyState>
          )}
        </S.ContestList>
      </S.Content>
    </S.Page>
  );
}
