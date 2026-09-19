import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  ContestSummary: styled.section`
    margin: 0 20px;
    padding: 14px 2px 17px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  ContestBadges: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
  `,
  CategoryBadge: styled.span`
    padding: 5px 9px;
    border-radius: 7px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 11px;
    font-weight: 800;
    line-height: 1;
  `,
  VerifiedBadge: styled.span`
    display: inline-flex;
    padding: 5px 9px;
    align-items: center;
    gap: 3px;
    border-radius: 7px;
    background: #e1f6eb;
    color: ${tokens.color.success[500]};
    font-size: 11px;
    font-weight: 800;
    line-height: 1;
  `,
  ContestTitle: styled.h1`
    margin: 6px 0 13px;
    color: ${tokens.color.neutral[900]};
    font-size: 23px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.3;
  `,
  ContestMeta: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  MetaItem: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${tokens.color.neutral[700]};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.45px;
    white-space: nowrap;

    svg {
      color: ${tokens.color.neutral[500]};
    }
  `,
  DDay: styled.span`
    padding: 4px 7px;
    border-radius: 6px;
    background: #fff0f0;
    color: ${tokens.color.danger[500]};
    font-size: 12px;
    font-weight: 800;
    line-height: 1;
  `,
  TeamSection: styled.section`
    padding: 32px 20px 28px;
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.45px;
  `,
  SortButton: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.4px;
    cursor: pointer;
  `,
  FilterControl: styled.div`
    position: relative;
  `,
  FilterMenu: styled.div`
    position: absolute;
    z-index: 2;
    top: 31px;
    right: 0;
    width: 224px;
    padding: 7px;
    border: 2px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 6px 14px rgb(25 40 72 / 10%);
  `,
  FilterOption: styled.button<{ $selected: boolean }>`
    display: flex;
    width: 100%;
    height: 39px;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
    border: 0;
    border-radius: 8px;
    background: ${({ $selected }) =>
      $selected ? tokens.color.neutral[100] : "transparent"};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 15px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
    letter-spacing: -0.45px;
    text-align: left;
    cursor: pointer;

    svg {
      color: ${tokens.color.primary[500]};
    }

    &:hover {
      background: ${tokens.color.neutral[100]};
    }
  `,
  TeamList: styled.div`
    display: grid;
    gap: 18px;
  `,
  TeamCard: styled.article`
    position: relative;
    overflow: hidden;
    background: ${tokens.color.neutral[50]};
    cursor: pointer;

    &:focus-visible {
      outline: 3px solid ${tokens.color.primary[100]};
      outline-offset: 2px;
    }
  `,
  TicketTop: styled.div`
    padding-bottom: 12px;
    border: 2px solid ${tokens.color.neutral[200]};
    border-bottom: 0;
    border-radius: 18px 18px 0 0;

  `,
  TicketDivider: styled.div`
    position: relative;
    height: 22px;

    &::before {
      position: absolute;
      top: 10px;
      right: 11px;
      left: 11px;
      content: "";
      border-top: 2px dashed ${tokens.color.neutral[200]};
    }
  `,
  TicketNotch: styled.span<{ $side: "left" | "right" }>`
    position: absolute;
    z-index: 1;
    top: 0;
    width: 22px;
    height: 22px;
    border: 2px solid ${tokens.color.neutral[200]};
    border-radius: 50%;
    background: ${tokens.color.neutral[50]};

    ${({ $side }) => ($side === "left" ? "left: -11px;" : "right: -11px;")}
  `,
  CardHeading: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    padding: 22px 20px 0;
  `,
  TitleGroup: styled.div`
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 8px;
  `,
  TeamTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.35;
  `,
  RelationshipBadge: styled.span<{ $type: "applied" | "member" | "owner" | undefined }>`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    padding: 5px 8px;
    border-radius: 6px;
    background: ${({ $type }) =>
      $type === "owner"
        ? "#e1f6eb"
        : $type === "applied"
          ? "#fff4dc"
          : tokens.color.primary[100]};
    color: ${({ $type }) =>
      $type === "owner"
        ? tokens.color.success[500]
        : $type === "applied"
          ? tokens.color.warning[500]
          : tokens.color.primary[500]};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: -0.4px;
    line-height: 1;
  `,
  FavoriteButton: styled.button<{ $favorite: boolean }>`
    display: grid;
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${({ $favorite }) =>
      $favorite ? tokens.color.neutral[700] : tokens.color.neutral[500]};
    cursor: pointer;
  `,
  TeamDescription: styled.p`
    min-height: 24px;
    margin: 12px 20px 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 1.65;
  `,
  CardFooter: styled.div`
    display: flex;
    min-height: 60px;
    padding: 8px 20px;
    align-items: center;
    justify-content: space-between;
    border: 2px solid ${tokens.color.neutral[200]};
    border-top: 0;
    border-radius: 0 0 18px 18px;
  `,
  MemberCount: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${tokens.color.neutral[700]};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.45px;

    svg {
      color: ${tokens.color.neutral[500]};
    }
  `,
  ApplyButton: styled.button`
    min-width: 92px;
    height: 42px;
    padding: 0 16px;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.primary[600]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.4px;
    cursor: pointer;
  `,
};
