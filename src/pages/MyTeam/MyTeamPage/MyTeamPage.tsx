import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../../components/BottomNavigation/BottomNavigation";
import {
  BottomSheet,
  type ApplicationCancelState,
  type DecisionMode,
} from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { SearchOverlay } from "../../../components/SearchOverlay/SearchOverlay";
import giutLogo from "../../../assets/giut-logo.svg";
import informationIcon from "../../../assets/information.svg";
import { applicants, type Applicant } from "../myTeam.data";
import { S } from "./MyTeamPage.styles";

type TeamKind = "leader" | "member" | "pending";

type Team = {
  id: string;
  contestId: string;
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
    contestId: "esg-campaign",
    kind: "pending",
    status: "지원 대기",
    title: "ESG 임팩트 캠페인",
    description: "디자인으로 만드는 ESG 캠페인 · 3/4명",
    tone: "pending",
  },
  {
    id: "data-seoul",
    contestId: "seoul-data",
    kind: "leader",
    status: "팀장",
    newApplications: "새 지원 3",
    title: "데이터로 서울을",
    description: "2026 서울시 데이터 활용 공모전 · 3/5명",
    progress: 60,
    tone: "primary" as const,
  },
  {
    id: "esg-campaign",
    contestId: "esg-campaign",
    kind: "member",
    status: "팀원",
    title: "ESG 캠페인 프로젝트",
    description: "디자인으로 만드는 ESG 캠페인 · 4/4명",
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("pending-esg");
  const [teamScrollProgress, setTeamScrollProgress] = useState(0);
  const teamScrollerRef = useRef<HTMLDivElement>(null);
  const teamScrollTrackRef = useRef<HTMLDivElement>(null);
  const teamScrollGrabOffsetRef = useRef(72);
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
  const updateTeamScroll = (nextProgress: number) => {
    const scroller = teamScrollerRef.current;
    if (!scroller) return;

    const progress = Math.min(100, Math.max(0, nextProgress));
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    scroller.scrollLeft = (maxScroll * progress) / 100;
    setTeamScrollProgress(progress);
  };
  const moveTeamScrollThumb = (clientX: number) => {
    const track = teamScrollTrackRef.current;
    if (!track) return;

    const thumbWidth = 144;
    const { left, width } = track.getBoundingClientRect();
    const availableWidth = width - thumbWidth;
    const thumbOffset = Math.min(
      availableWidth,
      Math.max(0, clientX - left - teamScrollGrabOffsetRef.current),
    );
    updateTeamScroll((thumbOffset / availableWidth) * 100);
  };

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
            <S.HeaderButton
              aria-label="검색"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <Icon name="search" size={17} weight="regular" />
            </S.HeaderButton>
            <S.HeaderButton
              aria-label="알림"
              onClick={() => navigate("/notifications")}
              type="button"
            >
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

        <S.TeamScroller
          aria-label="내 팀 목록"
          onScroll={(event) => {
            const { clientWidth, scrollLeft, scrollWidth } =
              event.currentTarget;
            const maxScroll = scrollWidth - clientWidth;
            setTeamScrollProgress(
              maxScroll ? (scrollLeft / maxScroll) * 100 : 0,
            );
          }}
          ref={teamScrollerRef}
        >
          {visibleTeams.map((team) => (
            <S.TeamCard
              $pending={team.kind === "pending"}
              $selected={team.id === selectedTeam.id}
              key={team.id}
            >
              <S.TeamSelectButton
                aria-pressed={team.id === selectedTeam.id}
                onClick={() => setSelectedTeamId(team.id)}
                type="button"
              >
                <S.TeamBadges>
                  <S.TeamStatus $tone={team.tone}>{team.status}</S.TeamStatus>
                  {team.newApplications && (
                    <S.NewApplications>
                      {team.newApplications}
                    </S.NewApplications>
                  )}
                  {team.elapsed && (
                    <S.ElapsedBadge>{team.elapsed}</S.ElapsedBadge>
                  )}
                </S.TeamBadges>
                <S.TeamTitle>{team.title}</S.TeamTitle>
                <S.TeamDescription>{team.description}</S.TeamDescription>
                {team.kind === "pending" ? (
                  <S.PendingMessage>
                    팀장이 마지막 확인 중이에요
                  </S.PendingMessage>
                ) : (
                  <S.ProgressTrack>
                    <S.ProgressBar
                      $progress={team.progress ?? 0}
                      $tone={team.tone}
                    />
                  </S.ProgressTrack>
                )}
              </S.TeamSelectButton>
              <S.ContestShortcut
                aria-label={`${team.title} 공모전 정보 보기`}
                onClick={() => navigate(`/contests/${team.contestId}`)}
                type="button"
              >
                <S.ContestShortcutIcon
                  alt=""
                  aria-hidden="true"
                  src={informationIcon}
                />
              </S.ContestShortcut>
            </S.TeamCard>
          ))}
        </S.TeamScroller>
        {visibleTeams.length >= 3 && (
          <S.TeamScrollTrack ref={teamScrollTrackRef}>
            <S.TeamScrollRail />
            <S.TeamScrollThumb
              aria-label="내 팀 목록 가로 이동"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(teamScrollProgress)}
              $progress={teamScrollProgress}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  updateTeamScroll(teamScrollProgress - 10);
                }

                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  updateTeamScroll(teamScrollProgress + 10);
                }
              }}
              onPointerDown={(event) => {
                const track = teamScrollTrackRef.current;
                if (track) {
                  const thumbWidth = 144;
                  const { left, width } = track.getBoundingClientRect();
                  const thumbLeft =
                    (teamScrollProgress / 100) * (width - thumbWidth);
                  teamScrollGrabOffsetRef.current = Math.min(
                    thumbWidth,
                    Math.max(0, event.clientX - left - thumbLeft),
                  );
                }

                event.currentTarget.setPointerCapture(event.pointerId);
                moveTeamScrollThumb(event.clientX);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  moveTeamScrollThumb(event.clientX);
                }
              }}
              role="slider"
              tabIndex={0}
            />
          </S.TeamScrollTrack>
        )}
      </S.TeamSection>

      {isMemberTeam || isPendingTeam ? (
        <S.MemberApplicationSection $pending={isPendingTeam}>
          <S.MemberSectionTitle>
            {selectedTeam.title} · 내가 쓴 지원서
          </S.MemberSectionTitle>
          {/* <S.MemberSectionSubtitle>
            {isPendingTeam
              ? "2월 15일에 보냈어요 · 팀장이 2월 16일에 열람했습니다"
              : "2월 15일에 보낸 지원서예요 · 팀장이 수락해 팀에 합류했어요"}
          </S.MemberSectionSubtitle> */}

          <S.MemberApplicationCard>
            <S.MemberProfile>
              <S.MemberAvatar>이</S.MemberAvatar>
              <S.MemberIdentity>
                <S.MemberNameRow>
                  <S.MemberName>이루매</S.MemberName>
                  <S.MemberRole>데이터 시각화</S.MemberRole>
                </S.MemberNameRow>
                <S.MemberSchool>컴퓨터과학부 3학년</S.MemberSchool>
              </S.MemberIdentity>
            </S.MemberProfile>

            <S.MemberQuestion>
              <S.MemberQuestionTitle>간단한 자기소개</S.MemberQuestionTitle>
              <S.MemberAnswer>
                공공데이터를 활용한 서비스 개발에 관심이 있으며, 데이터 분석과
                시각화 경험을 바탕으로 팀에 기여하고 싶습니다.
              </S.MemberAnswer>
            </S.MemberQuestion>
            <S.MemberQuestion>
              <S.MemberQuestionTitle>
                Q1. 이 팀에 지원한 이유를 알려주세요
              </S.MemberQuestionTitle>
              <S.MemberAnswer>
                서울시 교통 공공데이터를 다루는 경험이 있어 이번 공모전 주제와 잘
                맞을 것 같아 지원했습니다.
              </S.MemberAnswer>
            </S.MemberQuestion>
            <S.MemberQuestion>
              <S.MemberQuestionTitle>
                Q2. 지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?
              </S.MemberQuestionTitle>
              <S.MemberAnswer>
                Spring·PostgreSQL로 공공데이터 API 2개를 만들어봤어요. 맡은
                역할은 기획 단계부터 마무리까지 책임지고 수행하겠습니다.
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
            <S.MemberChatButton
              onClick={() => navigate("/chat/esg-campaign")}
              type="button"
              width="100%"
            >
              <Icon name="chat" size={14} weight="fill" />
              팀장님에게 대화하러 가기
            </S.MemberChatButton>
          )}
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
                  <S.ApplicantIntroductionLabel>
                    간단한 자기소개
                  </S.ApplicantIntroductionLabel>
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

      <SearchOverlay
        onClose={() => setIsSearchOpen(false)}
        open={isSearchOpen}
      />

      <BottomNavigation
        activeKey={activeNavigation}
        items={navigationItems}
        onChange={(key) => {
          setActiveNavigation(key);
          if (key === "home") navigate("/home");
          if (key === "hub") navigate("/giut-hub");
          if (key === "chat") navigate("/chat");
        }}
      />
    </S.Page>
  );
}
