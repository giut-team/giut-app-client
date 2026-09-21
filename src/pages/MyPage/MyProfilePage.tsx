import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { detailsByProfileId, getSkillIcon } from "../GiutHub/GiutHubProfilePage";
import { giutHubProfiles } from "../GiutHub/GiutHubPage";
import { S } from "./MyProfilePage.styles";

type MyProfileTab = "portfolio" | "teams" | "scraps";
type ScrapFilter = "all" | "posts" | "teams";

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

const portfolioPeriods = ["2026.03 - 2026.06 · 4인 팀", "2026.01 - 2026.02 · 3인 팀", "2025.09 - 2025.11 · 개인", "2025.07 - 2025.08 · 4인 팀"];
const scrapPosts = [
  { category: "공모전", savedAt: "3일 전 저장", title: "서울시 데이터 활용 공모전", organization: "서울특별시", deadline: "D-15", tone: "green" },
  { category: "해커톤", savedAt: "5일 전 저장", title: "2026 대학생 해커톤", organization: "삼성전자", deadline: "D-5", tone: "blue" },
  { category: "공모전", savedAt: "1주 전 저장", title: "대학생 ESG 아이디어 챌린지", organization: "환경부", deadline: "D-8", tone: "purple" },
  { category: "대외활동", savedAt: "1주 전 저장", title: "청년 정책 서포터즈 6기", organization: "행정안전부", deadline: "D-10", tone: "pink" },
  { category: "경진대회", savedAt: "2주 전 저장", title: "대학생 마케팅 아이디어 대회", organization: "CJ제일제당", deadline: "D-21", tone: "orange" },
] as const;
const scrapTeams = [
  { title: "데이터로 서울을", detail: "백엔드 개발자 · 1자리 모집", status: "모집 중 · 어제 저장" },
  { title: "그린테크 스터디팀", detail: "데이터 분석 · 2자리 모집", status: "모집 중 · 3일 전 저장" },
  { title: "캠퍼스 앱 리디자인", detail: "UI 디자이너 · 1자리 모집", status: "모집 중 · 1주 전 저장" },
] as const;

