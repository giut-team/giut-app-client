import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const kakaoYellow = "#fee500";
const appleBlack = "#17181d";

const ProviderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  height: 43px;
  padding: 0 16px;
  border: 0;
  border-radius: 11px;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition:
    filter 0.2s ease,
    transform 0.1s ease;

  &:hover {
    filter: brightness(0.96);
  }

  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid ${tokens.color.primary[500]};
    outline-offset: 2px;
  }
`;

const ProviderIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1em;
  line-height: 0;
  transform: translateY(1px);
`;

export const S = {
  Page: styled.main`
    display: flex;
    flex-direction: column;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding: 104px 20px max(26px, calc(20px + env(safe-area-inset-bottom)));
    border: 1px solid ${tokens.color.neutral[200]};
    border-top: 0;
    border-radius: 0 0 16px 16px;
    background: ${tokens.color.neutral[50]};
  `,
  Logo: styled.div`
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 4px;
    color: ${tokens.color.primary[500]};
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1.6px;
    line-height: 1;
  `,
  LogoMark: styled.svg`
    display: block;
    flex: 0 0 auto;
    width: 36px;
    height: 30px;
    overflow: visible;
  `,
  Message: styled.section`
    margin-top: 22px;
  `,
  Title: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.45;
    white-space: pre-line;
  `,
  Description: styled.p`
    margin: 12px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 12px;
    letter-spacing: -0.2px;
    line-height: 1.6;
  `,
  Actions: styled.div`
    display: grid;
    gap: 8px;
    margin-top: auto;
    padding-top: 32px;
  `,
  KakaoButton: styled(ProviderButton)`
    background: ${kakaoYellow};
    color: ${tokens.color.neutral[900]};
  `,
  AppleButton: styled(ProviderButton)`
    background: ${appleBlack};
    color: ${tokens.color.neutral[50]};
  `,
  ProviderIcon,
  Terms: styled.p`
    margin: 14px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    letter-spacing: -0.25px;
    line-height: 1.5;
    text-align: center;
  `,
  TermsLink: styled.a`
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  `,
};
