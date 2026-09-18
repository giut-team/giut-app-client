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
          <S.TeamMeta>
            한국디자인진흥원 · 데이터 시각화 포지션 · 2월 15일 오후 9:12 제출
          </S.TeamMeta>
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
            <S.TimelineLabel>{isPending ? "결과 대기" : "수락 2/17"}</S.TimelineLabel>
          </S.TimelineStep>
        </S.ProgressTimeline>
      </S.TopContent>

      <S.ApplicationContent>
        <S.ProfileCard>
          <S.Profile>
            <S.Avatar>루</S.Avatar>
            <S.ProfileIdentity>
              <S.NameRow>
                <S.Name>이루매</S.Name>
                <S.RoleBadge>데이터 시각화</S.RoleBadge>
              </S.NameRow>
              <S.School>서울시립대 컴퓨터과학부 3학년 · 학교 인증</S.School>
            </S.ProfileIdentity>
          </S.Profile>
        </S.ProfileCard>

        <S.QuestionCard>
          <S.QuestionList>
            {applicationQuestions.map((question) => (
              <S.Question key={question.title}>
                <S.QuestionTitle>{question.title}</S.QuestionTitle>
                <S.Answer>{question.answer}</S.Answer>
              </S.Question>
            ))}
          </S.QuestionList>
        </S.QuestionCard>

        <S.Notice>
          {isPending
            ? "팀장이 지원서를 검토 중이에요. 결과가 나오면 알림으로 알려드릴게요."
            : "제출한 지원서는 읽기 전용이에요. 수정이 필요하면 팀장에게 직접 이야기해주세요."}
        </S.Notice>
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
          <S.ChatButton onClick={() => undefined} type="button" width="100%">
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
