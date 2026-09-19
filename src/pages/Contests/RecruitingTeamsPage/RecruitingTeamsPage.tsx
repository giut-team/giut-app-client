import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { PillButton } from "../../../components/PillButton";
import { S } from "./RecruitingTeamsPage.styles";

type TeamCategory = "전체" | "개발" | "기획" | "디자인" | "마케팅";

type Team = {
  applicationReview?: boolean;
  memberOfTeam?: boolean;
  category: Exclude<TeamCategory, "전체">;
  id: string;
  isOwner?: boolean;
  leader: string;
  members: string;
  positions: string[];
  status: "closed" | "open";
  timeAgo: string;
  title: string;
};

const categories: TeamCategory[] = ["전체", "개발", "기획", "디자인", "마케팅"];

const teams: Team[] = [
  {
    id: "my-data-seoul",
    category: "기획",
    title: "데이터로 서울을",
    leader: "이서연 팀장 · 온라인 + 오프라인 · 주 1회",
    members: "3/5명",
    positions: ["백엔드 개발자 모집중", "데이터 엔지니어 모집중"],
    status: "open",
    timeAgo: "방금 전",
    isOwner: true,
  },
  {
    id: "applied-data-seoul",
    applicationReview: true,
    category: "개발",
    title: "데이터로 서울을",
    leader: "이수현 팀장 · 온라인 + 오프라인 · 주 1회",
    members: "3/5명",
    positions: ["백엔드 모집중", "프론트엔드 마감", "기획 마감"],
    status: "open",
    timeAgo: "2일 전",
  },
  {
    id: "joined-data-seoul",
    memberOfTeam: true,
    category: "개발",
    title: "데이터로 서울을",
    leader: "이수연 팀장 · 온라인 + 오프라인 · 주 1회",
    members: "4/5명",
    positions: ["백엔드 개발자 모집중", "데이터 엔지니어 모집중"],
    status: "open",
    timeAgo: "2일 전",
  },
  {
    id: "syrup-data-lab",
    category: "기획",
    title: "시립대 데이터랩",
    leader: "최유진 팀장 · 온라인 · 주 2회",
    members: "2/4명",
    positions: ["기획 모집중", "디자인 모집중"],
    status: "open",
    timeAgo: "4일 전",
  },
  {
    id: "blending-3",
    category: "마케팅",
    title: "열린데이터 3기",
    leader: "박지윤 팀장 · 오프라인 · 주 1회",
    members: "4/5명",
    positions: ["마케팅 모집중"],
    status: "open",
    timeAgo: "1주 전",
  },
  {
    id: "data-squad",
    category: "개발",
    title: "공공데이터 스쿼드",
    leader: "김세린 팀장 · 온라인 · 주 2회",
    members: "5/5명",
    positions: ["개발 마감", "기획 마감"],
    status: "closed",
    timeAgo: "2주 전",
  },
  {
    id: "seoul-ro",
    category: "디자인",
    title: "서울로 팀",
    leader: "한지우 팀장 · 오프라인 · 주 1회",
    members: "4/4명",
    positions: ["디자인 마감"],
    status: "closed",
    timeAgo: "3주 전",
  },
];

function TeamCard({
  favorite,
  onToggleFavorite,
  onSelect,
  onView,
  team,
}: {
  favorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  onView: () => void;
  team: Team;
}) {
  const isOpen = team.status === "open";

  return (
    <S.TeamCard
      $selected={false}
      onClick={isOpen ? onSelect : undefined}
      onKeyDown={(event) => {
        if (isOpen && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect();
        }
      }}
      role={isOpen ? "button" : undefined}
      tabIndex={isOpen ? 0 : undefined}
    >
      <S.TeamTopline>
        <S.TeamCount $closed={!isOpen}>{team.members}</S.TeamCount>
        {team.applicationReview && (
          <S.ApplicationReviewBadge>지원 검토 중</S.ApplicationReviewBadge>
        )}
        {team.memberOfTeam && <S.MemberOfTeamBadge>내 팀</S.MemberOfTeamBadge>}
        {team.isOwner && <S.OwnerBadge>내가 만든 팀</S.OwnerBadge>}
        {team.id === "blending-3" && <S.LastSeat>한 자리</S.LastSeat>}
        <S.TimeAgo>{team.timeAgo}</S.TimeAgo>
      </S.TeamTopline>
      <S.TeamTitle>{team.title}</S.TeamTitle>
      <S.TeamMeta>{team.leader}</S.TeamMeta>
      {isOpen && (
        <S.PositionList>
          {team.positions
            .filter((position) => position.includes("모집중"))
            .map((position) => (
            <S.PositionBadge $open={position.includes("모집중")} key={position}>
              {position}
            </S.PositionBadge>
            ))}
        </S.PositionList>
      )}
      <S.TeamActions $closed={!isOpen}>
          <S.DetailButton
            disabled={!isOpen}
            onClick={(event) => {
              event.stopPropagation();
              onView();
            }}
            type="button"
          >
          {isOpen ? (
            <>
              상세 보기 <Icon name="caret-right" size={14} weight="bold" />
            </>
          ) : (
            "모집이 마감된 팀이에요"
          )}
        </S.DetailButton>
        {isOpen && (
          <S.FavoriteButton
            $favorite={favorite}
            aria-label={team.title + " 찜하기"}
            aria-pressed={favorite}
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavorite();
            }}
            type="button"
          >
            <Icon
              name="heart"
              size={15}
              weight={favorite ? "fill" : "regular"}
            />
          </S.FavoriteButton>
        )}
      </S.TeamActions>
    </S.TeamCard>
  );
}

