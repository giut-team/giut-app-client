import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const primary = "#24449a";

export const S ={
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(86px + var(--app-safe-bottom));
    background: ${tokens.color.neutral[50]};
  `,
  DraftSave: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 9px 11px;
    border: 0;
    background: none;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  ProjectImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  ProjectImageLabels: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ProjectImageTitle: styled.div`
    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
  `,
  ProjectImageDescription: styled.p`
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
  `,
  ProjecTitleContainer:styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  ProjectTitleLabels:styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
    em{
      color: ${primary};
      font-size: 13px;
    }
    span{
      color: ${tokens.color.neutral[500]};
      font-size: 11px;
    }
  `,
  ProjectTitleInput: styled.input`
    border: 2px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    padding: 15px 10px 15px;
    font-size: 15px;

    &:focus{
      outline: none;
    }
  `,
  DurationContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  DurationLabels: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
    em{
      color: ${primary};
      font-size: 13px;
    }
  `,
  DurationInput: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  DateInput: styled.input`
    border: 2px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    width: 190px;
    padding: 13px 20px 15px;
    font-size: 14px;
    font-family: inherit;
  `,
  Seperator: styled.div`
  color: ${tokens.color.neutral[500]};
  `,
  ParticipationTypeContainer:styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  ParticipationTypeLabels: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
    em{
      color: ${primary};
      font-size: 13px;
    }
  `,
  TabList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 15px;
    background: ${tokens.color.neutral[200]};
  `,
  Tab: styled.button<{ $active: boolean }>`
    position: relative;
    margin: 5px;
    padding: 13px 4px 13px;
    border: 0;
    border-radius: 13px;
    background: ${({ $active }) =>
      $active ? tokens.color.neutral[50] : "transparent"};
    color: ${({ $active }) =>
      $active ? tokens.color.neutral[900] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
  `,
  TeamMemberNumber: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 13px 0;
  `,
  TeamMemberNumberLabel: styled.div`
    color: ${tokens.color.neutral[900]};
    font-size: 16px;
    font-weight: 500;
    margin: 10px;
  `,
  CounterGroup: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  CounterButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background-color: ${tokens.color.neutral[50]};
    font-size: 20px;

  `,
  CountText: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
  `,
  RoleContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
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
  SkillContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
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
  SheetFooter: styled.div`
    display: grid;
    gap: 14px;
    padding-bottom: var(--app-safe-bottom);
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
  SectionHeading: styled.div`
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
  `,
  DescriptionHeading: styled.div`
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
  DescriptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  LinkContainer: styled.section`
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
`,

LinkLabel: styled.strong`
  color: ${tokens.color.neutral[900]};
  font-size: 17px;
`,

LinkInputWrap: styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 16px;
  border: 1px solid ${tokens.color.neutral[200]};
  border-radius: 16px;
  color: ${tokens.color.neutral[500]};

  &:focus-within {
    border-color: ${tokens.color.neutral[900]};
  }
`,

LinkInput: styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: ${tokens.color.neutral[900]};
  font-size: 15px;

  &::placeholder {
    color: ${tokens.color.neutral[500]};
  }
`,

LinkRemoveButton: styled.button`
  border: none;
  background: none;
  color: ${tokens.color.neutral[500]};
  font-size: 20px;
  cursor: pointer;
`,

AddLinkButton: styled.button`
  align-self: flex-start;
  padding: 4px 0;
  border: none;
  background: none;
  color: ${primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`,
  
  VisibleContainer: styled.div`
  display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  VisibleLabel: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
    }
  `,

  VisibilitySection: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    > span {
      display: grid;
      gap: 5px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 17px;
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
};