import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Content: styled.div`
    padding: 24px 19px 20px;
  `,
  Icon: styled.div`
    display: grid;
    width: 42px;
    height: 42px;
    margin-bottom: 16px;
    place-items: center;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.primary[500]};
  `,
  Title: styled.h2`
    margin: 0 0 10px;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.6px;
  `,
  Description: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    line-height: 1.7;
    letter-spacing: -0.35px;
    white-space: pre-line;
  `,
  Actions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  `,
  PrimaryButton: styled.button`
    min-height: 39px;
    border: 0;
    border-radius: 12px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 3px;
    }
  `,
  SecondaryButton: styled.button`
    min-height: 25px;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 13px;
    cursor: pointer;
    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 3px;
    }
  `,
};
