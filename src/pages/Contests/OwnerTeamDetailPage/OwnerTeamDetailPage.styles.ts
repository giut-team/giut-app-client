import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

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
  EditButton: styled.button`
    padding: 6px 2px;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
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
  Section: styled.section`
    padding: 16px 14px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  SectionTitle: styled.h2`
    margin: 0 0 11px;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
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
  MemberList: styled.div`
    display: flex;
    gap: 7px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  MemberChip: styled.div`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 5px;
    padding: 6px 8px 6px 6px;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    font-weight: 700;
  `,
  Avatar: styled.span<{ $tone: "green" | "blue" | "purple" }>`
    display: grid;
    width: 20px;
    height: 20px;
    place-items: center;
    border-radius: 50%;
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
    font-size: 8px;
    font-weight: 800;
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
    box-shadow: 0 7px 16px rgb(43 87 255 / 22%);
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
};
