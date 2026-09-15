import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { useTeamCreation } from "./TeamCreationContext";
import { S } from "./TeamCreationPage.styles";

const majorRoles = ["개발", "디자인", "기획", "마케팅"];
const subRoles = [
  "프로덕트 매니저",
  "프로젝트 매니저",
  "서비스 기획",
  "비즈니스 기획",
  "콘텐츠 기획",
  "데이터 분석 기획자",
];
const roleSpecs: Record<string, { skills: string[] }> = {
  개발: {
    skills: [
      "백엔드 개발자",
      "데이터 엔지니어",
      "프론트엔드 개발자",
      "풀스택 개발자",
      "iOS 개발자",
      "Android 개발자",
      "QA 개발자",
      "DevOps 엔지니어",
      "AI 개발자",
    ],
  },
  디자인: {
    skills: [
      "UI 디자이너",
      "UX 디자이너",
      "그래픽 디자이너",
      "브랜드 디자이너",
      "모션 디자이너",
    ],
  },
  기획: {
    skills: ["서비스 기획", "프로젝트 매니저", "데이터 기획"],
  },
  마케팅: {
    skills: ["콘텐츠 마케팅", "퍼포먼스 마케팅", "브랜드 마케팅"],
  },
};
const activityModes = ["온라인", "오프라인", "온·오프 혼합"];
const locationOptions = ["교내", "서울 전체", "수도권", "상관없음"];

const suggestedQuestions = [
  {
    label: "사용 가능한 툴",
    question: "이번 공모전에서 사용할 수 있는 툴을 알려주세요",
  },
  {
    label: "공모전 경험",
    question: "참여했던 공모전 경험과 맡았던 역할을 알려주세요",
  },
  {
    label: "참여 가능 시간",
    question: "프로젝트에 참여 가능한 시간을 알려주세요",
  },
];

function StepHeader({
  currentStep,
  onBack,
  onStepClick,
  title,
}: {
  currentStep: number;
  onBack: () => void;
  onStepClick: (step: number) => void;
  title: string;
}) {
  return (
    <>
      <S.Header>
        <S.BackButton aria-label="뒤로 가기" onClick={onBack} type="button">
          <Icon name="arrow-left" size={20} weight="regular" />
        </S.BackButton>
        <S.Title>{title}</S.Title>
        <S.StepCount>{currentStep}/4</S.StepCount>
      </S.Header>
      <S.Progress aria-label={`총 4단계 중 ${currentStep}단계`}>
        {[0, 1, 2, 3].map((step) => (
          <S.ProgressSegment
            $active={step < currentStep}
            $clickable={step + 1 < currentStep}
            aria-label={`${step + 1}단계로 이동`}
            disabled={step + 1 >= currentStep}
            key={step}
            onClick={() => onStepClick(step + 1)}
            type="button"
          />
        ))}
      </S.Progress>
    </>
  );
}

