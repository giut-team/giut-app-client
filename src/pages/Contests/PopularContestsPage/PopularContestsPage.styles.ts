import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

type CategoryTone = "blue" | "orange" | "purple" | "green" | "pink" | "yellow";

const categoryColors: Record<
  CategoryTone,
  { background: string; color: string }
> = {
  blue: { background: tokens.color.primary[100], color: tokens.color.primary[500] },
  orange: { background: tokens.color.orange[100], color: tokens.color.orange[500] },
  purple: { background: tokens.color.purple[100], color: tokens.color.purple[500] },
  green: {
    background: `color-mix(in srgb, ${tokens.color.success[500]} 10%, ${tokens.color.neutral[50]})`,
    color: tokens.color.success[500],
  },
  pink: {
    background: `color-mix(in srgb, ${tokens.color.danger[500]} 9%, ${tokens.color.neutral[50]})`,
    color: tokens.color.danger[500],
  },
  yellow: { background: tokens.color.warning[100], color: tokens.color.warning[500] },
};

export const S = {
  Page: styled.main`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[100]};
  `,
  FilterArea: styled.section`
    padding: 8px 14px 10px;
    background: ${tokens.color.neutral[50]};
  `,
  FilterList: styled.div`
    display: flex;
    gap: 5px;
    margin: 0 -14px;
    padding: 0 14px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Content: styled.div`
    padding: 0 14px 28px;
  `,
  ListControls: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 34px;
  `,
  RegisterButton: styled.button`
    display: inline-flex;
    align-items: center;
    padding: 0;
    gap: 2px;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;
  `,
  SortButton: styled.button`
    display: inline-flex;
    align-items: center;
    padding: 0;
    gap: 3px;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 3px;
      border-radius: 3px;
    }
  `,
  SectionHeading: styled.div<{ $spaced?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${({ $spaced }) => ($spaced ? "20px" : "0")};
    padding: 0 1px 8px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
    letter-spacing: -0.3px;
  `,
  SectionMeta: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 500;
  `,
  ContestList: styled.div`
    display: grid;
    gap: 8px;
  `,
  ContestCard: styled.button`
    position: relative;
    width: 100%;
    padding: 11px 13px 10px;
    border: 0;
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
    box-shadow: 0 1px 2px rgb(16 21 34 / 2%);
  `,
  CardTopline: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  TagGroup: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  RankBadge: styled.span`
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    border-radius: 5px;
    background: ${tokens.color.neutral[900]};
    color: ${tokens.color.neutral[50]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  CategoryBadge: styled.span<{ $tone: CategoryTone }>`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${({ $tone }) => categoryColors[$tone].background};
    color: ${({ $tone }) => categoryColors[$tone].color};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  VerifiedBadge: styled.span<{ $verified: boolean }>`
    display: inline-flex;
    align-items: center;
    padding: 4px 6px;
    gap: 2px;
    border-radius: 5px;
    background: ${({ $verified }) =>
      $verified
        ? `color-mix(in srgb, ${tokens.color.success[500]} 10%, ${tokens.color.neutral[50]})`
        : tokens.color.neutral[100]};
    color: ${({ $verified }) =>
      $verified ? tokens.color.success[500] : tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  DDay: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  ContestTitle: styled.h3`
    margin: 10px 0 4px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
    letter-spacing: -0.25px;
    line-height: 1.25;
  `,
  Organization: styled.p`
    margin: 0;
    overflow: hidden;
    color: #000;
    font-size: 8px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  CardFooter: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 25px;
    margin-top: 9px;
    padding-top: 8px;
    border-top: 1px solid ${tokens.color.neutral[100]};
    gap: 8px;
  `,
  TeamCount: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  Stats: styled.div`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #000;
  `,
  Stat: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 8px;
    font-weight: 500;
    line-height: 1;
  `,
  CardCaret: styled.span`
    position: absolute;
    top: 50%;
    right: 8px;
    display: grid;
    width: 18px;
    height: 18px;
    place-items: center;
    color: ${tokens.color.neutral[500]};
    transform: translateY(-50%);
  `,
  EmptyState: styled.p`
    margin: 0;
    padding: 24px 12px;
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    text-align: center;
  `,
  SortOptions: styled.div``,
  SortOption: styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 39px;
    padding: 0;
    border: 0;
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    color: ${({ $selected }) =>
      $selected ? tokens.color.neutral[900] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 10px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 500)};
    text-align: left;
    cursor: pointer;

    &:first-of-type {
      border-top: 0;
    }

    svg {
      color: ${tokens.color.danger[500]};
    }
  `,
  SortNotice: styled.p`
    margin: 11px 0 0;
    padding: 10px 11px;
    border-radius: 9px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
};
