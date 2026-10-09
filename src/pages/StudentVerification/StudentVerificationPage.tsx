import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  sendUniversityEmailCode,
  verifyUniversityEmailCode,
} from "../../api/members";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { PageHeader } from "../../components/PageHeader";
import { Toast } from "../../components/Toast/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { S } from "./StudentVerificationPage.styles";

const UNIVERSITY_EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@uos\.ac\.kr$/;
const VERIFICATION_CODE_VALIDITY_MS = 5 * 60 * 1000;

const formatRemainingTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError<{ message?: string }>(error)) return fallback;

  return error.response?.data?.message ?? fallback;
};

export function StudentVerificationPage() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [universityEmail, setUniversityEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLaterModalOpen, setIsLaterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [codeExpiresAt, setCodeExpiresAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const normalizedEmail = universityEmail.trim();
  const isUniversityEmail = UNIVERSITY_EMAIL_PATTERN.test(normalizedEmail);
  const isCodeStep = Boolean(sentEmail);
  const sendCodeMutation = useMutation({
    mutationFn: sendUniversityEmailCode,
    onSuccess: (response) => {
      const now = Date.now();
      const serverExpiration = new Date(response.expiresAt).getTime();
      const fallbackExpiration = now + VERIFICATION_CODE_VALIDITY_MS;
      const expiration =
        Number.isNaN(serverExpiration) || serverExpiration <= now
          ? fallbackExpiration
          : Math.min(serverExpiration, fallbackExpiration);

      setSentEmail(response.universityEmail);
      setVerificationCode("");
      setCodeExpiresAt(expiration);
      setRemainingSeconds(Math.ceil((expiration - now) / 1000));
      setErrorMessage("");
      setToastMessage("인증번호를 이메일로 보냈어요.");
    },
    onError: (error) => {
      setErrorMessage(
        getErrorMessage(
          error,
          "인증번호를 보내지 못했어요. 잠시 후 다시 시도해 주세요.",
        ),
      );
    },
  });
  const verifyCodeMutation = useMutation({
    mutationFn: verifyUniversityEmailCode,
    onSuccess: async () => {
      sessionStorage.removeItem("kakao-login-pending");
      await refreshAuth();
      navigate("/home", {
        replace: true,
        state: { toastMessage: "학교 인증을 완료했어요." },
      });
    },
    onError: (error) => {
      setErrorMessage(
        getErrorMessage(
          error,
          "인증번호를 확인하지 못했어요. 다시 확인해 주세요.",
        ),
      );
    },
  });
  const isSubmitting =
    sendCodeMutation.isPending || verifyCodeMutation.isPending;
  const isCodeExpired = isCodeStep && remainingSeconds <= 0;
  const canSubmit = isCodeStep
    ? verificationCode.trim().length > 0 && !isCodeExpired
    : isUniversityEmail && isAgreed;

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (!codeExpiresAt) return;

    const updateRemainingTime = () => {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((codeExpiresAt - Date.now()) / 1000),
      );

      setRemainingSeconds(nextRemainingSeconds);
      if (nextRemainingSeconds === 0) {
        setErrorMessage((currentMessage) =>
          currentMessage || "인증번호 유효시간이 만료됐어요. 인증번호를 다시 받아주세요.",
        );
      }
    };

    const intervalId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(intervalId);
  }, [codeExpiresAt]);

  const handleSendCode = () => {
    if (!isUniversityEmail || !isAgreed || sendCodeMutation.isPending) return;

    setErrorMessage("");
    sendCodeMutation.mutate({ universityEmail: normalizedEmail });
  };

  const handleVerifyCode = () => {
    const code = verificationCode.trim();
    if (!sentEmail || !code || verifyCodeMutation.isPending) return;
    if (!codeExpiresAt || Date.now() >= codeExpiresAt) {
      setErrorMessage(
        "인증번호 유효시간이 만료됐어요. 인증번호를 다시 받아주세요.",
      );
      return;
    }

    setErrorMessage("");
    verifyCodeMutation.mutate({ universityEmail: sentEmail, code });
  };

  const handleSubmit = () => {
    if (isCodeStep) {
      handleVerifyCode();
      return;
    }

    handleSendCode();
  };

  const handleBack = () => {
    if (isCodeStep) {
      setSentEmail("");
      setVerificationCode("");
      setCodeExpiresAt(null);
      setRemainingSeconds(0);
      setErrorMessage("");
      return;
    }

    navigate(-1);
  };

  return (
    <S.Page>
      <PageHeader onBack={handleBack} title="학생 인증" />

      <S.Content>
        <S.Title>{"서울시립대학교\n구성원 인증하기"}</S.Title>
        <S.Description>
          {isCodeStep ? (
            <>
              <strong>{sentEmail}</strong>로 인증번호를 보냈어요.
              <br />
              이메일에 도착한 인증번호를 입력해주세요.
            </>
          ) : (
            <>
              학교 이메일로 재학생임을 인증하면 학교 인증 배지가 붙고, 우리 학교 팀
              <br />
              매칭을 이용할 수 있어요.
            </>
          )}
        </S.Description>

        <S.Notice>
          <Icon name="lock" size={13} weight="fill" />
          {isCodeStep
            ? "인증번호가 보이지 않으면 스팸 메일함도 확인해주세요"
            : "학교 이메일은 재학생 인증에만 사용돼요"}
        </S.Notice>

        <S.Form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          {isCodeStep ? (
            <>
              <S.CodeField>
                인증번호
                <S.CodeInputRow>
                  <S.CodeInputWrap>
                    <S.CodeFieldInput
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      onChange={(event) => {
                        setVerificationCode(event.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="인증번호를 입력해주세요"
                      value={verificationCode}
                    />
                    <S.CodeTimer aria-label={`남은 시간 ${formatRemainingTime(remainingSeconds)}`}>
                      {formatRemainingTime(remainingSeconds)}
                    </S.CodeTimer>
                  </S.CodeInputWrap>
                  <S.ResendButton
                    disabled={sendCodeMutation.isPending}
                    onClick={() => {
                      setErrorMessage("");
                      sendCodeMutation.mutate({ universityEmail: sentEmail });
                    }}
                    tone="secondary"
                    type="button"
                  >
                    {sendCodeMutation.isPending
                      ? "전송 중..."
                      : "인증번호 다시 받기"}
                  </S.ResendButton>
                </S.CodeInputRow>
              </S.CodeField>
            </>
          ) : (
            <>
              <S.Field>
                학교 이메일
                <S.FieldInput
                  autoComplete="email"
                  inputMode="email"
                  onChange={(event) => {
                    setUniversityEmail(event.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="example@uos.ac.kr"
                  type="email"
                  value={universityEmail}
                />
                <S.FieldHint>
                  서울시립대학교 이메일(@uos.ac.kr)을 입력해주세요.
                </S.FieldHint>
              </S.Field>

              <S.Consent>
                <S.Checkbox
                  checked={isAgreed}
                  id="student-consent"
                  onChange={(event) => setIsAgreed(event.target.checked)}
                  type="checkbox"
                />
                <S.ConsentLabel htmlFor="student-consent">
                  <S.Required>[필수]</S.Required> 재학생 정보 수집 및 이용 동의
                </S.ConsentLabel>
                <S.ViewButton
                  onClick={() => setIsTermsOpen(true)}
                  tone="secondary"
                  type="button"
                >
                  보기
                </S.ViewButton>
              </S.Consent>
            </>
          )}
          {errorMessage && <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>}
        </S.Form>
      </S.Content>

      <S.BottomArea>
        <S.LaterButton
          onClick={() => {
            if (isCodeStep) {
              setSentEmail("");
              setVerificationCode("");
              setCodeExpiresAt(null);
              setRemainingSeconds(0);
              setErrorMessage("");
              return;
            }

            setIsLaterModalOpen(true);
          }}
          tone="secondary"
          type="button"
        >
          {isCodeStep ? "학교 이메일 다시 입력하기" : "학생 인증 나중에 하기"}
        </S.LaterButton>
        <S.SubmitButton
          aria-label={
            isSubmitting
              ? isCodeStep
                ? "인증 처리 중"
                : "인증번호 전송 중"
              : undefined
          }
          disabled={!canSubmit || isSubmitting}
          onClick={handleSubmit}
          type="button"
          width="100%"
        >
          {isSubmitting ? (
            <S.ProcessingLabel aria-live="polite">
              {isCodeStep ? "인증 중" : "인증번호 전송 중"}
              <S.LoadingDots aria-hidden="true">
                <i />
                <i />
                <i />
              </S.LoadingDots>
            </S.ProcessingLabel>
          ) : isCodeStep ? (
            "인증하기"
          ) : (
            "인증코드 받기"
          )}
        </S.SubmitButton>
      </S.BottomArea>

      <BottomSheet
        eyebrow="필수 동의"
        footerVariant="action"
        minHeight="510px"
        onClose={() => setIsTermsOpen(false)}
        open={isTermsOpen}
        showCloseButton
        title="재학생 정보 수집 및 이용 동의"
        variant="compact"
        footer={
          <S.TermsAgreeButton
            onClick={() => {
              setIsAgreed(true);
              setIsTermsOpen(false);
            }}
            type="button"
            width="100%"
          >
            동의하고 닫기
          </S.TermsAgreeButton>
        }
      >
        <S.TermsContent>
          <S.TermsSection>
            <S.TermsHeading>1. 수집하는 항목</S.TermsHeading>
            <S.TermsText>
              학교명, 학교 이메일, 재학 여부, 학교 이메일 인증 일시를
              수집합니다.
            </S.TermsText>
          </S.TermsSection>
          <S.TermsSection>
            <S.TermsHeading>2. 이용 목적</S.TermsHeading>
            <S.TermsText>
              재학생 여부 확인 및 학교 인증 배지 부여, 같은 학교 팀 매칭과
              공모전 지원 자격 확인, 부정 가입·중복 계정 방지.
            </S.TermsText>
          </S.TermsSection>
          <S.TermsSection>
            <S.TermsHeading>3. 보유 및 이용 기간</S.TermsHeading>
            <S.TermsText>
              회원 탈퇴 시 또는 인증 후 1년이 지난 시점에 즉시 삭제합니다. 관계
              법령에 따라 보관이 필요한 기록은 해당 기간 동안만 분리 보관합니다.
            </S.TermsText>
          </S.TermsSection>
          <S.TermsSection>
            <S.TermsHeading>4. 제3자 제공·동의 거부 권리</S.TermsHeading>
            <S.TermsText>
              수집한 정보는 제3자에게 제공하지 않습니다. 동의를 거부할 수
              있으나, 이 경우 학교 인증과 우리 학교 팀 매칭 기능은 이용할 수
              없습니다.
            </S.TermsText>
          </S.TermsSection>
          <S.TermsNote>문의: privacy@giut.app · 시행일 2026.03.01</S.TermsNote>
        </S.TermsContent>
      </BottomSheet>
      <Modal
        description="학교 인증 전에는 일부 기능들을 이용할 수 없어요. 홈에서 언제든 다시 인증할 수 있어요."
        emphasizeDescription
        icon={<Icon name="lock" size={22} weight="regular" />}
        onClose={() => setIsLaterModalOpen(false)}
        open={isLaterModalOpen}
        primaryAction={{
          label: "계속 인증하기",
          onClick: () => setIsLaterModalOpen(false),
        }}
        secondaryAction={{
          label: "다음에 하기",
          onClick: () => {
            sessionStorage.removeItem("kakao-login-pending");
            navigate("/home", { replace: true });
          },
        }}
        title="학생 인증을 나중에 할까요?"
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
