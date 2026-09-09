import styled from "@emotion/styled";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { tokens } from "../design-system/tokens.generated";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  width?: CSSProperties["width"];
}

const S = {
  Wrapper: styled.input<Pick<InputProps, "width">>`
    box-sizing: border-box;
    width: ${({ width }) => width ?? "100%"};
    height: 48px;
    padding: 0 16px;
    border: 1px solid ${tokens.color.neutral[300]};
    border-radius: 12px;
    outline: none;
    background-color: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 16px;
    line-height: 1;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;

    &::placeholder {
      color: ${tokens.color.neutral[500]};
    }

    &:focus {
      border-color: ${tokens.color.primary[500]};
      box-shadow: 0 0 0 3px rgb(43 87 255 / 16%);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${tokens.color.neutral[100]};
      color: ${tokens.color.neutral[500]};
    }
  `,
};

export const Input = ({ width = "100%", ...props }: InputProps) => {
  return <S.Wrapper width={width} {...props} />;
};
