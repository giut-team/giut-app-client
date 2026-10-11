import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const statusColors = {
  "팀 찾는 중": { bg: "#e3f4e8", fg: "#2f8f4e" },
  "포폴 쌓는 중": { bg: "#e8efff", fg: "#2857d9" },
  "지금은 쉬는 중": { bg: "#eceef2", fg: "#6f7a8a" },
} as const;

export type ProfileStatus = keyof typeof statusColors;
const primary = "#24449a";
export const S = {
  Page: styled.main`
    height: 100dvh;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    background: ${tokens.color.neutral[50]};
    overflow: hidden;
  `,
  Content: styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 84px;
    background: ${tokens.color.neutral[50]};
  `,
  SkipButton: styled.button`
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
  StaticPannel: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 10px;
    margin: 0 0 -10px;
  `,
  ProgressBar: styled.div`
    display: flex;
    justify-content: center;
    width: 100%
    padding: 20px;
    margin: 10px 16px 7px;
  `,
  ProgressSegment: styled.div<{ isActive: boolean }>`
    flex:1;
    height: 5px;
    border-radius: 20px;
    margin: 0 4px;
    background-color: ${({ isActive }) => (isActive ? tokens.color.primary[600] : tokens.color.neutral[200])};
  `,
  ProgressLabel: styled.div`
    padding: 0px 20px;
    font-size: 14px;
    font-weight: 750;
    color: ${tokens.color.primary[600]};
  `,
  ProfilePreview: styled.div`
    min-height: 50px;
    padding: 10px;
    margin: 10px 20px;
    border-radius: 13px;
    background-color: ${tokens.color.neutral[100]};
  `,
  ProfilePreviewTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    font-weight: 700;
    color: ${tokens.color.neutral[500]};

    >span{
      margin-left: auto;
      font-weight: 700;
      color:${tokens.color.primary[600]};
    }
  `,
  PreviewArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 16px;
  `,
  PreviewTop: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`,
  ProfileImg: styled.div`
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: 15px;
    border: 1.5px solid #3b5bdb;
    background-color: #dfe4ee;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  PreviewLabels: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  `,
  PreviewName: styled.div<{ $empty?: boolean }>`
    font-size: 20px;
    font-weight: 800;
    color: ${({ $empty }) => ($empty ? "#c5cad3" : "#111")};
  `,
  PrewviewMajorGrade: styled.div<{ $empty?: boolean }>`
    font-size: 13px;
    font-weight: 600;
    color: ${({ $empty }) => ($empty ? "#c5cad3" : tokens.color.neutral[500])};
  `,
  PreviewRoleInterest: styled.div<{ $empty?: boolean }>`
    margin-top: 2px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ $empty }) => ($empty ? "#c5cad3" : "#222")};
  `,
    PreviewState: styled.div<{ $status: ProfileStatus }>`
    margin: 3px 0;
    padding: 4px 8px;
    border-radius: 6px;
    width: fit-content;
    font-size: 12px;
    font-weight: 700;
    background-color: ${({ $status }) => statusColors[$status].bg};
    color: ${({ $status }) => statusColors[$status].fg};
    transition: background-color 0.2s, color 0.2s;
  `,
  PreviewBio: styled.div<{ $empty?: boolean }>`
    font-size: 13px;
    color: ${({ $empty }) => ($empty ? "#a0a6b1" : tokens.color.neutral[700])};
  `,
  PreviewSkills: styled.div`
    padding: 5px 0px;
    border-top: 1px solid ${tokens.color.neutral[200]};
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  `,
  Skill: styled.span<{ $index: number }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    border-radius: 12px;
    background: ${({ $index }) =>
      ["#437b9c", "#2c4964", "#8953d9", "#2f3446"][$index % 4]};
    color: white;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;

    img {
      width: 14px;
      height: 14px;
      filter: brightness(0) invert(1);
    }
  `,
  FormArea: styled.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 0 0 5px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  FormSection: styled.div`
    margin: 10px 20px 5px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
  `,
  LastFormSection: styled.div`
    margin: 10px 20px 5px;
    display: flex;
    flex-direction: column;
  `,
  FormLabel: styled.div`
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;

    >span{
    color: ${tokens.color.primary[600]};
    }

    >em{
    font-size: 13px;
    color: ${tokens.color.neutral[500]};
    font-weight: 500;
    margin-left: auto;
    }
  `,
  FormProfileImgdescription: styled.div`
    font-size: 12px;
    color: ${tokens.color.neutral[500]};
    margin: 3px 0 0;
  `,
  FormUniv: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    margin: 10px 0 20px;
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
  StatusChoiceList: styled.div`
    margin: 10px 0;
    display: grid;
    gap: 5px;
  `,
  StatusChoiceButton: styled.button<{ $selected: boolean }>`
    display: grid;
    grid-template-columns: 25px minmax(0, 1fr);
    column-gap: 11px;
    width: 100%;
    padding: 10px 16px;
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
  AddButton: styled.div`
    display: flex;
    align-item: center;
    gap: 10px;
    border: 1px dashed ${tokens.color.neutral[200]};
    border-radius: 13px;
    padding: 15px;
    margin: 5px 0;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;

    >span{
      font-size: 14px;
      font-weight: 500;
      margin-left: auto;
      color: ${tokens.color.neutral[500]};
    }
  `,
  SaveBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    gap: 5px;
    display: flex;
    justify-content: center;
    padding: 12px 22px calc(12px + var(--app-safe-bottom));
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: rgb(255 255 255 / 96%);
  `,
  SaveButtons: styled.button`
    width: min(100%, 204px);
    padding: 17px 14px;
    border: 0;
    border-radius: 15px;
    background: ${primary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      background: #dfe4ee;
      cursor: not-allowed;
    }
  `,
  SaveButtonsLight: styled.button`
    width: min(100%, 204px);
    padding: 17px 14px;
    border: 0;
    border-radius: 15px;
    background: #dfe4ee;
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
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

    &:disabled {
      background: #dfe4ee;
      cursor: not-allowed;
    }
  `,
    DoneContent: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(100%, 453px);
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  `,
  DoneIcon: styled.div`
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
    border-radius: 50%;
    background: #eef3ff;
    color: ${primary};
  `,
  DoneTitle: styled.h1`
    margin: 0 0 12px;
    font-size: 22px;
    font-weight: 800;
    color: ${tokens.color.neutral[900]};
  `,
  DoneDescription: styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${tokens.color.neutral[500]};
  `,
  DoneButtons: styled.div`
    display: grid;
    gap: 8px;
    width: min(100%, 453px);
    margin: 0 auto;
    padding: 12px 20px calc(16px + var(--app-safe-bottom));
  `,
  DonePrimaryButton: styled.button`
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
  `,
  DoneSecondaryButton: styled.button`
    width: 100%;
    padding: 17px;
    border: 0;
    border-radius: 15px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  `,
};