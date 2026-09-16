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
  Hero: styled.section`
    padding: 15px 16px 16px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
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
  Section: styled.section`
    padding: 16px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
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
    background: ${tokens.color.primary[100]};
  `,
  RecruitmentRole: styled.strong`
    display: block;
    color: ${tokens.color.primary[500]};
    font-size: 11px;
    font-weight: 800;
  `,
  RecruitmentMeta: styled.p`
    margin: 5px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 600;
  `,
  RecruitingBadge: styled.span`
    flex: 0 0 auto;
    padding: 5px 7px;
    border-radius: 6px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
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
  `,
};
