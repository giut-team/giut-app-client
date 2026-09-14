import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

type NotificationTone = "blue" | "yellow" | "red" | "green" | "sky";

const notificationColors: Record<
  NotificationTone,
  { background: string; color: string }
> = {
  blue: {
    background: tokens.color.primary[100],
    color: tokens.color.primary[500],
  },
  yellow: {
    background: tokens.color.warning[100],
    color: tokens.color.warning[500],
  },
  red: {
    background: `color-mix(in srgb, ${tokens.color.danger[500]} 10%, ${tokens.color.neutral[50]})`,
    color: tokens.color.danger[500],
  },
  green: {
    background: `color-mix(in srgb, ${tokens.color.success[500]} 12%, ${tokens.color.neutral[50]})`,
    color: tokens.color.success[500],
  },
  sky: {
    background: tokens.color.primary[100],
    color: tokens.color.primary[500],
  },
};

export const S = {
  Page: styled.main`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[100]};
  `,
  MarkAllReadButton: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
      color: ${tokens.color.neutral[500]};
      cursor: default;
    }
  `,
  List: styled.div`
    display: grid;
    gap: 8px;
    padding: 8px 12px 24px;
  `,
  NotificationCard: styled.button<{ $unread: boolean }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    min-height: 74px;
    padding: 13px 12px;
    gap: 10px;
    border: 1px solid
      ${({ $unread }) =>
        $unread ? tokens.color.primary[100] : tokens.color.neutral[50]};
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  NotificationIcon: styled.span<{ $tone: NotificationTone }>`
    display: grid;
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 9px;
    background: ${({ $tone }) => notificationColors[$tone].background};
    color: ${({ $tone }) => notificationColors[$tone].color};
  `,
  NotificationAsset: styled.img`
    width: 17px;
    height: 17px;
    object-fit: contain;
  `,
  NotificationContent: styled.span`
    display: grid;
    min-width: 0;
    gap: 4px;
  `,
  NotificationTitle: styled.strong`
    overflow: hidden;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
    letter-spacing: -0.2px;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  NotificationDescription: styled.span`
    overflow: hidden;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 500;
    letter-spacing: -0.1px;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ReceivedAt: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 500;
  `,
  UnreadDot: styled.span`
    position: absolute;
    top: 14px;
    right: 13px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${tokens.color.danger[500]};
  `,
};
