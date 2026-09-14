import styled from "@emotion/styled";
import type { ButtonHTMLAttributes } from "react";
import { tokens } from "../design-system/tokens.generated";

export type PillButtonTone = "primary" | "dark";

export interface PillButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: PillButtonTone;
}

const S = {
  Root: styled.button<{ $active: boolean; $tone: PillButtonTone }>`
    flex: 0 0 auto;
    height: 25px;
    padding: 0 9px;
    border: 1px solid
      ${({ $active }) =>
        $active ? "transparent" : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active, $tone }) => {
      if (!$active) {
        return tokens.color.neutral[50];
      }

      return $tone === "dark"
        ? tokens.color.neutral[900]
        : tokens.color.primary[500];
    }};
    color: ${({ $active }) =>
      $active ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: ${({ $active }) => ($active ? 800 : 500)};
    white-space: nowrap;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
};

export function PillButton({
  active = false,
  children,
  tone = "primary",
  type = "button",
  ...props
}: PillButtonProps) {
  return (
    <S.Root $active={active} $tone={tone} type={type} {...props}>
      {children}
    </S.Root>
  );
}
