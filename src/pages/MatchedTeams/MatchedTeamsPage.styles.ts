import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

type TeamKind = "match" | "overlap";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 28px;
    background: ${tokens.color.neutral[50]};
  `,
  Hero: styled.section`
    padding: 18px 20px 16px;
    border-bottom: 10px solid ${tokens.color.neutral[100]};
  `,
  HeroTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.42;
  `,
  FilterList: styled.div`
    display: flex;
    gap: 6px;
    margin-top: 14px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Section: styled.section<{ $separated?: boolean }>`
    padding: 20px;
    border-top: ${({ $separated }) =>
      $separated ? `10px solid ${tokens.color.neutral[100]}` : "0"};
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.35;
  `,
  SectionMeta: styled.span`
    flex: 0 0 auto;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 600;
    line-height: 1.4;
  `,
  SectionDescription: styled.p`
    margin: 5px 0 14px;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.5;
  `,
  TeamList: styled.div`
    display: grid;
    gap: 10px;
    margin-top: 14px;
  `,
  TeamCard: styled.article<{ $kind: TeamKind }>`
    padding: 15px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 16px;
    background: ${tokens.color.neutral[50]};
  `,
  TeamTopline: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  PositionBadge: styled.span<{ $kind: TeamKind }>`
    padding: 5px 8px;
    border-radius: 6px;
    background: ${({ $kind }) =>
      $kind === "match" ? tokens.color.primary[100] : tokens.color.purple[100]};
    color: ${({ $kind }) =>
      $kind === "match" ? tokens.color.primary[500] : tokens.color.purple[500]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  DDay: styled.span`
    padding: 5px 8px;
    border-radius: 6px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  TeamTitle: styled.h3`
    margin: 11px 0 5px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.45px;
    line-height: 1.35;
  `,
  TeamDescription: styled.p`
    margin: 0;
    overflow: hidden;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 500;
    line-height: 1.45;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 11px;
  `,
  SkillBadge: styled.span`
    padding: 5px 8px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 5px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
  `,
  TeamActions: styled.div`
    display: flex;
    gap: 8px;
    margin-top: 13px;
  `,
  DetailButton: styled.button`
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 40px;
    padding: 0 12px;
    border: 0;
    border-radius: 11px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  FavoriteButton: styled.button<{ $favorite: boolean }>`
    display: grid;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 11px;
    background: ${tokens.color.neutral[100]};
    color: ${({ $favorite }) =>
      $favorite ? tokens.color.primary[500] : tokens.color.neutral[500]};
    cursor: pointer;

    &:hover {
      background: ${tokens.color.primary[100]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  InfoNote: styled.p`
    margin: 0 20px;
    padding: 13px 16px;
    border-radius: 12px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.5;
  `,
};
