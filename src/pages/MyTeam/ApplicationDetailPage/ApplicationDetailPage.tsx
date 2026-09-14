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
              <S.ProfileLink type="button">프로필 전체 보기</S.ProfileLink>
            </S.ProfileIdentity>
            <S.Caret aria-hidden="true">
              <Icon name="caret-right" size={15} weight="bold" />
            </S.Caret>
          </S.ProfileHeader>
        </S.ProfileCard>

        <S.InformationCard>
          <S.PositionLabel>지원 포지션</S.PositionLabel>
          <S.PositionValue>
            <S.RoleBadge $tone={applicant.tone}>{applicant.role}</S.RoleBadge>
            <S.PositionText>모집 2명 중 1자리가 남음</S.PositionText>
          </S.PositionValue>

          <S.InformationList>
            <S.InformationRow>
              <S.InformationLabel>지원한 팀</S.InformationLabel>
              <S.InformationValue>데이터로 서울을</S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>지원 일시</S.InformationLabel>
              <S.InformationValue>
                8월 31일 오후 1:31 (10분 전)
              </S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>참여 가능</S.InformationLabel>
              <S.InformationValue>주 15시간</S.InformationValue>
            </S.InformationRow>
          </S.InformationList>
        </S.InformationCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>Q1. 이 팀에 지원한 이유</S.QuestionTitle>
            <S.CharacterCount>96 / 300</S.CharacterCount>
          </S.QuestionHeader>
          <S.Answer>{applicant.answer}</S.Answer>
        </S.QuestionCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>Q2. 맡고 싶은 역할과 근거</S.QuestionTitle>
            <S.CharacterCount>78 / 300</S.CharacterCount>
          </S.QuestionHeader>
          <S.Answer>
            {applicant.message} 팀의 목표에 맞춰 맡은 역할을 끝까지 책임지고
            수행하겠습니다.
          </S.Answer>
        </S.QuestionCard>

        <S.Notice>
          수락하면 팀 채팅방에 자동 초대되고, 지원자에게 알림이 갑니다.
        </S.Notice>
      </S.Content>

      <S.ActionBar>
        <S.RejectButton
          onClick={() => setDecisionMode("reject")}
          tone="secondary"
          type="button"
        >
          거절
        </S.RejectButton>
        <S.AcceptButton
          onClick={() => setDecisionMode("accept")}
          type="button"
        >
          수락
        </S.AcceptButton>
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
