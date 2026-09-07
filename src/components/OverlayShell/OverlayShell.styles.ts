import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const overlayEnter = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const overlayExit = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`;

export const S = {
  Layer: styled.div`
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: flex-end;
  `,
  Backdrop: styled.button`
    position: absolute;
    inset: 0;
    border: 0;
    background: ${tokens.color.overlay};
    cursor: pointer;
  `,
  Wrapper: styled.section<{ $minHeight?: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(100%, 550px);
    min-height: ${({ $minHeight }) => $minHeight ?? "auto"};
    max-height: min(90vh, 650px);
    margin: 0 auto;
    overflow: hidden;
    overflow-y: auto;
    border-radius: 28px 28px 0 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    box-shadow: 0 -8px 28px ${tokens.color.shadow};
    transform: translateY(100%);
    opacity: 0;
    animation: ${overlayEnter} ${tokens.motion.overlayAnimationDuration} ease both;

    &[data-state="closing"] {
      pointer-events: none;
      animation: ${overlayExit} ${tokens.motion.overlayAnimationDuration} ease both;
    }
  `,
};
