import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: 76px;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 10px;
    background: ${tokens.color.neutral[50]};
  `,
  HeaderActions: styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
  `,
  HeaderButton: styled.button`
    display: grid;
    width: 31px;
    height: 31px;
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

    &[aria-pressed="true"] {
      background: transparent;
      color: ${tokens.color.neutral[700]};
    }
  `,
  Hero: styled.section`
    position: relative;
    padding: 10px 18px 15px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  HeroTags: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  Category: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  Verified: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 4px 6px;
    border-radius: 5px;
    background: color-mix(
      in srgb,
      ${tokens.color.success[500]} 10%,
      ${tokens.color.neutral[50]}
    );
    color: ${tokens.color.success[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  HeroTitle: styled.h1`
    margin: 13px 0 7px;
    color: ${tokens.color.neutral[900]};
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.65px;
    line-height: 1.35;
  `,
  Host: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 600;
  `,
  HeroStats: styled.div`
    display: flex;
    gap: 7px;
    margin-top: 9px;
    color: ${tokens.color.neutral[900]};

    span {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 8px;
      line-height: 1;
    }
  `,
  DDay: styled.span`
    position: absolute;
    right: 18px;
    bottom: 16px;
    padding: 5px 8px;
    border-radius: 6px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  InfoSection: styled.section`
    padding: 15px 12px 18px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  InfoList: styled.dl`
    display: grid;
    gap: 10px;
    margin: 0;
  `,
  InfoRow: styled.div`
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 0;

    span {
      color: ${tokens.color.neutral[900]};
      font-size: 10px;
      font-weight: 700;
      line-height: 1.4;
    }

    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 10px;
      font-weight: 700;
      line-height: 1.4;
    }
  `,
  SourceLink: styled.a`
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 700;
    line-height: 1.4;
    text-decoration: none;
  `,
  Notice: styled.p`
    margin: 16px 0 0;
    padding: 13px 14px;
    border-radius: 12px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font-size: 9px;
    line-height: 1.55;
  `,
  TabList: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 12px;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  TabButton: styled.button<{ $active: boolean }>`
    height: 39px;
    padding: 0;
    border: 0;
    border-bottom: 2px solid
      ${({ $active }) => ($active ? tokens.color.primary[500] : "transparent")};
    background: transparent;
    color: ${({ $active }) =>
      $active ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  `,
  TabContent: styled.section`
    padding: 17px 12px 18px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  Description: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 9px;
    line-height: 1.75;
  `,
  TeamsHeader: styled.section`
    padding: 20px 12px;
    background: ${tokens.color.neutral[50]};
  `,
  TeamsSection: styled.section`
    padding: 0 12px 96px;
    background: ${tokens.color.neutral[50]};
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
  `,
  TeamTotal: styled.span`
    color: ${tokens.color.primary[500]};
  `,
  ViewAll: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  TeamList: styled.div`
    display: grid;
    gap: 18px;
    margin-top: 0;
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
  TeamTicketTop: styled.div`
    padding-bottom: 2px;
    border: 2px solid ${tokens.color.neutral[200]};
    border-bottom: 0;
    border-radius: 18px 18px 0 0;
  `,
  TeamTicketDivider: styled.div`
    position: relative;
    height: 12px;

    &::before {
      position: absolute;
      top: 5px;
      right: 6px;
      left: 6px;
      content: "";
      border-top: 2px dashed ${tokens.color.neutral[200]};
    }
  `,
  TeamTicketNotch: styled.span<{ $side: "left" | "right" }>`
    position: absolute;
    z-index: 1;
    top: 0;
    width: 12px;
    height: 12px;
    border: 2px solid ${tokens.color.neutral[200]};
    border-radius: 50%;
    background: ${tokens.color.neutral[50]};

    ${({ $side }) => ($side === "left" ? "left: -6px;" : "right: -6px;")}
  `,
  TeamTitleRow: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    padding: 14px 14px 0;
  `,
  TeamTitleGroup: styled.div`
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 8px;
  `,
  TeamTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.35;
  `,
  OwnerBadge: styled.span`
    flex: 0 0 auto;
    padding: 4px 6px;
    border-radius: 6px;
    background: #e1f6eb;
    color: ${tokens.color.success[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  TeamFavoriteButton: styled.button<{ $favorite: boolean }>`
    display: grid;
    width: 24px;
    height: 24px;
    flex: 0 0 auto;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: #000;
    cursor: pointer;
  `,
  TeamDescription: styled.p`
    min-height: 24px;
    margin: 2px 14px 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 1.45;
  `,
  TeamFooter: styled.div`
    display: flex;
    min-height: 46px;
    padding: 4px 14px;
    align-items: center;
    justify-content: space-between;
    border: 2px solid ${tokens.color.neutral[200]};
    border-top: 0;
    border-radius: 0 0 18px 18px;
  `,
  TeamMemberCount: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: ${tokens.color.neutral[700]};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.45px;

    svg {
      color: #000;
    }
  `,
  TeamApplyButton: styled.button`
    min-width: 76px;
    height: 32px;
    padding: 0 11px;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.primary[600]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: -0.4px;
    cursor: pointer;
  `,
  ShareLinkRow: styled.div`
    display: flex;
    height: 33px;
    margin-top: 8px;
    padding: 0 8px 0 10px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 9px;
  `,
  ShareLinkText: styled.span`
    overflow: hidden;
    color: ${tokens.color.neutral[900]};
    font-size: 8px;
    letter-spacing: -0.2px;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  CopyButton: styled.button`
    flex: 0 0 auto;
    padding: 4px 5px;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  ShareActions: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
    margin-top: 10px;
  `,
  ShareActionButton: styled.button`
    display: grid;
    gap: 4px;
    padding: 0;
    justify-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;
  `,
  ShareActionIcon: styled.span<{ $tone: "kakao" | "neutral" }>`
    display: grid;
    width: 100%;
    height: 39px;
    place-items: center;
    border-radius: 10px;
    background: ${({ $tone }) =>
      $tone === "kakao" ? "#fee500" : tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 14px 10px max(12px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  SaveButton: styled.button`
    display: grid;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    cursor: pointer;

    &[aria-pressed="true"] {
      color: ${tokens.color.primary[500]};
    }
  `,
  ApplyButton: styled.button`
    flex: 1;
    height: 52px;
    padding: 0;
    border: 0;
    border-radius: 15px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    box-shadow: 0 8px 18px rgb(43 87 255 / 28%);
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      background: ${tokens.color.primary[600]};
    }
  `,
};
