import { RiKakaoTalkFill } from "react-icons/ri";
import { Icon } from "../../components/icons";
import { S } from "./LoginPage.styles";

export function LoginPage() {
  return (
    <S.Page>
      <S.Logo aria-label="기웃">
        <span>기웃</span>
        <S.LogoDot />
        <S.LogoDot />
      </S.Logo>

      <S.Message>
        <S.Title>{"관심 분야가 같은 팀을\n기웃거리러 볼까요?"}</S.Title>
        <S.Description>
          공모전·대외활동 팀 매칭 서비스
          <br />
          3초면 시작할 수 있어요
        </S.Description>
      </S.Message>

      <S.Actions>
        <S.KakaoButton type="button">
          <S.ProviderIcon>
            <RiKakaoTalkFill aria-hidden="true" size={14} />
          </S.ProviderIcon>
          카카오로 시작하기
        </S.KakaoButton>
        <S.AppleButton type="button">
          <S.ProviderIcon>
            <Icon name="apple" size={15} weight="fill" />
          </S.ProviderIcon>
          Apple로 시작하기
        </S.AppleButton>
        <S.Terms>
          가입 시 <S.TermsLink href="#terms">이용약관</S.TermsLink>과{" "}
          <S.TermsLink href="#privacy">개인정보 처리방침</S.TermsLink>에
          동의하게 됩니다.
        </S.Terms>
      </S.Actions>
    </S.Page>
  );
}
