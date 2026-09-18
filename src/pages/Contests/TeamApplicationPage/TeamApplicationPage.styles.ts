import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { tokens } from "../../../design-system/tokens.generated";

const applicationAccent = tokens.color.primary[500];

const successIconEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.55);
  }
  70% {
    opacity: 1;
    transform: scale(1.08);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const successCheckEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const S = {
  Page: styled.main`
    min-height: 100svh;
    padding-bottom: 72px;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  Header: styled.header`
    display: flex;
    height: 48px;
    align-items: center;
    gap: 5px;
    padding: 0 12px;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
  `,
  BackButton: styled.button`
    display: grid;
    width: 24px;
    height: 24px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  HeaderTitle: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
  `,
  StepCount: styled.span`
    margin-left: auto;
    color: ${applicationAccent};
    font-size: 9px;
    font-weight: 800;
  `,
  Progress: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
    padding: 0 12px;
    background: ${tokens.color.neutral[50]};
  `,
  ProgressSegment: styled.span<{ $active: boolean }>`
    height: 3px;
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? applicationAccent : tokens.color.neutral[200]};
  `,
  FormContent: styled.section`
    display: flex;
    flex-direction: column;
    padding: 18px 12px 24px;
  `,
  TeamCard: styled.section`
    padding: 13px 12px 11px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
    box-shadow: none;
  `,
  TeamName: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  ContestName: styled.p`
    margin: 6px 0 10px;
    color: ${applicationAccent};
    font-size: 7px;
    font-weight: 700;
  `,
  TeamSummary: styled.div`
    display: flex;
    gap: 30px;
    padding-top: 9px;
    border-top: 1px solid ${tokens.color.neutral[100]};

    div {
      display: grid;
      gap: 3px;
    }
    span,
    strong {
      color: ${tokens.color.neutral[900]};
    }
    span {
      font-size: 7px;
      font-weight: 600;
    }
    strong {
      font-size: 9px;
      font-weight: 800;
    }
  `,
  QuestionTitle: styled.h2`
    margin: 18px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
  `,
  QuestionHint: styled.p`
    margin: 5px 0 9px;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 600;
  `,
  FieldList: styled.div`
    display: grid;
    gap: 7px;
  `,
  FieldOption: styled.button<{ $disabled: boolean; $selected: boolean }>`
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${({ $disabled }) =>
      $disabled ? tokens.color.neutral[100] : tokens.color.neutral[50]};
    color: ${({ $disabled }) =>
      $disabled ? tokens.color.neutral[500] : tokens.color.neutral[900]};
    font: inherit;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  `,
  FieldIcon: styled.span<{
    $disabled: boolean;
    $field: "개발" | "디자인" | "기획" | "마케팅";
  }>`
    display: grid;
    width: 26px;
    height: 26px;
    place-items: center;
    border-radius: 7px;
    background: ${({ $disabled, $field }) => {
      if ($disabled) return tokens.color.neutral[200];
      if ($field === "개발") return tokens.color.primary[100];
      if ($field === "디자인") return tokens.color.purple[100];
      return tokens.color.neutral[100];
    }};
    color: ${({ $disabled, $field }) => {
      if ($disabled) return tokens.color.neutral[500];
      if ($field === "개발") return tokens.color.primary[500];
      if ($field === "디자인") return tokens.color.purple[500];
      return tokens.color.neutral[500];
    }};
  `,
  FieldName: styled.strong`
    font-size: 9px;
    font-weight: 800;
  `,
  FieldStatus: styled.span`
    margin-left: auto;
    padding: 4px 5px;
    border-radius: 4px;
    background: ${tokens.color.neutral[200]};
    color: ${tokens.color.neutral[500]};
    font-size: 7px;
    font-weight: 800;
  `,
  SelectedMark: styled.span`
    display: grid;
    width: 17px;
    height: 17px;
    margin-left: auto;
    place-items: center;
    border-radius: 50%;
    background: ${applicationAccent};
    color: ${tokens.color.neutral[50]};
  `,
  EmptyMark: styled.span`
    width: 15px;
    height: 15px;
    margin-left: auto;
    box-sizing: border-box;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 50%;
  `,
  SelectedFieldBadge: styled.span`
    display: inline-block;
    align-self: flex-start;
    padding: 5px 7px;
    border-radius: 6px;
    background: ${tokens.color.primary[100]};
    color: ${applicationAccent};
    font-size: 8px;
    font-weight: 800;
  `,
  RoleHeading: styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    h2 {
      margin-top: 18px;
    }
    span {
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 700;
    }
  `,
  RoleList: styled.div`
    display: grid;
    gap: 7px;
    margin-top: 9px;
  `,
  RoleOption: styled.button<{ $selected: boolean }>`
    display: flex;
    min-height: 45px;
    align-items: center;
    gap: 10px;
    padding: 8px 11px;
    border: 1px solid
      ${({ $selected }) =>
        $selected ? applicationAccent : tokens.color.neutral[200]};
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    text-align: left;
    cursor: pointer;
  `,
  RoleRadio: styled.span<{ $selected: boolean }>`
    display: grid;
    width: 13px;
    height: 13px;
    flex: 0 0 auto;
    place-items: center;
    box-sizing: border-box;
    border: 2px solid
      ${({ $selected }) =>
        $selected ? applicationAccent : tokens.color.neutral[200]};
    border-radius: 50%;
    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${applicationAccent};
    }
  `,
  RoleCopy: styled.span`
    display: grid;
    gap: 3px;
    strong {
      font-size: 8px;
      font-weight: 800;
    }
    span {
      color: ${tokens.color.neutral[900]};
      font-size: 7px;
      font-weight: 600;
    }
  `,
  MessageSectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;

    &:first-of-type {
      padding: 10px 12px;
      border-left: 3px solid ${applicationAccent};
      border-radius: 0 8px 8px 0;
      background: ${tokens.color.primary[100]};
      color: ${applicationAccent};
      font-size: 13px;
      font-weight: 700;
    }
  `,
  AvailabilityRow: styled.div`
    display: flex;
    min-height: 54px;
    align-items: center;
    justify-content: space-between;
    order: 1;
    margin-top: 18px;
    padding: 0;
    border: 0;
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
    box-shadow: none;
    span {
      color: ${tokens.color.neutral[900]};
      font-size: 13px;
      font-weight: 800;
    }
  `,
  AvailabilityInput: styled.input`
    width: 48px;
    height: 28px;
    margin-left: auto;
    padding: 0;
    box-sizing: border-box;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 6px;
    outline: none;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 11px;
    font-weight: 800;
    text-align: center !important;
    text-indent: 0;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      appearance: none;
    }

    &:focus {
      border-color: ${applicationAccent};
      box-shadow: 0 0 0 2px ${tokens.color.primary[100]};
    }
  `,
  AvailabilityUnit: styled.strong`
    margin-left: 2px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  IntroductionLabel: styled.label`
    display: block;
    margin-top: 22px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
  `,
  IntroductionTextarea: styled.textarea`
    display: block;
    width: 100%;
    height: 95px;
    margin-top: 8px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    outline: none;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.7;
    resize: none;
  `,
  CharacterCount: styled.p`
    margin: 4px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 7px;
    font-weight: 600;
    text-align: right;
  `,
  SectionDivider: styled.hr`
    margin: 21px 0 17px;
    border: 0;
    border-top: 1px solid ${tokens.color.neutral[100]};
  `,
  QuestionPreviewList: styled.div`
    display: grid;
    gap: 8px;
    margin-top: 10px;
  `,
  QuestionInputGroup: styled.div`
    display: grid;
    gap: 7px;
  `,
  QuestionPreviewCard: styled.article`
    position: relative;
    min-height: 116px;
    padding: 0 14px 28px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    box-shadow: none;
  `,
  QuestionNumber: styled.h3`
    margin: 0;
    color: ${applicationAccent};
    font-size: 11px;
    font-weight: 800;
  `,
  QuestionAnswerInput: styled.textarea`
    display: block;
    width: 100%;
    min-height: 88px;
    margin-top: 0;
    padding: 14px 0 0;
    box-sizing: border-box;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.55;
    resize: none;
  `,
  QuestionCharacterCount: styled.span`
    position: absolute;
    right: 14px;
    bottom: 10px;
    color: ${tokens.color.neutral[900]};
    font-size: 8px;
    font-weight: 600;
  `,
  CompletionContent: styled.section`
    padding: 162px 12px 28px;
    text-align: center;
  `,
  SuccessIcon: styled.span`
    display: grid;
    width: 52px;
    height: 52px;
    margin: 0 auto;
    place-items: center;
    border-radius: 50%;
    background: ${tokens.color.primary[100]};
    color: ${applicationAccent};
    animation: ${successIconEnter} 780ms cubic-bezier(0.22, 1, 0.36, 1) both;

    svg {
      animation: ${successCheckEnter} 360ms 260ms ease-out both;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;

      svg {
        animation: none;
      }
    }
  `,
  CompletionTitle: styled.h2`
    margin: 18px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
  `,
  CompletionDescription: styled.p`
    margin: 7px 0 20px;
    color: ${tokens.color.neutral[900]};
    font-size: 8px;
    font-weight: 600;
  `,
  ApplicationSummary: styled.dl`
    display: grid;
    gap: 9px;
    margin: 0;
    padding: 14px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
    box-shadow: none;
    text-align: left;
    div {
      display: flex;
      justify-content: space-between;
    }
    dt,
    dd {
      margin: 0;
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 700;
    }
    dd {
      font-weight: 800;
    }
  `,
  NextStepsCard: styled.section`
    margin-top: 10px;
    padding: 13px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
    box-shadow: none;
    text-align: left;
  `,
  NextStepsTitle: styled.h3`
    margin: 0 0 11px;
    color: ${tokens.color.neutral[900]};
    font-size: 8px;
    font-weight: 700;
  `,
  NextStep: styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: flex-start;
    gap: 9px;
    padding: 5px 0;
    div {
      display: grid;
      gap: 3px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 8px;
      font-weight: 800;
    }
    span {
      color: ${tokens.color.neutral[900]};
      font-size: 7px;
      font-weight: 600;
    }
  `,
  StepMark: styled.span<{ $active?: boolean }>`
    display: grid;
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: ${({ $active }) =>
      $active ? applicationAccent : tokens.color.neutral[100]};
    color: ${({ $active }) =>
      $active ? tokens.color.neutral[50] : tokens.color.neutral[500]};
    font-size: 7px;
    font-weight: 800;

    svg {
      display: block;
      color: ${tokens.color.neutral[50]};
      stroke: currentColor;
    }
  `,
  CompletionNotice: styled.p`
    margin: 15px 0 0;
    padding: 11px 10px;
    border-radius: 9px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[900]};
    font-size: 7px;
    font-weight: 600;
    line-height: 1.55;
    text-align: left;
  `,
  ActionBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 10px 10px max(12px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  NextButton: styled.button`
    width: 100%;
    height: 38px;
    padding: 0;
    border: 0;
    border-radius: 10px;
    background: ${applicationAccent};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      background: ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[500]};
      cursor: not-allowed;
    }
  `,
};
