import styled from "@emotion/styled";
import { Button } from "../Button";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Wrapper: styled.div`
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 20px calc(20px + env(safe-area-inset-bottom));
    border-top: 1px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 -6px 20px rgba(38, 50, 71, 0.08);
  `,
  SecondaryButton: styled.button`
    display: grid;
    flex: 0 0 52px;
    width: 52px;
    height: 48px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.2;
    white-space: pre-line;
    cursor: pointer;

    &:hover:not(:disabled) {
      background: ${tokens.color.neutral[200]};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 3px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
  PrimaryButton: styled(Button)`
    flex: 1;
    width: 100%;
    height: 48px;
    min-width: 0;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
  `,
};
