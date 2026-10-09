import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { PageHeader } from "../../components/PageHeader";
import { Icon } from "../../components/icons";
import { S } from "./StudentVerificationPage.styles";

const UNIVERSITY_EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@uos\.ac\.kr$/;

export function StudentVerificationPage() {
  const navigate = useNavigate();
  const [universityEmail, setUniversityEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const normalizedEmail = universityEmail.trim();
  const isUniversityEmail = UNIVERSITY_EMAIL_PATTERN.test(normalizedEmail);
  const canSubmit = isUniversityEmail && isAgreed;

  return (
    <S.Page>
      <PageHeader onBack={() => navigate(-1)} title="학생 인증" />

      <S.Content>
        <S.Title>{"서울시립대학교\n구성원 인증하기"}</S.Title>
        <S.Description>
          학교 이메일로 재학생임을 인증하면 학교 인증 배지가 붙고, 우리 학교 팀
          <br />
          매칭을 이용할 수 있어요.
        </S.Description>

        <S.Notice>
          <Icon name="lock" size={13} weight="fill" />
          학교 이메일은 재학생 인증에만 사용돼요
        </S.Notice>

        <S.Form onSubmit={(event) => event.preventDefault()}>
          <S.Field>
            학교 이메일
            <S.FieldInput
              autoComplete="email"
              inputMode="email"
              onChange={(event) => setUniversityEmail(event.target.value)}
              placeholder="example@uos.ac.kr"
              type="email"
              value={universityEmail}
            />
            <S.FieldHint>서울시립대학교 이메일(@uos.ac.kr)을 입력해주세요.</S.FieldHint>
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
        </S.Form>
      </S.Content>

      <S.BottomArea>
        <S.LaterButton
          onClick={() => {
            sessionStorage.removeItem("kakao-login-pending");
            navigate("/home", { replace: true });
          }}
          tone="secondary"
          type="button"
        >
          학생 인증 나중에 하기
        </S.LaterButton>
        <S.SubmitButton disabled={!canSubmit} type="button" width="100%">
          인증코드 받기
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
    </S.Page>
  );
}
