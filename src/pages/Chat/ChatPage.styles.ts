import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

type AvatarTone = "mint" | "peach" | "purple";

const avatarColors: Record<AvatarTone, { background: string; color: string }> = {
  mint: { background: "#dff5ec", color: tokens.color.success[500] },
  peach: { background: tokens.color.orange[100], color: tokens.color.orange[500] },
  purple: { background: tokens.color.purple[100], color: tokens.color.purple[500] },
};

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding: 20px 28px 88px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    margin-bottom: 12px;
  `,
  Title: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.7px;
    line-height: 1.25;
  `,
  SearchButton: styled.button`
    display: grid;
    width: 32px;
    height: 32px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: ${tokens.color.neutral[700]};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  SearchField: styled.label`
    display: flex;
    height: 42px;
    margin: 0 0 12px;
    padding: 0 12px;
    align-items: center;
    gap: 8px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[500]};

    &:focus-within {
      border-color: ${tokens.color.primary[500]};
      box-shadow: 0 0 0 3px ${tokens.color.primary[100]};
    }

    input {
      min-width: 0;
      flex: 1;
      border: 0;
      outline: 0;
      background: transparent;
      color: ${tokens.color.neutral[900]};
      font: inherit;
      font-size: 13px;
      font-weight: 600;

      &::placeholder {
        color: ${tokens.color.neutral[500]};
        font-weight: 500;
      }
    }
  `,
  ClearSearchButton: styled.button`
    display: grid;
    width: 24px;
    height: 24px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    cursor: pointer;
  `,
  Tabs: styled.div`
    display: flex;
    gap: 26px;
    height: 35px;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
  `,
  Tab: styled.button<{ $active: boolean }>`
    position: relative;
    padding: 0 12px 10px;
    border: 0;
    background: transparent;
    color: ${({ $active }) =>
      $active ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 13px;
    font-weight: ${({ $active }) => ($active ? 800 : 700)};
    letter-spacing: -0.45px;
    cursor: pointer;

    &::after {
      position: absolute;
      right: 0;
      bottom: -1px;
      left: 0;
      height: 3px;
      border-radius: 999px;
      background: ${tokens.color.primary[500]};
      content: "";
      opacity: ${({ $active }) => ($active ? 1 : 0)};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: -2px;
    }
  `,
  ChatList: styled.section`
    margin: 0 -28px;
  `,
  ChatItem: styled.button`
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr) auto;
    width: 100%;
    min-height: 82px;
    padding: 13px 28px;
    align-items: center;
    gap: 13px;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:hover {
      background: #fafbff;
    }

    &:focus-visible {
      position: relative;
      z-index: 1;
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: -2px;
    }
  `,
  Avatar: styled.span<{ $tone: AvatarTone }>`
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => avatarColors[$tone].background};
    color: ${({ $tone }) => avatarColors[$tone].color};
    font-size: 15px;
    font-weight: 800;
  `,
  ChatContent: styled.div`
    min-width: 0;
  `,
  ChatTitle: styled.strong`
    display: block;
    overflow: hidden;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.45px;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ChatPreview: styled.p`
    overflow: hidden;
    margin: 4px 0 0;
    color: ${tokens.color.neutral[700]};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.3px;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ChatMeta: styled.div`
    display: flex;
    min-width: 30px;
    min-height: 35px;
    align-self: center;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 6px;
    padding: 0;
  `,
  Time: styled.time`
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 700;
    line-height: 1.3;
    white-space: nowrap;
  `,
  UnreadBadge: styled.span`
    display: grid;
    width: 15px;
    height: 15px;
    place-items: center;
    border-radius: 50%;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  EmptyMessage: styled.p`
    margin: 36px 0;
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    text-align: center;
  `,
};
