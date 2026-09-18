import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

const actionMenuEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const actionMenuItemEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: 104px;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  HeaderActions: styled.div`
    position: relative;
  `,
  MoreButton: styled.button`
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
  ActionMenu: styled.div<{ $state: "opening" }>`
    position: absolute;
    z-index: 4;
    top: calc(100% + 5px);
    right: 0;
    width: 122px;
    padding: 5px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 8px 20px rgb(20 25 40 / 12%);
    transform-origin: top right;
    will-change: opacity, transform;
    animation: ${({ $state }) =>
      $state === "opening"
        ? `${actionMenuEnter} 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
        : "none"};
  `,
  ActionMenuButton: styled.button<{
    $danger?: boolean;
    $index: number;
    $state: "opening";
  }>`
    display: flex;
    width: 100%;
    height: 32px;
    align-items: center;
    gap: 7px;
    padding: 0 8px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: ${({ $danger }) =>
      $danger ? tokens.color.danger[500] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    animation: ${({ $index, $state }) =>
      $state === "opening"
        ? `${actionMenuItemEnter} 280ms ${100 + $index * 120}ms cubic-bezier(0.16, 1, 0.3, 1) both`
        : "none"};

    &:hover {
      background: ${tokens.color.neutral[100]};
    }
  `,
  Hero: styled.section`
    padding: 14px 14px 17px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  HeroTopline: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  OwnerBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: color-mix(in srgb, ${tokens.color.success[500]} 12%, ${tokens.color.neutral[50]});
    color: ${tokens.color.success[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  CountBadge: styled.span`
    padding: 6px 8px;
    border-radius: 7px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  TeamTitle: styled.h2`
    margin: 10px 0 5px;
    color: ${tokens.color.neutral[900]};
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.7px;
    line-height: 1.3;
  `,
  ContestName: styled.p`
    margin: 0 0 15px;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 600;
  `,
  ProgressTrack: styled.div`
    height: 5px;
    overflow: hidden;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
  `,
  ProgressValue: styled.span`
    display: block;
    width: 60%;
    height: 100%;
    border-radius: inherit;
    background: ${tokens.color.primary[500]};
  `,
  HeroMeta: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  Section: styled.section<{ $last?: boolean }>`
    padding: 16px;
    border-bottom: ${({ $last }) =>
      $last ? "0" : `8px solid ${tokens.color.neutral[100]}`};
  `,
  SectionTitle: styled.h2`
    margin: 0 0 12px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.35px;
  `,
  PositionList: styled.div`
    display: grid;
    gap: 7px;
  `,
  PositionCard: styled.div<{ $open: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 11px 12px;
    border-radius: 11px;
    background: ${({ $open }) =>
      $open ? tokens.color.primary[100] : tokens.color.neutral[100]};
  `,
  PositionName: styled.strong<{ $open: boolean }>`
    display: block;
    color: ${({ $open }) =>
      $open ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font-size: 10px;
    font-weight: 800;
  `,
  PositionInfo: styled.p`
    margin: 4px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  PositionStatus: styled.span<{ $open: boolean }>`
    flex: 0 0 auto;
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.neutral[50]};
    color: ${({ $open }) =>
      $open ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  InfoGrid: styled.dl`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin: 0;
  `,
  InfoItem: styled.div`
    min-width: 0;

    dt {
      margin-bottom: 5px;
      color: ${tokens.color.neutral[500]};
      font-size: 8px;
      font-weight: 600;
    }

    dd {
      margin: 0;
      overflow: hidden;
      color: ${tokens.color.neutral[900]};
      font-size: 10px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  Introduction: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    line-height: 1.75;
  `,
  MemberList: styled.div`
    display: grid;
    gap: 15px;
  `,
  Member: styled.article`
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    align-items: start;
    gap: 10px;
  `,
  Avatar: styled.span<{ $tone: "green" | "blue" | "purple" }>`
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 11px;
    background: ${({ $tone }) =>
      $tone === "green"
        ? "#dff5ec"
        : $tone === "purple"
          ? tokens.color.purple[100]
          : tokens.color.primary[100]};
    color: ${({ $tone }) =>
      $tone === "green"
        ? tokens.color.success[500]
        : $tone === "purple"
          ? tokens.color.purple[500]
          : tokens.color.primary[500]};
    font-size: 11px;
    font-weight: 800;
  `,
  MemberHeading: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  MemberName: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  RoleBadge: styled.span`
    padding: 3px 5px;
    border-radius: 4px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 7px;
    font-weight: 800;
    line-height: 1;
  `,
  MemberRole: styled.p`
    margin: 4px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  MemberSchool: styled.p`
    margin: 3px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 12px 14px max(16px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    border-top: 1px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  ApplicationsButton: styled.button`
    display: flex;
    width: 100%;
    height: 48px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 0;
    border: 0;
    border-radius: 13px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  `,
  NewBadge: styled.span`
    padding: 3px 5px;
    border-radius: 5px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font-size: 7px;
    font-weight: 800;
    line-height: 1;
  `,
  SecondaryActions: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
    margin-top: 13px;
  `,
  SecondaryButton: styled.button`
    height: 34px;
    padding: 0 8px;
    border: 0;
    border-radius: 9px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;
  `,
  SheetIcon: styled.div<{ $tone: "primary" | "warning" }>`
    display: grid;
    width: 34px;
    height: 34px;
    margin-bottom: 12px;
    place-items: center;
    border-radius: 10px;
    background: ${({ $tone }) =>
      $tone === "warning" ? tokens.color.warning[100] : tokens.color.primary[100]};
    color: ${({ $tone }) =>
      $tone === "warning" ? tokens.color.warning[500] : tokens.color.primary[500]};
  `,
  SheetTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
  `,
  SheetDescription: styled.p`
    margin: 8px 0 13px;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.55;
  `,
  Summary: styled.dl`
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0 11px;
    border-radius: 11px;
    background: ${tokens.color.neutral[100]};
  `,
  SummaryRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 32px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};

    &:last-child {
      border-bottom: 0;
    }

    dt {
      color: ${tokens.color.neutral[500]};
      font-size: 8px;
      font-weight: 600;
    }

    dd {
      margin: 0;
      color: ${tokens.color.neutral[900]};
      font-size: 9px;
      font-weight: 800;
    }
  `,
  Pending: styled.strong`
    color: ${tokens.color.danger[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  Acknowledgement: styled.label`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 11px;
    padding: 10px 11px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.4;
    cursor: pointer;

    input {
      width: 13px;
      height: 13px;
      margin: 0;
      accent-color: ${tokens.color.primary[500]};
    }
  `,
  SheetHelpText: styled.p`
    margin: 10px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  SheetActions: styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.3fr;
    gap: 7px;
  `,
  SheetButton: styled.button<{ $primary?: boolean }>`
    height: 37px;
    padding: 0;
    border: 0;
    border-radius: 10px;
    background: ${({ $primary }) =>
      $primary ? tokens.color.primary[500] : tokens.color.neutral[100]};
    color: ${({ $primary }) =>
      $primary ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      background: ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[500]};
      cursor: not-allowed;
    }
  `,
  InviteLinkCard: styled.section`
    padding: 10px 11px;
    border-radius: 11px;
    background: ${tokens.color.neutral[100]};
  `,
  InviteLinkLabel: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  InviteLinkRow: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  InviteLink: styled.code`
    min-width: 0;
    flex: 1;
    overflow: hidden;
    color: ${tokens.color.neutral[900]};
    font-family: inherit;
    font-size: 9px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  CopyButton: styled.button`
    flex: 0 0 auto;
    height: 24px;
    padding: 0 8px;
    border: 0;
    border-radius: 7px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  InviteExpiry: styled.p`
    margin: 9px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;

    strong {
      float: right;
      color: ${tokens.color.neutral[700]};
      font-weight: 800;
    }
  `,
  InviteOptions: styled.div`
    display: grid;
    gap: 7px;
    margin-top: 11px;
  `,
  InviteOption: styled.button`
    display: flex;
    width: 100%;
    min-height: 42px;
    align-items: center;
    gap: 9px;
    padding: 7px 10px;
    border: 1px solid ${tokens.color.neutral[100]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  InviteOptionIcon: styled.span<{ $tone: "purple" | "white" }>`
    display: grid;
    width: 23px;
    height: 23px;
    place-items: center;
    border-radius: 7px;
    border: ${({ $tone }) =>
      $tone === "white" ? `1px solid ${tokens.color.neutral[200]}` : "0"};
    background: ${({ $tone }) =>
      $tone === "purple" ? tokens.color.purple[100] : tokens.color.neutral[50]};
    color: ${tokens.color.purple[500]};
  `,
  InviteOptionImage: styled.img`
    display: block;
    width: 16px;
    height: 16px;
  `,
  InviteOptionCopy: styled.span`
    display: grid;
    gap: 2px;

    strong {
      font-size: 9px;
      font-weight: 800;
    }

    small {
      color: ${tokens.color.neutral[500]};
      font-size: 7px;
      font-weight: 600;
    }
  `,
  InviteCaret: styled.span`
    margin-left: auto;
    color: ${tokens.color.neutral[500]};
  `,
  SheetCloseButton: styled.button`
    width: 100%;
    height: 37px;
    padding: 0;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;
  `,
};