export function RecruitingTeamsPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data" } = useParams();
  const [activeCategory, setActiveCategory] = useState<TeamCategory>("전체");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const visibleTeams = useMemo(
    () =>
      activeCategory === "전체"
        ? teams
        : teams.filter((team) => team.category === activeCategory),
    [activeCategory],
  );
  const openTeams = visibleTeams.filter((team) => team.status === "open");
  const closedTeams = visibleTeams.filter((team) => team.status === "closed");

  const toggleFavorite = (teamId: string) => {
    setFavoriteIds((current) =>
      current.includes(teamId)
        ? current.filter((id) => id !== teamId)
        : [...current, teamId],
    );
  };
  const getDetailPath = (team: Team) =>
    team.isOwner
      ? `/contests/${contestId}/teams/${team.id}/manage`
      : `/contests/${contestId}/teams/${team.id}`;

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate(-1)} title="모집 중인 팀" />
        <S.ContestSummary>
          <S.ContestName>2026 서울시 데이터 활용 공모전</S.ContestName>
          <S.DDay>D-15</S.DDay>
        </S.ContestSummary>
        <S.FilterArea>
          <S.FilterList aria-label="모집 포지션 필터">
            {categories.map((category) => (
              <PillButton
                active={activeCategory === category}
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
                tone="dark"
              >
                {category === "전체" ? "전체 " + teams.length : category}
              </PillButton>
            ))}
          </S.FilterList>
        </S.FilterArea>

        <S.TeamSection>
          <S.SectionHeader>
            <S.SectionTitle>
              모집 중 <S.TeamTotal>{openTeams.length}</S.TeamTotal>팀
            </S.SectionTitle>
            <S.SortLabel>최근 등록순</S.SortLabel>
          </S.SectionHeader>
          <S.TeamList>
            {openTeams.map((team) => (
              <TeamCard
                favorite={favoriteIds.includes(team.id)}
                key={team.id}
                onSelect={() => navigate(getDetailPath(team))}
                onView={() => navigate(getDetailPath(team))}
                onToggleFavorite={() => toggleFavorite(team.id)}
                team={team}
              />
            ))}
          </S.TeamList>
        </S.TeamSection>

        {closedTeams.length > 0 && (
          <S.TeamSection $closed>
            <S.SectionHeader>
              <S.SectionTitle>모집이 끝난 팀</S.SectionTitle>
            </S.SectionHeader>
            <S.TeamList>
              {closedTeams.map((team) => (
                <TeamCard
                  favorite={favoriteIds.includes(team.id)}
                  key={team.id}
                onSelect={() => navigate(getDetailPath(team))}
                onView={() => navigate(getDetailPath(team))}
                  onToggleFavorite={() => toggleFavorite(team.id)}
                  team={team}
                />
              ))}
            </S.TeamList>
            <S.InfoNote>
              원하는 팀이 없으면 직접 팀을 만들어 팀원을 모집할 수 있어요.
            </S.InfoNote>
          </S.TeamSection>
        )}
      </S.Content>

      <S.ActionBar>
        <S.CreateButton
          onClick={() =>
            window.location.assign(`/contests/${contestId}/teams/create?from=teams`)
          }
          type="button"
        >
          팀 구성하기
        </S.CreateButton>
      </S.ActionBar>
    </S.Page>
  );
}
