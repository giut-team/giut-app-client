import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export type OverlayPlacement = "bottom" | "center"; // 오버레이의 위치를 나타내는 타입 정의

const bottomEnter = keyframes`from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;
const bottomExit = keyframes`from { transform: translateY(var(--overlay-drag-offset, 0px)); opacity: 1; } to { transform: translateY(100%); opacity: 0; }`;
const centerEnter = keyframes`from { transform: scale(.96); opacity: 0; } to { transform: scale(1); opacity: 1; }`;
const centerExit = keyframes`from { transform: scale(1); opacity: 1; } to { transform: scale(.96); opacity: 0; }`;
const overlayAnimationDuration = "240ms";
const overlayColor = "rgba(23, 27, 38, 0.48)";
const overlayShadow = "rgba(20, 25, 40, 0.08)";

export const S = {
  Layer: styled.div<{ $placement: OverlayPlacement }>`
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: ${({ $placement }) =>
      $placement === "center" ? "center" : "flex-end"};
    justify-content: center;
  `,
  Backdrop: styled.button`
    position: absolute;
    inset: 0;
    border: 0;
    background: ${overlayColor};
    cursor: pointer;
  `,
  Wrapper: styled.section<{
    $dragOffset?: number;
    $isDragging?: boolean;
    $minHeight?: string;
    $placement: OverlayPlacement;
  }>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${({ $placement }) =>
      $placement === "center"
        ? "min(calc(100% - 48px), 420px)"
        : "min(100%, 550px)"};
    min-height: ${({ $minHeight }) => $minHeight ?? "auto"};
    max-height: min(90vh, 650px);
    margin: 0 auto;
    overflow: hidden;
    overflow-y: auto;
    border-radius: ${({ $placement }) =>
      $placement === "center" ? "20px" : "28px 28px 0 0"};
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    box-shadow: 0 12px 40px ${overlayShadow};
    --overlay-drag-offset: ${({ $dragOffset = 0 }) => `${$dragOffset}px`};
    transform: ${({ $placement }) =>
      $placement === "center" ? "scale(.96)" : "translateY(100%)"};
    opacity: 0;
    animation: none;

    &[data-state="opening"] {
      animation: ${({ $placement }) =>
          $placement === "center" ? centerEnter : bottomEnter}
        ${overlayAnimationDuration} ease both;
    }

    &[data-state="opened"] {
      transform: ${({ $placement, $dragOffset = 0 }) => {
        if ($placement === "center") return "scale(1)";
        return `translateY(${$dragOffset}px)`;
      }};
      opacity: 1;
      transition: ${({ $isDragging }) =>
        $isDragging ? "none" : "transform 180ms ease"};
    }

    &[data-state="closing"] {
      pointer-events: none;
      animation: ${({ $placement }) =>
          $placement === "center" ? centerExit : bottomExit}
        ${overlayAnimationDuration} ease both;
    }
  `,
};
