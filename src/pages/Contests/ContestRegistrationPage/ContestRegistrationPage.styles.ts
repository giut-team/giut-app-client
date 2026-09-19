import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { tokens } from "../../../design-system/tokens.generated";

type StepState =
  | "complete"
  | "current"
  | "pending"
  | "blocked"
  | "duplicate"
  | "partial";

const revealStep = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const revealCheck = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const stepColors: Record<StepState, { background: string; color: string }> = {
  complete: { background: "#16b879", color: tokens.color.neutral[50] },
  current: {
    background: tokens.color.neutral[50],
    color: tokens.color.primary[500],
  },
  pending: {
    background: tokens.color.neutral[200],
    color: tokens.color.neutral[500],
  },
  blocked: {
    background: tokens.color.neutral[200],
    color: tokens.color.neutral[500],
  },
  duplicate: {
    background: tokens.color.danger[500],
    color: tokens.color.neutral[50],
  },
  partial: {
    background: tokens.color.warning[500],
    color: tokens.color.neutral[50],
  },
};

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 88px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  EntryForm: styled.form`
    min-height: calc(100svh - 56px);
    padding: 18px 16px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  Screen: styled.section`
    padding: 16px;
  `,
  Heading: styled.h2`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.45;
  `,
  LoadingSpinner: styled.span`
    flex: 0 0 auto;
    width: 15px;
    height: 15px;
    border: 2px solid ${tokens.color.primary[100]};
    border-top-color: ${tokens.color.primary[500]};
    border-radius: 50%;
    animation: ${spin} 850ms linear infinite;
    box-sizing: border-box;
  `,
  Description: styled.p<{ $emphasized?: boolean }>`
    margin: 6px 0 14px;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    font-weight: ${({ $emphasized }) => ($emphasized ? 600 : 400)};
    line-height: 1.55;
  `,
  DuplicateIntro: styled.div`
    margin-top: 2px;

    strong,
    span {
      display: block;
    }

    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.45;
    }

    span {
      margin-top: 6px;
      color: ${tokens.color.neutral[700]};
      font-size: 9px;
      font-weight: 600;
      line-height: 1.55;
    }
  `,
  UrlBar: styled.div<{ $compact?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: ${({ $compact }) => ($compact ? "14px" : "18px")};
    padding: 4px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};

    &:focus-within {
      border-color: ${tokens.color.primary[500]};
    }
  `,
  UrlIcon: styled.span`
    display: grid;
    flex: 0 0 auto;
    width: 22px;
    height: 28px;
    padding-left: 4px;
    place-items: center;
    color: ${tokens.color.neutral[500]};
    box-sizing: border-box;
  `,
  UrlInput: styled.input`
    min-width: 0;
    flex: 1;
    height: 28px;
    padding: 0 2px;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 9px;
    font-weight: 700;
  `,
  LoadButton: styled.button`
    flex: 0 0 auto;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 7px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  `,
  LoadingLabel: styled.span`
    flex: 0 0 auto;
    padding: 8px 9px;
    border-radius: 7px;
    background: ${tokens.color.neutral[200]};
    color: ${tokens.color.neutral[50]};
    font-size: 8px;
    font-weight: 800;
  `,
  UrlAction: styled.button`
    flex: 0 0 auto;
    padding: 7px 8px;
    border: 0;
    border-radius: 7px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  ProgressTrack: styled.div`
    height: 4px;
    margin: 10px 0 13px;
    overflow: hidden;
    border-radius: 999px;
    background: ${tokens.color.neutral[200]};
  `,
  ProgressValue: styled.div<{ $step: number }>`
    width: ${({ $step }) => `${$step * 25}%`};
    height: 100%;
    border-radius: inherit;
    background: ${tokens.color.primary[500]};
    transition: width 240ms ease;
  `,
  StepList: styled.div`
    display: grid;
    gap: 4px;
    margin-top: 18px;
    padding: 0 4px;
  `,
  StepCard: styled.article<{ $order: number; $state: StepState }>`
    position: relative;
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    align-items: start;
    gap: 10px;
    min-height: 40px;
    padding: 3px 0 12px;
    opacity: ${({ $state }) => ($state === "blocked" ? 0.6 : 1)};
    animation: ${revealStep} 300ms ease both;
    animation-delay: ${({ $order }) => `${($order - 1) * 110}ms`};

    &:not(:last-child)::before {
      position: absolute;
      top: 22px;
      bottom: -4px;
      left: 7px;
      width: 2px;
      border-radius: 999px;
      background: ${({ $state }) =>
        $state === "complete"
          ? "#16b879"
          : $state === "duplicate"
            ? tokens.color.danger[500]
            : $state === "partial"
              ? tokens.color.warning[500]
              : tokens.color.neutral[200]};
      content: "";
    }

    div > strong,
    div > span {
      display: block;
    }

    div > strong {
      color: ${({ $state }) =>
        $state === "current"
          ? tokens.color.primary[500]
          : $state === "duplicate"
            ? tokens.color.danger[500]
            : $state === "partial"
              ? tokens.color.warning[500]
              : tokens.color.neutral[900]};
      font-size: 10px;
      font-weight: 800;
    }

    div > span {
      margin-top: 4px;
      color: ${({ $state }) =>
        $state === "duplicate"
          ? tokens.color.danger[500]
          : $state === "partial"
            ? tokens.color.warning[500]
            : tokens.color.neutral[700]};
      font-size: 9px;
      font-weight: ${({ $state }) =>
        $state === "duplicate" || $state === "partial" ? 700 : 400};
      line-height: 1.35;
    }
  `,
  StepIndicator: styled.span<{ $state: StepState }>`
    position: relative;
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $state }) => stepColors[$state].background};
    color: ${({ $state }) => stepColors[$state].color};
    font-size: 8px;
    font-weight: 800;
    z-index: 1;
  `,
  StepSpinner: styled.span`
    width: 16px;
    height: 16px;
    border: 2px solid ${tokens.color.primary[100]};
    border-top-color: ${tokens.color.primary[500]};
    border-radius: 50%;
    animation: ${spin} 850ms linear infinite;
    box-sizing: border-box;
  `,
  StepCheck: styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    font-size: 700px;
    color: ${tokens.color.neutral[900]};
    animation: ${revealCheck} 850ms cubic-bezier(0.2, 1.35, 0.4, 1) both;

    svg {
      display: block;
      color: ${tokens.color.neutral[50]};
      stroke: ${tokens.color.neutral[50]};
      stroke-width: 3.5px;
    }
  `,
  SkeletonCard: styled.article`
    display: grid;
    gap: 8px;
    margin-top: 8px;
    padding: 12px;
    border: 1px dashed #b9ccff;
    border-radius: 10px;
    background: #f8faff;

  `,
  SkeletonTitle: styled.strong`
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
  `,
  DuplicateNotice: styled.section`
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 8px;
    margin-top: 12px;
    padding: 11px;
    border-radius: 10px;
    background: ${tokens.color.orange[100]};
    color: ${tokens.color.danger[500]};

    strong,
    span {
      display: block;
    }

    strong {
      font-size: 9px;
      font-weight: 800;
    }

    span {
      margin-top: 4px;
      color: ${tokens.color.neutral[700]};
      font-size: 8px;
      line-height: 1.4;
    }
  `,
  DuplicateCard: styled.article`
    position: relative;
    margin-top: 10px;
    padding: 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};

    h2 {
      margin: 9px 0 4px;
      color: ${tokens.color.neutral[900]};
      font-size: 12px;
      font-weight: 800;
    }

    p {
      margin: 0;
      color: ${tokens.color.neutral[700]};
      font-size: 8px;
      font-weight: 600;
    }
  `,
  BadgeRow: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  ResultCard: styled.article<{ $partial: boolean }>`
    margin-top: 10px;
    padding: 12px;
    border: 1px solid ${({ $partial }) => ($partial ? "#f4dbad" : "#ccebdd")};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};

    h2 {
      margin: 9px 0 6px;
      color: ${tokens.color.neutral[900]};
      font-size: 13px;
      font-weight: 800;
    }

    p {
      margin: 3px 0;
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 600;
      line-height: 1.35;
    }
  `,
  ResultBadge: styled.span<{ $partial?: boolean; $category?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 5px 6px;
    border-radius: 5px;
    background: ${({ $partial, $category }) =>
      $category
        ? tokens.color.primary[100]
        : $partial
          ? tokens.color.warning[100]
          : "#dff5ec"};
    color: ${({ $partial, $category }) =>
      $category
        ? tokens.color.primary[500]
        : $partial
          ? tokens.color.warning[500]
          : tokens.color.success[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  SourceUrl: styled.p`
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 8px 0 0 !important;
    color: ${tokens.color.neutral[700]} !important;
    font-size: 8px !important;
    font-weight: 700;

    svg {
      flex: 0 0 auto;
      color: ${tokens.color.neutral[500]};
    }
  `,
  CardDivider: styled.div`
    height: 1px;
    margin: 10px 0;
    background: ${tokens.color.neutral[100]};
  `,
  CardActionRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  `,
  CardActionHint: styled.span`
    margin-right: auto;
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    font-weight: 600;
  `,
  SecondaryCardButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    gap: 4px;
    padding: 0 9px;
    border: 1px solid ${tokens.color.primary[500]};
    border-radius: 7px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  HelpRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 12px -12px -12px;
    padding: 10px 12px;
    border-radius: 0 0 12px 12px;
    background: ${tokens.color.neutral[50]};

    strong,
    span {
      display: block;
    }

    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 800;
    }

    span {
      margin-top: 3px;
      color: ${tokens.color.neutral[700]};
      font-size: 7px;
    }

    button {
      flex: 0 0 auto;
      padding: 6px 7px;
      border: 0;
      border-radius: 6px;
      background: ${tokens.color.neutral[100]};
      color: ${tokens.color.neutral[700]};
      font: inherit;
      font-size: 8px;
      font-weight: 800;
    }
  `,
  SuccessNotice: styled.p`
    margin: 10px 0 0 !important;
    padding: 9px;
    border-radius: 8px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]} !important;
    font-weight: 700;
  `,
  PartialNotice: styled.p`
    margin: 10px 0 0 !important;
    padding: 9px;
    border-radius: 8px;
    background: ${tokens.color.warning[100]};
    color: ${tokens.color.warning[500]} !important;
    font-weight: 700;
  `,
  EditScreen: styled.section`
    min-height: calc(100svh - 56px);
    padding: 10px 8px 88px;
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  EditUrlBar: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 30px;
    padding: 0 8px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 7px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    font-weight: 700;

    > svg {
      flex: 0 0 auto;
      color: ${tokens.color.neutral[500]};
    }

    > span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > button {
      flex: 0 0 auto;
      margin-left: auto;
      padding: 5px 2px;
      border: 0;
      background: transparent;
      color: ${tokens.color.primary[500]};
      font: inherit;
      font-size: 7px;
      font-weight: 800;
      cursor: pointer;
    }
  `,
  FormHeadingRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 15px 4px 0;
  `,
  FormHeading: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  ExtractionCount: styled.span`
    flex: 0 0 auto;
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.warning[100]};
    color: ${tokens.color.warning[500]};
    font-size: 7px;
    font-weight: 800;
  `,
  FormDescription: styled.p`
    margin: 6px 4px 12px;
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
    font-weight: 600;
    line-height: 1.55;

    em {
      color: ${tokens.color.warning[500]};
      font-style: normal;
      font-weight: 800;
    }
  `,
  ExtractedFieldList: styled.div`
    display: grid;
    gap: 8px;
  `,
  ExtractedField: styled.div`
    position: relative;
    padding: 9px 4px;
    border: 0;
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
  `,
  FieldMeta: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 7px;

    > strong {
      color: ${tokens.color.neutral[900]};
      font-size: 9px;
      font-weight: 800;
    }
  `,
  FieldStatus: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  AutoTag: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 3px 4px;
    border-radius: 4px;
    background: #dff5ec;
    color: ${tokens.color.success[500]};
    font-size: 7px;
    font-weight: 800;
  `,
  FieldInputWrap: styled.div`
    position: relative;
  `,
  FieldInput: styled.input<{ $editing: boolean }>`
    width: 100%;
    height: 30px;
    padding: 0 28px 0 8px;
    border: 1px solid
      ${({ $editing }) =>
        $editing ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 7px;
    outline: 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    box-sizing: border-box;

  `,
  FieldEditButton: styled.button<{ $editing: boolean }>`
    position: absolute;
    top: 50%;
    right: 8px;
    display: grid;
    width: 20px;
    height: 20px;
    place-items: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
    transform: translateY(-50%);
  `,
  ManualDivider: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 14px 0;
    color: ${tokens.color.warning[500]};

    &::before,
    &::after {
      height: 1px;
      flex: 1;
      background: ${tokens.color.neutral[200]};
      content: "";
    }

    span {
      padding: 4px 6px;
      border-radius: 5px;
      background: ${tokens.color.warning[100]};
      font-size: 7px;
      font-weight: 800;
    }
  `,
  ManualField: styled.section`
    margin-top: 8px;
    padding: 10px;
    border: 1px solid #f4dbad;
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
  `,
  ManualFieldHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 9px;

    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 800;
    }

    em {
      color: ${tokens.color.danger[500]};
      font-style: normal;
    }
  `,
  RequiredTag: styled.span`
    padding: 4px 5px;
    border-radius: 4px;
    background: ${tokens.color.orange[100]};
    color: ${tokens.color.orange[500]};
    font-size: 7px;
    font-weight: 800;
  `,
  CategoryOptions: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  CategoryButton: styled.button<{ $selected: boolean }>`
    height: 24px;
    padding: 0 9px;
    border: 0;
    border-radius: 6px;
    background: ${({ $selected }) =>
      $selected ? tokens.color.neutral[900] : tokens.color.neutral[100]};
    color: ${({ $selected }) =>
      $selected ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  ManualInput: styled.input`
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: 1px solid ${tokens.color.primary[500]};
    border-radius: 7px;
    outline: 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    box-sizing: border-box;
  `,
  ManualHint: styled.p`
    margin: 10px 0 0;
    padding: 9px;
    border-radius: 8px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Footer: styled.footer`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    width: min(100%, 480px);
    grid-template-columns: 1fr;
    gap: 7px;
    margin: 0 auto;
    padding: 8px 16px calc(10px + env(safe-area-inset-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
  `,
  ContinueButton: styled.button`
    height: 38px;
    border: 0;
    border-radius: 9px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      background: ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[500]};
      cursor: not-allowed;
    }
  `,
};
