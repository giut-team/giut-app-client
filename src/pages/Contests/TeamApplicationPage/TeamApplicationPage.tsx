import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, type IconName } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { S } from "./TeamApplicationPage.styles";

const totalSteps = 4;
const introductionDefault = "";

type Field = "개발" | "디자인" | "기획" | "마케팅";

const fields: Array<{
  value: Field;
  icon: IconName;
  positions: string[];
  status?: string;
}> = [
  {
    value: "개발",
    icon: "code",
    positions: ["백엔드 개발자", "프론트엔드 개발자"],
  },
  {
    value: "디자인",
    icon: "palette",
    positions: ["UI 디자이너", "UX 디자이너"],
  },
  { value: "기획", icon: "edit", positions: [], status: "마감" },
  { value: "마케팅", icon: "megaphone", positions: [], status: "미모집" },
];

const questions = [
  {
    title: "이 팀에 지원한 이유를 알려주세요",
    answer:
      "서울시 교통 공공데이터를 다루는 경험이 있어서 이번 공모전 주제와 잘 맞을 것 같아 지원했습니다.",
  },
  {
    title: "지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?",
    answer:
      "Spring·PostgreSQL로 공공데이터 API를 만들어봤어요. 맡은 역할을 끝까지 책임지고 수행하겠습니다.",
  },
];

