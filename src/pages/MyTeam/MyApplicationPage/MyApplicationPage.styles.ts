import styled from "@emotion/styled";
import { Button } from "../../../components/Button";
import { tokens } from "../../../design-system/tokens.generated";

type TimelineState = "complete" | "accepted";

const stateColor = (state: TimelineState) =>
  state === "accepted" ? tokens.color.success[500] : tokens.color.primary[500];

export const S = {
  Page: styled.main`
    display: flex;
    flex-direction: column;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[100]};
  `,
  AcceptedBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: color-mix(
      in srgb,
      ${tokens.color.success[500]} 12%,
      ${tokens.color.neutral[50]}
    );
    color: ${tokens.color.success[500]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  TopContent: styled.div`
    padding: 12px 12px 13px;
    background: ${tokens.color.neutral[50]};
  `,
  TeamSummary: styled.section`
    padding: 0 2px;
  `,
  TeamTitle: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.35px;
  `,
  TeamMeta: styled.p`
    margin: 5px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
  ProgressTimeline: styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding: 0 2px;
  `,
  TimelineStep: styled.div<{ $state: TimelineState }>`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    min-width: 0;
    gap: 4px;
    color: ${({ $state }) => stateColor($state)};
  `,
  TimelineLabel: styled.span`
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
  `,
  TimelineDot: styled.span`
    flex: 0 0 5px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  `,
  TimelineLine: styled.span`
    flex: 1;
    height: 1px;
    margin: 0 7px;
    background: ${tokens.color.neutral[200]};
  `,
  ApplicationContent: styled.div`
    flex: 1;
    padding: 14px 12px 88px;
    background: ${tokens.color.neutral[100]};
  `,
  ProfileCard: styled.section`
    padding: 14px 13px;
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  Profile: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  Avatar: styled.span`
    display: grid;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 12px;
    font-weight: 800;
  `,
  ProfileIdentity: styled.div`
    display: grid;
    min-width: 0;
    gap: 4px;
  `,
  NameRow: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  Name: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  RoleBadge: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.purple[100]};
    color: ${tokens.color.purple[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
  `,
  School: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  QuestionList: styled.div`
    display: grid;
    gap: 12px;
  `,
  QuestionCard: styled.section`
    margin-top: 8px;
    padding: 14px 13px;
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  Question: styled.section`
    display: grid;
    gap: 5px;
  `,
  QuestionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  Answer: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    line-height: 1.6;
  `,
  Notice: styled.p`
    margin: 9px 0 0;
    padding: 10px 12px;
    border: 1px solid ${tokens.color.primary[100]};
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
  ActionBar: styled.div`
    position: sticky;
    bottom: 0;
    padding: 10px 12px max(10px, env(safe-area-inset-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  ChatButton: styled(Button)`
    height: 38px;
    border-radius: 10px;
    gap: 6px;
    font-size: 10px;
  `,
};
