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
    height: 48px;
    padding: 0 14px;
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  BackButton: styled.button`
    display: grid;
    width: 26px;
    height: 32px;
    margin-right: 3px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  Title: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
  `,
  StepCount: styled.span`
    margin-left: auto;
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 800;
  `,
  Progress: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 0 14px 12px;
    background: ${tokens.color.neutral[50]};
  `,
  ProgressSegment: styled.button<{ $active: boolean; $clickable: boolean }>`
    height: 4px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    transition: background-color 180ms ease;
    cursor: ${({ $clickable }) => $clickable ? "pointer" : "default"};

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 3px;
    }
  `,
  Form: styled.div`
    padding: 14px 14px 28px;
  `,
  StepThreeForm: styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100svh - 136px);
    padding: 14px 14px 28px;
  `,
  ContestNotice: styled.div`
    display: grid;
    gap: 5px;
    padding: 13px 12px;
    border-radius: 12px;
    background: ${tokens.color.primary[100]};

    strong,
    span {
      color: ${tokens.color.primary[500]};
      font-size: 9px;
    }

    strong { font-weight: 800; }
  `,
  Field: styled.section<{ $outlined?: boolean }>`
    position: relative;
    margin-top: 18px;
    padding: ${({ $outlined }) => $outlined === false ? "0" : "13px"};
    border: ${({ $outlined }) => $outlined === false ? "0" : `1px solid ${tokens.color.neutral[200]}`};
    border-radius: 11px;
    background: ${({ $outlined }) => $outlined === false ? "transparent" : tokens.color.neutral[50]};
  `,
  Label: styled.label`
    display: block;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  HelperText: styled.p`
    margin: 4px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.45;
  `,
  TeamNameInput: styled.input`
    width: 100%;
    height: 40px;
    margin-top: 8px;
    padding: 0 11px;
    box-sizing: border-box;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    outline: none;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 10px;
    font-weight: 700;

    &:focus {
      border-color: ${tokens.color.primary[500]};
      box-shadow: 0 0 0 2px color-mix(in srgb, ${tokens.color.primary[500]} 12%, transparent);
    }
  `,
  MemberControl: styled.div`
    position: absolute;
    top: 10px;
    right: 13px;
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  CountButton: styled.button`
    display: grid;
    width: 29px;
    height: 29px;
    padding: 0;
    place-items: center;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    box-shadow: 0 2px 5px rgb(16 21 34 / 4%);
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;

    &:disabled { color: ${tokens.color.neutral[200]}; cursor: default; }
  `,
  MemberCount: styled.strong`
    min-width: 25px;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    text-align: center;
  `,
  RoleField: styled.section`
    margin-top: 27px;
    padding: 13px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
  `,
  LeaderField: styled.section`
    margin-top: 30px;
    padding: 13px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
  `,
  RoleHeading: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SelectedRole: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  RoleLabel: styled.p`
    margin: 11px 0 6px;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  ChipList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  `,
  PositionChipList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 12px;
  `,
  RoleChip: styled.button<{ $active: boolean }>`
    height: 30px;
    padding: 0 12px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: ${({ $active }) => $active ? 800 : 600};
    cursor: pointer;
    transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
  `,
  StepIntro: styled.section`
    margin-bottom: 12px;
  `,
  StepIntroHeading: styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
  `,
  AllocationBadge: styled.span`
    padding: 5px 7px;
    border-radius: 6px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  OptionalLabel: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 500;
  `,
  SelectionSummary: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 11px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 2px 7px rgb(16 21 34 / 4%);

    strong { color: ${tokens.color.neutral[900]}; font-size: 9px; }
  `,
  SelectionSummaryText: styled.div`
    display: grid;
    min-width: 0;
    gap: 4px;

    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 9px;
    }

    span {
      overflow: hidden;
      color: ${tokens.color.neutral[500]};
      font-size: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  RoleGroupList: styled.div`
    display: grid;
    gap: 9px;
    margin-top: 10px;
  `,
  RoleGroup: styled.section`
    padding: 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 2px 7px rgb(16 21 34 / 4%);
  `,
  RoleGroupHeader: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
  `,
  RoleGroupTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  RoleGroupDescription: styled.p`
    margin: 5px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  CompactCountControl: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    button { width: 26px; height: 26px; font-size: 13px; }
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 11px;
  `,
  SkillChip: styled.button<{ $active: boolean }>`
    height: 23px;
    padding: 0 8px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 8px;
    font-weight: ${({ $active }) => $active ? 800 : 600};
    cursor: pointer;
  `,
  InfoBox: styled.p`
    margin: 13px 0 0;
    padding: 11px 12px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.55;
  `,
  SearchRow: styled.div`
    display: flex;
    gap: 6px;
    margin-top: 12px;
  `,
  SearchInput: styled.input`
    flex: 1;
    min-width: 0;
    height: 35px;
    padding: 0 11px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    outline: none;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 9px;

    &:focus { border-color: ${tokens.color.primary[500]}; }
  `,
  SearchButton: styled.button`
    width: 42px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 9px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  MemberStatus: styled.p`
    margin: 10px 0 6px;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  AddedMemberList: styled.div`
    display: grid;
    gap: 7px;
  `,
  AddedMember: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;

    div { display: grid; gap: 3px; }
    strong { color: ${tokens.color.primary[500]}; font-size: 9px; }
    span { color: ${tokens.color.neutral[500]}; font-size: 8px; }
  `,
  MemberAvatar: styled.div`
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, ${tokens.color.success[500]} 14%, ${tokens.color.neutral[50]});
    color: ${tokens.color.success[500]};
    font-size: 10px;
    font-weight: 800;
  `,
  RemoveButton: styled.button`
    display: grid;
    width: 22px;
    height: 22px;
    margin-left: auto;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    cursor: pointer;
  `,
  Divider: styled.hr`
    margin: 19px -14px;
    border: 0;
    border-top: 1px solid ${tokens.color.neutral[100]};
  `,
  SectionHeading: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  LocationHeading: styled.h2`
    margin: 20px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  ModeSelector: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
    margin-top: 11px;
    padding: 3px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
  `,
  ModeButton: styled.button<{ $active: boolean }>`
    height: 29px;
    border: 0;
    border-radius: 8px;
    background: ${({ $active }) => $active ? tokens.color.neutral[50] : "transparent"};
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[700]};
    box-shadow: ${({ $active }) => $active ? "0 1px 3px rgb(16 21 34 / 8%)" : "none"};
    font: inherit;
    font-size: 8px;
    font-weight: 800;
    cursor: pointer;
  `,
  MeetingRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
    padding: 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
  `,
  LocationList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 11px;
  `,
  LocationChip: styled.button<{ $active: boolean }>`
    height: 27px;
    padding: 0 10px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 8px;
    font-weight: ${({ $active }) => $active ? 800 : 600};
    cursor: pointer;
  `,
  ActivityGuide: styled.p`
    margin: 14px 0 0;
    padding: 11px 12px;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
  IntroductionInput: styled.textarea`
    width: 100%;
    height: 96px;
    margin-top: 11px;
    padding: 11px;
    box-sizing: border-box;
    resize: vertical;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    outline: none;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 9px;
    font-weight: 600;
    line-height: 1.6;

    &:focus { border-color: ${tokens.color.primary[500]}; }
  `,
  CharacterCount: styled.p`
    margin: 4px 2px 0;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    text-align: right;
  `,
  QuestionHeading: styled.h2`
    display: flex;
    justify-content: space-between;
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  QuestionList: styled.div`
    display: grid;
    gap: 7px;
    margin-top: 11px;
  `,
  QuestionCard: styled.div`
    position: relative;
    padding: 10px 29px 10px 11px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 2px 7px rgb(16 21 34 / 4%);
  `,
  QuestionNumber: styled.span`
    display: block;
    margin-bottom: 7px;
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  QuestionInput: styled.input`
    width: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    color: ${tokens.color.neutral[900]};
    background: transparent;
    font: inherit;
    font-size: 9px;
    font-weight: 700;
  `,
  RemoveQuestionButton: styled.button`
    position: absolute;
    top: 9px;
    right: 9px;
    display: grid;
    width: 20px;
    height: 20px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 5px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    cursor: pointer;
  `,
  AddQuestionButton: styled.button`
    width: 100%;
    height: 32px;
    margin-top: 9px;
    border: 1px dashed color-mix(in srgb, ${tokens.color.primary[500]} 35%, transparent);
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  `,
  ToolTagList: styled.div`
    display: flex;
    gap: 6px;
    margin-top: 10px;
  `,
  ToolTag: styled.span`
    padding: 5px 8px;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: 8px;
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    gap: 6px;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 10px 6px max(10px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  NextButton: styled.button`
    flex: 1;
    height: 41px;
    padding: 0;
    border: 0;
    border-radius: 11px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    box-shadow: 0 7px 16px rgb(43 87 255 / 28%);
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    cursor: pointer;
  `,
  PreviousButton: styled.button`
    flex: 0 0 58px;
    height: 41px;
    padding: 0;
    border: 0;
    border-radius: 11px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
  `,
};
