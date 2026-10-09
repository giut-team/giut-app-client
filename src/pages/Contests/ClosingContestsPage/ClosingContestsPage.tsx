import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { categories, fetchClosingSoonContests, type Contest, type ContestCategory } from "../../../api/contests";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { useAuth } from "../../../contexts/AuthContext";
import { S } from "./ClosingContestsPage.styles";

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
        <S.DDay>{contest.dDay}</S.DDay>
      </S.CardTopline>
      <S.ContestTitle>{contest.title}</S.ContestTitle>
      <S.Organization>{contest.hostOrganization}</S.Organization>
      <S.CardFooter>
        <S.TeamCount>모집 중인 팀 {contest.teamCount}</S.TeamCount>
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

export function ClosingContestsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, universityVerified } = useAuth();
  const isUniversityUnverified = isAuthenticated && !universityVerified;
  const [activeCategory, setActiveCategory] = useState<ContestCategory>("전체");
  const {
    data: closingSoonContests = [],
    isError: isClosingSoonContestsError,
    isPending: isClosingSoonContestsLoading,
  } = useQuery({
    queryKey: ["closingSoonContests"],
    queryFn: fetchClosingSoonContests,
    staleTime: 60 * 1000,
  });
  const visibleClosingSoonContests = activeCategory === "전체"
    ? closingSoonContests
    : closingSoonContests.filter((contest) => contest.categoryName === activeCategory);

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="이번 주 마감" />
      <S.Content>
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

        <S.ListControls>
          <S.RegisterButton
            aria-label={isUniversityUnverified ? "공모전 등록, 학교 인증 필요" : "공모전 등록"}
            disabled={isUniversityUnverified}
            onClick={() => navigate("/contests/register")}
            type="button"
          >
            <Icon
              name={isUniversityUnverified ? "lock" : "plus"}
              size={10}
              weight="bold"
            />
            공모전 등록
          </S.RegisterButton>
        </S.ListControls>

        <S.SectionHeading>
          <S.SectionTitle>
            이번 주 마감 {visibleClosingSoonContests.length}건
          </S.SectionTitle>
          <S.SectionMeta>7일 이내</S.SectionMeta>
        </S.SectionHeading>
        <S.ContestList>
          {isClosingSoonContestsLoading && <S.EmptyState>마감 임박 공모전을 불러오는 중이에요.</S.EmptyState>}
          {isClosingSoonContestsError && (
            <S.EmptyState>마감 임박 공모전을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</S.EmptyState>
          )}
          {!isClosingSoonContestsLoading && !isClosingSoonContestsError && visibleClosingSoonContests.map((contest) => (
            <ContestCard
              contest={contest}
              key={contest.id}
              onClick={() => navigate(`/contests/${contest.id}`)}
            />
          ))}
          {!isClosingSoonContestsLoading && !isClosingSoonContestsError && visibleClosingSoonContests.length === 0 && (
            <S.EmptyState>
              선택한 분야의 마감 임박 공모전이 없어요.
            </S.EmptyState>
          )}
        </S.ContestList>
      </S.Content>
    </S.Page>
  );
}
