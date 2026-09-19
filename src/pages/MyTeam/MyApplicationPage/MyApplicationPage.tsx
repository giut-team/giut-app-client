import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BottomSheet,
  type ApplicationCancelState,
} from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./MyApplicationPage.styles";

const applicationQuestions = [
  {
    title: "Q1. 이 팀에 지원한 이유를 알려주세요",
    answer:
      "캠페인 성과를 숫자로 보여주는 일에 관심이 많았습니다. ESG 주제는 데이터가 준비된 큰 과제라고 생각해서, 기획 단계부터 지표를 함께 잡아보고 싶어 지원했습니다. 지난 학기에는 교내 환경 캠페인 참여율을 분석해 개선안을 제안한 적이 있습니다.",
  },
  {
    title: "Q2. 지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?",
    answer:
      "데이터 수집·정제와 시각화를 맡을 수 있습니다. Python·SQL로 공공데이터를 다뤄봤고, 발표용 대시보드까지 정리해 본 경험이 있습니다. 필요한 지표 정의서와 결과 리포트 작성도 함께 하겠습니다.",
  },
  {
    title: "Q3. 참여 가능 시간",
    answer:
      "주 10시간 이상 · 평일 저녁, 주말 오후 참여 가능 · 시험 기간(4월 중순) 2주는 참여 시간이 줄어들 수 있습니다.",
  },
];

const submittedApplicationContent = [
  {
    title: "간단한 자기소개",
    answer:
      "공공데이터를 활용한 서비스 개발에 관심이 있으며, 데이터 분석과 시각화 경험을 바탕으로 팀에 기여하고 싶습니다.",
  },
  {
    title: "Q1. 이 팀에 지원한 이유를 알려주세요",
    answer:
      "서울시 교통 공공데이터를 다루는 경험이 있어 이번 공모전 주제와 잘 맞을 것 같아 지원했습니다.",
  },
  {
    title: "Q2. 지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?",
    answer:
      "Spring·PostgreSQL로 공공데이터 API 2개를 만들어봤어요. 맡은 역할은 기획 단계부터 마무리까지 책임지고 수행하겠습니다.",
  },
  {
    title: "한 주당 참여 가능한 시간",
    answer: "15시간",
  },
] satisfies Array<(typeof applicationQuestions)[number]>;

export function MyApplicationPage() {
  const navigate = useNavigate();
  const { applicationStatus } = useParams();
  const isPending = applicationStatus === "pending";
  const [applicationCancelState, setApplicationCancelState] =
    useState<ApplicationCancelState | null>(null);
  const teamName = isPending ? "ESG 임팩트 캠페인" : "ESG 캠페인 프로젝트";

  return (
    <S.Page>
      <PageHeader
        onBack={() => navigate(-1)}
        rightContent={
          <S.StatusBadge $pending={isPending}>
            {isPending ? "지원 대기" : "수락됨"}
          </S.StatusBadge>
        }
        title="내 지원서"
      />

      <S.TopContent>
        <S.TeamSummary>
          <S.TeamTitle>{teamName}</S.TeamTitle>
          <S.TeamMeta>디자인으로 만드는 ESG 캠페인 · 3/4명</S.TeamMeta>
        </S.TeamSummary>

        <S.ProgressTimeline aria-label="지원 진행 상태">
          <S.TimelineStep $state="complete">
            <S.TimelineDot />
            <S.TimelineLabel>제출 2/15</S.TimelineLabel>
          </S.TimelineStep>
          <S.TimelineLine />
          <S.TimelineStep $state="complete">
            <S.TimelineDot />
            <S.TimelineLabel>열람 2/16</S.TimelineLabel>
          </S.TimelineStep>
          <S.TimelineLine />
          <S.TimelineStep $state={isPending ? "pending" : "accepted"}>
            <S.TimelineDot />
            <S.TimelineLabel>
              {isPending ? "결과 대기" : "수락 2/17"}
            </S.TimelineLabel>
          </S.TimelineStep>
        </S.ProgressTimeline>
      </S.TopContent>

      <S.ApplicationContent>
        <S.ApplicationPositionCard>
          <S.PositionHeading>
            <S.PositionSectionTitle>
              지원 포지션 - 데이터 시각화
            </S.PositionSectionTitle>
          </S.PositionHeading>
          <S.PositionDivider />
          <S.PositionInfoList>
            <S.PositionInfoRow>
              <span>지원한 팀</span>
              <strong>{teamName}</strong>
            </S.PositionInfoRow>
            <S.PositionInfoRow>
              <span>지원 일시</span>
              <strong>8월 31일 오후 1:31</strong>
            </S.PositionInfoRow>
            <S.PositionInfoRow>
              <span>참여 가능</span>
              <strong>주 15시간</strong>
            </S.PositionInfoRow>
          </S.PositionInfoList>
        </S.ApplicationPositionCard>
        <S.ProfileCard>
          <S.Profile>
            <S.Avatar>루</S.Avatar>
            <S.ProfileIdentity>
              <S.NameRow>
                <S.Name>이루매</S.Name>
                <S.RoleBadge>데이터 시각화</S.RoleBadge>
              </S.NameRow>
              <S.School>컴퓨터과학부 3학년</S.School>
            </S.ProfileIdentity>
          </S.Profile>
        </S.ProfileCard>

        <S.QuestionCard>
          <S.QuestionList>
            {submittedApplicationContent
              .filter((question) => question.title !== "한 주당 참여 가능한 시간")
              .map((question) => (
              <S.Question key={question.title}>
                <S.QuestionTitle>{question.title}</S.QuestionTitle>
                <S.AnswerField>
                  <S.Answer>{question.answer}</S.Answer>
                </S.AnswerField>
                <S.CharacterCount>{question.answer.length} / 300</S.CharacterCount>
              </S.Question>
              ))}
          </S.QuestionList>
        </S.QuestionCard>
      </S.ApplicationContent>

      <S.ActionBar>
        {isPending ? (
          <S.CancelButton
            onClick={() => setApplicationCancelState("confirm")}
            type="button"
          >
            지원 취소하기
          </S.CancelButton>
        ) : (
          <S.ChatButton
            onClick={() => navigate("/chat/esg-campaign")}
            type="button"
            width="100%"
          >
            <Icon name="chat" size={14} weight="fill" />
            팀장님이랑 대화하러 가기
          </S.ChatButton>
        )}
      </S.ActionBar>

      {applicationCancelState && (
        <BottomSheet
          applicationCancelState={applicationCancelState}
          applicationPosition="데이터 시각화"
          applicationTeamName={teamName}
          onApplicationCancelComplete={() =>
            navigate("/my-team", {
              state: { pendingApplicationCancelled: true },
            })
          }
          onApplicationCancelConfirm={() => {
            setApplicationCancelState("complete");
          }}
          onClose={() => setApplicationCancelState(null)}
          open
        />
      )}
    </S.Page>
  );
}
