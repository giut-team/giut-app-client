import styled from "@emotion/styled";
import { Button } from "../Button";
import { tokens } from "../../design-system/tokens.generated";

type DecisionMode = "accept" | "reject";

const getDecisionAccent = (mode: DecisionMode) =>
  mode === "accept" ? tokens.color.primary[500] : tokens.color.danger[500];

export const S = {
  InnerPadding: styled.div<{ $compact: boolean }>`
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    padding: ${({ $compact }) => ($compact ? "12px 18px 20px" : "17px 27px 0")};
  `,
  HandleWrapper: styled.div<{ $compact: boolean }>`
    display: flex;
    justify-content: center;
    padding-bottom: ${({ $compact }) => ($compact ? "10px" : "18px")};
    cursor: grab;
    touch-action: none;
    user-select: none;
    &:active { cursor: grabbing; }
  `,
  Handle: styled.div`
    width: 47px;
    height: 5px;
    border-radius: 999px;
    background: ${tokens.color.neutral[200]};
  `,
  Title: styled.h2<{ $compact: boolean }>`
    margin: 0 0 22px;
    color: ${tokens.color.neutral[900]};
    font-size: ${({ $compact }) => ($compact ? "15px" : "22px")};
    font-weight: 800;
    letter-spacing: -0.7px;
  `,
  Header: styled.div<{ $compact: boolean; $showDivider: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ${({ $compact, $showDivider }) =>
      $compact &&
      `
        padding-bottom: ${$showDivider ? "12px" : "0"};
        border-bottom: ${$showDivider ? `1px solid ${tokens.color.neutral[200]}` : "0"};
        margin-bottom: ${$showDivider ? "12px" : "0"};
      `}
  `,
  Eyebrow: styled.p<{ $compact: boolean }>`
    margin: ${({ $compact }) => ($compact ? "0 0 5px" : "0 0 8px")};
    color: ${tokens.color.primary[500]};
    font-size: ${({ $compact }) => ($compact ? "9px" : "13px")};
    font-weight: 800;
  `,
  CloseButton: styled.button<{ $compact: boolean }>`
    display: grid;
    width: ${({ $compact }) => ($compact ? "28px" : "40px")};
    height: ${({ $compact }) => ($compact ? "28px" : "40px")};
    place-items: center;
    margin: ${({ $compact }) => ($compact ? "0 -2px 0 12px" : "-2px -8px 0 16px")};
    border: 0;
    border-radius: 50%;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: ${({ $compact }) => ($compact ? "20px" : "28px")};
    font-weight: 300;
    line-height: 1;
    cursor: pointer;
  `,
  Content: styled.div`
    min-height: 0;
    flex: 1;
  `,
  Options: styled.div`
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  Option: styled.button<{ $selected: boolean; $first: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 69px;
    padding: 0;
    border: 0;
    border-top: ${({ $first }) =>
      $first ? 0 : `1px solid ${tokens.color.neutral[200]}`};
    background: transparent;
    color: ${({ $selected }) =>
      $selected ? tokens.color.neutral[900] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 18px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 400)};
    letter-spacing: -0.5px;
    text-align: left;
    cursor: pointer;
    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: -2px;
    }
  `,
  Check: styled.span`
    color: ${tokens.color.danger[500]};
    font-size: 23px;
    font-weight: 700;
  `,
  Footer: styled.div<{ $variant: "note" | "action" }>`
    margin-top: ${({ $variant }) => ($variant === "action" ? "14px" : "22px")};
    padding: ${({ $variant }) =>
      $variant === "action"
        ? "0 0 max(16px, env(safe-area-inset-bottom))"
        : "17px 16px"};
    border-radius: 15px;
    background: ${({ $variant }) =>
      $variant === "action" ? "transparent" : tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    line-height: 1.65;
    letter-spacing: -0.35px;
  `,
  DecisionIcon: styled.div<{ $mode: DecisionMode }>`
    display: grid;
    width: 42px;
    height: 42px;
    margin-bottom: 15px;
    place-items: center;
    border-radius: 12px;
    background: ${({ $mode }) =>
      $mode === "accept"
        ? tokens.color.primary[100]
        : `color-mix(in srgb, ${tokens.color.danger[500]} 10%, ${tokens.color.neutral[50]})`};
    color: ${({ $mode }) => getDecisionAccent($mode)};
  `,
  DecisionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.55px;
    line-height: 1.35;
    white-space: pre-line;
  `,
  DecisionDescription: styled.p`
    margin: 9px 0 14px;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    line-height: 1.55;
  `,
  ApplicationCancelIcon: styled.div<{ $complete: boolean }>`
    display: grid;
    width: 36px;
    height: 36px;
    margin-bottom: 12px;
    place-items: center;
    border-radius: 12px;
    background: ${({ $complete }) =>
      $complete
        ? tokens.color.primary[100]
        : `color-mix(in srgb, ${tokens.color.danger[500]} 10%, ${tokens.color.neutral[50]})`};
    color: ${({ $complete }) =>
      $complete ? tokens.color.primary[500] : tokens.color.danger[500]};
  `,
  ApplicationCancelTitle: styled.h2`
    margin: 0 0 13px;
    color: ${tokens.color.neutral[900]};
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.55px;
    line-height: 1.35;
  `,
  ApplicationCancelDescription: styled.p<{ $hidden?: boolean }>`
    display: ${({ $hidden }) => ($hidden ? "none" : "block")};
    margin: 9px 0 14px;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    line-height: 1.55;
  `,
  ApplicationCancelDetails: styled.div`
    display: grid;
    padding: 11px;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
  `,
  ApplicationCancelDetailRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 7px 0;
    color: ${tokens.color.neutral[900]};
    font-size: 9px;

    & + & {
      border-top: 1px solid ${tokens.color.neutral[200]};
    }

    span {
      color: ${tokens.color.neutral[900]};
    }

    strong {
      color: ${tokens.color.neutral[900]};
      font-weight: 800;
    }
  `,
  ApplicationCancelPending: styled.strong`
    color: ${tokens.color.warning[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  ApplicationCancelNotice: styled.p`
    display: none;
    margin: 0;
    padding: 10px 11px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    line-height: 1.5;
  `,
  DecisionFieldHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
  `,
  DecisionFieldLabel: styled.strong`
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    font-weight: 800;
  `,
  DecisionFieldHint: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
  DecisionOptionGroup: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  `,
  DecisionOptionButton: styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 34px;
    padding: 0 7px;
    border: 1px solid
      ${({ $selected }) =>
        $selected ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 9px;
    background: ${({ $selected }) =>
      $selected ? tokens.color.primary[100] : tokens.color.neutral[50]};
    color: ${({ $selected }) =>
      $selected ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 500)};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  DecisionSummary: styled.div`
    display: grid;
    gap: 9px;
    margin-top: 10px;
    padding: 11px;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
  `,
  DecisionSummaryRow: styled.div`
    display: flex;
    justify-content: space-between;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;

    strong {
      color: ${tokens.color.neutral[900]};
      font-weight: 800;
    }
  `,
  DecisionReasonList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  DecisionReasonButton: styled.button<{ $selected: boolean }>`
    min-height: 29px;
    padding: 0 9px;
    border: 1px solid
      ${({ $selected }) =>
        $selected ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 8px;
    background: ${({ $selected }) =>
      $selected ? tokens.color.primary[100] : tokens.color.neutral[50]};
    color: ${({ $selected }) =>
      $selected ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  DecisionFooterActions: styled.div`
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 7px;
  `,
  DecisionCancelButton: styled(Button)`
    width: 100%;
    height: 42px;
    padding: 0;
    border-radius: 11px;
    font-size: 11px;
  `,
  DecisionConfirmButton: styled(Button)<{ $mode: DecisionMode }>`
    width: 100%;
    height: 42px;
    padding: 0;
    border-radius: 11px;
    background: ${({ $mode }) => getDecisionAccent($mode)};
    font-size: 11px;

    &:hover:not(:disabled) {
      background: ${({ $mode }) => getDecisionAccent($mode)};
      opacity: 0.9;
    }
  `,
  DecisionCompleteButton: styled(Button)<{ $mode: DecisionMode }>`
    width: 100%;
    height: 42px;
    padding: 0;
    border-radius: 11px;
    background: ${({ $mode }) => getDecisionAccent($mode)};
    font-size: 11px;

    &:hover:not(:disabled) {
      background: ${({ $mode }) => getDecisionAccent($mode)};
      opacity: 0.9;
    }
  `,
};
