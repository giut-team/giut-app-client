import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BottomSheet,
  type DecisionMode,
} from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { applicants } from "../myTeam.data";
import { S } from "./ApplicationDetailPage.styles";

export function ApplicationDetailPage() {
  const navigate = useNavigate();
  const { applicantId } = useParams();
  const applicant =
    applicants.find((item) => item.id === applicantId) ?? applicants[0];
  const [decisionMode, setDecisionMode] = useState<DecisionMode | null>(null);

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="지원서" />

      <S.Content>
        <S.ProfileCard>
          <S.ProfileHeader>
            <S.Avatar $tone={applicant.tone}>{applicant.initial}</S.Avatar>
            <S.ProfileIdentity>
              <S.Name>{applicant.name}</S.Name>
              <S.School>{applicant.school}</S.School>
              <S.ProfileLink
                onClick={() => navigate(`/giut-hub/${applicant.profileNumber}`)}
                type="button"
              >
                프로필 전체 보기
              </S.ProfileLink>
            </S.ProfileIdentity>
            <S.Caret
              aria-label={`${applicant.name} 프로필 전체 보기`}
              onClick={() => navigate(`/giut-hub/${applicant.profileNumber}`)}
              type="button"
            >
              <Icon name="caret-right" size={15} weight="bold" />
            </S.Caret>
          </S.ProfileHeader>
        </S.ProfileCard>

        <S.InformationCard>
          <S.PositionLabel>지원 포지션 - 백엔드 개발자</S.PositionLabel>

          <S.InformationList>
            <S.InformationRow>
              <S.InformationLabel>지원한 팀</S.InformationLabel>
              <S.InformationValue>데이터로 서울을</S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>지원 일시</S.InformationLabel>
              <S.InformationValue>8월 31일 오후 1:31</S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>참여 가능</S.InformationLabel>
              <S.InformationValue>주 15시간</S.InformationValue>
            </S.InformationRow>
          </S.InformationList>
        </S.InformationCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>간단한 자기소개</S.QuestionTitle>
          </S.QuestionHeader>
          <S.AnswerField>
            <S.Answer>{applicant.introduction}</S.Answer>
          </S.AnswerField>
          <S.CharacterCount>{applicant.introduction.length} / 300</S.CharacterCount>
        </S.QuestionCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>Q1. 이 팀에 지원한 이유를 알려주세요</S.QuestionTitle>
          </S.QuestionHeader>
          <S.AnswerField>
            <S.Answer>{applicant.answer}</S.Answer>
          </S.AnswerField>
          <S.CharacterCount>96 / 300</S.CharacterCount>
        </S.QuestionCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>
              Q2. 지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?
            </S.QuestionTitle>
          </S.QuestionHeader>
          <S.AnswerField>
            <S.Answer>
              {applicant.message} 팀의 목표에 맞춰 맡은 역할을 끝까지 책임지고
              수행하겠습니다.
            </S.Answer>
          </S.AnswerField>
          <S.CharacterCount>78 / 300</S.CharacterCount>
        </S.QuestionCard>

      </S.Content>

      <S.ActionBar>
        <S.AcceptButton
          onClick={() => setDecisionMode("accept")}
          type="button"
        >
          수락
        </S.AcceptButton>
        <S.RejectButton
          onClick={() => setDecisionMode("reject")}
          tone="secondary"
          type="button"
        >
          거절
        </S.RejectButton>
      </S.ActionBar>

      {decisionMode && (
        <BottomSheet
          applicantName={applicant.name}
          applicantRole={applicant.role}
          decisionMode={decisionMode}
          onClose={() => setDecisionMode(null)}
          onDecisionConfirm={() => setDecisionMode(null)}
          open
        />
      )}
    </S.Page>
  );
}