function StepOne() {
  const {
    majorRole,
    memberCount,
    recruitingRoles,
    setMajorRole,
    setMemberCount,
    setRecruitingRoles,
    setSubRole,
    setTeamName,
    subRole,
    teamName,
  } = useTeamCreation();

  const toggleRecruitingRole = (role: string) => {
    setRecruitingRoles(
      recruitingRoles.includes(role)
        ? recruitingRoles.filter((selectedRole) => selectedRole !== role)
        : [...recruitingRoles, role],
    );
  };

  return (
    <S.Form>
      <S.ContestNotice>
        <strong>2026 서울시 데이터 활용 공모전</strong>
        <span>이 공모전에 팀을 등록합니다</span>
      </S.ContestNotice>

      <S.Field $outlined={false}>
        <S.Label htmlFor="team-name">팀명</S.Label>
        <S.TeamNameInput
          id="team-name"
          onChange={(event) => setTeamName(event.target.value)}
          value={teamName}
        />
      </S.Field>

      <S.Field>
        <S.Label>총 모집 인원</S.Label>
        <S.HelperText>팀장님을 포함한 인원이에요</S.HelperText>
        <S.MemberControl>
          <S.CountButton
            aria-label="모집 인원 줄이기"
            disabled={memberCount <= 2}
            onClick={() => setMemberCount(memberCount - 1)}
            type="button"
          >
            <Icon name="minus" size={15} weight="bold" />
          </S.CountButton>
          <S.MemberCount>{memberCount}명</S.MemberCount>
          <S.CountButton
            aria-label="모집 인원 늘리기"
            disabled={memberCount >= 10}
            onClick={() => setMemberCount(memberCount + 1)}
            type="button"
          >
            +
          </S.CountButton>
        </S.MemberControl>
      </S.Field>

      <S.RoleField>
        <S.RoleHeading>
          <S.Label>나(팀장) 역할</S.Label>
          <S.SelectedRole>
            {majorRole} · {subRole}
          </S.SelectedRole>
        </S.RoleHeading>
        <S.RoleLabel>대분류</S.RoleLabel>
        <S.ChipList>
          {majorRoles.map((role) => (
            <S.RoleChip
              $active={majorRole === role}
              aria-pressed={majorRole === role}
              key={role}
              onClick={() => setMajorRole(role)}
              type="button"
            >
              {role}
            </S.RoleChip>
          ))}
        </S.ChipList>
        <S.RoleLabel>소분류</S.RoleLabel>
        <S.ChipList>
          {subRoles.map((role) => (
            <S.RoleChip
              $active={subRole === role}
              aria-pressed={subRole === role}
              key={role}
              onClick={() => setSubRole(role)}
              type="button"
            >
              {role}
            </S.RoleChip>
          ))}
        </S.ChipList>
      </S.RoleField>

      <S.LeaderField>
        <S.Label>모집 포지션</S.Label>
        <S.HelperText>
          어떤 직군을 모집할지 먼저 고르고, 세부 직군과 인원은 다음 단계에서
          정해요.
        </S.HelperText>
        <S.PositionChipList>
          {majorRoles.map((role) => (
            <S.RoleChip
              $active={recruitingRoles.includes(role)}
              aria-pressed={recruitingRoles.includes(role)}
              key={role}
              onClick={() => toggleRecruitingRole(role)}
              type="button"
            >
              {role}
            </S.RoleChip>
          ))}
        </S.PositionChipList>
      </S.LeaderField>
    </S.Form>
  );
}

