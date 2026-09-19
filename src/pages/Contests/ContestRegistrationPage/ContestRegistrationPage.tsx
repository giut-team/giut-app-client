import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { SkeletonBar } from "../../../components/SkeletonBar/SkeletonBar";
import { S } from "./ContestRegistrationPage.styles";

type ResultState = "complete" | "duplicate" | "partial";
type ViewState = "entry" | "loading" | "field-edit" | ResultState;
type ContestDraft = {
  title: string;
  organizer: string;
  period: string;
  target: string;
  prize: string;
};
type StepState =
  | "complete"
  | "current"
  | "pending"
  | "blocked"
  | "duplicate"
  | "partial";

const getResultState = (url: string): ResultState => {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes("data-contest-2026")) return "duplicate";
  if (normalizedUrl.includes("partial")) return "partial";

  return "complete";
};

const getStepState = (
  index: number,
  activeStep: number,
  view: ViewState,
): StepState => {
  if (view === "duplicate" && index === 1) return "duplicate";
  if (view === "duplicate" && index > 1) return "blocked";
  if (view === "complete") return "complete";
  if (view === "partial" && index < 3) return "complete";
  if (view === "partial" && index === 3) return "partial";
  if (view === "partial" && index > 3) return "blocked";
  if (index < activeStep) return "complete";
  if (index === activeStep) return "current";
  return "pending";
};

