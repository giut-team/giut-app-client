import { useState } from "react";
import { useNavigate } from "react-router-dom";
import giutLogo from "../../../assets/giut-logo.svg";
import { BottomNavigation } from "../../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../../components/icons";
import { PillButton } from "../../../components/PillButton";
import { S } from "./PositionTeamsPage.styles";

type PositionFilter = "백엔드 개발자" | "데이터 엔지니어" | "전체 포지션";

const filters: PositionFilter[] = [
  "백엔드 개발자",
  "데이터 엔지니어",
  "전체 포지션",
];

const teams = [
  {
    id: "data-seoul",
    position: "백엔드 개발자",
    openings: "1자리",
    dDay: "D-3",
    title: "데이터로 서울을",
    description: "2024 서울시 데이터 활용 공모전 · 이수현 팀장 · 3/5명",
  },
  {
    id: "fintech-hackathon",
    position: "백엔드 개발자",
    openings: "2자리",
    dDay: "D-9",
    title: "핀테크 해커톤 4팀",
    description: "제 12회 핀테크 해커톤 · 박지훈 팀장 · 2/5명",
  },
  {
    id: "greentech-study",
    position: "백엔드 개발자",
    openings: "2자리",
    dDay: "D-21",
    title: "그린테크 스터디팀",
    description: "대학생 환경 아이디어 챌린지 · 최우진 팀장 · 4/6명",
  },
  {
    id: "campaign-side",
    position: "백엔드 개발자",
    openings: "2자리",
    dDay: "D-25",
    title: "캠페인 사이드팀",
    description: "대학생 창업 아이디어 경진대회 · 하준혁 팀장 · 3/5명",
  },
  {
    id: "generative-ai",
    position: "백엔드 개발자",
    openings: "2자리",
    dDay: "D-30",
    title: "생성AI 서비스팀",
    description: "오픈소스 컨퍼런스 챌린지 · 김현진 팀장 · 2/6명",
  },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function PositionTeamsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] =
    useState<PositionFilter>("백엔드 개발자");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [activeNavigation, setActiveNavigation] = useState("home");

  const visibleTeams =
    activeFilter === "전체 포지션"
      ? teams
      : teams.filter((team) => team.position === activeFilter);

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
        <S.TopArea>
          <S.Header>
            <S.Brand aria-label="기웃">
              <span>기웃</span>
              <S.BrandMark alt="" aria-hidden="true" src={giutLogo} />
            </S.Brand>
            <S.HeaderActions>
              <S.HeaderButton
                aria-label="팀 페이지로 이동"
                onClick={() => navigate("/my-team")}
                type="button"
              >
                <Icon name="users" size={16} weight="regular" />
                <S.HeaderBadge>3</S.HeaderBadge>
              </S.HeaderButton>
              <S.HeaderButton aria-label="검색" type="button">
                <Icon name="search" size={16} weight="regular" />
              </S.HeaderButton>
              <S.HeaderButton aria-label="알림" type="button">
                <Icon name="bell" size={16} weight="regular" />
                <S.NotificationDot />
              </S.HeaderButton>
            </S.HeaderActions>
          </S.Header>

          <S.Title>
            백엔드 개발자를 찾는 팀이
            <br />
            이번 주에 5팀 있어요
          </S.Title>
        </S.TopArea>

        <S.ListSection>
          <S.ListHeader>
            <S.SectionTitle>내 포지션을 찾는 팀</S.SectionTitle>
          </S.ListHeader>

          <S.FilterList aria-label="포지션 필터">
            {filters.map((filter) => (
              <PillButton
                active={activeFilter === filter}
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </PillButton>
            ))}
          </S.FilterList>

          <S.TeamList>
            {visibleTeams.map((team) => {
              const isFavorite = favoriteIds.includes(team.id);

              return (
                <S.TeamCard key={team.id}>
                  <S.TeamTopline>
                    <S.PositionBadge>
                      {team.position} {team.openings}
                    </S.PositionBadge>
                    <S.DDay>{team.dDay}</S.DDay>
                  </S.TeamTopline>
                  <S.TeamTitle>{team.title}</S.TeamTitle>
                  <S.TeamDescription>{team.description}</S.TeamDescription>
                  <S.TeamActions>
                    <S.ApplyButton type="button">
                      상세 보기&nbsp;→
                    </S.ApplyButton>
                    <S.FavoriteButton
                      $favorite={isFavorite}
                      aria-pressed={isFavorite}
                      aria-label={`${team.title} 찜하기`}
                      onClick={() => toggleFavorite(team.id)}
                      type="button"
                    >
                      <Icon
                        name="heart"
                        size={14}
                        weight={isFavorite ? "fill" : "regular"}
                      />
                    </S.FavoriteButton>
                  </S.TeamActions>
                </S.TeamCard>
              );
            })}
          </S.TeamList>

          <S.InfoNote>
            내 프로필의 포지션 기준으로 자동 추천돼요. 마이페이지에서 포지션을
            바꾸면 목록도 바뀝니다.
          </S.InfoNote>
        </S.ListSection>
      </S.Content>

      <BottomNavigation
        activeKey={activeNavigation}
        items={navigationItems}
        onChange={(key) => {
          setActiveNavigation(key);
          if (key === "home") navigate("/home");
          if (key === "hub") navigate("/my-team");
        }}
      />
    </S.Page>
  );
}
