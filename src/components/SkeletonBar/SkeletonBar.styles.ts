import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const shimmer = keyframes`
  from {
    background-position: 100% 0;
  }

  to {
    background-position: -100% 0;
  }
`;

export const S = {
  Bar: styled.span<{ $delay: number; $height: string; $width: string }>`
    display: block;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      ${tokens.color.neutral[100]} 25%,
      ${tokens.color.neutral[50]} 50%,
      ${tokens.color.neutral[100]} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.4s ease-in-out ${({ $delay }) => $delay}ms infinite;
  `,
};
