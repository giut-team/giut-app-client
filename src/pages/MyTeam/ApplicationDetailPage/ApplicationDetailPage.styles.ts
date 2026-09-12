import styled from "@emotion/styled";
import { Button } from "../../../components/Button";
import { tokens } from "../../../design-system/tokens.generated";
import type { ApplicantTone } from "../myTeam.data";

const colorMix = (color: string, amount: number) =>
  `color-mix(in srgb, ${color} ${amount}%, ${tokens.color.neutral[50]})`;

const applicantColors: Record<ApplicantTone, { background: string; color: string }> = {
  blue: {
    background: tokens.color.primary[100],
    color: tokens.color.primary[500],
  },
  purple: {
    background: tokens.color.purple[100],
    color: tokens.color.purple[500],
  },
  success: {
    background: colorMix(tokens.color.success[500], 12),
    color: tokens.color.success[500],
  },
};

export const S = {
  Page: styled.main`
    display: flex;
    flex-direction: column;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[100]};
  `,
  PageIndicator: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    font-weight: 500;
  `,
  Content: styled.div`
    display: grid;
    flex: 1;
    gap: 8px;
    padding: 8px 8px 16px;
  `,
  ProfileCard: styled.section`
    padding: 12px;
    border: 1px solid ${tokens.color.primary[500]};
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
  `,
  ProfileHeader: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
  `,
  Avatar: styled.span<{ $tone: ApplicantTone }>`
    display: grid;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => applicantColors[$tone].background};
    color: ${({ $tone }) => applicantColors[$tone].color};
    font-size: 12px;
    font-weight: 800;
  `,
  ProfileIdentity: styled.div`
    display: grid;
    min-width: 0;
    gap: 3px;
  `,
  Name: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  School: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 500;
  `,
  ProfileLink: styled.button`
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 9px;
    font-weight: 700;
    cursor: pointer;
  `,
  Caret: styled.span`
    display: grid;
    place-items: center;
    margin-left: auto;
    color: ${tokens.color.neutral[500]};
    line-height: 1;
  `,
  InformationCard: styled.section`
    padding: 12px;
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
  `,
  PositionLabel: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
  PositionValue: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 7px;
  `,
  RoleBadge: styled.span<{ $tone: ApplicantTone }>`
    padding: 5px 7px;
    border-radius: 6px;
    background: ${({ $tone }) => applicantColors[$tone].background};
    color: ${({ $tone }) => applicantColors[$tone].color};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  PositionText: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
  InformationList: styled.dl`
    display: grid;
    gap: 7px;
    margin: 11px 0 0;
    padding-top: 10px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  InformationRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  InformationLabel: styled.dt`
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
  InformationValue: styled.dd`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 500;
    text-align: right;
  `,
  QuestionCard: styled.section`
    padding: 12px;
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
  `,
  QuestionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  QuestionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 800;
  `,
  CharacterCount: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  Answer: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    line-height: 1.65;
  `,
  Notice: styled.p`
    margin: 0;
    padding: 12px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.5;
  `,
  ActionBar: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 10px 8px max(10px, env(safe-area-inset-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  RejectButton: styled(Button)`
    width: 100%;
    height: 38px;
    padding: 0;
    border-radius: 10px;
    font-size: 10px;
  `,
  AcceptButton: styled(Button)`
    width: 100%;
    height: 38px;
    padding: 0;
    border-radius: 10px;
    font-size: 10px;
  `,
};
