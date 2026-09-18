import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

type MemberTone = "blue" | "green" | "purple";

const memberColors: Record<MemberTone, { background: string; color: string }> = {
  blue: { background: "#e9efff", color: "#2b57ff" },
  green: { background: "#e1f6eb", color: "#159b65" },
  purple: { background: "#f0eaff", color: "#7958d8" },
};

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: calc(94px + env(safe-area-inset-bottom));
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  Hero: styled.section`
    padding: 16px 16px 15px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  BadgeRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  `,
  StatusBadges: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  OpenBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  ReviewBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: #fff2d8;
    color: #bf7700;
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  JoinedBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: #e1f6eb;
    color: #159b65;
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  HeroTitleRow: styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 9px;
  `,
  TeamName: styled.h2`
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
    color: ${tokens.color.neutral[900]};
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
    color: ${tokens.color.neutral[900]};
    font-size: 9px;
    font-weight: 600;
  `,
  ApplicationSection: styled.section`
    padding: 16px;
    border-bottom: 8px solid ${tokens.color.neutral[100]};
  `,
  ApplicationCard: styled.article<{ $accepted: boolean }>`
    padding: 14px;
    border: 1px solid ${({ $accepted }) => ($accepted ? "#b9e8d2" : "#f4dbad")};
    border-radius: 14px;
    background: ${({ $accepted }) => ($accepted ? "#ecfaf3" : "#fff8e9")};
  `,
  AcceptedBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: #d7f3e5;
    color: #159b65;
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  ApplicationCardHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    time {
      color: ${tokens.color.neutral[900]};
      font-size: 9px;
      font-weight: 700;
    }
  `,
  ApplicationTitle: styled.h3`
    margin: 13px 0 6px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
  `,
  ApplicationDescription: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 9px;
    line-height: 1.65;
  `,
  Timeline: styled.div`
    display: flex;
    align-items: flex-start;
    margin: 17px 0 14px;
  `,
  TimelineStep: styled.div<{ $state: "complete" | "pending" }>`
    display: grid;
    justify-items: center;
    gap: 5px;
    color: ${({ $state }) =>
      $state === "complete" ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 700;
    white-space: nowrap;
  `,
  TimelineDot: styled.span<{ $complete?: boolean }>`
    display: grid;
    width: 19px;
    height: 19px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $complete }) =>
      $complete ? tokens.color.primary[500] : tokens.color.neutral[200]};
    color: ${tokens.color.neutral[50]};
  `,
  TimelineLine: styled.span<{ $state: "complete" | "pending" }>`
    flex: 1;
    height: 1px;
    margin: 9px 9px 0;
    background: ${({ $state }) =>
      $state === "complete" ? tokens.color.primary[500] : tokens.color.neutral[200]};
  `,
  ApplicationPosition: styled.div<{ $accepted: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 11px 10px;
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font-size: 9px;

    span {
      color: ${tokens.color.neutral[900]};
    }

    strong {
      color: ${tokens.color.neutral[900]};
      font-weight: 800;
    }
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
  PositionSectionTitle: styled.h2`
    margin: 0 0 14px;
    color: ${tokens.color.neutral[900]};
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.45px;
  `,
  PositionList: styled.div`
    display: grid;
    gap: 10px;
  `,
  PositionCard: styled.article<{ $applied: boolean }>`
    display: flex;
    min-height: ${({ $applied }) => ($applied ? "60px" : "48px")};
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};

    div {
      display: grid;
      gap: 4px;
    }

    strong {
      color: ${({ $applied }) =>
        $applied ? tokens.color.neutral[900] : tokens.color.neutral[500]};
      font-size: 9px;
      font-weight: 800;
    }

    span {
      color: ${tokens.color.neutral[900]};
      font-size: 9px;
      font-weight: 600;
    }
  `,
  ClosedBadge: styled.span`
    padding: 6px 8px;
    border-radius: 6px;
    background: ${tokens.color.neutral[200]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  AppliedBadge: styled.span`
    && {
      padding: 6px 8px;
      border-radius: 6px;
      background: ${tokens.color.primary[100]};
      color: ${tokens.color.primary[500]};
      font-size: 9px;
      font-weight: 800;
    }
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
      color: ${tokens.color.neutral[900]};
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
  IntroductionTitle: styled.h3`
    margin: 17px 0 7px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  Introduction: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    line-height: 1.7;
  `,
  MemberList: styled.div`
    display: grid;
    gap: 15px;
  `,
  Member: styled.article`
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    align-items: center;
    gap: 13px;
  `,
  MemberAvatar: styled.span<{ $tone: MemberTone }>`
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => memberColors[$tone].background};
    color: ${({ $tone }) => memberColors[$tone].color};
    font-size: 13px;
    font-weight: 800;
  `,
  MemberContent: styled.div`
    display: grid;
    min-width: 0;
    gap: 3px;
  `,
  MemberHeading: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  MemberName: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  MemberRole: styled.span`
    padding: 3px 5px;
    border-radius: 5px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
  `,
  MemberSpecialty: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    line-height: 1.35;
  `,
  MemberSchool: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.35;
  `,
  ActionBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
    gap: 9px;
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  ChatButton: styled.button`
    display: grid;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    padding: 0;
    place-items: center;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    cursor: pointer;
  `,
  ApplicationActions: styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
  `,
  ViewApplicationButton: styled.button`
    flex: 1;
    height: 44px;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;
  `,
  AcceptedViewApplicationButton: styled.button`
    flex: 1;
    height: 44px;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;
  `,
  CancelApplicationButton: styled.button`
    flex: 1;
    height: 44px;
    padding: 0;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
  `,
};
