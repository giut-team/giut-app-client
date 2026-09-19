import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./RecruitingTeamsPage.styles";

type RecruitingTeam = {
  category: "개발" | "기획" | "디자인" | "마케팅";
  id: string;
  description: string;
  members: string;
  relationship?: "applied" | "member" | "owner";
  status: "closed" | "open";
  title: string;
};

type CategoryFilter = "전체" | RecruitingTeam["category"];

const categoryFilters: CategoryFilter[] = [
  "전체",
  "기획",
  "디자인",
  "개발",
  "마케팅",
];

const recruitingTeams: RecruitingTeam[] = [
  {
    id: "my-data-seoul",
    category: "기획",
    title: "데이터로 서울을",
    description: "서울의 공공데이터로 시민이 체감할 수 있는 서비스를 기획하고 있어요.",
    members: "3/5명",
    status: "open",
    relationship: "owner",
  },
  {
    id: "applied-data-seoul",
    category: "개발",
    title: "데이터로 서울을",
    description: "서울시 데이터를 분석해 생활 문제를 해결할 서비스를 만들고 있어요.",
    members: "3/5명",
    status: "open",
    relationship: "applied",
  },
  {
    id: "joined-data-seoul",
    category: "개발",
    title: "데이터로 서울을",
    description: "공공 데이터를 바탕으로 더 편리한 생활 서비스를 개발하고 있어요.",
    members: "4/5명",
    status: "open",
    relationship: "member",
  },
  {
    id: "syrup-data-lab",
    category: "기획",
    title: "시립대 데이터랩",
    description: "시립대 학생에게 필요한 데이터를 쉽고 친절하게 연결하는 팀입니다.",
    members: "2/4명",
    status: "open",
  },
  {
    id: "blending-3",
    category: "마케팅",
    title: "열린데이터 3기",
    description: "열린데이터를 활용한 캠페인 경험을 함께 만들어가고 있어요.",
    members: "4/5명",
    status: "open",
  },
  {
    id: "data-squad",
    category: "개발",
    title: "공공데이터 스쿼드",
    description: "공공데이터를 활용해 도시 문제를 해결하는 개발팀입니다.",
    members: "5/5명",
    status: "closed",
  },
  {
    id: "seoul-ro",
    category: "디자인",
    title: "서울로 팀",
    description: "서울의 일상을 더 편리하게 만드는 디자인 프로젝트를 진행합니다.",
    members: "4/4명",
    status: "closed",
  },
];