export function TeamApplicationPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data" } = useParams();
  const [step, setStep] = useState(1);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [introduction, setIntroduction] = useState(introductionDefault);
  const [weeklyHours, setWeeklyHours] = useState("15");
  const [questionAnswers, setQuestionAnswers] = useState(() =>
    questions.map(() => ""),
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const selectedFieldInfo = useMemo(
    () => fields.find((field) => field.value === selectedField),
    [selectedField],
  );

  const selectField = (field: (typeof fields)[number]) => {
    if (field.status) return;

    setSelectedField(field.value);
    setSelectedPosition(null);
  };

  const handleNext = () => {
    if (
      (step === 1 && !selectedField) ||
      (step === 2 && !selectedPosition)
    ) {
      return;
    }

    if (step === 3) {
      setIsSubmitModalOpen(true);
      return;
    }

    if (step < totalSteps) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    navigate(`/contests/${contestId}`, { replace: true });
  };

  const handleBack = () => {
    if (step > 1 && step < totalSteps) {
      setStep((currentStep) => currentStep - 1);
      return;
    }

    setIsCancelModalOpen(true);
  };

  const headerTitle =
    step === 1
      ? "지원 분야 선택"
      : step === 2
        ? "지원 역할 선택"
        : step === 3
          ? "지원 메시지 작성"
          : "지원 완료";
  const canContinue =
    step === 1 ? Boolean(selectedField) : step === 2 ? Boolean(selectedPosition) : true;

  return (
    <S.Page>
      <S.Content>
        {step < totalSteps && (
          <>
        <S.Header>
          {step < totalSteps && (
            <S.BackButton
              aria-label="뒤로 가기"
              onClick={handleBack}
              type="button"
            >
              <Icon name="arrow-left" size={18} weight="regular" />
            </S.BackButton>
          )}
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
              <S.TeamName>데이터로 서울을</S.TeamName>
              <S.ContestName>2026 서울시 데이터 활용 공모전</S.ContestName>
              <S.TeamSummary>
                <div>
                  <span>총 모집</span>
                  <strong>4명</strong>
                </div>
                <div>
                  <span>모집 마감</span>
                  <strong>D-9</strong>
                </div>
              </S.TeamSummary>
            </S.TeamCard>

            <S.QuestionTitle>어떤 분야로 지원할까요?</S.QuestionTitle>
            <S.QuestionHint>한 분야만 선택할 수 있어요.</S.QuestionHint>
            <S.FieldList>
              {fields.map((field) => {
                const selected = field.value === selectedField;
                const disabled = Boolean(field.status);

                return (
                  <S.FieldOption
                    $disabled={disabled}
                    $selected={selected}
                    aria-pressed={selected}
                    disabled={disabled}
                    key={field.value}
                    onClick={() => selectField(field)}
                    type="button"
                  >
                    <S.FieldIcon $disabled={disabled} $field={field.value}>
                      <Icon name={field.icon} size={16} weight="fill" />
                    </S.FieldIcon>
                    <S.FieldName>{field.value}</S.FieldName>
                    {field.status ? (
                      <S.FieldStatus>{field.status}</S.FieldStatus>
                    ) : selected ? (
                      <S.SelectedMark>
                        <Icon name="check" size={12} weight="bold" />
                      </S.SelectedMark>
                    ) : (
                      <S.EmptyMark />
                    )}
                  </S.FieldOption>
                );
              })}
            </S.FieldList>
          </S.FormContent>
        )}

        {step === 2 && (
          <S.FormContent>
            <S.SelectedFieldBadge>
              지원 분야 · {selectedField}
            </S.SelectedFieldBadge>
            <S.RoleHeading>
              <S.QuestionTitle>지원하는 역할</S.QuestionTitle>
              <span>1개 선택</span>
            </S.RoleHeading>
            <S.RoleList>
              {selectedFieldInfo?.positions.map((position) => {
                const selected = position === selectedPosition;

                return (
                  <S.RoleOption
                    $selected={selected}
                    aria-pressed={selected}
                    key={position}
                    onClick={() => setSelectedPosition(position)}
                    type="button"
                  >
                    <S.RoleRadio $selected={selected}>
                      {selected && <span />}
                    </S.RoleRadio>
                    <S.RoleCopy>
                      <strong>{position}</strong>
                      <span>모집 중</span>
                    </S.RoleCopy>
                  </S.RoleOption>
                );
              })}
            </S.RoleList>
          </S.FormContent>
        )}

        {step === 3 && (
          <S.FormContent>
            <S.MessageSectionTitle>
              팀장에게 보낼 내용이에요
            </S.MessageSectionTitle>
            <S.AvailabilityRow>
              <span>한 주당 참여 가능한 시간</span>
              <S.AvailabilityInput
                aria-label="한 주당 참여 가능한 시간"
                inputMode="numeric"
                maxLength={2}
                onChange={(event) =>
                  setWeeklyHours(event.target.value.replace(/[^0-9]/g, ""))
                }
                value={weeklyHours}
              />
              <S.AvailabilityUnit>시간</S.AvailabilityUnit>
            </S.AvailabilityRow>

            <S.IntroductionLabel htmlFor="application-introduction">
              간단한 자기소개
            </S.IntroductionLabel>
            <S.IntroductionTextarea
              id="application-introduction"
              maxLength={300}
              onChange={(event) => setIntroduction(event.target.value)}
              value={introduction}
            />
            <S.CharacterCount>{introduction.length}/300</S.CharacterCount>

            <S.SectionDivider />
            <S.MessageSectionTitle>팀장이 남긴 질문</S.MessageSectionTitle>
            <S.QuestionPreviewList>
              {questions.map((question, index) => (
                <S.QuestionInputGroup key={question.title}>
                  <S.QuestionNumber>
                    Q{index + 1}. {question.title}
                  </S.QuestionNumber>
                  <S.QuestionPreviewCard>
                  <S.QuestionAnswerInput
                    aria-label={`질문 ${index + 1} 답변`}
                    maxLength={300}
                    onChange={(event) =>
                      setQuestionAnswers((answers) =>
                        answers.map((answer, answerIndex) =>
                          answerIndex === index ? event.target.value : answer,
                        ),
                      )
                    }
                    value={questionAnswers[index]}
                  />
                  <S.QuestionCharacterCount>
                    {questionAnswers[index].length}/300
                  </S.QuestionCharacterCount>
                  </S.QuestionPreviewCard>
                </S.QuestionInputGroup>
              ))}
            </S.QuestionPreviewList>
          </S.FormContent>
        )}

        {step === 4 && (
          <S.CompletionContent>
            <S.SuccessIcon>
              <Icon name="check" size={25} weight="bold" />
            </S.SuccessIcon>
            <S.CompletionTitle>지원을 보냈어요</S.CompletionTitle>
            <S.CompletionDescription>
              데이터로 서울을 팀장에게 전달됐어요.
            </S.CompletionDescription>

            <S.ApplicationSummary>
              <div>
                <dt>지원 분야</dt>
                <dd>{selectedField}</dd>
              </div>
              <div>
                <dt>지원 역할</dt>
                <dd>{selectedPosition}</dd>
              </div>
              <div>
                <dt>참여 가능 시간</dt>
                <dd>{weeklyHours || "0"}시간</dd>
              </div>
            </S.ApplicationSummary>

            <S.NextStepsCard>
              <S.NextStepsTitle>다음 단계</S.NextStepsTitle>
              <S.NextStep $active>
                <S.StepMark $active>
                  <Icon name="check" size={10} weight="bold" />
                </S.StepMark>
                <div>
                  <strong>지원 전달 완료</strong>
                  <span>오늘 오전 9:41</span>
                </div>
              </S.NextStep>
              <S.NextStep>
                <S.StepMark>2</S.StepMark>
                <div>
                  <strong>팀장 검토</strong>
                  <span>곧 결과를 알려드릴게요.</span>
                </div>
              </S.NextStep>
              <S.NextStep>
                <S.StepMark>3</S.StepMark>
                <div>
                  <strong>수락 및 팀 채팅 참여</strong>
                  <span>역할별 팀과 논의 예정</span>
                </div>
              </S.NextStep>
            </S.NextStepsCard>

            <S.CompletionNotice>
              팀장 검토 전까지 마이페이지 &gt; 지원 현황에서 지원을 취소할 수
              있어요.
            </S.CompletionNotice>
          </S.CompletionContent>
        )}
      </S.Content>
      <S.ActionBar>
        <S.NextButton disabled={!canContinue} onClick={handleNext} type="button">
          {step === 3 ? "지원 보내기" : step === 4 ? "확인" : "다음으로 가기"}
        </S.NextButton>
      </S.ActionBar>
      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsSubmitModalOpen(false)}
        open={isSubmitModalOpen}
        primaryAction={{
          label: "지원 보내기",
          onClick: () => {
            setIsSubmitModalOpen(false);
            setStep(4);
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsSubmitModalOpen(false),
        }}
        title="정말 지원하시겠어요?"
      />
      <Modal
        description="작성 중인 지원 내용은 저장되지 않아요."
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="x" size={22} weight="bold" />}
        onClose={() => setIsCancelModalOpen(false)}
        open={isCancelModalOpen}
        primaryAction={{
          label: "지원 취소하기",
          onClick: () => navigate(-1),
        }}
        secondaryAction={{
          label: "계속 작성하기",
          onClick: () => setIsCancelModalOpen(false),
        }}
        title="지원을 취소할까요?"
      />
    </S.Page>
  );
}