function StepTwo() {
  const {
    memberCount,
    recruitingRoles,
    roleCounts,
    roleSkills,
    setRoleCounts,
    setRoleSkills,
  } = useTeamCreation();
  const totalSlots = Math.max(1, memberCount - 1);
  const assignedSlots = recruitingRoles.reduce(
    (total, role) => total + (roleCounts[role] ?? 1),
    0,
  );
  const allocationSummary = recruitingRoles
    .map((role) => `${role} ${roleCounts[role] ?? 1}명`)
    .join(" · ");

  const changeCount = (role: string, amount: number) => {
    const currentCount = roleCounts[role] ?? 1;
    const availableCount = totalSlots - assignedSlots + currentCount;
    const nextCount = Math.min(
      availableCount,
      Math.max(1, currentCount + amount),
    );
    setRoleCounts({ ...roleCounts, [role]: nextCount });
  };

  const toggleSkill = (role: string, skill: string) => {
    const currentSkills = roleSkills[role] ?? [];
    setRoleSkills({
      ...roleSkills,
      [role]: currentSkills.includes(skill)
        ? currentSkills.filter((selectedSkill) => selectedSkill !== skill)
        : [...currentSkills, skill],
    });
  };

  return (
    <S.Form>
      <S.StepIntro>
        <S.StepIntroHeading>
          직군과 인원{" "}
          <S.AllocationBadge>
            배정 {assignedSlots}/{totalSlots}명
          </S.AllocationBadge>
        </S.StepIntroHeading>
        <S.HelperText>
          인원은 대표 단위로 먼저 정하고, 세부 직군은 필요한 직군으로
          남겨두세요. 지원자 구성에 따라 자유롭게 조정할 수 있어요.
        </S.HelperText>
      </S.StepIntro>
      <S.SelectionSummary>
        <S.SelectionSummaryText>
          <strong>선택한 총 인원</strong>
          <span>{allocationSummary || "모집 포지션을 선택해주세요"}</span>
        </S.SelectionSummaryText>
        <S.AllocationBadge>
          {assignedSlots}/{totalSlots}명
        </S.AllocationBadge>
      </S.SelectionSummary>
      <S.RoleGroupList>
        {recruitingRoles.map((role) => {
          const spec = roleSpecs[role];
          const count = roleCounts[role] ?? 1;
          const selectedSkills = roleSkills[role] ?? [];
          return (
            <S.RoleGroup key={role}>
              <S.RoleGroupHeader>
                <div>
                  <S.RoleGroupTitle>{role}</S.RoleGroupTitle>
                  <S.RoleGroupDescription>
                    필요 인원 수 {count}명 · 직군은 지원자에 따라 배분
                  </S.RoleGroupDescription>
                </div>
                <S.CompactCountControl>
                  <S.CountButton
                    aria-label={`${role} 인원 줄이기`}
                    disabled={count <= 1}
                    onClick={() => changeCount(role, -1)}
                    type="button"
                  >
                    <Icon name="minus" size={13} weight="bold" />
                  </S.CountButton>
                  <S.MemberCount>{count}명</S.MemberCount>
                  <S.CountButton
                    aria-label={`${role} 인원 늘리기`}
                    disabled={assignedSlots >= totalSlots}
                    onClick={() => changeCount(role, 1)}
                    type="button"
                  >
                    +
                  </S.CountButton>
                </S.CompactCountControl>
              </S.RoleGroupHeader>
              <S.SkillList>
                {spec.skills.map((skill) => (
                  <S.SkillChip
                    $active={selectedSkills.includes(skill)}
                    aria-pressed={selectedSkills.includes(skill)}
                    key={skill}
                    onClick={() => toggleSkill(role, skill)}
                    type="button"
                  >
                    {skill}
                  </S.SkillChip>
                ))}
              </S.SkillList>
            </S.RoleGroup>
          );
        })}
      </S.RoleGroupList>
      <S.InfoBox>
        직군지에 따라 백엔드 3 · 데이터 1도, 백엔드 2 · 데이터 1 · 프론트 1도
        가능해요. 역할 배치 조정이 유연합니다.
      </S.InfoBox>
    </S.Form>
  );
}

