import styled from "@emotion/styled";
import type {
  CSSProperties,
  TextareaHTMLAttributes,
} from "react";
import { tokens } from "../design-system/tokens.generated";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  resize?: CSSProperties["resize"];
}

const S = {
  Wrapper: styled.textarea<
    Pick<TextareaProps, "width" | "height" | "resize">
  >`
    box-sizing: border-box;
    width: ${({ width }) => width ?? "100%"};
    height: ${({ height }) => height ?? "104px"};
    padding: 14px 15px;
    border: 1px solid ${tokens.color.neutral[300]};
    border-radius: 12px;
    outline: none;
    resize: ${({ resize }) => resize ?? "none"};
    background-color: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 16px;
    line-height: 1.6;
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
      resize: none;
      background-color: ${tokens.color.neutral[100]};
      color: ${tokens.color.neutral[500]};
    }
  `,
};

export const Textarea = ({
  width = "100%",
  height = "104px",
  resize = "none",
  ...props
}: TextareaProps) => {
  return (
    <S.Wrapper
      width={width}
      height={height}
      resize={resize}
      {...props}
    />
  );
};
