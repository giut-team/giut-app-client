import styled from "@emotion/styled";
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
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    padding: 0 16px 24px;
    background: ${tokens.color.neutral[50]};
  `,
  Summary: styled.div`
    padding: 14px 2px 11px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  SummaryTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.35px;
  `,
  FilterList: styled.div`
    display: flex;
    gap: 5px;
    padding: 10px 0 12px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  ApplicantList: styled.div`
    display: grid;
    gap: 8px;
  `,
  ApplicantCard: styled.article`
    position: relative;
    padding: 12px 10px 10px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
  `,
  ApplicantHeader: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
  `,
  Avatar: styled.span<{ $tone: ApplicantTone }>`
    display: grid;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => applicantColors[$tone].background};
    color: ${({ $tone }) => applicantColors[$tone].color};
    font-size: 12px;
    font-weight: 800;
  `,
  Identity: styled.div`
    min-width: 0;
    flex: 1;
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
  ProfileLine: styled.span`
    display: block;
    margin-top: 4px;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 500;
  `,
  ReceivedAt: styled.time`
    flex: 0 0 auto;
    padding-top: 2px;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  ApplicantMessage: styled.p`
    margin: 11px 0 6px;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 500;
    line-height: 1.45;
  `,
  ReasonLabel: styled.strong`
    display: block;
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  ApplicantAnswer: styled.p`
    display: -webkit-box;
    margin: 4px 0 0;
    overflow: hidden;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,
  ApplicationMeta: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 10px;
    padding-top: 9px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  ApplicationMetaItem: styled.div`
    display: grid;
    gap: 3px;
  `,
  ApplicationMetaLabel: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  ApplicationMetaValue: styled.strong`
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: 700;
  `,
  DetailButton: styled.button`
    display: grid;
    position: absolute;
    top: 73px;
    right: 8px;
    width: 28px;
    height: 28px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    cursor: pointer;

    &:hover {
      background: ${tokens.color.neutral[100]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
};
