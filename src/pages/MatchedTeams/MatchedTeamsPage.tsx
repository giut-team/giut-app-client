import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/icons";
import { PageHeader } from "../../components/PageHeader";
import { PillButton } from "../../components/PillButton";
import { S } from "./MatchedTeamsPage.styles";

type SkillFilter = "데이터 분석" | "Python" | "SQL" | "Tableau" | "전체";
type TeamKind = "match" | "overlap";

type Team = {
  dDay: string;
  description: string;
  id: string;
  kind: TeamKind;
  position: string;
  skills: string[];
  title: string;
};

const filters: SkillFilter[] = ["데이터 분석", "Python", "SQL", "Tableau", "전체"];

const teams: Team[] = [
  {
    id: "data-seoul",
    kind: "match",
    position: "데이터 분석 1자리",
    dDay: "D-15",
    title: "데이터로 서울을",
    description: "2026 서울시 데이터 활용 공모전 · 이수현 팀장 · 3/5명",
    skills: ["Python", "SQL", "Tableau"],
  },
  {
    id: "green-data-lab",
    kind: "match",
    position: "데이터 분석 1자리",
    dDay: "D-3",
    title: "그린 데이터 랩",
    description: "대학생 환경 아이디어 챌린지 · 박서준 팀장 · 2/4명",
    skills: ["Python", "Excel"],
  },
  {
    id: "movement",
    kind: "match",
    position: "데이터 분석 2자리",
    dDay: "D-7",
    title: "무브먼트",
    description: "교통 데이터 시각화 해커톤 · 최유나 팀장 · 4/6명",
    skills: ["SQL", "React", "Figma"],
  },
  {
    id: "payflow",
    kind: "overlap",
    position: "ML 엔지니어 1자리",
    dDay: "D-21",
    title: "페이플로우",
    description: "제 12회 핀테크 해커톤 · 김현진 팀장 · 3/5명",
    skills: ["Python", "SQL", "FastAPI"],
  },
  {
    id: "impact-studio",
    kind: "overlap",
    position: "리서치 1자리",
    dDay: "D-10",
    title: "임팩트 스튜디오",
    description: "디자인으로 만드는 ESG 캠페인 · 정하늘 팀장 · 2/4명",
    skills: ["Tableau", "Figma"],
  },
];

function TeamCard({
  favorite,
  onToggleFavorite,
  onView,
  team,
}: {
  favorite: boolean;
  onToggleFavorite: () => void;
  onView?: () => void;
  team: Team;
}) {
  return (
    <S.TeamCard $kind={team.kind}>
      <S.TeamTopline>
        <S.PositionBadge $kind={team.kind}>{team.position}</S.PositionBadge>
        <S.DDay>{team.dDay}</S.DDay>
      </S.TeamTopline>
      <S.TeamTitle>{team.title}</S.TeamTitle>
      <S.TeamDescription>{team.description}</S.TeamDescription>
      <S.SkillList aria-label={`${team.title} 필요 기술`}>
        {team.skills.map((skill) => (
          <S.SkillBadge key={skill}>{skill}</S.SkillBadge>
        ))}
      </S.SkillList>
      <S.TeamActions>
        <S.DetailButton onClick={onView} type="button">
          상세 보기
          <Icon name="caret-right" size={14} weight="bold" />
        </S.DetailButton>
        <S.FavoriteButton
          $favorite={favorite}
          aria-label={`${team.title} 찜하기`}
          aria-pressed={favorite}
          onClick={onToggleFavorite}
          type="button"
        >
          <Icon name="heart" size={15} weight={favorite ? "fill" : "regular"} />
        </S.FavoriteButton>
      </S.TeamActions>
    </S.TeamCard>
  );
}

export function MatchedTeamsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("데이터 분석");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const visibleTeams = useMemo(() => {
    if (activeFilter === "전체") return teams;

    return teams.filter(
      (team) =>
        activeFilter === "데이터 분석" ||
        team.skills.some((skill) => skill === activeFilter),
    );
  }, [activeFilter]);

  const matchedTeams = visibleTeams.filter((team) => team.kind === "match");
  const overlapTeams = visibleTeams.filter((team) => team.kind === "overlap");

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
        <PageHeader onBack={() => navigate("/")} title="내게 맞는 팀" />
        <S.Hero>
          <S.HeroTitle>
            데이터 분석을 찾는 팀이
            <br />
            이번 주에 {matchedTeams.length}팀 있어요
          </S.HeroTitle>
          <S.FilterList aria-label="보유 기술 필터">
            {filters.map((filter) => (
              <PillButton
                active={activeFilter === filter}
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </PillButton>
            ))}
          </S.FilterList>
        </S.Hero>

        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>내 포지션을 찾는 팀 {matchedTeams.length}</S.SectionTitle>
            <S.SectionMeta>데이터 분석</S.SectionMeta>
          </S.SectionHeader>
          <S.TeamList>
            {matchedTeams.map((team) => (
              <TeamCard
                favorite={favoriteIds.includes(team.id)}
                key={team.id}
                onToggleFavorite={() => toggleFavorite(team.id)}
                onView={
                  team.id === "data-seoul"
                    ? () => navigate("/contests/seoul-data/teams/data-seoul")
                    : undefined
                }
                team={team}
              />
            ))}
          </S.TeamList>
        </S.Section>

        {overlapTeams.length > 0 && (
          <S.Section $separated>
            <S.SectionHeader>
              <S.SectionTitle>기술 스택이 겹치는 팀 {overlapTeams.length}</S.SectionTitle>
              <S.SectionMeta>Python · SQL · Tableau</S.SectionMeta>
            </S.SectionHeader>
            <S.SectionDescription>
              포지션은 다르지만 내가 쓸 수 있는 스택을 필요로 하는 팀이에요.
            </S.SectionDescription>
            <S.TeamList>
              {overlapTeams.map((team) => (
                <TeamCard
                  favorite={favoriteIds.includes(team.id)}
                key={team.id}
                onToggleFavorite={() => toggleFavorite(team.id)}
                onView={
                  team.id === "data-seoul"
                    ? () => navigate("/contests/seoul-data/teams/data-seoul")
                    : undefined
                }
                team={team}
                />
              ))}
            </S.TeamList>
          </S.Section>
        )}

        <S.InfoNote>
          프로필의 포지션과 기술 스택을 채울수록 더 정확한 팀이 먼저 보여요.
        </S.InfoNote>
      </S.Content>
    </S.Page>
  );
}
