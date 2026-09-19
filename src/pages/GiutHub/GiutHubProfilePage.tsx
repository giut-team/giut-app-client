import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { PageHeader } from "../../components/PageHeader";
import { Icon } from "../../components/icons";
import dataDashboard from "../../assets/portfolio/data-dashboard.png";
import esgGlobe from "../../assets/portfolio/esg-globe.png";
import hackathonCode from "../../assets/portfolio/hackathon-code.png";
import projectRoadmap from "../../assets/portfolio/project-roadmap.png";
import { getResponseStatus, giutHubProfiles } from "./GiutHubPage";
import { S } from "./GiutHubProfilePage.styles";

export type Portfolio = { title: string; description: string; image: string; markdown: string };
export type ProfileDetail = { skills: string[]; portfolios: Portfolio[] };
type Activity = { title: string; description: string };
type ProposalTeam = { id: string; name: string; summary: string; disabled?: boolean };

const proposalTeams: ProposalTeam[] = [
  { id: "data-seoul", name: "데이터로 서울을", summary: "서울시 데이터 공모전 · 3/5명 · 백엔드 개발자 1자리" },
  { id: "calendar-hackathon", name: "캘린더 해커톤 4팀", summary: "제 12회 캘린더 해커톤 · 2/5명 · 백엔드 개발자 2자리" },
  { id: "greentech", name: "그린테크 스터디팀", summary: "모집 마감 · 남은 자리 없음", disabled: true },
];

const proposalPositions = ["백엔드 개발자", "데이터 엔지니어"];

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

export const getSkillIcon = (label: string) => {
  const fileName = skillIconFileNames[label];
  return fileName ? skillIconSources[`../../assets/skills/${fileName}.svg`] : undefined;
};

const portfolioImages = [dataDashboard, esgGlobe, hackathonCode, projectRoadmap];
const portfolio = (titles: string[], descriptions: string[]): Portfolio[] =>
  titles.map((title, index) => ({
    title,
    description: descriptions[index],
    image: portfolioImages[index],
    markdown: `## 프로젝트 소개\n\n${descriptions[index]}\n\n## 담당한 일\n\n- 공공데이터 수집 및 전처리\n- 핵심 지표 설계와 데이터 시각화\n- 최종 발표 자료 구성 및 발표\n\n## 성과\n\n**사용자가 정보를 한눈에 이해할 수 있는 결과물**로 정리했습니다.`,
  }));