export function RecruitingTeamsPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data" } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("전체");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [applyTargetTeam, setApplyTargetTeam] = useState<RecruitingTeam | null>(
    null,
  );
  const filterRef = useRef<HTMLDivElement>(null);
  const visibleTeams = useMemo(
    () =>
      recruitingTeams.filter(
        (team) =>
          team.status === "open" &&
          (selectedCategory === "전체" || team.category === selectedCategory),
      ),
    [selectedCategory],
  );

  useEffect(() => {
    if (!isFilterOpen) return;

    const closeFilter = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeFilter);
    return () => document.removeEventListener("pointerdown", closeFilter);
  }, [isFilterOpen]);

  const getTeamDetailPath = (team: RecruitingTeam) =>
    team.relationship === "owner"
      ? `/contests/${contestId}/teams/${team.id}/manage`
      : `/contests/${contestId}/teams/${team.id}`;

  const getRelationshipLabel = (
    relationship: RecruitingTeam["relationship"],
  ) => {
    const labels = {
      applied: "지원 검토 중",
      member: "내 팀",
      owner: "내가 만든 팀",
    };

    return relationship ? labels[relationship] : null;
  };

  const getActionLabel = (team: RecruitingTeam) => {
    if (team.relationship === "owner") return "팀 관리";
    if (team.relationship === "member") return "팀 보기";
    if (team.relationship === "applied") return "지원 현황";
    return "지원하기";
  };

  const toggleFavorite = (teamId: string) => {
    setFavoriteIds((current) =>
      current.includes(teamId)
        ? current.filter((id) => id !== teamId)
        : [...current, teamId],
    );
  };

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate(-1)} title="팀원 모집" />

        <S.ContestSummary>
          <S.ContestBadges>
            <S.CategoryBadge>IT/과학</S.CategoryBadge>
            <S.VerifiedBadge>
              <Icon name="check" size={12} weight="bold" /> 인증
            </S.VerifiedBadge>
          </S.ContestBadges>
          <S.ContestTitle>2026 서울시 데이터 활용 공모전</S.ContestTitle>
          <S.ContestMeta>
            <S.MetaItem>
              <Icon name="calendar" size={16} weight="regular" />
              2026.09.30 (수) 마감
            </S.MetaItem>
            <S.DDay>D-15</S.DDay>
            <S.MetaItem>
              <Icon name="person" size={16} weight="regular" />
              팀당 2~5인
            </S.MetaItem>
          </S.ContestMeta>
        </S.ContestSummary>

        <S.TeamSection>
          <S.SectionHeader>
            <S.SectionTitle>팀원 모집 중 {visibleTeams.length}팀</S.SectionTitle>
            <S.FilterControl ref={filterRef}>
              <S.SortButton
                aria-expanded={isFilterOpen}
                aria-haspopup="listbox"
                onClick={() => setIsFilterOpen((current) => !current)}
                type="button"
              >
                모집 분야 · {selectedCategory}{" "}
                <Icon name="filter" size={16} weight="bold" />
              </S.SortButton>
              {isFilterOpen && (
                <S.FilterMenu aria-label="모집 분야 필터" role="listbox">
                  {categoryFilters.map((category) => {
                    const isSelected = selectedCategory === category;

                    return (
                      <S.FilterOption
                        aria-selected={isSelected}
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        role="option"
                        type="button"
                        $selected={isSelected}
                      >
                        {category}
                        {isSelected && (
                          <Icon name="check" size={17} weight="bold" />
                        )}
                      </S.FilterOption>
                    );
                  })}
                </S.FilterMenu>
              )}
            </S.FilterControl>
          </S.SectionHeader>

          <S.TeamList>
            {visibleTeams.map((team) => {
              const relationshipLabel = getRelationshipLabel(team.relationship);
              const favorite = favoriteIds.includes(team.id);

              return (
                <S.TeamCard
                  key={team.id}
                  onClick={() => navigate(getTeamDetailPath(team))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(getTeamDetailPath(team));
                    }
                  }}
                  role="link"
                  tabIndex={0}
                >
                  <S.TicketTop>
                    <S.CardHeading>
                      <S.TitleGroup>
                        <S.TeamTitle>{team.title}</S.TeamTitle>
                        {relationshipLabel && (
                          <S.RelationshipBadge $type={team.relationship}>
                            {relationshipLabel}
                          </S.RelationshipBadge>
                        )}
                      </S.TitleGroup>
                      <S.FavoriteButton
                        $favorite={favorite}
                        aria-label={favorite ? "팀 찜 해제" : "팀 찜하기"}
                        aria-pressed={favorite}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(team.id);
                        }}
                        type="button"
                      >
                        <Icon
                          name="bookmark"
                          size={21}
                          weight={favorite ? "fill" : "regular"}
                        />
                      </S.FavoriteButton>
                    </S.CardHeading>
                    <S.TeamDescription>{team.description}</S.TeamDescription>
                  </S.TicketTop>
                  <S.TicketDivider aria-hidden="true">
                    <S.TicketNotch $side="left" />
                    <S.TicketNotch $side="right" />
                  </S.TicketDivider>
                  <S.CardFooter>
                    <S.MemberCount>
                      <Icon name="person" size={17} weight="regular" />
                      {team.members}
                    </S.MemberCount>
                    <S.ApplyButton
                      onClick={(event) => {
                        event.stopPropagation();
                        if (team.relationship) {
                          navigate(getTeamDetailPath(team));
                          return;
                        }

                        setApplyTargetTeam(team);
                      }}
                      type="button"
                    >
                      {getActionLabel(team)}
                    </S.ApplyButton>
                  </S.CardFooter>
                </S.TeamCard>
              );
            })}
          </S.TeamList>
        </S.TeamSection>
      </S.Content>
      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setApplyTargetTeam(null)}
        open={Boolean(applyTargetTeam)}
        primaryAction={{
          label: "지원하기",
          onClick: () => {
            if (!applyTargetTeam) return;

            navigate(`/contests/${contestId}/teams/${applyTargetTeam.id}/apply`);
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setApplyTargetTeam(null),
        }}
        title="이 팀에 지원하시겠습니까?"
      />
    </S.Page>
  );
}