function StepThree() {
  const {
    activityMode,
    locations,
    members,
    setActivityMode,
    setLocations,
    setMembers,
    setWeeklyMeetings,
    weeklyMeetings,
  } = useTeamCreation();
  const [searchQuery, setSearchQuery] = useState("");

  const addMember = () => {
    if (
      !searchQuery.trim() ||
      members.some((member) => member.id === "seoyeon")
    )
      return;
    setMembers([
      ...members,
      { id: "seoyeon", name: "이서연", profile: "@seoyeon · 기획 포지션" },
    ]);
  };

  const selectLocation = (location: string) => setLocations([location]);

  return (
    <S.StepThreeForm>
      <S.StepIntro>
        <S.StepIntroHeading>
          팀원 바로 추가 <S.OptionalLabel>선택 사항</S.OptionalLabel>
        </S.StepIntroHeading>
        <S.HelperText>
          이미 같이 하기로 한 팀원이 있으면 아이디로 추가해요. 추가한 만큼 모집
          자리가 줄어들어요.
        </S.HelperText>
      </S.StepIntro>
      <S.SearchRow>
        <S.SearchInput
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="아이디 입력 (예: seoyeon)"
          value={searchQuery}
        />
        <S.SearchButton onClick={addMember} type="button">
          검색
        </S.SearchButton>
      </S.SearchRow>
      <S.MemberStatus>
        추가한 팀원 {members.length}명 · 남은 모집{" "}
        {Math.max(0, 5 - members.length)}명
      </S.MemberStatus>
      <S.AddedMemberList>
        {members.map((member) => (
          <S.AddedMember key={member.id}>
            <S.MemberAvatar>이</S.MemberAvatar>
            <div>
              <strong>{member.name} · 기획</strong>
              <span>{member.profile}</span>
            </div>
            <S.RemoveButton
              aria-label={`${member.name} 제거`}
              onClick={() =>
                setMembers(members.filter((item) => item.id !== member.id))
              }
              type="button"
            >
              <Icon name="x" size={12} weight="bold" />
            </S.RemoveButton>
          </S.AddedMember>
        ))}
      </S.AddedMemberList>

      <S.Divider />
      <S.SectionHeading>활동 방식</S.SectionHeading>
      <S.ModeSelector>
        {activityModes.map((mode) => (
          <S.ModeButton
            $active={activityMode === mode}
            aria-pressed={activityMode === mode}
            key={mode}
            onClick={() => setActivityMode(mode)}
            type="button"
          >
            {mode}
          </S.ModeButton>
        ))}
      </S.ModeSelector>
      <S.MeetingRow>
        <div>
          <S.SectionHeading>주간 회의</S.SectionHeading>
          <S.HelperText>지원자에게 함께 보여줘요</S.HelperText>
        </div>
        <S.CompactCountControl>
          <S.CountButton
            aria-label="회의 횟수 줄이기"
            disabled={weeklyMeetings <= 1}
            onClick={() => setWeeklyMeetings(weeklyMeetings - 1)}
            type="button"
          >
            <Icon name="minus" size={13} weight="bold" />
          </S.CountButton>
          <S.MemberCount>주 {weeklyMeetings}회</S.MemberCount>
          <S.CountButton
            aria-label="회의 횟수 늘리기"
            disabled={weeklyMeetings >= 7}
            onClick={() => setWeeklyMeetings(weeklyMeetings + 1)}
            type="button"
          >
            +
          </S.CountButton>
        </S.CompactCountControl>
      </S.MeetingRow>
      <S.LocationHeading>주로 만나는 곳</S.LocationHeading>
      <S.LocationList>
        {locationOptions.map((location) => (
          <S.LocationChip
            $active={locations.includes(location)}
            aria-pressed={locations.includes(location)}
            key={location}
            onClick={() => selectLocation(location)}
            type="button"
          >
            {location}
          </S.LocationChip>
        ))}
      </S.LocationList>
      <S.ActivityGuide>
        팀원과 활동 방식은 팀을 등록한 뒤에도 언제든 수정할 수 있어요.
      </S.ActivityGuide>
    </S.StepThreeForm>
  );
}

