import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import giutLogo from "../../assets/giut-logo.svg";
import { S } from "./MyTeamPage.styles";

const teams = [
  {
    status: "팀장",
    newApplications: "새 지원 3",
    title: "데이터로 서울을",
    description: "서울시 데이터 공모전 · 3/5명",
    progress: 60,
    tone: "primary" as const,
  },
  {
    status: "팀원",
    title: "ESG 캠페인 프로젝트",
    description: "한국디자인진흥원 · 4/4명 · 진행 중",
    progress: 100,
    tone: "success" as const,
  },
];

const applicants = [
  {
    initial: "김",
    name: "김현진",
    role: "백엔드 개발자",
    school: "서울시립대 컴퓨터과학부 3학년",
    message: "Spring · PostgreSQL로 공공데이터 API 2개 만들어봤어요.",
    reason: "이 팀에 지원한 이유",
    answer:
      "서울시 교통 공공데이터를 다루는 경험이 있어서 이번 공모전 주제와 잘 맞을 것 같아 지원했습니다.",
    tone: "blue" as const,
  },
  {
    initial: "박",
    name: "박서준",
    role: "데이터 분석",
    school: "서울시립대 통계학과 4학년",
    message: "교통 데이터로 수상한 경험이 있어 분석 파트를 맡고 싶어요.",
    reason: "이 팀에 지원한 이유",
    answer:
      "지난 학기 교통 혼잡도 분석으로 교내 공모전에서 수상했고, 이번에는 공공데이터 프로젝트를 제대로 해보고 싶습니다.",
    tone: "purple" as const,
  },
  {
    initial: "최",
    name: "최유나",
    role: "UI 디자이너",
    school: "서울시립대 산업디자인학과 3학년",
    message: "대시보드 화면 설계와 발표자료까지 함께 만들 수 있어요.",
    reason: "이 팀에 지원한 이유",
    answer:
      "데이터를 한눈에 보여주는 일에 관심이 많아 지원했습니다. 서비스 UI를 초기 구조부터 함께 만들고 싶어요.",
    tone: "success" as const,
  },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function MyTeamPage() {
  const navigate = useNavigate();
  const [activeNavigation, setActiveNavigation] = useState("home");

  return (
    <S.Page>
      <S.TopArea>
        <S.Header>
          <S.Brand aria-label="기웃">
            <span>기웃</span>
            <S.BrandMark alt="" aria-hidden="true" src={giutLogo} />
          </S.Brand>
          <S.HeaderActions>
            <S.HeaderButton
              aria-label="홈으로 이동"
              onClick={() => navigate("/home")}
              type="button"
            >
              <Icon name="users" size={17} weight="fill" />
              <S.HeaderBadge>3</S.HeaderBadge>
            </S.HeaderButton>
            <S.HeaderButton aria-label="검색" type="button">
              <Icon name="search" size={17} weight="regular" />
            </S.HeaderButton>
            <S.HeaderButton aria-label="알림" type="button">
              <Icon name="bell" size={17} weight="regular" />
              <S.NotificationDot />
            </S.HeaderButton>
          </S.HeaderActions>
        </S.Header>

        <S.Greeting>이루매님, 안녕하세요</S.Greeting>
        <S.Title>
          내 팀에 새 지원 3건이
          <br />
          기다리고 있어요
        </S.Title>
      </S.TopArea>

      <S.TeamSection>
        <S.SectionHeader>
          <S.SectionTitle>내 팀 2</S.SectionTitle>
          <S.ViewAll type="button">전체보기 ›</S.ViewAll>
        </S.SectionHeader>

        <S.TeamScroller aria-label="내 팀 목록">
          {teams.map((team) => (
            <S.TeamCard key={team.title}>
              <S.TeamBadges>
                <S.TeamStatus $tone={team.tone}>{team.status}</S.TeamStatus>
                {team.newApplications && (
                  <S.NewApplications>{team.newApplications}</S.NewApplications>
                )}
              </S.TeamBadges>
              <S.TeamTitle>{team.title}</S.TeamTitle>
              <S.TeamDescription>{team.description}</S.TeamDescription>
              <S.ProgressTrack>
                <S.ProgressBar $progress={team.progress} $tone={team.tone} />
              </S.ProgressTrack>
            </S.TeamCard>
          ))}
          <S.CreateTeamCard type="button">
            <Icon name="plus" size={19} weight="bold" />
            <span>팀 만들기</span>
          </S.CreateTeamCard>
        </S.TeamScroller>
      </S.TeamSection>

      <S.ApplicationSection>
        <S.ApplicationHeader>
          <S.ApplicationTitle>데이터로 서울을 · 받은 지원 3</S.ApplicationTitle>
        </S.ApplicationHeader>

        <S.ApplicantList>
          {applicants.map((applicant) => (
            <S.ApplicantCard key={applicant.name}>
              <S.ApplicantHeader>
                <S.Avatar $tone={applicant.tone}>{applicant.initial}</S.Avatar>
                <S.ApplicantIdentity>
                  <S.ApplicantName>{applicant.name}</S.ApplicantName>
                  <S.ApplicantRole $tone={applicant.tone}>
                    {applicant.role}
                  </S.ApplicantRole>
                  <S.ApplicantSchool>{applicant.school}</S.ApplicantSchool>
                </S.ApplicantIdentity>
                <Icon name="caret-right" size={13} weight="bold" />
              </S.ApplicantHeader>
              <S.ApplicantMessage>{applicant.message}</S.ApplicantMessage>
              <S.ReasonLabel>{applicant.reason}</S.ReasonLabel>
              <S.ApplicantAnswer>{applicant.answer}</S.ApplicantAnswer>
              <S.ApplicantActions>
                <S.RejectButton tone="secondary" type="button">
                  거절
                </S.RejectButton>
                <S.AcceptButton type="button">수락</S.AcceptButton>
              </S.ApplicantActions>
            </S.ApplicantCard>
          ))}
        </S.ApplicantList>

        <S.ManageButton type="button" width="100%">
          지원 3건 관리하기
        </S.ManageButton>
        <S.InfoNote>
          팀에 소속되면 홈은 내 팀 중심으로 바뀌어요. 공모전 탐색은 하단 공모전
          탭에서 계속할 수 있습니다.
        </S.InfoNote>
      </S.ApplicationSection>

      <BottomNavigation
        activeKey={activeNavigation}
        items={navigationItems}
        onChange={(key) => {
          setActiveNavigation(key);
          if (key === "home") navigate("/home");
        }}
      />
    </S.Page>
  );
}
