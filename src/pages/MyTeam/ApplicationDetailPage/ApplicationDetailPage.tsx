import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileRoleName } from "../../../api/profiles";
import {
  approveTeamApplication,
  fetchTeamApplications,
  fetchTeamDetail,
  rejectTeamApplication,
} from "../../../api/teams";
import {
  BottomSheet,
  type DecisionMode,
} from "../../../components/BottomSheet/BottomSheet";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./ApplicationDetailPage.styles";

const formatAppliedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "지원일 미정";

  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getDecisionErrorMessage = (error: unknown) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data.message ??
      "지원 요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요."
    );
  }

  return "지원 요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요.";
};

export function ApplicationDetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { applicationId = "", teamId = "" } = useParams();
  const numericTeamId = Number(teamId);
  const numericApplicationId = Number(applicationId);
  const [decisionMode, setDecisionMode] = useState<DecisionMode | null>(null);
  const {
    data: applications = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["teamApplications", numericTeamId],
    queryFn: () => fetchTeamApplications(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const { data: team } = useQuery({
    queryKey: ["team", numericTeamId],
    queryFn: () => fetchTeamDetail(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const application = applications.find(
    (item) => item.applicationId === numericApplicationId,
  );
  const { mutateAsync: decideApplication } = useMutation({
    mutationFn: async ({ mode, reason }: { mode: DecisionMode; reason?: string }) => {
      if (!application) throw new Error("지원서를 찾을 수 없습니다.");

      if (mode === "accept") {
        await approveTeamApplication(numericTeamId, numericApplicationId, {
          roleCode: application.roleCode,
        });
        return;
      }

      await rejectTeamApplication(numericTeamId, numericApplicationId, { reason });
    },
  });

  const handleDecisionComplete = () => {
    void Promise.all([
      queryClient.invalidateQueries({ queryKey: ["teamApplications", numericTeamId] }),
      queryClient.invalidateQueries({ queryKey: ["team", numericTeamId] }),
      queryClient.invalidateQueries({ queryKey: ["teamMembers", numericTeamId] }),
      queryClient.invalidateQueries({ queryKey: ["teamRecruitments", numericTeamId] }),
      queryClient.invalidateQueries({ queryKey: ["recruitingTeams"] }),
      ...(team
        ? [queryClient.invalidateQueries({ queryKey: ["contest", team.competitionId] })]
        : []),
    ]);
    navigate(`/my-team/${numericTeamId}/applications`);
  };

  if (isLoading) {
    return (
      <S.Page>
        <PageHeader onBack={() => navigate(-1)} title="지원서" />
        <S.StateMessage>지원서를 불러오는 중이에요.</S.StateMessage>
      </S.Page>
    );
  }

  if (isError || !application) {
    return (
      <S.Page>
        <PageHeader onBack={() => navigate(-1)} title="지원서" />
        <S.StateMessage>지원서를 불러오지 못했어요.</S.StateMessage>
      </S.Page>
    );
  }

  const applicantName = `지원자 #${application.userId}`;
  const roleName = getProfileRoleName(application.roleCode);
  const answers = [...(application.answers ?? [])].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="지원서" />

      <S.Content>
        <S.ProfileCard>
          <S.ProfileHeader>
            <S.Avatar $tone="blue">{String(application.userId).slice(-1)}</S.Avatar>
            <S.ProfileIdentity>
              <S.Name>{applicantName}</S.Name>
              <S.School>사용자 ID {application.userId}</S.School>
              <S.ProfileLink
                onClick={() => navigate(`/giut-hub/${application.userId}`)}
                type="button"
              >
                프로필 전체 보기
              </S.ProfileLink>
            </S.ProfileIdentity>
            <S.Caret
              aria-label={`${applicantName} 프로필 전체 보기`}
              onClick={() => navigate(`/giut-hub/${application.userId}`)}
              type="button"
            >
              <Icon name="caret-right" size={15} weight="bold" />
            </S.Caret>
          </S.ProfileHeader>
        </S.ProfileCard>

        <S.InformationCard>
          <S.PositionLabel>지원 포지션 · {roleName}</S.PositionLabel>

          <S.InformationList>
            <S.InformationRow>
              <S.InformationLabel>지원한 팀</S.InformationLabel>
              <S.InformationValue>{team?.name ?? `팀 #${numericTeamId}`}</S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>지원 일시</S.InformationLabel>
              <S.InformationValue>{formatAppliedAt(application.appliedAt)}</S.InformationValue>
            </S.InformationRow>
            <S.InformationRow>
              <S.InformationLabel>신청 상태</S.InformationLabel>
              <S.InformationValue>승인 대기</S.InformationValue>
            </S.InformationRow>
          </S.InformationList>
        </S.InformationCard>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionTitle>간단한 자기소개</S.QuestionTitle>
          </S.QuestionHeader>
          <S.AnswerField>
            <S.Answer>{application.message || "작성한 소개가 없어요."}</S.Answer>
          </S.AnswerField>
          <S.CharacterCount>{application.message.length} / 300</S.CharacterCount>
        </S.QuestionCard>

        {answers.map((answer, index) => (
          <S.QuestionCard key={answer.questionId}>
            <S.QuestionHeader>
              <S.QuestionTitle>Q{index + 1}. {answer.question}</S.QuestionTitle>
            </S.QuestionHeader>
            <S.AnswerField>
              <S.Answer>{answer.answer}</S.Answer>
            </S.AnswerField>
            <S.CharacterCount>{answer.answer.length} / 300</S.CharacterCount>
          </S.QuestionCard>
        ))}
      </S.Content>

      <S.ActionBar>
        <S.AcceptButton onClick={() => setDecisionMode("accept")} type="button">
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
          applicantName={applicantName}
          applicantRole={roleName}
          decisionMode={decisionMode}
          onClose={() => setDecisionMode(null)}
          onDecisionConfirm={handleDecisionComplete}
          onDecisionSubmit={async (reason) => {
            try {
              await decideApplication({ mode: decisionMode, reason });
            } catch (error) {
              throw new Error(getDecisionErrorMessage(error), { cause: error });
            }
          }}
          open
        />
      )}
    </S.Page>
  );
}