export const detailsByProfileId: Record<string, ProfileDetail> = {
  minjae: { skills: ["Python", "SQL", "데이터 시각화", "프론트엔드"], portfolios: portfolio(["서울시 데이터 공모전 발표", "ESG 캠페인 팀 회의", "교내 SW 해커톤 우수상", "캠퍼스 대시보드 사이드 프로젝트"], ["데이터 정책부터 발표까지 맡았어요", "일정 정리는 제가 맡는 편이에요", "백엔드 API 설계를 담당했어요", "주말마다 지표를 시각화했어요"]) },
  seoyeon: { skills: ["서비스 기획", "리서치", "시장 분석", "Notion"], portfolios: portfolio(["교내 커뮤니티 개선 프로젝트", "공모전 서비스 기획서", "캠퍼스 행사 운영", "사용자 리서치 프로젝트"], ["사용자 인터뷰와 기획을 진행했어요", "문제 정의와 전략을 맡았어요", "운영 플로우를 설계했어요", "인사이트를 정리했어요"]) },
  jiwoo: { skills: ["UX/UI", "Figma", "프로토타이핑", "디자인 시스템"], portfolios: portfolio(["모바일 앱 리디자인", "공모전 랜딩 페이지", "디자인 시스템 정리", "사용자 여정 지도"], ["사용성 개선안을 만들었어요", "브랜드 경험을 디자인했어요", "컴포넌트를 구조화했어요", "핵심 경험을 시각화했어요"]) },
  junseo: { skills: ["Spring", "Java", "MySQL", "API 설계"], portfolios: portfolio(["팀 매칭 API 개발", "공모전 관리 서비스", "교내 해커톤", "데이터 연동 프로젝트"], ["핵심 API를 구현했어요", "서버 구조를 설계했어요", "백엔드를 담당했어요", "외부 API를 연결했어요"]) },
  dohyun: { skills: ["서비스 기획", "리서치", "운영", "문서화"], portfolios: portfolio(["지역 문제 해결 공모전", "정책 아이디어 제안", "팀 운영 가이드", "사용자 인터뷰"], ["프로젝트 방향을 이끌었어요", "리서치와 발표를 맡았어요", "협업 방식을 정리했어요", "문제를 발견하고 정의했어요"]) },
  hayoon: { skills: ["브랜딩", "UI 디자인", "Figma", "그래픽"], portfolios: portfolio(["브랜드 아이덴티티 제작", "앱 UI 디자인", "공모전 홍보물", "디자인 가이드"], ["시각 언어를 만들었어요", "핵심 화면을 설계했어요", "콘텐츠를 디자인했어요", "일관된 스타일을 정리했어요"]) },
  soomin: { skills: ["SNS 마케팅", "콘텐츠", "카피라이팅", "분석"], portfolios: portfolio(["교내 행사 SNS 캠페인", "브랜드 콘텐츠 기획", "참여율 분석 리포트", "공모전 홍보 프로젝트"], ["콘텐츠 전략을 수립했어요", "타깃별 콘텐츠를 만들었어요", "성과를 분석했어요", "홍보 채널을 운영했어요"]) },
  minho: { skills: ["데이터 분석", "광고 기획", "GA", "콘텐츠"], portfolios: portfolio(["광고 성과 분석", "캠페인 기획안", "소비자 조사", "브랜드 협업 프로젝트"], ["데이터 기반 개선안을 냈어요", "타깃 전략을 설계했어요", "인사이트를 도출했어요", "제안 자료를 만들었어요"]) },
  yujin: { skills: ["사업 기획", "시장 분석", "서비스 기획", "리서치"], portfolios: portfolio(["예비창업패키지 사업 계획", "청년 창업 서비스 기획", "시장 검증 리서치", "팀 협업 로드맵"], ["아이디어를 사업 계획으로 구체화했어요", "사용자 문제를 정의하고 해결안을 설계했어요", "시장과 경쟁 서비스를 분석했어요", "팀의 실행 계획을 정리했어요"]) },
};

const activitiesByProfileId: Record<string, Activity[]> = {
  minjae: [{ title: "2025 교내 SW 해커톤 우수상", description: "백엔드 · 4인 팀" }, { title: "스타트업 프론트엔드 인턴 6개월", description: "React · TypeScript" }],
  seoyeon: [{ title: "교내 서비스 기획 공모전 대상", description: "기획 · 4인 팀" }, { title: "학생회 서비스 운영", description: "운영 · 콘텐츠 기획" }],
  jiwoo: [{ title: "UX/UI 디자인 공모전 수상", description: "디자인 · 3인 팀" }, { title: "디자인 스터디 운영", description: "Figma · 프로토타이핑" }],
  junseo: [{ title: "교내 SW 해커톤 본선 진출", description: "백엔드 · 5인 팀" }, { title: "개발 동아리 서버 파트", description: "Spring · MySQL" }],
  dohyun: [{ title: "지역 문제 해결 공모전 장려상", description: "기획 · 4인 팀" }, { title: "공공 프로젝트 리서치", description: "리서치 · 문서화" }],
  hayoon: [{ title: "브랜딩 디자인 프로젝트", description: "디자인 · 3인 팀" }, { title: "교내 전시 홍보물 제작", description: "그래픽 · UI 디자인" }],
  soomin: [{ title: "SNS 캠페인 기획 및 운영", description: "마케팅 · 4인 팀" }, { title: "콘텐츠 마케팅 스터디", description: "카피라이팅 · 분석" }],
  minho: [{ title: "데이터 마케팅 공모전 수상", description: "마케팅 · 4인 팀" }, { title: "광고 성과 분석 프로젝트", description: "GA · 데이터 분석" }],
  yujin: [{ title: "예비창업패키지 청년 트랙", description: "사업 기획 · 4인 팀" }, { title: "청년 창업 아이디어톤 본선", description: "기획 · 서비스 설계" }],
};

