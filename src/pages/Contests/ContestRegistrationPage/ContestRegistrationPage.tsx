import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { SkeletonBar } from "../../../components/SkeletonBar/SkeletonBar";
import { S } from "./ContestRegistrationPage.styles";

type ResultState = "complete" | "duplicate" | "partial";
type ViewState = "entry" | "loading" | ResultState;
type StepState = "complete" | "current" | "pending" | "blocked";

const getResultState = (url: string): ResultState => {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes("data-contest-2024")) return "duplicate";
  if (normalizedUrl.includes("partial")) return "partial";

  return "complete";
};

const getStepState = (
  index: number,
  activeStep: number,
  view: ViewState,
): StepState => {
  if (view === "duplicate" && index === 1) return "complete";
  if (view === "duplicate" && index > 1) return "blocked";
  if (view === "complete") return "complete";
  if (view === "partial" && index < 4) return "complete";
  if (view === "partial" && index === 4) return "current";
  if (index < activeStep) return "complete";
  if (index === activeStep) return "current";
  return "pending";
};

export function ContestRegistrationPage() {
  const navigate = useNavigate();
  const sequenceRef = useRef(0);
  const [url, setUrl] = useState("https://contest.example.kr/fintech-12");
  const [view, setView] = useState<ViewState>("entry");
  const [activeStep, setActiveStep] = useState(1);

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

  const steps = [
    ["중복 검사", "중복 없음 · 새 공모전으로 진행"],
    ["원문 링크 확인", "주최기관 공식 페이지를 확인 중입니다"],
    ["자동 필드 추출", "필수 6개 항목을 추출 중이에요"],
    ["인증마크 판정", "관리자 검증 없이 즉시 게시 가능"],
  ] as const;
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

        {view !== "entry" && (
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
                <S.Description>
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

            <S.UrlBar $compact={view !== "loading"}>
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

            {view === "duplicate" && (
              <S.DuplicateNotice>
                <Icon name="warning" size={14} weight="fill" />
                <div>
                  <strong>중복 검사 · 이미 등록된 공모전</strong>
                  <span>
                    같은 모집 URL로 등록된 공모전을 찾았어요. 새로 등록하지
                    않아도 바로 팀을 찾을 수 있어요.
                  </span>
                </div>
              </S.DuplicateNotice>
            )}

            <S.StepList>
              {steps.map(([title, description], index) => {
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
                      ) : stepState === "current" ? (
                        <S.StepSpinner aria-label="진행 중" />
                      ) : (
                        stepNumber
                      )}
                    </S.StepIndicator>
                    <div>
                      <strong>{title}</strong>
                      <span>
                        {stepState === "blocked"
                          ? "중복으로 중단됨"
                          : view === "complete"
                            ? completedDescriptions[index]
                            : description}
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
                <S.ResultBadge>IT/과학</S.ResultBadge>
                <S.DDay>D-15</S.DDay>
                <h2>2024 서울시 데이터 활용 공모전</h2>
                <p>서울특별시 · 2026.05.12 등록</p>
                <S.CardDivider />
                <S.PrimaryCardButton
                  onClick={() => navigate("/contests/seoul-data")}
                  type="button"
                >
                  해당 공모전으로 이동
                  <Icon name="arrow-right" size={14} weight="bold" />
                </S.PrimaryCardButton>
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
          <S.ContinueButton type="button">
            {view === "partial" ? "직접 입력해서 계속하기" : "지금 게시하기"}
          </S.ContinueButton>
        </S.Footer>
      )}
    </S.Page>
  );
}
