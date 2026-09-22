import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const primary = "#24449a";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 84px;
    background: ${tokens.color.neutral[50]};
  `,
  PreviewButton: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 9px 11px;
    border: 1px solid #cfdbf4;
    border-radius: 999px;
    background: #f7f9ff;
    color: #2857d9;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  EditBody: styled.div`
    padding: 20px 24px 28px;
  `,
  PhotoArea: styled.div`
    position: relative;
    display: grid;
    justify-items: center;
    margin-bottom: 30px;
    > button:last-child {
      margin-top: 12px;
      padding: 0;
      border: 0;
      background: transparent;
      color: #2857d9;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
  `,
  PhotoPlaceholder: styled.div`
    display: grid;
    width: 142px;
    aspect-ratio: 1;
    place-items: center;
    align-content: center;
    gap: 8px;
    border: 1.5px dashed #999;
    border-radius: 50%;
    color: #8c8c8c;
    span {
      color: ${tokens.color.neutral[700]};
      font-size: 13px;
    }
    small {
      color: ${tokens.color.neutral[700]};
      font-size: 11px;
    }
  `,
  PhotoEditButton: styled.button`
    position: absolute;
    right: calc(50% - 76px);
    bottom: 28px;
    display: grid;
    width: 36px;
    aspect-ratio: 1;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: #2b57ed;
    color: white;
    cursor: pointer;
  `,
  SectionTitle: styled.h2`
    margin: 0 0 13px;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.7px;
  `,
  Field: styled.label`
    display: grid;
    gap: 7px;
    margin-top: 15px;
    color: ${tokens.color.neutral[500]};
    font-size: 12px;
  `,
  SelectField: styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 14px 16px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 15px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    svg {
      color: #adb6c4;
    }
  `,
  StudentNumber: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    color: ${tokens.color.neutral[900]};
    strong {
      font-size: 15px;
    }
    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 9px;
      background: #e4f7ec;
      color: #16845b;
      font-size: 10px;
      font-weight: 800;
    }
  `,
  RoleSection: styled.section`
    margin-top: 27px;
    padding-top: 22px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  FollowupSection: styled.section`
    margin-top: 27px;
    padding-top: 22px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  SectionHeading: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.7px;
  `,
  SectionDescription: styled.p`
    margin: 5px 0 14px;
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
  `,
  RoleHeading: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      display: grid;
      gap: 4px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
    small {
      color: ${tokens.color.neutral[500]};
      font-size: 11px;
    }
    svg {
      color: #aeb7c5;
    }
  `,
  RoleChipList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 13px;
  `,
  RoleChip: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 11px;
    border: 1px solid #cbd9ff;
    border-radius: 999px;
    background: #eff4ff;
    color: #2857d9;
    font-size: 12px;
    font-weight: 700;
    button {
      padding: 0;
      border: 0;
      background: transparent;
      color: #6686d8;
      font: inherit;
      font-size: 17px;
      line-height: 0.7;
      cursor: pointer;
    }
  `,
  AddRoleButton: styled.button`
    padding: 9px 12px;
    border: 1px dashed #bac6d7;
    border-radius: 999px;
    background: transparent;
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  StatusSelectButton: styled.button`
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 14px;
    padding: 16px 15px;
    border: 2px solid #2b57ed;
    border-radius: 16px;
    background: #eef3ff;
    color: ${tokens.color.neutral[900]};
    text-align: left;
    cursor: pointer;
    span {
      display: grid;
      gap: 5px;
    }
    strong {
      font-size: 15px;
      font-weight: 800;
    }
    small {
      color: #2857d9;
      font-size: 11px;
    }
    svg {
      margin-left: auto;
      color: #7d9be3;
    }
  `,
  SelectedRadio: styled.span`
    display: grid;
    width: 24px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 50%;
    background: #2b57ed;
    &::after {
      width: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: white;
      content: "";
    }
  `,
  SkillSearch: styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    padding: 0 16px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    color: #a7b1c0;
    input {
      width: 100%;
      padding: 15px 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: ${tokens.color.neutral[700]};
      font: inherit;
      font-size: 13px;
    }
    input::placeholder {
      color: #a7b1c0;
    }
  `,
  RecommendationLabel: styled.span`
    display: inline-flex;
    margin-top: 14px;
    padding: 5px 8px;
    border-radius: 7px;
    background: #edf3ff;
    color: #2857d9;
    font-size: 10px;
    font-weight: 800;
  `,
  OwnedSkillHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  DirectSkillButton: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 13px 20px;
    border: 0;
    border-radius: 15px;
    outline: 1.5px dashed #cbd5e5;
    outline-offset: -1.5px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
  `,
  DirectSkillInput: styled.input`
    width: 100%;
    padding: 15px 16px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    outline: 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 14px;
    &::placeholder {
      color: #9aa5b5;
    }
    &:focus {
      border-color: #2b57ed;
    }
  `,
  OwnedSkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
  `,
  OwnedSkill: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 11px 15px;
    border-radius: 5px;
    background: #f3f5fa;
    color: ${tokens.color.neutral[700]};
    font-size: 13px;
    font-weight: 600;
    button {
      padding: 0;
      border: 0;
      background: transparent;
      color: #738198;
      font: inherit;
      font-size: 15px;
      line-height: 1;
      cursor: pointer;
    }
  `,
  SkillStackList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px 12px;
    margin-top: 18px;
  `,
  SkillStackOption: styled.button<{ $selected: boolean }>`
    padding: 13px 20px;
    border: 0;
    border-radius: 15px;
    outline: ${({ $selected }) => ($selected ? "2px solid #2b57ed" : "0")};
    outline-offset: ${({ $selected }) => ($selected ? "-2px" : "0")};
    background: ${({ $selected }) => ($selected ? "#eff4ff" : "#f3f5fa")};
    color: ${({ $selected }) => ($selected ? "#2857d9" : tokens.color.neutral[700])};
    font: inherit;
    font-size: 14px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
    line-height: 20px;
    cursor: pointer;
  `,
  SkillMoreToggle: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin-top: 25px;
    border: 0;
    background: transparent;
    color: #425574;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    &::before,
    &::after {
      height: 1px;
      flex: 1;
      background: #cbd5e5;
      content: "";
    }
  `,
  EmptySkillText: styled.p`
    margin: 18px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
  `,
  RecommendationHeader: styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    > button {
      padding: 0;
      border: 0;
      background: transparent;
      color: #7c8798;
      font: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
  `,
  SkillRecommendList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 12px;
  `,
  MoreRecommendationButton: styled.button`
    padding: 11px 14px;
    border: 1px dashed #9ba8ba;
    border-radius: 999px;
    background: ${tokens.color.neutral[50]};
    color: #526078;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  ExpandedRecommendationList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 12px;
  `,
  ExpandedRecommendationButton: styled.button<{ $selected: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 11px 15px;
    border: 1px solid
      ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[200])};
    border-radius: 999px;
    background: ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[50])};
    color: ${({ $selected }) => ($selected ? "white" : tokens.color.neutral[700])};
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  RecommendSkill: styled.button<{ $selected: boolean }>`
    padding: 11px 15px;
    border: 1px solid
      ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[200])};
    border-radius: 999px;
    background: ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[50])};
    color: ${({ $selected }) => ($selected ? "white" : tokens.color.neutral[700])};
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  IntroductionHeading: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    > span {
      color: ${tokens.color.neutral[500]};
      font-size: 11px;
      font-weight: 700;
    }
  `,
  VisibilitySection: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 27px;
    padding: 22px 0;
    border-top: 1px solid ${tokens.color.neutral[200]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    > span {
      display: grid;
      gap: 5px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
      font-weight: 800;
    }
    small {
      color: ${tokens.color.neutral[500]};
      font-size: 11px;
    }
  `,
  ToggleButton: styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $active }) => ($active ? "flex-end" : "flex-start")};
    width: 54px;
    padding: 4px;
    border: 0;
    border-radius: 999px;
    background: ${({ $active }) => ($active ? "#2b57ed" : "#cbd3df")};
    cursor: pointer;
    transition: background-color 0.18s ease;
    i {
      width: 26px;
      aspect-ratio: 1;
      border-radius: 50%;
      background: white;
      box-shadow: 0 1px 3px rgb(30 40 60 / 20%);
    }
  `,
  SaveBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    padding: 12px 22px calc(12px + var(--app-safe-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: rgb(255 255 255 / 96%);
  `,
  SaveButton: styled.button`
    width: min(100%, 409px);
    padding: 17px 14px;
    border: 0;
    border-radius: 15px;
    background: ${primary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
  `,
  SheetHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0 17px;
    > span {
      display: grid;
      gap: 5px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 19px;
      font-weight: 800;
    }
    small {
      color: ${tokens.color.neutral[500]};
      font-size: 12px;
    }
    button {
      padding: 3px;
      border: 0;
      background: transparent;
      color: #6f7a8a;
      cursor: pointer;
    }
  `,
  SheetSearch: styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 17px;
    padding: 0 15px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    background: #f6f7fa;
    color: #9aa5b5;
    input {
      width: 100%;
      padding: 14px 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: ${tokens.color.neutral[700]};
      font: inherit;
      font-size: 13px;
    }
    input::placeholder {
      color: #9aa5b5;
    }
  `,
  SheetContent: styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
  `,
  RoleSheetLayout: styled.div`
    display: grid;
    flex: 1;
    min-height: 0;
    grid-template-columns: 105px minmax(0, 1fr);
    margin: 0 -18px;
    border-top: 1px solid ${tokens.color.neutral[200]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  CategoryList: styled.div`
    display: grid;
    align-content: start;
    background: #f7f8fb;
    button {
      padding: 18px 15px;
      border: 0;
      border-left: 3px solid transparent;
      background: transparent;
      color: ${tokens.color.neutral[500]};
      font: inherit;
      font-size: 14px;
      font-weight: 700;
      text-align: left;
      cursor: pointer;
      &[data-active="true"] {
        border-left-color: #2b57ed;
        background: #eaf0ff;
        color: #2857d9;
      }
    }
  `,
  RoleOptionList: styled.div`
    display: grid;
    gap: 10px;
    align-content: start;
    min-height: 0;
    padding: 16px 18px 16px 0;
    overflow-y: auto;
  `,
  RoleOption: styled.button<{ $selected: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 54px;
    border: 1.5px solid
      ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[200])};
    border-radius: 14px;
    background: ${({ $selected }) => ($selected ? "#eef3ff" : tokens.color.neutral[50])};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    > span {
      position: absolute;
      left: 15px;
      display: grid;
      width: 24px;
      aspect-ratio: 1;
      place-items: center;
      border: 1.5px solid ${({ $selected }) => ($selected ? "#2b57ed" : "#c8d1df")};
      border-radius: 7px;
      background: ${({ $selected }) => ($selected ? "#2b57ed" : "transparent")};
      color: white;
    }
    em {
      position: absolute;
      right: 15px;
      color: #2857d9;
      font-size: 10px;
      font-style: normal;
    }
  `,
  SchoolSheetLayout: styled.div`
    display: grid;
    flex: 1;
    min-height: 0;
    grid-template-columns: minmax(98px, 26%) minmax(0, 1fr);
    margin: 0 -18px;
    border-top: 1px solid ${tokens.color.neutral[200]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  SchoolCategoryList: styled.div`
    display: grid;
    align-content: start;
    background: #f7f8fb;
    button {
      padding: clamp(18px, 2.8vw, 28px) clamp(14px, 4vw, 38px);
      border: 0;
      border-left: clamp(3px, 0.7vw, 6px) solid transparent;
      background: transparent;
      color: ${tokens.color.neutral[500]};
      font: inherit;
      font-size: clamp(13px, 2.2vw, 20px);
      font-weight: 700;
      text-align: left;
      cursor: pointer;
      &[data-active="true"] {
        border-left-color: #2b57ed;
        background: #eaf0ff;
        color: #2857d9;
      }
    }
  `,
  SchoolDepartmentList: styled.div`
    overflow-y: auto;
  `,
  SchoolDepartmentButton: styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: clamp(18px, 2.8vw, 28px) clamp(20px, 4vw, 38px);
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
    background: ${({ $selected }) => ($selected ? "#f5f7ff" : tokens.color.neutral[50])};
    color: ${({ $selected }) => ($selected ? "#2857d9" : tokens.color.neutral[700])};
    font: inherit;
    font-size: clamp(14px, 2.2vw, 20px);
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  `,
  SingleChoiceList: styled.div`
    margin: 0 -18px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  SingleChoiceButton: styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    min-height: 84px;
    padding: 0 38px;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[100]};
    background: ${({ $selected }) => ($selected ? "#f2f5ff" : tokens.color.neutral[50])};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    > span {
      display: grid;
      width: 33px;
      aspect-ratio: 1;
      place-items: center;
      border: 1.5px solid ${({ $selected }) => ($selected ? "#2b57ed" : "#c8d1df")};
      border-radius: 50%;
      background: ${({ $selected }) => ($selected ? "#2b57ed" : "transparent")};
      color: white;
    }
  `,
  StatusChoiceList: styled.div`
    display: grid;
    gap: 10px;
  `,
  StatusChoiceButton: styled.button<{ $selected: boolean }>`
    display: grid;
    grid-template-columns: 25px minmax(0, 1fr);
    column-gap: 11px;
    width: 100%;
    padding: 16px;
    border: 1.5px solid
      ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[200])};
    border-radius: 15px;
    background: ${({ $selected }) => ($selected ? "#eef3ff" : tokens.color.neutral[50])};
    color: ${tokens.color.neutral[700]};
    text-align: left;
    cursor: pointer;
    > span {
      grid-row: span 2;
      display: grid;
      width: 23px;
      aspect-ratio: 1;
      place-items: center;
      align-self: center;
      border: 1.5px solid ${({ $selected }) => ($selected ? "#2b57ed" : "#c8d1df")};
      border-radius: 50%;
      background: ${({ $selected }) => ($selected ? "#2b57ed" : "transparent")};
      color: white;
    }
    strong {
      font-size: 14px;
      font-weight: 800;
    }
    small {
      margin-top: 5px;
      color: ${({ $selected }) => ($selected ? "#2857d9" : tokens.color.neutral[500])};
      font-size: 11px;
    }
  `,
  EmptyRole: styled.p`
    margin: 0;
    padding: 30px 10px;
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    text-align: center;
  `,
  SelectedRoles: styled.div`
    display: grid;
    gap: 6px;
    margin: 0 4px;
    color: ${tokens.color.neutral[700]};
    font-size: 12px;
    font-weight: 700;
    > div {
      margin-top: 0;
    }
  `,
  SheetFooter: styled.div`
    display: grid;
    gap: 14px;
    padding-bottom: var(--app-safe-bottom);
  `,
  GradeSheetFooter: styled.div`
    display: grid;
    gap: 14px;
  `,
  SheetDoneButton: styled.button`
    width: 100%;
    padding: 17px;
    border: 0;
    border-radius: 15px;
    background: ${primary};
    color: white;
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    &:disabled {
      background: #cbd3df;
      cursor: not-allowed;
    }
  `,
  ResetButton: styled.button`
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 12px;
    cursor: pointer;
  `,
  DetailBody: styled.div`
    padding: 27px 24px 28px;
  `,
  DetailHint: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    line-height: 1.6;
  `,
  DetailSection: styled.section`
    margin-top: 29px;
    h2 {
      margin: 0 0 13px;
      color: ${tokens.color.neutral[900]};
      font-size: 16px;
      font-weight: 800;
    }
    h2 small {
      color: ${tokens.color.neutral[500]};
      font-size: 11px;
      font-weight: 500;
    }
  `,
  SelectChipList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
  `,
  SelectChip: styled.button<{ $selected: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 11px 14px;
    border: 1px solid
      ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[200])};
    border-radius: 13px;
    background: ${({ $selected }) => ($selected ? "#2b57ed" : tokens.color.neutral[50])};
    color: ${({ $selected }) => ($selected ? "white" : tokens.color.neutral[700])};
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  `,
};
