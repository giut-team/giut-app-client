import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: 82px;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  BookmarkButton: styled.button`
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

    &[aria-pressed="true"] {
      color: ${tokens.color.neutral[700]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  Hero: styled.section`
    padding: 15px 16px 16px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  StatusBadgeRow: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 19px;
    margin-bottom: 9px;
  `,
  OwnerBadge: styled.span`
    display: inline-flex;
    margin-bottom: 9px;
    padding: 5px 8px;
    border-radius: 7px;
    background: #e1f6eb;
    color: ${tokens.color.success[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  ApplicationBadge: styled.span`
    display: inline-flex;
    padding: 5px 8px;
    border-radius: 7px;
    background: #fff4dc;
    color: ${tokens.color.warning[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  RecruitingStatusBadge: styled.span`
    display: inline-flex;
    padding: 5px 8px;
    border-radius: 7px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  TitleRow: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  `,
  TeamTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.7px;
    line-height: 1.3;
  `,
  CountBadge: styled.span`
    flex: 0 0 auto;
    padding: 6px 8px;
    border-radius: 7px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
  `,
  ContestName: styled.p`
    margin: 6px 0 15px;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    font-weight: 600;
  `,
  ProgressTrack: styled.div`
    height: 5px;
    overflow: hidden;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
  `,
  ProgressValue: styled.div<{ $value: number }>`
    width: ${({ $value }) => `${$value}%`};
    height: 100%;
    border-radius: inherit;
    background: ${tokens.color.primary[500]};
  `,
  Remaining: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
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
  RecruitmentCard: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px;
    border-radius: 13px;
    background: ${tokens.color.neutral[100]};

    & + & {
      margin-top: 8px;
    }
  `,
  RecruitmentRole: styled.strong`
    display: block;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  RecruitmentMeta: styled.p`
    margin: 5px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  RecruitingBadge: styled.span<{ $recruiting: boolean; $applied: boolean }>`
    flex: 0 0 auto;
    padding: 5px 7px;
    border-radius: 6px;
    background: ${({ $applied, $recruiting }) => {
      if ($applied) return tokens.color.primary[100];
      return $recruiting ? tokens.color.neutral[50] : tokens.color.neutral[200];
    }};
    color: ${({ $applied, $recruiting }) => (
      $applied || $recruiting ? tokens.color.primary[500] : tokens.color.neutral[700]
    )};
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
  ApplicationReviewSection: styled.section`
    padding: 22px 16px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  ApplicationReviewCard: styled.article`
    padding: 18px;
    border: 1px solid #ffd991;
    border-radius: 17px;
    background: #fff9eb;
  `,
  ApplicationReviewHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  ApplicationReviewBadge: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: #fff0cc;
    color: ${tokens.color.warning[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  ApplicationReviewDate: styled.time`
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    font-weight: 700;
  `,
  ApplicationReviewTitle: styled.h3`
    margin: 15px 0 7px;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
  `,
  ApplicationReviewDescription: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 600;
    line-height: 1.55;
  `,
  ApplicationReviewSteps: styled.div`
    display: flex;
    align-items: flex-start;
    margin: 19px 0 16px;
  `,
  ApplicationReviewStep: styled.div<{ $active?: boolean }>`
    position: relative;
    display: grid;
    width: 46px;
    flex: 0 0 46px;
    justify-items: center;
    gap: 5px;
    color: ${({ $active }) => ($active ? tokens.color.primary[500] : tokens.color.neutral[500])};
    font-size: 7px;
    font-weight: 700;

    &::before {
      display: grid;
      width: 19px;
      height: 19px;
      place-items: center;
      border-radius: 50%;
      background: ${({ $active }) => ($active ? tokens.color.primary[500] : tokens.color.neutral[200])};
      color: ${tokens.color.neutral[50]};
      content: "";
    }

    > svg {
      position: absolute;
      margin-top: 4px;
      color: ${tokens.color.neutral[50]};
    }

    > span {
      white-space: nowrap;
    }
  `,
  ApplicationReviewLine: styled.span<{ $active?: boolean }>`
    height: 2px;
    flex: 1;
    margin-top: 8px;
    background: ${({ $active }) => ($active ? tokens.color.primary[500] : tokens.color.neutral[200])};
  `,
  ApplicationRoleRow: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 600;

    strong {
      color: ${tokens.color.neutral[900]};
      font-weight: 800;
    }
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
  Avatar: styled.div<{ $tone: "green" | "purple" | "blue" }>`
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 11px;
    background: ${({ $tone }) => {
      if ($tone === "green") {
        return "#dff5ec";
      }

      if ($tone === "purple") {
        return tokens.color.purple[100];
      }

      return tokens.color.primary[100];
    }};
    color: ${({ $tone }) => {
      if ($tone === "green") {
        return tokens.color.success[500];
      }

      if ($tone === "purple") {
        return tokens.color.purple[500];
      }

      return tokens.color.primary[500];
    }};
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
    color: #000;
    font-size: 8px;
    font-weight: 600;
  `,
  MemberSchool: styled.p`
    margin: 3px 0 0;
    color: #000;
    font-size: 8px;
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: min(100%, 480px);
    gap: 8px;
    margin: 0 auto;
    padding: 12px 10px max(12px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  ChatButton: styled.button`
    display: grid;
    flex: 0 0 42px;
    width: 42px;
    height: 42px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 12px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    cursor: pointer;
  `,
  PendingApplicationActions: styled.div`
    display: flex;
    min-width: 0;
    flex: 1;
    gap: 8px;
  `,
  ViewApplicationButton: styled.button`
    flex: 1;
    height: 42px;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  `,
  CancelApplicationButton: styled.button`
    flex: 1;
    height: 42px;
    padding: 0;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  `,
  ApplyButton: styled.button`
    flex: 1;
    height: 42px;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    box-shadow: 0 8px 18px rgb(43 87 255 / 24%);
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      background: ${tokens.color.primary[600]};
    }

    &:disabled {
      background: ${tokens.color.neutral[200]};
      box-shadow: none;
      cursor: default;
    }
  `,
};