export function TeamProposalBottomSheet({
  open,
  profileName,
  onClose,
}: {
  open: boolean;
  profileName: string;
  onClose: () => void;
}) {
  const [selectedProposalTeam, setSelectedProposalTeam] = useState("data-seoul");
  const [selectedProposalPosition, setSelectedProposalPosition] = useState(proposalPositions[0]);

  return (
    <BottomSheet
      footer={<S.ProposalFooter><S.ProposalCancelButton onClick={onClose} type="button">취소</S.ProposalCancelButton><S.ProposalConfirmButton onClick={onClose} type="button">이 팀으로 제안 보내기</S.ProposalConfirmButton></S.ProposalFooter>}
      footerVariant="action"
      minHeight="min(76svh, 570px)"
      onClose={onClose}
      open={open}
      showHeaderDivider={false}
      variant="compact"
    >
      <S.ProposalHeading>어느 팀으로 제안할까요?</S.ProposalHeading>
      <S.ProposalDescription>{profileName}님에게 보낼 팀을 골라주세요. 내가 팀장인 팀만 보여요.</S.ProposalDescription>
      <S.ProposalTeamList aria-label="제안할 팀 선택">
        {proposalTeams.map((team) => {
          const selected = selectedProposalTeam === team.id;
          return <S.ProposalTeamCard $disabled={team.disabled === true} $selected={selected} aria-pressed={selected} disabled={team.disabled} key={team.id} onClick={() => setSelectedProposalTeam(team.id)} type="button"><S.ProposalRadio $selected={selected}>{selected && <Icon name="check" size={13} weight="bold" />}</S.ProposalRadio><span><strong>{team.name}</strong><small>{team.summary}</small></span>{team.disabled && <em>선택 불가</em>}</S.ProposalTeamCard>;
        })}
      </S.ProposalTeamList>
      <S.ProposalPositionTitle>제안할 포지션</S.ProposalPositionTitle>
      <S.ProposalPositionList>{proposalPositions.map((position) => <S.ProposalPosition $selected={selectedProposalPosition === position} aria-pressed={selectedProposalPosition === position} key={position} onClick={() => setSelectedProposalPosition(position)} type="button">{position}</S.ProposalPosition>)}</S.ProposalPositionList>
    </BottomSheet>
  );
}

