import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { PageHeader } from "../../components/PageHeader";
import { Icon } from "../../components/icons";
import dataDashboard from "../../assets/portfolio/data-dashboard.png";
import esgGlobe from "../../assets/portfolio/esg-globe.png";
import hackathonCode from "../../assets/portfolio/hackathon-code.png";
import projectRoadmap from "../../assets/portfolio/project-roadmap.png";
import { getResponseStatus, giutHubProfiles } from "./GiutHubPage";
import { S } from "./GiutHubProfilePage.styles";

type Portfolio = { title: string; description: string; image: string };
type ProfileDetail = { skills: string[]; portfolios: Portfolio[] };

const skillIconFileNames: Record<string, string> = {
  Python: "python", SQL: "sql", "데이터 시각화": "data-visualization", 프론트엔드: "frontend",
  "서비스 기획": "service-planning", 리서치: "research", "시장 분석": "market-analysis", Notion: "notion",
  "UX/UI": "ux-ui", Figma: "figma", 프로토타이핑: "prototyping", "디자인 시스템": "design-system",
  Spring: "spring", Java: "java", MySQL: "mysql", "API 설계": "api-design", 운영: "operations", 문서화: "documentation",
  브랜딩: "branding", "UI 디자인": "ui-design", 그래픽: "graphics", "SNS 마케팅": "sns-marketing",
  콘텐츠: "content", 카피라이팅: "copywriting", 분석: "analysis", "데이터 분석": "data-analysis", "광고 기획": "ad-planning", GA: "ga",
};

const skillIconSources = import.meta.glob("../../assets/skills/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getSkillIcon = (label: string) => {
  const fileName = skillIconFileNames[label];
  return fileName ? skillIconSources[`../../assets/skills/${fileName}.svg`] : undefined;
};

const portfolioImages = [dataDashboard, esgGlobe, hackathonCode, projectRoadmap];
const portfolio = (titles: string[], descriptions: string[]): Portfolio[] =>
  titles.map((title, index) => ({ title, description: descriptions[index], image: portfolioImages[index] }));

const detailsByProfileId: Record<string, ProfileDetail> = {
  minjae: { skills: ["Python", "SQL", "데이터 시각화", "프론트엔드"], portfolios: portfolio(["서울시 데이터 공모전 발표", "ESG 캠페인 팀 회의", "교내 SW 해커톤 우수상", "캠퍼스 대시보드 사이드 프로젝트"], ["데이터 정책부터 발표까지 맡았어요", "일정 정리는 제가 맡는 편이에요", "백엔드 API 설계를 담당했어요", "주말마다 지표를 시각화했어요"]) },
  seoyeon: { skills: ["서비스 기획", "리서치", "시장 분석", "Notion"], portfolios: portfolio(["교내 커뮤니티 개선 프로젝트", "공모전 서비스 기획서", "캠퍼스 행사 운영", "사용자 리서치 프로젝트"], ["사용자 인터뷰와 기획을 진행했어요", "문제 정의와 전략을 맡았어요", "운영 플로우를 설계했어요", "인사이트를 정리했어요"]) },
  jiwoo: { skills: ["UX/UI", "Figma", "프로토타이핑", "디자인 시스템"], portfolios: portfolio(["모바일 앱 리디자인", "공모전 랜딩 페이지", "디자인 시스템 정리", "사용자 여정 지도"], ["사용성 개선안을 만들었어요", "브랜드 경험을 디자인했어요", "컴포넌트를 구조화했어요", "핵심 경험을 시각화했어요"]) },
  junseo: { skills: ["Spring", "Java", "MySQL", "API 설계"], portfolios: portfolio(["팀 매칭 API 개발", "공모전 관리 서비스", "교내 해커톤", "데이터 연동 프로젝트"], ["핵심 API를 구현했어요", "서버 구조를 설계했어요", "백엔드를 담당했어요", "외부 API를 연결했어요"]) },
  dohyun: { skills: ["서비스 기획", "리서치", "운영", "문서화"], portfolios: portfolio(["지역 문제 해결 공모전", "정책 아이디어 제안", "팀 운영 가이드", "사용자 인터뷰"], ["프로젝트 방향을 이끌었어요", "리서치와 발표를 맡았어요", "협업 방식을 정리했어요", "문제를 발견하고 정의했어요"]) },
  hayoon: { skills: ["브랜딩", "UI 디자인", "Figma", "그래픽"], portfolios: portfolio(["브랜드 아이덴티티 제작", "앱 UI 디자인", "공모전 홍보물", "디자인 가이드"], ["시각 언어를 만들었어요", "핵심 화면을 설계했어요", "콘텐츠를 디자인했어요", "일관된 스타일을 정리했어요"]) },
  soomin: { skills: ["SNS 마케팅", "콘텐츠", "카피라이팅", "분석"], portfolios: portfolio(["교내 행사 SNS 캠페인", "브랜드 콘텐츠 기획", "참여율 분석 리포트", "공모전 홍보 프로젝트"], ["콘텐츠 전략을 수립했어요", "타깃별 콘텐츠를 만들었어요", "성과를 분석했어요", "홍보 채널을 운영했어요"]) },
  minho: { skills: ["데이터 분석", "광고 기획", "GA", "콘텐츠"], portfolios: portfolio(["광고 성과 분석", "캠페인 기획안", "소비자 조사", "브랜드 협업 프로젝트"], ["데이터 기반 개선안을 냈어요", "타깃 전략을 설계했어요", "인사이트를 도출했어요", "제안 자료를 만들었어요"]) },
};

