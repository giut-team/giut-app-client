import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    display: grid;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding: 40px 20px max(40px, env(safe-area-inset-bottom));
    border-right: 1px solid ${tokens.color.neutral[200]};
    border-left: 1px solid ${tokens.color.neutral[200]};
    place-items: center;
    overflow-x: hidden;
    background: #f4f6f9;

    @media (max-width: 480px) {
      padding: 24px 20px;
      border: 0;
    }
  `,
  Content: styled.div`
    width: 100%;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;

    @media (max-width: 560px) {
      margin-bottom: 24px;
    }
  `,
  BackButton: styled.button`
    display: grid;
    width: 44px;
    height: 44px;
    flex: 0 0 auto;
    padding: 0;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
    place-items: center;

    &:hover {
      background: ${tokens.color.neutral[100]};
    }

    &:focus-visible {
      outline: 3px solid rgba(43, 87, 255, 0.28);
      outline-offset: 2px;
    }
  `,
  Title: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -1.4px;
    line-height: 1.2;

    @media (max-width: 560px) {
      font-size: 30px;
    }
  `,
  Card: styled.form`
    display: grid;
    gap: 20px;
    padding: 28px 30px 30px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 16px;
    background: ${tokens.color.neutral[50]};

    @media (max-width: 560px) {
      padding: 24px 20px;
    }
  `,
  Field: styled.label`
    display: grid;
    gap: 9px;
    color: ${tokens.color.neutral[900]};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
  `,
  Input: styled.input`
    width: 100%;
    height: 52px;
    padding: 0 15px;
    border: 1px solid #d5dbe5;
    border-radius: 10px;
    outline: none;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 17px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: #687386;
    }

    &:focus {
      border-color: ${tokens.color.primary[600]};
      box-shadow: 0 0 0 3px rgba(43, 87, 255, 0.12);
    }
  `,
  SubmitButton: styled.button`
    height: 55px;
    margin-top: 4px;
    border: 0;
    border-radius: 10px;
    background: #24459c;
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.1s ease;

    &:hover:not(:disabled) {
      background: #1d3984;
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }

    &:focus-visible {
      outline: 3px solid rgba(43, 87, 255, 0.28);
      outline-offset: 2px;
    }

    &:disabled {
      cursor: wait;
      opacity: 0.7;
    }
  `,
  Status: styled.p<{ $error?: boolean }>`
    margin: -4px 0 0;
    color: ${({ $error }) =>
      $error ? tokens.color.danger[500] : tokens.color.success[500]};
    font-size: 13px;
    font-weight: 600;
    line-height: 1.45;
  `,
};
