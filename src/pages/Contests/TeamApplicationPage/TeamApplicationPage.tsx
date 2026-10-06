import { useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContestDetail } from "../../../api/contests";
import { getProfileRoleName } from "../../../api/profiles";
import {
  applyToTeam,
  fetchTeamDetail,
  fetchTeamRecruitments,
  type TeamApplicationResponse,
} from "../../../api/teams";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { S } from "./TeamApplicationPage.styles";

const totalSteps = 2;

const getApplicationErrorMessage = (error: unknown) => {
  if (!isAxiosError<{ message?: string }>(error)) {
    return "팀 참가 신청을 처리하지 못했어요.";
  }

  if (error.response?.status === 409) {
    return "이미 이 팀에 참여했거나 승인 대기 중인 신청이 있어요.";
  }

  return error.response?.data.message ?? "팀 참가 신청을 처리하지 못했어요.";
};

export function TeamApplicationPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { contestId = "", teamId = "" } = useParams();
  const numericTeamId = Number(teamId);
  const [step, setStep] = useState(1);
  const [selectedRoleCode, setSelectedRoleCode] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const {
    data: team,
    isError: isTeamError,
    isLoading: isTeamLoading,
  } = useQuery({
    queryKey: ["team", numericTeamId],
    queryFn: () => fetchTeamDetail(numericTeamId),
    enabled: Number.isInteger(numericTeamId) && numericTeamId > 0,
  });
  const { data: contest } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: () => fetchContestDetail(contestId),
    enabled: Boolean(contestId),
  });
  const { data: recruitments = [] } = useQuery({
    queryKey: ["teamRecruitments", numericTeamId],
    queryFn: () => fetchTeamRecruitments(numericTeamId),
    enabled: Boolean(team),
  });
  const availableRecruitments = useMemo(
    () => recruitments.filter((recruitment) => recruitment.filledCount < recruitment.requiredCount),
    [recruitments],
  );
  const applicationQuestions = useMemo(
    () => [...(team?.applicationQuestions ?? [])].sort(
      (first, second) => first.displayOrder - second.displayOrder,
    ),
    [team?.applicationQuestions],
  );
  const { isPending: isSubmitting, mutate: submitApplication } = useMutation({
    mutationFn: () => {
      if (!selectedRoleCode) {
        throw new Error("지원 분야를 선택해 주세요.");
      }

      return applyToTeam(numericTeamId, {
        roleCode: selectedRoleCode,
        message: message.trim(),
        answers: applicationQuestions.map((question) => ({
          questionId: question.questionId,
          answer: answers[question.questionId]?.trim() ?? "",
        })),
      });
    },
    onSuccess: (application) => {
      queryClient.setQueryData<TeamApplicationResponse[]>(
        ["myTeamApplications"],
        (current = []) => [application, ...current.filter(
          (item) => item.teamId !== application.teamId,
        )],
      );
      setIsSubmitModalOpen(false);
      setStep(3);
    },
    onError: (error) => {
      setIsSubmitModalOpen(false);
      setSubmitErrorMessage(
        error instanceof Error && error.message === "지원 분야를 선택해 주세요."
          ? error.message
          : getApplicationErrorMessage(error),
      );
    },
  });

  const selectedRecruitment = availableRecruitments.find(
    (recruitment) => recruitment.roleCode === selectedRoleCode,
  );
  const hasRequiredAnswers = applicationQuestions
    .filter((question) => question.required)
    .every((question) => Boolean(answers[question.questionId]?.trim()));
  const canContinue = step === 1
    ? Boolean(selectedRoleCode)
    : Boolean(message.trim()) && hasRequiredAnswers;
  const headerTitle = step === 1 ? "지원 분야 선택" : "지원서 작성";

  const handleNext = () => {
    if (!canContinue) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    setIsSubmitModalOpen(true);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      return;
    }

    setIsCancelModalOpen(true);
  };

  if (isTeamLoading) {
    return (
      <S.Page aria-busy="true">
        <S.Content>
          <S.Header>
            <S.BackButton aria-label="뒤로 가기" onClick={() => navigate(-1)} type="button">
              <Icon name="arrow-left" size={18} weight="regular" />
            </S.BackButton>
            <S.HeaderTitle>팀 참가 신청</S.HeaderTitle>
          </S.Header>
          <S.FormContent>팀 정보를 불러오는 중입니다.</S.FormContent>
        </S.Content>
      </S.Page>
    );
  }

  if (isTeamError || !team) {
    return (
      <S.Page>
        <S.Content>
          <S.Header>
            <S.BackButton aria-label="뒤로 가기" onClick={() => navigate(-1)} type="button">
              <Icon name="arrow-left" size={18} weight="regular" />
            </S.BackButton>
            <S.HeaderTitle>팀 참가 신청</S.HeaderTitle>
          </S.Header>
          <S.FormContent>팀 정보를 불러오지 못했어요.</S.FormContent>
        </S.Content>
      </S.Page>
    );
  }

  return (
    <S.Page>
      <S.Content>
        {step <= totalSteps && (
          <>
            <S.Header>
              <S.BackButton aria-label="뒤로 가기" onClick={handleBack} type="button">
                <Icon name="arrow-left" size={18} weight="regular" />
              </S.BackButton>
              <S.HeaderTitle>{headerTitle}</S.HeaderTitle>
            </S.Header>
            <S.Progress aria-label={`총 ${totalSteps}단계 중 ${step}단계`}>
              {Array.from({ length: totalSteps }, (_, index) => (
                <S.ProgressSegment $active={index < step} key={index} />
              ))}
            </S.Progress>
          </>
        )}

        {step === 1 && (
          <S.FormContent>
            <S.TeamCard>
              <S.TeamName>{team.name}</S.TeamName>
              <S.ContestName>{contest?.title ?? "공모전"}</S.ContestName>
              <S.TeamSummary>
                <div>
                  <span>현재 인원</span>
                  <strong>{team.currentMemberCount}/{team.maxMemberCount}명</strong>
                </div>
                <div>
                  <span>모집 분야</span>
                  <strong>{availableRecruitments.length}개</strong>
                </div>
              </S.TeamSummary>
            </S.TeamCard>

            <S.QuestionTitle>어떤 분야로 지원할까요?</S.QuestionTitle>
            <S.QuestionHint>한 분야만 선택할 수 있어요.</S.QuestionHint>
            <S.RoleList>
              {availableRecruitments.map((recruitment) => {
                const selected = recruitment.roleCode === selectedRoleCode;

                return (
                  <S.RoleOption
                    $selected={selected}
                    aria-pressed={selected}
                    key={recruitment.recruitmentId}
                    onClick={() => setSelectedRoleCode(recruitment.roleCode)}
                    type="button"
                  >
                    <S.RoleRadio $selected={selected}>{selected && <span />}</S.RoleRadio>
                    <S.RoleCopy>
                      <strong>{getProfileRoleName(recruitment.roleCode)}</strong>
                      <span>필요 {recruitment.requiredCount}명 · 현재 {recruitment.filledCount}명</span>
                    </S.RoleCopy>
                  </S.RoleOption>
                );
              })}
            </S.RoleList>
            {!availableRecruitments.length && (
              <S.QuestionHint>현재 지원할 수 있는 모집 분야가 없습니다.</S.QuestionHint>
            )}
          </S.FormContent>
        )}

        {step === 2 && (
          <S.FormContent>
            <S.SelectedFieldBadge>
              지원 분야 · {selectedRecruitment && getProfileRoleName(selectedRecruitment.roleCode)}
            </S.SelectedFieldBadge>
            <S.MessageSectionTitle>팀장에게 보낼 메시지</S.MessageSectionTitle>
            <S.IntroductionLabel htmlFor="application-message">지원 메시지</S.IntroductionLabel>
            <S.IntroductionTextarea
              id="application-message"
              maxLength={300}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="지원 동기와 함께하고 싶은 이유를 작성해 주세요."
              value={message}
            />
            <S.CharacterCount>{message.length}/300</S.CharacterCount>

            {applicationQuestions.length > 0 && (
              <>
                <S.SectionDivider />
                <S.MessageSectionTitle>팀이 남긴 질문</S.MessageSectionTitle>
                <S.QuestionPreviewList>
                  {applicationQuestions.map((question, index) => (
                    <S.QuestionInputGroup key={question.questionId}>
                      <S.QuestionNumber>
                        Q{index + 1}. {question.question}{question.required ? " *" : ""}
                      </S.QuestionNumber>
                      <S.QuestionPreviewCard>
                        <S.QuestionAnswerInput
                          aria-label={`질문 ${index + 1} 답변`}
                          maxLength={300}
                          onChange={(event) => setAnswers((current) => ({
                            ...current,
                            [question.questionId]: event.target.value,
                          }))}
                          value={answers[question.questionId] ?? ""}
                        />
                      </S.QuestionPreviewCard>
                      <S.QuestionCharacterCount>
                        {(answers[question.questionId] ?? "").length}/300
                      </S.QuestionCharacterCount>
                    </S.QuestionInputGroup>
                  ))}
                </S.QuestionPreviewList>
              </>
            )}
          </S.FormContent>
        )}

        {step === 3 && (
          <S.CompletionContent>
            <S.SuccessIcon>
              <Icon name="check" size={25} weight="bold" />
            </S.SuccessIcon>
            <S.CompletionTitle>신청을 보냈어요</S.CompletionTitle>
            <S.CompletionDescription>
              {team.name} 팀장에게 참가 신청이 전달됐어요.
            </S.CompletionDescription>
            <S.ApplicationSummary>
              <div>
                <dt>지원 분야</dt>
                <dd>{selectedRecruitment && getProfileRoleName(selectedRecruitment.roleCode)}</dd>
              </div>
              <div>
                <dt>신청 상태</dt>
                <dd>승인 대기</dd>
              </div>
            </S.ApplicationSummary>
          </S.CompletionContent>
        )}
      </S.Content>

      {step <= totalSteps && (
        <S.ActionBar>
          <S.NextButton disabled={!canContinue || isSubmitting} onClick={handleNext} type="button">
            {step === totalSteps ? "신청 보내기" : "다음으로 가기"}
          </S.NextButton>
        </S.ActionBar>
      )}
      {step === 3 && (
        <S.ActionBar>
          <S.NextButton onClick={() => navigate(`/contests/${contestId}`, { replace: true })} type="button">
            확인
          </S.NextButton>
        </S.ActionBar>
      )}

      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsSubmitModalOpen(false)}
        open={isSubmitModalOpen}
        primaryAction={{ label: "신청 보내기", onClick: submitApplication }}
        secondaryAction={{ label: "취소", onClick: () => setIsSubmitModalOpen(false) }}
        title="정말 지원하시겠어요?"
      />
      <Modal
        description={submitErrorMessage}
        emphasizeDescription
        icon={<Icon name="x" size={22} weight="bold" />}
        onClose={() => setSubmitErrorMessage("")}
        open={Boolean(submitErrorMessage)}
        primaryAction={{ label: "확인", onClick: () => setSubmitErrorMessage("") }}
        title="참가 신청에 실패했어요"
      />
      <Modal
        description="작성 중인 지원 내용은 저장되지 않아요."
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="x" size={22} weight="bold" />}
        onClose={() => setIsCancelModalOpen(false)}
        open={isCancelModalOpen}
        primaryAction={{ label: "지원 취소하기", onClick: () => navigate(-1) }}
        secondaryAction={{ label: "계속 작성하기", onClick: () => setIsCancelModalOpen(false) }}
        title="지원을 취소할까요?"
      />
    </S.Page>
  );
}