function ProfileMoreBottomSheet({
  open,
  profileName,
  onClose,
}: {
  open: boolean;
  profileName: string;
  onClose: () => void;
}) {
  const shareProfile = async () => {
    const shareData = {
      title: `${profileName}님의 프로필`,
      text: `${profileName}님의 기웃허브 프로필을 확인해 보세요.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard?.writeText(shareData.url);
      }
    } finally {
      onClose();
    }
  };

  return (
    <BottomSheet
      minHeight="auto"
      onClose={onClose}
      open={open}
      showHeaderDivider={false}
      variant="compact"
    >
      <S.ProfileMenu aria-label="프로필 더보기 메뉴">
        <S.ProfileMenuButton onClick={shareProfile} type="button">
          <Icon name="share" size={21} weight="regular" />프로필 공유
        </S.ProfileMenuButton>
        <S.ProfileMenuDivider />
        <S.ProfileMenuButton $destructive onClick={onClose} type="button">
          <Icon name="shield-check" size={21} weight="regular" />신고하기
        </S.ProfileMenuButton>
        <S.ProfileMenuButton $destructive onClick={onClose} type="button">
          <Icon name="lock" size={21} weight="regular" />차단하기
        </S.ProfileMenuButton>
      </S.ProfileMenu>
    </BottomSheet>
  );
}

export function GiutHubProfilePage() {
  const navigate = useNavigate();
  const { profileNumber } = useParams();
  const [activeTab, setActiveTab] = useState<"portfolio" | "activity">("portfolio");
  const [isScrapped, setIsScrapped] = useState(false);
  const [isProposalSheetOpen, setIsProposalSheetOpen] = useState(false);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const profile = giutHubProfiles.find((item) => item.profileNumber === Number(profileNumber));
  if (!profile) return <Navigate replace to="/giut-hub" />;

  const detail = detailsByProfileId[profile.id];
  const activities = activitiesByProfileId[profile.id];
  const responseStatus = getResponseStatus(profile.lastResponseAt);
  const [, departmentAndGrade] = profile.summary.split(" · ", 2);

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate("/giut-hub")} rightContent={<S.MoreButton aria-label="더보기" onClick={() => setIsMoreSheetOpen(true)} type="button"><Icon name="more" size={28} weight="bold" /></S.MoreButton>} title="" />
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
          <Button onClick={() => setIsProposalSheetOpen(true)} type="button" width="100%"><Icon name="paper-plane" size={19} weight="fill" />팀 제안 보내기</Button>
          <S.MessageButton onClick={() => undefined} type="button"><Icon name="chat" size={20} weight="regular" />메시지 보내기</S.MessageButton>
          <S.FavoriteButton $active={isScrapped} aria-label="관심 프로필에 추가" onClick={() => setIsScrapped((current) => !current)} type="button"><Icon name="star" size={21} weight={isScrapped ? "fill" : "regular"} /></S.FavoriteButton>
        </S.ActionRow>
        <S.TabList role="tablist">
          <S.Tab $active={activeTab === "portfolio"} aria-selected={activeTab === "portfolio"} onClick={() => setActiveTab("portfolio")} role="tab" type="button">포트폴리오 {detail.portfolios.length}</S.Tab>
          <S.Tab $active={activeTab === "activity"} aria-selected={activeTab === "activity"} onClick={() => setActiveTab("activity")} role="tab" type="button">활동 이력</S.Tab>
        </S.TabList>
        {activeTab === "portfolio" ? (
          <S.PortfolioContent>
            <S.FeaturedPortfolioCard onClick={() => navigate(`/giut-hub/${profile.profileNumber}/portfolio/1`)}>
              <S.FeaturedPortfolioImage><img alt="" src={detail.portfolios[0].image} /></S.FeaturedPortfolioImage>
              <S.PortfolioCopy><S.RepresentativeLabel>대표 프로젝트</S.RepresentativeLabel><S.PortfolioTitle>{detail.portfolios[0].title}</S.PortfolioTitle><S.PortfolioDescription>{detail.portfolios[0].description}</S.PortfolioDescription></S.PortfolioCopy>
              <S.PortfolioArrow><Icon name="caret-right" size={20} weight="regular" /></S.PortfolioArrow>
            </S.FeaturedPortfolioCard>
            <S.PortfolioList>{detail.portfolios.slice(1).map((item, index) => <S.PortfolioCard key={item.title} onClick={() => navigate(`/giut-hub/${profile.profileNumber}/portfolio/${index + 2}`)}><S.PortfolioImage><img alt="" src={item.image} /></S.PortfolioImage><S.PortfolioCopy><S.PortfolioTitle>{item.title}</S.PortfolioTitle><S.PortfolioDescription>{item.description}</S.PortfolioDescription></S.PortfolioCopy><S.PortfolioArrow><Icon name="caret-right" size={20} weight="regular" /></S.PortfolioArrow></S.PortfolioCard>)}</S.PortfolioList>
          </S.PortfolioContent>
        ) : <S.ActivityList>{activities.map((activity, index) => <S.ActivityItem $last={index === activities.length - 1} key={activity.title}><S.ActivityDot /><S.ActivityCopy><S.ActivityTitle>{activity.title}</S.ActivityTitle><S.ActivityDescription>{activity.description}</S.ActivityDescription></S.ActivityCopy></S.ActivityItem>)}</S.ActivityList>}
      </S.Content>
      <TeamProposalBottomSheet onClose={() => setIsProposalSheetOpen(false)} open={isProposalSheetOpen} profileName={profile.name} />
      <ProfileMoreBottomSheet onClose={() => setIsMoreSheetOpen(false)} open={isMoreSheetOpen} profileName={profile.name} />
    </S.Page>
  );
}
