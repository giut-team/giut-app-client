import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { tokens } from "../../design-system/tokens.generated";

const background = "#F9F8FF";
const primary = "#1C4EA3";
export const PROFILE_SHARE_MOTION_MS = 480;

const enterFromBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const exitToBottom = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

export const S = {
  Screen: styled.dialog`
    position: fixed;
    inset: 0;
    width: min(100%, var(--app-content-width));
    max-width: var(--app-content-width);
    height: 100dvh;
    max-height: none;
    margin: 0 auto;
    padding: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    border: 0;
    background: ${background};
    color: ${tokens.color.neutral[900]};
    font: inherit;

    &[open] {
      display: flex;
      justify-content: center;
      animation: ${enterFromBottom} ${PROFILE_SHARE_MOTION_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }
    &[open][data-closing="true"] {
      animation: ${exitToBottom} ${PROFILE_SHARE_MOTION_MS}ms cubic-bezier(0.8, 0, 0.8, 0.2) both;
      pointer-events: none;
    }
    &::backdrop { background: transparent; }

    @media (prefers-reduced-motion: reduce) {
      &[open], &[open][data-closing="true"] { animation: none; }
    }
    button:focus-visible, a:focus-visible {
      outline: 3px solid ${primary};
      outline-offset: 4px;
    }
  `,
  Inner: styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: min(100%, var(--app-content-width));
    min-height: 100%;
  `,
  Header: styled.header`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: max(clamp(16px, 4.2vw, 24px), env(safe-area-inset-top, 0px))
      clamp(20px, 5.5vw, 25px) 0;
    background: ${background};
  `,
  CloseButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: clamp(44px, 11vw, 50px);
    height: clamp(44px, 11vw, 50px);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  Main: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: clamp(36px, 10svh, 88px) clamp(20px, 10vw, 46px)
      max(48px, env(safe-area-inset-bottom, 0px));
  `,
  Card: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(12px, 3.3vw, 16px);
    width: 100%;
    padding: clamp(24px, 6.2vw, 28px) 24px;
    border-radius: 28px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 18px 44px rgb(38 50 71 / 7%);
    text-align: center;
    word-break: keep-all;
    overflow-wrap: anywhere;
  `,
  Avatar: styled.img`
    display: block;
    flex-shrink: 0;
    width: clamp(112px, 32vw, 144px);
    height: clamp(112px, 32vw, 144px);
    border-radius: 50%;
    object-fit: cover;
    background: ${tokens.color.neutral[100]};
  `,
  Identity: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(6px, 1.7vw, 8px);
    max-width: 100%;
  `,
  Status: styled.p<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 0;
    color: ${({ $color }) => $color};
    font-size: clamp(12px, 3.1vw, 14px);
    font-weight: 700;
    line-height: 1.4;
  `,
  StatusDot: styled.span`
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  `,
  Name: styled.h1`
    max-width: 100%;
    margin: 0;
    font-size: clamp(24px, 6.2vw, 28px);
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.25;
  `,
  Summary: styled.p`
    margin: 0;
    color: #626b7b;
    font-size: clamp(13px, 3.5vw, 16px);
    line-height: 1.5;
  `,
  Skills: styled.p`
    width: 100%;
    margin: 0;
    color: ${primary};
    font-size: clamp(12px, 3.3vw, 15px);
    font-weight: 700;
    line-height: 1.5;
  `,
  Signature: styled.p`
    width: 100%;
    margin: 0;
    padding-top: clamp(16px, 4.4vw, 20px);
    border-top: 1px solid ${tokens.color.neutral[200]};
    color: ${primary};
    font-size: clamp(18px, 4.9vw, 22px);
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.3;
  `,
  Actions: styled.div`
    display: flex;
    gap: clamp(10px, 2.5vw, 12px);
    width: 100%;
  `,
  ActionButton: styled.button`
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-width: 0;
    min-height: clamp(72px, 18.7vw, 86px);
    padding: 12px 3px;
    border: 0;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    box-shadow: 0 10px 28px rgb(38 50 71 / 8%);
    font: inherit;
    font-size: clamp(12px, 3vw, 14px);
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    word-break: keep-all;
    cursor: pointer;
    &:disabled { opacity: 0.45; cursor: default; }
    &:active:not(:disabled) { background: ${tokens.color.neutral[100]}; }
  `,
  Notice: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    color: ${tokens.color.neutral[700]};
    font-size: 13px;
    line-height: 1.6;
    text-align: center;
    word-break: keep-all;
    p { margin: 0; }
  `,
  RetryButton: styled.button`
    min-height: 44px;
    padding: 10px 18px;
    border: 0;
    border-radius: 12px;
    background: ${primary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    &:disabled { opacity: 0.45; cursor: default; }
  `,
};