export function ContestRegistrationPage() {
  const navigate = useNavigate();
  const sequenceRef = useRef(0);
  const [url, setUrl] = useState("https://contest.example.kr/partial");
  const [view, setView] = useState<ViewState>("entry");
  const [activeStep, setActiveStep] = useState(1);
  const [category, setCategory] = useState("");
  const [editingField, setEditingField] = useState<keyof ContestDraft | null>(
    null,
  );
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [draft, setDraft] = useState<ContestDraft>({
    title: "제 12회 핀테크 해커톤",
    organizer: "금융위원회",
    period: "2026.09.01 - 09.21",
    target: "대학 재/휴학생",
    prize: "",
  });

  const startLoading = () => {
    if (!url.trim()) return;

    const sequence = sequenceRef.current + 1;
    const resultState = getResultState(url);

    sequenceRef.current = sequence;
    setView("loading");
    setActiveStep(1);

    const schedule = (delay: number, action: () => void) => {
      window.setTimeout(() => {
        if (sequenceRef.current === sequence) action();
      }, delay);
    };

    if (resultState === "duplicate") {
      schedule(1200, () => setView("duplicate"));
      return;
    }

    schedule(1200, () => setActiveStep(2));
    schedule(2400, () => setActiveStep(3));

    if (resultState === "partial") {
      schedule(3600, () => setView("partial"));
      return;
    }

    schedule(3600, () => setActiveStep(4));
    schedule(4800, () => setView(resultState));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();
  };

  const resetToEntry = () => {
    sequenceRef.current += 1;
    setView("entry");
    setActiveStep(1);
  };

  const extractedFields = [
    ["공모전명", "title"],
    ["주최", "organizer"],
    ["접수 기간", "period"],
    ["참가 대상", "target"],
  ] as const;
  const categories = ["IT/과학", "기획", "디자인", "마케팅"];
  const canRegister = Boolean(category && draft.prize.trim());

  const steps = [
    "중복 검사",
    "원문 링크 확인",
    "자동 필드 추출",
    "인증마크 판정",
  ] as const;
  const processingDescriptions = [
    "등록된 공모전과 중복 여부를 확인 중입니다",
    "주최기관 공식 페이지를 확인 중입니다",
    "필수 항목을 추출 중입니다",
    "인증마크 여부를 판정 중입니다",
  ];
  const pendingDescriptions = [
    "중복 검사를 준비 중입니다",
    "중복 검사 후 원문 링크를 확인합니다",
    "원문 링크 확인 후 필드를 추출합니다",
    "필드 추출 후 인증마크를 판정합니다",
  ];
  const completedDescriptions = [
    "중복 없음 · 새 공모전으로 진행",
    "금융위원회 공식 페이지 확인",
    "필수 6개 전부 추출 완료",
    "관리자 검증 없이 즉시 게시 가능",
  ];

  const isResultView = view === "complete" || view === "partial";

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate(-1)} title="공모전 등록" />

        {view === "entry" && (
          <S.EntryForm onSubmit={handleSubmit}>
            <S.Heading>
              모집 URL만 붙여넣으면
              <br />
              나머지는 기웃이 채워요
            </S.Heading>
            <S.Description>
              제목·접수 기간·참가 대상을 자동으로 추출하고, 이미 등록된
              공모전이라면 바로 알려드려요.
            </S.Description>
            <S.UrlBar>
              <S.UrlInput
                aria-label="공모전 모집 URL"
                onChange={(event) => setUrl(event.target.value)}
                type="url"
                value={url}
              />
              <S.LoadButton type="submit">불러오기</S.LoadButton>
            </S.UrlBar>
          </S.EntryForm>
        )}

        {view === "field-edit" && (
          <S.EditScreen>
            <S.EditUrlBar>
              <Icon name="link" size={11} weight="bold" />
              <span>{url.replace(/^https?:\/\//, "")}</span>
              <button onClick={startLoading} type="button">
                다시 불러오기
              </button>
            </S.EditUrlBar>

            <S.FormHeadingRow>
              <S.FormHeading>자동 추출 결과</S.FormHeading>
              <S.ExtractionCount>6개 중 4개 추출</S.ExtractionCount>
            </S.FormHeadingRow>
            <S.FormDescription>
              추출된 항목은 눌러서 바로 수정할 수 있어요. 아래 <em>2개 항목</em>
              만 직접 입력하면 등록됩니다.
            </S.FormDescription>

            <S.ExtractedFieldList>
              {extractedFields.map(([label, key]) => (
                <S.ExtractedField key={key}>
                  <S.FieldMeta>
                    <strong>{label}</strong>
                    <S.FieldStatus>
                      <S.AutoTag>
                        <Icon name="check" size={8} weight="bold" />
                        자동
                      </S.AutoTag>
                    </S.FieldStatus>
                  </S.FieldMeta>
                  <S.FieldInputWrap>
                    <S.FieldInput
                      aria-label={label}
                      $editing={editingField === key}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      readOnly={editingField !== key}
                      value={draft[key]}
                    />
                    <S.FieldEditButton
                      $editing={editingField === key}
                      aria-label={
                        editingField === key
                          ? `${label} 수정 완료`
                          : `${label} 수정`
                      }
                      onClick={() =>
                        setEditingField((current) =>
                          current === key ? null : key,
                        )
                      }
                      type="button"
                    >
                      <Icon
                        name={editingField === key ? "check" : "edit"}
                        size={11}
                        weight="bold"
                      />
                    </S.FieldEditButton>
                  </S.FieldInputWrap>
                </S.ExtractedField>
              ))}
            </S.ExtractedFieldList>

            <S.ManualDivider>
              <span>직접 입력 2개</span>
            </S.ManualDivider>

            <S.ManualField>
              <S.ManualFieldHeader>
                <strong>
                  카테고리 <em>*</em>
                </strong>
                <S.RequiredTag>입력 필요</S.RequiredTag>
              </S.ManualFieldHeader>
              <S.CategoryOptions>
                {categories.map((item) => (
                  <S.CategoryButton
                    $selected={category === item}
                    key={item}
                    onClick={() => setCategory(item)}
                    type="button"
                  >
                    {item}
                  </S.CategoryButton>
                ))}
              </S.CategoryOptions>
            </S.ManualField>

            <S.ManualField>
              <S.ManualFieldHeader>
                <strong>
                  시상금 <em>*</em>
                </strong>
                <S.RequiredTag>입력 필요</S.RequiredTag>
              </S.ManualFieldHeader>
              <S.ManualInput
                aria-label="시상금"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    prize: event.target.value,
                  }))
                }
                placeholder="예: 총상금 1,000만원"
                value={draft.prize}
              />
            </S.ManualField>

            <S.ManualHint>
              직접 입력한 항목이 있으면 미검증 상태로 게시되고, 운영진 확인 후
              인증마크가 표시됩니다.
            </S.ManualHint>
          </S.EditScreen>
        )}

        {view !== "entry" && view !== "field-edit" && (
          <S.Screen>
            {view === "loading" && (
              <S.Heading>
                URL을 읽고 있어요
                <S.LoadingSpinner aria-label="불러오는 중" />
              </S.Heading>
            )}
            {view === "complete" && (
              <>
                <S.Heading>필수 항목을 모두 찾았어요</S.Heading>
                <S.Description $emphasized>
                  직접 입력한 항목이 없이 바로 게시할 수 있어요.
                </S.Description>
              </>
            )}
            {view === "partial" && (
              <>
                <S.Heading>일부 항목을 찾았어요</S.Heading>
                <S.Description>
                  확인된 정보를 먼저 채웠어요. 누락된 항목만 직접 입력하면
                  등록할 수 있어요.
                </S.Description>
              </>
            )}
            {view === "duplicate" && (
              <S.DuplicateIntro>
                <strong>이미 등록된 공모전이에요</strong>
                <span>같은 URL로 등록된 공모전을 찾았어요.</span>
              </S.DuplicateIntro>
            )}

            <S.UrlBar $compact={view !== "loading"}>
              <S.UrlIcon>
                <Icon name="link" size={12} weight="bold" />
              </S.UrlIcon>
              <S.UrlInput aria-label="공모전 모집 URL" readOnly value={url} />
              {view === "loading" ? (
                <S.LoadingLabel>불러오는 중</S.LoadingLabel>
              ) : (
                <S.UrlAction
                  onClick={view === "duplicate" ? resetToEntry : startLoading}
                  type="button"
                >
                  {view === "duplicate" ? "수정" : "다시 불러오기"}
                </S.UrlAction>
              )}
            </S.UrlBar>

            {view === "loading" && (
              <S.ProgressTrack aria-label="공모전 정보 추출 진행률">
                <S.ProgressValue $step={activeStep} />
              </S.ProgressTrack>
            )}

            <S.StepList>
              {steps.map((title, index) => {
                const stepNumber = index + 1;
                const stepState = getStepState(stepNumber, activeStep, view);

                return (
                  <S.StepCard
                    $order={stepNumber}
                    $state={stepState}
                    key={title}
                  >
                    <S.StepIndicator $state={stepState}>
                      {stepState === "complete" ? (
                        <S.StepCheck>
                          <Icon name="check" size={10} weight="bold" />
                        </S.StepCheck>
                      ) : stepState === "duplicate" ? (
                        <Icon name="warning" size={10} weight="fill" />
                      ) : stepState === "partial" ? (
                        <Icon name="warning" size={10} weight="fill" />
                      ) : stepState === "current" ? (
                        <S.StepSpinner aria-label="진행 중" />
                      ) : (
                        stepNumber
                      )}
                    </S.StepIndicator>
                    <div>
                      <strong>{title}</strong>
                      <span>
                        {stepState === "duplicate"
                          ? "이미 등록된 공모전입니다"
                          : stepState === "partial"
                            ? "필수 항목 일부를 찾지 못했어요"
                            : stepState === "blocked"
                              ? "중복으로 중단됨"
                              : stepState === "complete"
                                ? completedDescriptions[index]
                                : stepState === "pending"
                                  ? pendingDescriptions[index]
                                  : processingDescriptions[index]}
                      </span>
                    </div>
                  </S.StepCard>
                );
              })}
            </S.StepList>

            {view === "loading" && (
              <S.SkeletonCard aria-label="결과 카드 준비 중">
                <S.SkeletonTitle>결과 카드 준비 중</S.SkeletonTitle>
                <SkeletonBar width="62%" />
                <SkeletonBar delay={120} width="40%" />
                <SkeletonBar delay={240} width="52%" />
              </S.SkeletonCard>
            )}

            {view === "duplicate" && (
              <S.DuplicateCard>
                <S.BadgeRow>
                  <S.ResultBadge $category>IT/과학</S.ResultBadge>
                  <S.ResultBadge>
                    <Icon name="check" size={10} weight="bold" />
                    인증
                  </S.ResultBadge>
                </S.BadgeRow>
                <h2>2026 서울시 데이터 활용 공모전</h2>
                <p>서울특별시 · 2026.05.12 등록</p>
                <S.SourceUrl>
                  <Icon name="link" size={11} weight="bold" />
                  {url.replace(/^https?:\/\//, "")}
                </S.SourceUrl>
                <S.CardDivider />
                <S.CardActionRow>
                  <S.CardActionHint>
                    해당 공모전의 팀을 찾아보세요.
                  </S.CardActionHint>
                  <S.SecondaryCardButton
                    onClick={() => navigate("/contests/seoul-data")}
                    type="button"
                  >
                    공모전 보기
                    <Icon name="arrow-right" size={12} weight="bold" />
                  </S.SecondaryCardButton>
                </S.CardActionRow>
                <S.HelpRow>
                  <div>
                    <strong>내용이 달라졌나요?</strong>
                    <span>
                      접수 기간·시상 내역이 바뀌었다면 수정 제안을 보내주세요.
                    </span>
                  </div>
                  <button type="button">수정 제안</button>
                </S.HelpRow>
              </S.DuplicateCard>
            )}

            {isResultView && (
              <S.ResultCard $partial={view === "partial"}>
                <S.ResultBadge $partial={view === "partial"}>
                  {view === "partial" ? "일부 항목 확인" : "인증마크 확인"}
                </S.ResultBadge>
                <h2>
                  {view === "partial"
                    ? "2026 지역 상생 아이디어 공모전"
                    : "제 12회 핀테크 해커톤"}
                </h2>
                <p>
                  {view === "partial"
                    ? "주최 · 금융위원회"
                    : "주최 · 금융위원회"}
                </p>
                <p>
                  {view === "partial"
                    ? "누락 항목 · 접수 마감일, 참가 대상"
                    : "접수 · 2026.09.01 ~ 09.21 · 대상 · 대학(재·휴학생)"}
                </p>
                <p>
                  {view === "partial"
                    ? "추출 항목 4/6개"
                    : "IT/과학 · 총상금 1,000만원"}
                </p>
                {view === "partial" ? (
                  <S.PartialNotice>
                    누락된 2개 항목만 직접 입력하면 등록할 수 있어요.
                  </S.PartialNotice>
                ) : (
                  <S.SuccessNotice>
                    필수 항목 6개 모두 자동 추출 완료 · 관리자 검증 없이 즉시
                    게시됩니다.
                  </S.SuccessNotice>
                )}
              </S.ResultCard>
            )}
          </S.Screen>
        )}
      </S.Content>

      {isResultView && (
        <S.Footer>
          <S.ContinueButton
            onClick={() => {
              if (view === "partial") {
                setView("field-edit");
                return;
              }

              setIsRegistrationModalOpen(true);
            }}
            type="button"
          >
            {view === "partial" ? "직접 입력해서 계속하기" : "지금 등록하기"}
          </S.ContinueButton>
        </S.Footer>
      )}
      {view === "field-edit" && (
        <S.Footer>
          <S.ContinueButton
            disabled={!canRegister}
            onClick={() => setIsRegistrationModalOpen(true)}
            type="button"
          >
            등록하기
          </S.ContinueButton>
        </S.Footer>
      )}
      <Modal
        description="등록한 공모전은 공모전 목록에서 확인할 수 있어요."
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsRegistrationModalOpen(false)}
        open={isRegistrationModalOpen}
        primaryAction={{
          label: "등록하기",
          onClick: () => {
            setIsRegistrationModalOpen(false);
            navigate("/contests", {
              state: { toastMessage: "공모전을 등록했어요." },
            });
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsRegistrationModalOpen(false),
        }}
        title="정말 등록할까요?"
      />
    </S.Page>
  );
}
