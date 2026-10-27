import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

type AvatarTone = "mint" | "peach" | "purple";
type Sender = "me" | "other";

const avatarColors: Record<AvatarTone, { background: string; color: string }> = {
  mint: { background: "#dff5ec", color: tokens.color.success[500] },
  peach: { background: tokens.color.orange[100], color: tokens.color.orange[500] },
  purple: { background: tokens.color.purple[100], color: tokens.color.purple[500] },
};

export const S = {
  Page: styled.main`
    display: flex;
    width: min(100%, 480px);
    height: 100svh;
    margin: 0 auto;
    flex-direction: column;
    overflow: hidden;
    background: #f5f6fa;
    box-sizing: border-box;
  `,
  Header: styled.header`
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    height: 60px;
    padding: 0 13px;
    align-items: center;
    gap: 9px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
    flex-shrink: 0;
  `,
  BackButton: styled.button`
    display: grid;
    width: 24px;
    height: 32px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  Avatar: styled.span<{ $tone: AvatarTone }>`
    display: grid;
    width: 29px;
    height: 29px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => avatarColors[$tone].background};
    color: ${({ $tone }) => avatarColors[$tone].color};
    font-size: 13px;
    font-weight: 800;
  `,
  Profile: styled.div`
    display: grid;
    min-width: 0;
    gap: 4px;
  `,
  Name: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.35px;
    line-height: 1.2;
  `,
  Subtitle: styled.span`
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.2px;
    line-height: 1.2;
  `,
  HeaderActions: styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 2px;
  `,
  NotificationButton: styled.button<{ $muted: boolean }>`
    display: grid;
    width: 30px;
    height: 32px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${({ $muted }) =>
      $muted ? tokens.color.neutral[500] : tokens.color.neutral[900]};
    cursor: pointer;
  `,
  MoreButton: styled.button`
    display: grid;
    width: 30px;
    height: 32px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  MenuAnchor: styled.div`
    position: relative;
    display: grid;
  `,
  ChatMenu: styled.div`
    position: absolute;
    top: 39px;
    right: 0;
    z-index: 4;
    display: grid;
    width: 148px;
    overflow: hidden;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 8px 20px rgba(16, 21, 34, 0.14);
  `,
  ChatMenuButton: styled.button<{ $danger?: boolean }>`
    min-height: 48px;
    padding: 0 14px;
    border: 0;
    background: ${tokens.color.neutral[50]};
    color: ${({ $danger }) =>
      $danger ? tokens.color.danger[500] : tokens.color.neutral[900]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.35px;
    text-align: left;
    cursor: pointer;

  `,
  Thread: styled.section`
    min-height: 0;
    padding: 14px 14px 11px;
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    box-sizing: border-box;
  `,
  LoadMoreButton: styled.button`
    display: block;
    margin: 0 auto 10px;
    padding: 7px 12px;
    border: 0;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
      cursor: default;
      opacity: 0.65;
    }
  `,
  ContextCard: styled.article`
    padding: 13px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  ContextLabel: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.25px;
  `,
  ContextTitle: styled.h1`
    margin: 8px 0 12px;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.35px;
    line-height: 1.35;
  `,
  ContextActions: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  `,
  ContextButton: styled.button`
    height: 32px;
    border: 0;
    border-radius: 8px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  `,
  DateDivider: styled.p`
    width: fit-content;
    margin: 14px auto 10px;
    padding: 5px 10px;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
  `,
  Messages: styled.div`
    display: grid;
    gap: 11px;
  `,
  ThreadStatus: styled.p`
    margin: 28px 0;
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    text-align: center;
  `,
  MessageRow: styled.div<{ $sender: Sender }>`
    display: flex;
    align-items: flex-end;
    justify-content: ${({ $sender }) => ($sender === "me" ? "flex-end" : "flex-start")};
    gap: 7px;
  `,
  MessageBubbleArea: styled.div`
    position: relative;
    max-width: min(76%, 286px);
  `,
  Bubble: styled.p<{ $sender: Sender }>`
    max-width: 100%;
    margin: 0;
    padding: 11px 12px;
    border-radius: ${({ $sender }) =>
      $sender === "me" ? "12px 12px 3px 12px" : "12px 12px 12px 3px"};
    background: ${({ $sender }) =>
      $sender === "me" ? tokens.color.primary[500] : tokens.color.neutral[50]};
    color: ${({ $sender }) =>
      $sender === "me" ? tokens.color.neutral[50] : tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.32px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: none;
  `,
  MessageActionMenu: styled.div`
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    z-index: 4;
    overflow: hidden;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 6px 18px rgba(16, 21, 34, 0.14);
  `,
  MessageDeleteButton: styled.button`
    min-width: 76px;
    height: 38px;
    padding: 0 14px;
    border: 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.danger[500]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  `,
  MessageTime: styled.time`
    margin-bottom: 3px;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
  `,
  Composer: styled.form`
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 35px;
    width: 100%;
    min-height: 64px;
    padding: 9px 12px calc(9px + env(safe-area-inset-bottom));
    align-items: center;
    gap: 8px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
    flex-shrink: 0;
  `,
  MessageInput: styled.input`
    width: 100%;
    height: 38px;
    padding: 0 13px;
    border: 0;
    border-radius: 999px;
    outline: 0;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;

    &::placeholder {
      color: ${tokens.color.neutral[500]};
      font-weight: 500;
    }
  `,
  SendButton: styled.button`
    display: grid;
    width: 35px;
    height: 35px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    cursor: pointer;

    &:disabled {
      background: ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[500]};
      cursor: default;
    }
  `,
};