export function MyProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MyProfileTab>("portfolio");
  const [scrapFilter, setScrapFilter] = useState<ScrapFilter>("all");
  const profile = giutHubProfiles.find((item) => item.id === "minjae");
  if (!profile) return null;

  const detail = detailsByProfileId[profile.id];

  return (
    <S.Page>
      <S.Content>
        <S.Header><S.PageTitle>마이페이지</S.PageTitle><S.SettingsButton aria-label="설정" type="button"><Icon name="settings" size={27} weight="bold" /></S.SettingsButton></S.Header>
        <S.ProfileSection>
          <S.ProfilePhotoPlaceholder><Icon name="image" size={38} weight="regular" /><span>프로필 사진</span><small>or <u>browse files</u></small></S.ProfilePhotoPlaceholder>
          <S.ProfileInfo>
            <S.Name>{profile.name}</S.Name>
            <S.DetailRow><span>학과/학년</span><strong>컴퓨터과학부 3학년</strong></S.DetailRow>
            <S.DetailRow><span>분야/역할</span><strong>{profile.detailRole} / {profile.role}</strong></S.DetailRow>
            <S.Status>{profile.status}</S.Status>
          </S.ProfileInfo>
        </S.ProfileSection>
        <S.ProfileActions>
          <S.EditButton onClick={() => navigate("/my-profile/edit")} type="button"><Icon name="edit" size={23} weight="bold" />프로필 편집</S.EditButton>
          <S.ShareButton aria-label="프로필 공유" type="button"><Icon name="share" size={25} weight="regular" /></S.ShareButton>
        </S.ProfileActions>
        <S.Metrics aria-label="내 프로필 활동 정보">
          <S.Metric><span>협업 경험<strong>{profile.projectCount}회</strong></span></S.Metric>
          <S.Metric $primary><span>받은 제안<strong>3건</strong></span></S.Metric>
          <S.Metric><span>받은 추천<strong>{profile.recommendationCount}</strong></span></S.Metric>
        </S.Metrics>
        <S.SkillSection><S.SkillList aria-label="보유 기술">{detail.skills.map((skill, index) => <S.Skill $index={index} key={skill}>{getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}{skill}</S.Skill>)}</S.SkillList></S.SkillSection>
        <S.TabList role="tablist">
          <S.Tab $active={activeTab === "portfolio"} aria-selected={activeTab === "portfolio"} onClick={() => setActiveTab("portfolio")} role="tab" type="button">포트폴리오 {detail.portfolios.length}</S.Tab>
          <S.Tab $active={activeTab === "teams"} aria-selected={activeTab === "teams"} onClick={() => setActiveTab("teams")} role="tab" type="button">내 팀 2</S.Tab>
          <S.Tab $active={activeTab === "scraps"} aria-selected={activeTab === "scraps"} onClick={() => setActiveTab("scraps")} role="tab" type="button">스크랩 8</S.Tab>
        </S.TabList>
        {activeTab === "portfolio" && <S.TabContent>
          <S.FeaturedPortfolio onClick={() => navigate(`/giut-hub/${profile.profileNumber}/portfolio/1`)} type="button">
            <S.FeaturedImage><Icon name="image" size={18} weight="regular" /><span>사진</span><small>or <u>browse files</u></small></S.FeaturedImage>
            <S.PortfolioCopy><S.RepresentativeLabel>대표 프로젝트</S.RepresentativeLabel><strong>{detail.portfolios[0].title}</strong><small>{portfolioPeriods[0]}</small></S.PortfolioCopy>
            <Icon name="caret-right" size={23} weight="bold" />
          </S.FeaturedPortfolio>
          <S.PortfolioList>{detail.portfolios.slice(1).map((item, index) => <S.PortfolioItem key={item.title} onClick={() => navigate(`/giut-hub/${profile.profileNumber}/portfolio/${index + 2}`)} type="button"><S.ListDot /><S.PortfolioCopy><strong>{item.title}</strong><small>{portfolioPeriods[index + 1]}</small></S.PortfolioCopy><Icon name="caret-right" size={22} weight="bold" /></S.PortfolioItem>)}</S.PortfolioList>
        </S.TabContent>}
        {activeTab === "teams" && <S.TabContent><S.SimpleList><S.SimpleItem><S.ListDot /><S.SimpleCopy><strong>데이터로 서울을</strong><small>팀장 · 3/5명 · 새 지원 3건</small></S.SimpleCopy></S.SimpleItem><S.SimpleItem><S.ListDot /><S.SimpleCopy><strong>ESG 캠페인 프로젝트</strong><small>팀원 · 4/4명 · 진행 중</small></S.SimpleCopy></S.SimpleItem></S.SimpleList></S.TabContent>}
        {activeTab === "scraps" && <S.ScrapContent>
          <S.ScrapFilterList aria-label="스크랩 분류">
            {([ ["all", "전체 8"], ["posts", "게시물 5"], ["teams", "팀 3"] ] as const).map(([value, label]) => <S.ScrapFilterButton $active={scrapFilter === value} aria-pressed={scrapFilter === value} key={value} onClick={() => setScrapFilter(value)} type="button">{label}</S.ScrapFilterButton>)}
          </S.ScrapFilterList>
          {scrapFilter !== "teams" && <S.ScrapGroup><S.ScrapGroupTitle><S.ScrapGroupLabel><span />게시물 <em>5</em></S.ScrapGroupLabel><S.ViewAllButton type="button">전체보기 <Icon name="caret-right" size={15} weight="bold" /></S.ViewAllButton></S.ScrapGroupTitle><S.ScrapCardList>{scrapPosts.map((post) => <S.ScrapPostCard key={post.title}><S.ScrapThumbnail $tone={post.tone} /><S.ScrapPostCopy><span><S.ScrapCategory $tone={post.tone}>{post.category}</S.ScrapCategory><small>{post.savedAt}</small></span><strong>{post.title}</strong><p>{post.organization}</p></S.ScrapPostCopy><S.ScrapPostAction><b>{post.deadline}</b><Icon name="bookmark" size={18} weight="fill" /></S.ScrapPostAction></S.ScrapPostCard>)}</S.ScrapCardList></S.ScrapGroup>}
          {scrapFilter !== "posts" && <S.ScrapGroup><S.ScrapGroupTitle><S.ScrapGroupLabel $team><span />팀 <em>3</em></S.ScrapGroupLabel><S.ViewAllButton type="button">전체보기 <Icon name="caret-right" size={15} weight="bold" /></S.ViewAllButton></S.ScrapGroupTitle><S.ScrapCardList>{scrapTeams.map((team) => <S.ScrapTeamCard key={team.title}><S.TeamThumbnail><Icon name="user" size={24} weight="regular" /></S.TeamThumbnail><S.ScrapTeamCopy><span><S.TeamBadge><Icon name="users" size={13} weight="regular" />팀</S.TeamBadge><small>{team.status}</small></span><strong>{team.title}</strong><p>{team.detail}</p></S.ScrapTeamCopy><S.ScrapTeamAction><Icon name="bookmark" size={18} weight="fill" /><Icon name="caret-right" size={17} weight="bold" /></S.ScrapTeamAction></S.ScrapTeamCard>)}</S.ScrapCardList></S.ScrapGroup>}
        </S.ScrapContent>}
      </S.Content>
      <BottomNavigation activeKey="mypage" items={navigationItems} onChange={(key) => { if (key === "home") navigate("/home"); if (key === "hub") navigate("/giut-hub"); if (key === "chat") navigate("/chat"); }} />
    </S.Page>
  );
}
