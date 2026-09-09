import styled from "@emotion/styled";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { tokens } from "../design-system/tokens.generated";

export type ButtonTone = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  width?: CSSProperties["width"];
}

const getTextColor = (tone: ButtonTone) => {
  if (tone === "primary") {
    return tokens.color.neutral[50];
  }

  if (tone === "secondary") {
    return tokens.color.neutral[700];
  }

  return tokens.color.neutral[700];
};

const getBackgroundColor = (tone: ButtonTone) => {
  if (tone === "primary") {
    return tokens.color.primary[500];
  }

  if (tone === "secondary") {
    return tokens.color.neutral[100];
  }

  return tokens.color.neutral[100];
};

const getHoverBackgroundColor = (tone: ButtonTone) => {
  if (tone === "primary") {
    return tokens.color.primary[600];
  }

  if (tone === "secondary") {
    return tokens.color.neutral[100];
  }

  return tokens.color.neutral[100];
};

const S = {
  Wrapper: styled.button<Pick<ButtonProps, "tone" | "width">>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 48px;
    padding: 0 20px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition:
      opacity 0.2s ease-in-out,
      transform 0.1s ease,
      background-color 0.2s ease;

    width: ${({ width }) => width ?? "fit-content"};

    background-color: ${({ tone = "primary" }) => getBackgroundColor(tone)};
    color: ${({ tone = "primary" }) => getTextColor(tone)};
    font: inherit;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;

    &:hover:not(:disabled) {
      opacity: 0.9;
      background-color: ${({ tone = "primary" }) =>
        getHoverBackgroundColor(tone)};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 3px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }

    &:disabled {
      background-color: ${tokens.color.neutral[300]};
      color: ${tokens.color.neutral[700]};
      cursor: not-allowed;
      transform: none;
      opacity: 1;
    }
  `,
};

export const Button = ({
  children,
  tone = "primary",
  width = "fit-content",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <S.Wrapper tone={tone} width={width} type={type} {...props}>
      {children}
    </S.Wrapper>
  );
};