function StepFour() {
  const { introduction, questions, setIntroduction, setQuestions } =
    useTeamCreation();
  const [isQuestionSheetOpen, setIsQuestionSheetOpen] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState("");
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(
    null,
  );
  const [editingQuestionDraft, setEditingQuestionDraft] = useState("");
  const closeQuestionSheet = () => {
    setIsQuestionSheetOpen(false);
    setDraftQuestion("");
  };
  const addQuestion = () => {
    const question = draftQuestion.trim();
    if (!question || questions.length >= 5) return;

    setQuestions([...questions, question]);
    closeQuestionSheet();
  };
  const updateQuestion = (index: number, value: string) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === index ? value : question,
      ),
    );
  const startQuestionEdit = (index: number) => {
    setEditingQuestionIndex(index);
    setEditingQuestionDraft(questions[index]);
  };
  const completeQuestionEdit = () => {
    if (editingQuestionIndex === null || !editingQuestionDraft.trim()) return;

    updateQuestion(editingQuestionIndex, editingQuestionDraft.trim());
    setEditingQuestionIndex(null);
    setEditingQuestionDraft("");
  };
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, questionIndex) => questionIndex !== index));
    setEditingQuestionIndex(null);
    setEditingQuestionDraft("");
  };

  return (
    <S.Form>
      <S.StepIntro>
        <S.StepIntroHeading>팀 소개</S.StepIntroHeading>
        <S.HelperText>
          어떤 팀인지, 어떤 팀원을 찾는지 적어주세요. 지원자가 가장 먼저 읽는
          글이에요.
        </S.HelperText>
      </S.StepIntro>
      <S.IntroductionInput
        maxLength={500}
        onChange={(event) => setIntroduction(event.target.value)}
        value={introduction}
      />
      <S.CharacterCount>{introduction.length} / 500자</S.CharacterCount>
      <S.Divider />
      <S.QuestionHeading>
        지원자에게 받을 질문{" "}
        <S.OptionalLabel>{questions.length} / 5개</S.OptionalLabel>
      </S.QuestionHeading>
      <S.HelperText>
        지원서에 이 질문들이 그대로 나가요. 팀원은 받은 지원에서 한 번에 비교할
        수 있습니다.
      </S.HelperText>
      <S.QuestionList>
        {questions.map((question, index) => (
          <S.QuestionCard $hasActions={index >= 2} key={`${question}-${index}`}>
            <S.QuestionNumber>Q{index + 1}</S.QuestionNumber>
            {index < 2 ? (
              <S.QuestionInput
                aria-label={`질문 ${index + 1}`}
                onChange={(event) => updateQuestion(index, event.target.value)}
                value={question}
              />
            ) : editingQuestionIndex === index ? (
              <S.QuestionInput
                aria-label={`질문 ${index + 1} 편집`}
                autoFocus
                onChange={(event) => setEditingQuestionDraft(event.target.value)}
                value={editingQuestionDraft}
              />
            ) : (
              <S.QuestionText>{question}</S.QuestionText>
            )}
            {index >= 2 && (
              <S.QuestionActions>
                {editingQuestionIndex === index ? (
                  <>
                    <S.QuestionIconButton
                      aria-label={`질문 ${index + 1} 수정 완료`}
                      disabled={!editingQuestionDraft.trim()}
                      onClick={completeQuestionEdit}
                      type="button"
                    >
                      <Icon name="check" size={13} weight="bold" />
                    </S.QuestionIconButton>
                    <S.QuestionIconButton
                      aria-label={`질문 ${index + 1} 삭제`}
                      onClick={() => removeQuestion(index)}
                      type="button"
                    >
                      <Icon name="x" size={11} weight="bold" />
                    </S.QuestionIconButton>
                  </>
                ) : (
                  <S.QuestionIconButton
                    aria-label={`질문 ${index + 1} 편집`}
                    onClick={() => startQuestionEdit(index)}
                    type="button"
                  >
                    <Icon name="edit" size={12} weight="bold" />
                  </S.QuestionIconButton>
                )}
              </S.QuestionActions>
            )}
          </S.QuestionCard>
        ))}
      </S.QuestionList>
      <S.AddQuestionButton
        disabled={questions.length >= 5}
        onClick={() => setIsQuestionSheetOpen(true)}
        type="button"
      >
        + 질문 추가하기
      </S.AddQuestionButton>
      <S.InfoBox>
        등록하면 이 공모전 팀 목록에 바로 노출돼요. 팀 소개와 질문은 등록 후에도
        팀 상세 → 편집에서 바꿀 수 있습니다.
      </S.InfoBox>
      <BottomSheet
        footer={
          <S.QuestionSheetActions>
            <S.QuestionSheetCancelButton
              onClick={closeQuestionSheet}
              type="button"
            >
              취소
            </S.QuestionSheetCancelButton>
            <S.QuestionSheetSubmitButton
              $disabled={!draftQuestion.trim()}
              disabled={!draftQuestion.trim()}
              onClick={addQuestion}
              type="button"
            >
              질문 추가
            </S.QuestionSheetSubmitButton>
          </S.QuestionSheetActions>
        }
        footerVariant="action"
        minHeight="510px"
        onClose={closeQuestionSheet}
        open={isQuestionSheetOpen}
        title="질문 추가"
      >
        <S.QuestionSheetHeader>
          <S.QuestionSheetDescription>
            지원자가 지원서에서 답하게 될 질문이에요. 짧고 구체적으로 물어보면
            답변을 비교하기 쉬워요.
          </S.QuestionSheetDescription>
          <S.QuestionSheetUsage>
            {questions.length} / 5개 사용
          </S.QuestionSheetUsage>
        </S.QuestionSheetHeader>
        <S.QuestionSheetTextarea
          aria-label="추가할 질문"
          maxLength={200}
          onChange={(event) => setDraftQuestion(event.target.value)}
          placeholder="예) 이번 공모전에 쓸 수 있는 툴이 있나요?"
          value={draftQuestion}
        />
        <S.QuestionSheetCharacterCount>
          {draftQuestion.length} / 200자
        </S.QuestionSheetCharacterCount>
        <S.SuggestionHeading>
          추천 질문 <span>· 탭하면 바로 채워져요</span>
        </S.SuggestionHeading>
        <S.SuggestionList>
          {suggestedQuestions.map((suggestion) => (
            <S.SuggestionChip
              $selected={draftQuestion === suggestion.question}
              key={suggestion.label}
              onClick={() => setDraftQuestion(suggestion.question)}
              type="button"
            >
              {suggestion.label}
            </S.SuggestionChip>
          ))}
        </S.SuggestionList>
        <S.QuestionSheetNote>
          질문은 최대 5개까지 가능해요 · 등록 후에도 팀 상세 → 편집에서 바꿀 수
          있어요.
        </S.QuestionSheetNote>
      </BottomSheet>
    </S.Form>
  );
}

