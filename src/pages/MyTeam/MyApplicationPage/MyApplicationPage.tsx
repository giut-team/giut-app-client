import { useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./MyApplicationPage.styles";

const applicationQuestions = [
  {
    title: "Q1. 이 팀에 지원한 이유",
    answer:
      "캠페인 성과를 숫자로 보여주는 일에 관심이 많았습니다. ESG 주제는 데이터가 준비된 큰 과제라고 생각해서, 기획 단계부터 지표를 함께 잡아보고 싶어 지원했습니다. 지난 학기에는 교내 환경 캠페인 참여율을 분석해 개선안을 제안한 적이 있습니다.",
  },
  {
    title: "Q2. 맡을 수 있는 역할",
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

  return (
    <S.Page>
      <PageHeader
        onBack={() => navigate(-1)}
        rightContent={<S.AcceptedBadge>수락됨</S.AcceptedBadge>}
        title="내 지원서"
      />

      <S.TopContent>
        <S.TeamSummary>
          <S.TeamTitle>ESG 캠페인 프로젝트</S.TeamTitle>
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
          <S.TimelineStep $state="accepted">
            <S.TimelineDot />
            <S.TimelineLabel>수락 2/17</S.TimelineLabel>
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
          제출한 지원서는 읽기 전용이에요. 수정이 필요하면 팀장에게 직접
          이야기해주세요.
        </S.Notice>
      </S.ApplicationContent>

      <S.ActionBar>
        <S.ChatButton onClick={() => undefined} type="button" width="100%">
          <Icon name="chat" size={14} weight="regular" />
          팀장님이랑 대화하러 가기
        </S.ChatButton>
      </S.ActionBar>
    </S.Page>
  );
}