export function GiutHubProfilePage() {
  const navigate = useNavigate();
  const { profileNumber } = useParams();
  const [activeTab, setActiveTab] = useState<"portfolio" | "activity">("portfolio");
  const [isScrapped, setIsScrapped] = useState(false);
  const profile = giutHubProfiles.find((item) => item.profileNumber === Number(profileNumber));
  if (!profile) return <Navigate replace to="/giut-hub" />;

  const detail = detailsByProfileId[profile.id];
  const responseStatus = getResponseStatus(profile.lastResponseAt);
  const [, departmentAndGrade] = profile.summary.split(" · ", 2);

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate("/giut-hub")} rightContent={<S.MoreButton aria-label="더보기" type="button"><Icon name="more" size={28} weight="bold" /></S.MoreButton>} title="" />
        <S.ProfileSection>
          <S.Avatar $tone={profile.avatarTone}>{profile.avatarSrc ? <img alt={`${profile.name} 프로필`} src={profile.avatarSrc} /> : profile.avatarFallback}</S.Avatar>
          <S.ProfileInfo>
            <S.Name>{profile.name}</S.Name>
            <S.DetailRow><span>학과/학년</span><strong>{departmentAndGrade}</strong></S.DetailRow>
            <S.DetailRow><span>분야/역할</span><strong>{profile.detailRole} / {profile.role}</strong></S.DetailRow>
            <S.Status>{profile.status}</S.Status>
          </S.ProfileInfo>
        </S.ProfileSection>
        <S.IntroductionSection><S.FieldLabel>자기소개</S.FieldLabel><S.Introduction>{profile.introduction}</S.Introduction></S.IntroductionSection>
        <S.Metrics aria-label="프로필 활동 정보">
          <S.Metric><Icon name="users" size={29} weight="regular" /><span>협업 경험<strong>{profile.projectCount}회</strong></span></S.Metric>
          <S.Metric><Icon name="lightning" size={29} weight="regular" /><span>{responseStatus.label}<small>최근 답장 {responseStatus.elapsedHours}시간 전</small></span></S.Metric>
          <S.Metric><Icon name="star" size={29} weight="regular" /><span>추천<strong>{profile.recommendationCount}</strong></span></S.Metric>
        </S.Metrics>
        <S.SkillList aria-label="보유 기술">{detail.skills.map((skill, index) => <S.Skill $index={index} key={skill}>{getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}{skill}</S.Skill>)}</S.SkillList>
        <S.ActionRow>
          <Button onClick={() => undefined} type="button" width="100%"><Icon name="paper-plane" size={19} weight="fill" />팀 제안 보내기</Button>
          <S.MessageButton onClick={() => undefined} type="button"><Icon name="chat" size={20} weight="regular" />메시지 보내기</S.MessageButton>
          <S.FavoriteButton $active={isScrapped} aria-label="관심 프로필에 추가" onClick={() => setIsScrapped((current) => !current)} type="button"><Icon name="star" size={21} weight={isScrapped ? "fill" : "regular"} /></S.FavoriteButton>
        </S.ActionRow>
        <S.TabList role="tablist">
          <S.Tab $active={activeTab === "portfolio"} aria-selected={activeTab === "portfolio"} onClick={() => setActiveTab("portfolio")} role="tab" type="button">포트폴리오 {detail.portfolios.length}</S.Tab>
          <S.Tab $active={activeTab === "activity"} aria-selected={activeTab === "activity"} onClick={() => setActiveTab("activity")} role="tab" type="button">활동 이력</S.Tab>
        </S.TabList>
        {activeTab === "portfolio" ? (
          <S.PortfolioContent>
            <S.FeaturedPortfolioCard>
              <S.FeaturedPortfolioImage><img alt="" src={detail.portfolios[0].image} /></S.FeaturedPortfolioImage>
              <S.PortfolioCopy><S.RepresentativeLabel>대표 프로젝트</S.RepresentativeLabel><S.PortfolioTitle>{detail.portfolios[0].title}</S.PortfolioTitle><S.PortfolioDescription>{detail.portfolios[0].description}</S.PortfolioDescription></S.PortfolioCopy>
              <S.PortfolioArrow><Icon name="caret-right" size={20} weight="regular" /></S.PortfolioArrow>
            </S.FeaturedPortfolioCard>
            <S.PortfolioList>{detail.portfolios.slice(1).map((item) => <S.PortfolioCard key={item.title}><S.PortfolioImage><img alt="" src={item.image} /></S.PortfolioImage><S.PortfolioCopy><S.PortfolioTitle>{item.title}</S.PortfolioTitle><S.PortfolioDescription>{item.description}</S.PortfolioDescription></S.PortfolioCopy><S.PortfolioArrow><Icon name="caret-right" size={20} weight="regular" /></S.PortfolioArrow></S.PortfolioCard>)}</S.PortfolioList>
          </S.PortfolioContent>
        ) : <S.EmptyTab>등록된 활동 이력이 없어요.</S.EmptyTab>}
      </S.Content>
    </S.Page>
  );
}
