import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../../components/BottomNavigation/BottomNavigation";
import {
  BottomSheet,
  type ApplicationCancelState,
  type DecisionMode,
} from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import giutLogo from "../../../assets/giut-logo.svg";
import {
  applicants,
  type Applicant,
} from "../myTeam.data";
import { S } from "./MyTeamPage.styles";

type TeamKind = "leader" | "member" | "pending";

type Team = {
  id: string;
  kind: TeamKind;
  status: string;
  title: string;
  description: string;
  tone: "primary" | "success" | "pending";
  progress?: number;
  newApplications?: string;
  elapsed?: string;
};

const teams: Team[] = [
  {
    id: "pending-esg",
    kind: "pending",
    status: "지원 대기",
    elapsed: "3일 경과",
    title: "ESG 임팩트 캠페인",
    description: "한국디자인진흥원 · 3/4명 · 모집 중",
    tone: "pending",
  },
  {
    id: "data-seoul",
    kind: "leader",
    status: "팀장",
    newApplications: "새 지원 3",
    title: "데이터로 서울을",
    description: "서울시 데이터 공모전 · 3/5명",
    progress: 60,
    tone: "primary" as const,
  },
  {
    id: "esg-campaign",
    kind: "member",
    status: "팀원",
    title: "ESG 캠페인 프로젝트",
    description: "한국디자인진흥원 · 4/4명 · 진행 중",
    progress: 100,
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
  const location = useLocation();
  const wasPendingApplicationCancelled = Boolean(
    (location.state as { pendingApplicationCancelled?: boolean } | null)
      ?.pendingApplicationCancelled,
  );
  const [activeNavigation, setActiveNavigation] = useState("home");
  const [selectedTeamId, setSelectedTeamId] = useState("pending-esg");
  const [hasPendingApplication, setHasPendingApplication] = useState(
    () => !wasPendingApplicationCancelled,
  );
  const [applicationCancelState, setApplicationCancelState] =
    useState<ApplicationCancelState | null>(null);
  const [decisionRequest, setDecisionRequest] = useState<{
    mode: DecisionMode;
    applicant: Applicant;
  } | null>(null);
  const visibleTeams = teams.filter(
    (team) => team.kind !== "pending" || hasPendingApplication,
  );
  const selectedTeam =
    visibleTeams.find((team) => team.id === selectedTeamId) ?? visibleTeams[0];
  const selectedApplicants = applicants.filter(
    (applicant) => applicant.teamId === selectedTeam.id,
  );
  const isMemberTeam = selectedTeam.kind === "member";
  const isPendingTeam = selectedTeam.kind === "pending";
  const teamCount = visibleTeams.filter(
    (team) => team.kind !== "pending",
  ).length;

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
        {isPendingTeam ? (
          <S.Title>
            보낸 지원 1건이
            <br />
            검토를 기다리고 있어요
          </S.Title>
        ) : isMemberTeam ? (
          <S.Title>
            ESG 캠페인 프로젝트가
            <br />
            진행 중이에요
          </S.Title>
        ) : (
          <S.Title>
            내 팀에 새 지원 3건이
            <br />
            기다리고 있어요
          </S.Title>
        )}
      </S.TopArea>

      <S.TeamSection>
        <S.SectionHeader>
          <S.SectionTitle>
            내 팀 {teamCount}
            {hasPendingApplication && " · 지원 대기 1"}
          </S.SectionTitle>
        </S.SectionHeader>

        <S.TeamScroller aria-label="내 팀 목록">
          {visibleTeams.map((team) => (
            <S.TeamCard
              $pending={team.kind === "pending"}
              $selected={team.id === selectedTeam.id}
              aria-pressed={team.id === selectedTeam.id}
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              type="button"
            >
              <S.TeamBadges>
                <S.TeamStatus $tone={team.tone}>{team.status}</S.TeamStatus>
                {team.newApplications && (
                  <S.NewApplications>{team.newApplications}</S.NewApplications>
                )}
                {team.elapsed && (
                  <S.ElapsedBadge>{team.elapsed}</S.ElapsedBadge>
                )}
              </S.TeamBadges>
              <S.TeamTitle>{team.title}</S.TeamTitle>
              <S.TeamDescription>{team.description}</S.TeamDescription>
              {team.kind === "pending" ? (
                <S.PendingMessage>팀장이 마지막 확인 중이에요</S.PendingMessage>
              ) : (
                <S.ProgressTrack>
                  <S.ProgressBar
                    $progress={team.progress ?? 0}
                    $tone={team.tone}
                  />
                </S.ProgressTrack>
              )}
            </S.TeamCard>
          ))}
          <S.CreateTeamCard type="button">
            <Icon name="plus" size={19} weight="bold" />
            <span>팀 만들기</span>
          </S.CreateTeamCard>
        </S.TeamScroller>
      </S.TeamSection>

      {isMemberTeam || isPendingTeam ? (
        <S.MemberApplicationSection $pending={isPendingTeam}>
          <S.MemberSectionTitle>
            {selectedTeam.title} · 내가 쓴 지원서
          </S.MemberSectionTitle>
          <S.MemberSectionSubtitle>
            {isPendingTeam
              ? "2월 15일에 보냈어요 · 팀장이 2월 16일에 열람했습니다"
              : "2월 15일에 보낸 지원서예요 · 팀장이 수락해 팀에 합류했어요"}
          </S.MemberSectionSubtitle>

          {isPendingTeam && (
            <S.MemberTimeline aria-label="지원 진행 상태">
              <S.MemberTimelineStep $state="complete">
                <S.MemberTimelineDot />
                제출 2/15
              </S.MemberTimelineStep>
              <S.MemberTimelineLine />
              <S.MemberTimelineStep $state="complete">
                <S.MemberTimelineDot />
                열람 2/16
              </S.MemberTimelineStep>
              <S.MemberTimelineLine />
              <S.MemberTimelineStep $state="pending">
                <S.MemberTimelineDot />
                결과 대기
              </S.MemberTimelineStep>
            </S.MemberTimeline>
          )}

          <S.MemberApplicationCard>
            <S.MemberApplicationHeader>
              {isPendingTeam ? (
                <S.PendingStatus>대기 중</S.PendingStatus>
              ) : (
                <S.MemberStatus>수락됨</S.MemberStatus>
              )}
              <S.MemberRole>데이터 시각화</S.MemberRole>
              <S.MemberReceivedAt>2월 15일 지원</S.MemberReceivedAt>
            </S.MemberApplicationHeader>

            <S.MemberProfile>
              <S.MemberAvatar>이</S.MemberAvatar>
              <S.MemberIdentity>
                <S.MemberName>이루매 · 데이터 시각화</S.MemberName>
                <S.MemberSchool>서울시립대 컴퓨터과학부 3학년</S.MemberSchool>
              </S.MemberIdentity>
            </S.MemberProfile>

            <S.MemberQuestion>
              <S.MemberQuestionTitle>
                Q1. 이 팀에 지원한 이유
              </S.MemberQuestionTitle>
              <S.MemberAnswer>
                캠페인 성과를 숫자로 보여주는 일에 관심이 많았습니다. ESG 주제는
                데이터가 준비된 큰 과제라고 생각해서, 기획 단계부터 지표를 함께
                잡아보고 싶어 지원했습니다.
              </S.MemberAnswer>
            </S.MemberQuestion>
            <S.MemberQuestion>
              <S.MemberQuestionTitle>
                Q2. 맡을 수 있는 역할
              </S.MemberQuestionTitle>
              <S.MemberAnswer>
                데이터 수집·정제와 시각화를 맡을 수 있습니다. Python·SQL로
                공공데이터를 다뤄봤고, 발표용 대시보드까지 정리해 본 경험이
                있습니다.
              </S.MemberAnswer>
            </S.MemberQuestion>
            <S.MemberQuestion>
              <S.MemberQuestionTitle>Q3. 참여 가능 시간</S.MemberQuestionTitle>
              <S.MemberAnswer>
                주 10시간 이상 · 평일 저녁, 주말 오후 참여 가능
              </S.MemberAnswer>
            </S.MemberQuestion>

            <S.MemberOriginalLink
              onClick={() =>
                navigate(
                  isPendingTeam
                    ? "/my-team/my-application/pending"
                    : "/my-team/my-application",
                )
              }
              type="button"
            >
              지원서 원본 보기 ›
            </S.MemberOriginalLink>
          </S.MemberApplicationCard>

          {isPendingTeam ? (
            <S.MemberCancelButton
              onClick={() => setApplicationCancelState("confirm")}
              type="button"
            >
              지원 취소하기
            </S.MemberCancelButton>
          ) : (
            <S.MemberChatButton type="button" width="100%">
              <Icon name="chat" size={14} weight="fill" />
              팀장님에게 대화하러 가기
            </S.MemberChatButton>
          )}
          <S.MemberInfoNote>
            {isPendingTeam
              ? "팀장이 수락하면 알림으로 알려드립니다."
              : "팀원으로 합류한 팀에서는 내가 보낸 지원서를 확인할 수 있어요."}
          </S.MemberInfoNote>
        </S.MemberApplicationSection>
      ) : (
        <>
          <S.ApplicationSection>
            <S.ApplicationHeader>
              <S.ApplicationTitle>
                {selectedTeam.title} · 받은 지원 {selectedApplicants.length}
              </S.ApplicationTitle>
            </S.ApplicationHeader>

            <S.ApplicantList>
              {selectedApplicants.map((applicant) => (
                <S.ApplicantCard key={applicant.id}>
                  <S.ApplicantHeader>
                    <S.Avatar $tone={applicant.tone}>
                      {applicant.initial}
                    </S.Avatar>
                    <S.ApplicantIdentity>
                      <S.ApplicantName>{applicant.name}</S.ApplicantName>
                      <S.ApplicantRole $tone={applicant.tone}>
                        {applicant.role}
                      </S.ApplicantRole>
                      <S.ApplicantSchool>{applicant.school}</S.ApplicantSchool>
                    </S.ApplicantIdentity>
                    <S.DetailButton
                      aria-label={`${applicant.name} 지원서 상세보기`}
                      onClick={() =>
                        navigate(`/my-team/applications/${applicant.id}`)
                      }
                      type="button"
                    >
                      <Icon name="caret-right" size={13} weight="bold" />
                    </S.DetailButton>
                  </S.ApplicantHeader>
                  <S.ApplicantMessage>{applicant.message}</S.ApplicantMessage>
                  <S.ReasonLabel>{applicant.reason}</S.ReasonLabel>
                  <S.ApplicantAnswer>{applicant.answer}</S.ApplicantAnswer>
                  <S.ApplicantActions>
                    <S.AcceptButton
                      onClick={() =>
                        setDecisionRequest({ mode: "accept", applicant })
                      }
                      type="button"
                    >
                      수락
                    </S.AcceptButton>
                    <S.RejectButton
                      onClick={() =>
                        setDecisionRequest({ mode: "reject", applicant })
                      }
                      tone="secondary"
                      type="button"
                    >
                      거절
                    </S.RejectButton>
                  </S.ApplicantActions>
                </S.ApplicantCard>
              ))}
            </S.ApplicantList>

            <S.ManageButton
              onClick={() => navigate("/my-team/applications")}
              type="button"
              width="100%"
            >
              지원 {selectedApplicants.length}건 관리하기
            </S.ManageButton>
            <S.InfoNote>
              팀에 소속되면 홈은 내 팀 중심으로 바뀌어요. 공모전 탐색은 하단
              공모전 탭에서 계속할 수 있습니다.
            </S.InfoNote>
          </S.ApplicationSection>
        </>
      )}

      {decisionRequest && (
        <BottomSheet
          applicantName={decisionRequest.applicant.name}
          applicantRole={decisionRequest.applicant.role}
          decisionMode={decisionRequest.mode}
          onClose={() => setDecisionRequest(null)}
          onDecisionConfirm={() => setDecisionRequest(null)}
          open
        />
      )}

      {applicationCancelState && (
        <BottomSheet
          applicationCancelState={applicationCancelState}
          applicationPosition="데이터 시각화"
          applicationTeamName="ESG 임팩트 캠페인"
          onApplicationCancelComplete={() => {
            setApplicationCancelState(null);
            setSelectedTeamId("data-seoul");
          }}
          onApplicationCancelConfirm={() => {
            setHasPendingApplication(false);
            setApplicationCancelState("complete");
          }}
          onClose={() => {
            setApplicationCancelState(null);
            if (!hasPendingApplication) setSelectedTeamId("data-seoul");
          }}
          open
        />
      )}

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