export function TeamCreationPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data", step } = useParams();
  const [searchParams] = useSearchParams();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const { setSubmitted, submitted } = useTeamCreation();
  const requestedStep = Number(step);
  const currentStep = step
    ? Math.min(4, Math.max(1, Number.isNaN(requestedStep) ? 1 : requestedStep))
    : 1;
  const titleByStep = [
    "팀 만들기",
    "모집 포지션 정하기",
    "팀원 · 활동 방식",
    "팀 소개 · 지원 질문",
  ];
  const stepPath = (targetStep: number) =>
    `/contests/${contestId}/teams/create${targetStep === 1 ? "" : `/${targetStep}`}${searchParams.get("from") ? `?from=${searchParams.get("from")}` : ""}`;
  const goToStep = (targetStep: number) => navigate(stepPath(targetStep));
  const returnPath =
    searchParams.get("from") === "teams"
      ? `/contests/${contestId}/teams`
      : `/contests/${contestId}`;
  const handleBack = () => {
    if (currentStep === 1) {
      setIsExitModalOpen(true);
      return;
    }

    goToStep(currentStep - 1);
  };
  const handleSubmit = () => {
    if (!submitted) setIsSubmitModalOpen(true);
  };
  const confirmSubmit = () => {
    setSubmitted(true);
    setIsSubmitModalOpen(false);
    navigate(`/contests/${contestId}`);
  };

  const renderStep = () => {
    if (currentStep === 2) return <StepTwo />;
    if (currentStep === 3) return <StepThree />;
    if (currentStep === 4) return <StepFour />;
    return <StepOne />;
  };

  return (
    <S.Page>
      <S.Content>
        <StepHeader
          currentStep={currentStep}
          onBack={() => handleBack()}
          onStepClick={goToStep}
          title={titleByStep[currentStep - 1]}
        />
        {renderStep()}
      </S.Content>
      <S.ActionBar>
        <S.NextButton
          onClick={() => currentStep === 4 ? handleSubmit() : goToStep(currentStep + 1)}
          type="button"
        >
          {currentStep === 4
            ? submitted
              ? "팀 등록 완료"
              : "팀 등록하기"
            : "다음으로 가기"}
        </S.NextButton>
      </S.ActionBar>
      <Modal
        description="작성 중인 팀 정보는 저장되지 않아요."
        icon={<Icon name="x" size={22} weight="bold" />}
        onClose={() => setIsExitModalOpen(false)}
        open={isExitModalOpen}
        primaryAction={{ label: "나가기", onClick: () => navigate(returnPath) }}
        secondaryAction={{
          label: "계속 작성하기",
          onClick: () => setIsExitModalOpen(false),
        }}
        title="팀 만들기를 나가시겠어요?"
      />
      <Modal
        description="등록 후에도 팀 상세에서 정보를 수정할 수 있어요."
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsSubmitModalOpen(false)}
        open={isSubmitModalOpen}
        primaryAction={{ label: "등록하기", onClick: confirmSubmit }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsSubmitModalOpen(false),
        }}
        title="팀을 등록하시겠어요?"
      />
    </S.Page>
  );
}
