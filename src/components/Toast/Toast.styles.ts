import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const toastLifecycle = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 8px);
  }

  18%, 70% {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -4px);
  }
`;

export const S = {
  Toast: styled.p`
    position: fixed;
    z-index: 6;
    bottom: 68px;
    left: 50%;
    margin: 0;
    padding: 9px 12px;
    border-radius: 9px;
    color: ${tokens.color.neutral[50]};
    background: ${tokens.color.neutral[900]};
    animation: ${toastLifecycle} 3.2s cubic-bezier(0.22, 0.8, 0.3, 1) forwards;
    font-size: 9px;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      transform: translateX(-50%);
    }
  `,
};
