import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: 76px;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[100]};
  `,
  ContestSummary: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px 10px;
    background: ${tokens.color.neutral[50]};
  `,
  ContestName: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 600;
  `,
  DDay: styled.span`
    padding: 4px 7px;
    border-radius: 5px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  FilterArea: styled.section`
    padding: 0 14px 12px;
    background: ${tokens.color.neutral[50]};
  `,
  FilterList: styled.div`
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TeamSection: styled.section<{ $closed?: boolean }>`
    padding: ${({ $closed }) => ($closed ? "18px 14px 20px" : "14px 14px 18px")};
    border-top: ${({ $closed }) =>
      $closed ? `1px solid ${tokens.color.neutral[200]}` : "0"};
    background: ${tokens.color.neutral[100]};
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
  `,
  TeamTotal: styled.span`
    color: ${tokens.color.neutral[900]};
  `,
  SortLabel: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  TeamList: styled.div`
    display: grid;
    gap: 10px;
    margin-top: 12px;
  `,
  TeamCard: styled.article<{ $selected: boolean }>`
    padding: 14px;
    border: 1px solid
      ${({ $selected }) =>
        $selected
          ? `color-mix(in srgb, ${tokens.color.primary[500]} 65%, ${tokens.color.neutral[50]})`
          : "transparent"};
    border-radius: 15px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 2px 7px rgb(16 21 34 / 4%);
    transition: border-color 180ms ease, box-shadow 180ms ease;
  `,
  TeamTopline: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  TeamCount: styled.span<{ $closed: boolean }>`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${({ $closed }) =>
      $closed ? tokens.color.neutral[100] : tokens.color.primary[100]};
    color: ${({ $closed }) =>
      $closed ? tokens.color.neutral[500] : tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  LastSeat: styled.span`
    padding: 4px 7px;
    border: 1px solid
      color-mix(in srgb, ${tokens.color.danger[500]} 22%, transparent);
    border-radius: 6px;
    background: color-mix(
      in srgb,
      ${tokens.color.danger[500]} 10%,
      ${tokens.color.neutral[50]}
    );
    color: ${tokens.color.danger[500]};
    box-shadow: 0 1px 2px rgb(255 77 77 / 10%);
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  TimeAgo: styled.span`
    margin-left: auto;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  TeamTitle: styled.h3`
    margin: 11px 0 5px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  TeamMeta: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.4;
  `,
  PositionList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 9px;
  `,
  PositionBadge: styled.span<{ $open: boolean }>`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${({ $open }) =>
      $open ? tokens.color.primary[100] : tokens.color.neutral[100]};
    color: ${({ $open }) =>
      $open ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
  `,
  TeamActions: styled.div<{ $closed: boolean }>`
    display: flex;
    gap: 8px;
    margin-top: ${({ $closed }) => ($closed ? "18px" : "12px")};
  `,
  DetailButton: styled.button`
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 37px;
    padding: 0 10px;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      background: ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[500]};
      cursor: default;
    }
  `,
  FavoriteButton: styled.button<{ $favorite: boolean }>`
    display: grid;
    flex: 0 0 37px;
    width: 37px;
    height: 37px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${({ $favorite }) =>
      $favorite ? tokens.color.danger[500] : tokens.color.neutral[500]};
    cursor: pointer;
  `,
  InfoNote: styled.p`
    margin: 14px 2px 0;
    padding: 11px 12px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 12px 10px max(12px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  CreateButton: styled.button`
    width: 100%;
    height: 47px;
    padding: 0;
    border: 0;
    border-radius: 13px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    box-shadow: 0 8px 18px rgb(43 87 255 / 28%);
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  `,
};
