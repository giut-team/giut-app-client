import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(88px + var(--app-safe-bottom));
    background: ${tokens.color.neutral[50]};
  `,
  Hero: styled.section`
    position: relative;
    overflow: hidden;
    padding: max(28px, env(safe-area-inset-top)) 22px 23px;
    border-radius: 0 0 30px 30px;
    background: #24449a;

    &::after {
      position: absolute;
      top: -62px;
      right: -35px;
      width: 202px;
      height: 202px;
      border-radius: 50%;
      border: 1px solid rgb(255 255 255 / 4%);
      background: rgb(255 255 255 / 7%);
      content: "";
    }
  `,
  HubLabel: styled.p`
    position: relative;
    z-index: 1;
    margin: 0;
    color: #a9b9ec;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -.4px;
  `,
  Title: styled.h1`
    position: relative;
    z-index: 1;
    margin: 11px 0 0;
    color: ${tokens.color.neutral[50]};
    font-size: clamp(21px, 5.8vw, 25px);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.42;
  `,
  ResetButton: styled.button`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 14px 0 9px auto;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: #c9d4fa;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  FilterPanel: styled.div`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    padding: 14px 12px;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  FilterButton: styled(Button)<{ $active: boolean }>`
    height: 47px;
    min-width: 0;
    padding: 0 6px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font-size: 13px;
    font-weight: 700;

    &:hover:not(:disabled) { background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]}; }
  `,
  AppliedFilters: styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 10px;
  `,
  AppliedFilter: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 999px;
    background: rgb(255 255 255 / 18%);
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;

    span { font-size: 16px; font-weight: 400; line-height: 1; }
  `,
  Results: styled.section`
    padding: 23px 20px 20px;
    background: #f7f8fb;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.65px;
    line-height: 1.35;
  `,
  CategoryList: styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    margin: 15px -20px 20px;
    padding: 0 20px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};

    button {
      position: relative;
      height: 38px;
      padding: 0 6px 11px;
      border: 0;
      border-radius: 0;
      background: transparent;
      color: ${tokens.color.neutral[500]};
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;

      &[aria-pressed="true"] {
        background: transparent;
        color: ${tokens.color.primary[500]};
      }

      &[aria-pressed="true"]::after {
        position: absolute;
        right: 0;
        bottom: -1px;
        left: 0;
        height: 2px;
        border-radius: 999px;
        background: ${tokens.color.primary[500]};
        content: "";
      }
    }
  `,
  ProfileList: styled.div`
    display: grid;
    gap: 14px;
  `,
  ProfileCard: styled.article`
    position: relative;
    padding: 19px 14px 16px;
    border: 0;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 4px 14px rgb(38 50 71 / 6%);
  `,
  ProfileTop: styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
  `,
  Avatar: styled.div<{ $tone: "blue" | "purple" | "orange" | "green" }>`
    display: grid;
    flex: 0 0 74px;
    width: 74px;
    height: 74px;
    overflow: hidden;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => ({ blue: "#e0ecff", purple: "#eee8ff", orange: "#fff0e5", green: "#e5f6ec" })[$tone]};
    color: ${({ $tone }) => ({ blue: "#2b57d9", purple: "#6845d8", orange: "#db6e2d", green: "#16845b" })[$tone]};
    font-size: 30px;
    font-weight: 800;

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  ProfileHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
  `,
  ProfileIdentity: styled.div`
    min-width: 0;
    flex: 1;
  `,
  Name: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.7px;
    line-height: 1.2;
  `,
  Availability: styled.span<{ $available: boolean }>`
    display: flex;
    align-items: center;
    gap: 7px;
    color: ${({ $available }) => $available ? tokens.color.success[500] : tokens.color.neutral[500]};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -.3px;
    white-space: nowrap;
  `,
  AvailabilityDot: styled.span<{ $available: boolean }>`
    width: 8px;
    height: 8px;
    margin: 0;
    border: 0;
    border-radius: 50%;
    background: ${({ $available }) => $available ? "currentColor" : "transparent"};
  `,
  ProfileSummary: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[500]};
    overflow: hidden;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -.35px;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Introduction: styled.p`
    margin: 16px 0 0;
    color: ${tokens.color.neutral[700]};
    font-size: 13px;
    letter-spacing: -.35px;
    line-height: 1.5;
  `,
  DetailButton: styled.button`
    display: grid;
    flex: 0 0 20px;
    width: 28px;
    height: 36px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[200]};
    cursor: pointer;
  `,
  ProfileMeta: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 15px;
    color: #617087;
    font-size: 12px;
    font-weight: 600;

    span { display: inline-flex; align-items: center; gap: 6px; }
    span:nth-of-type(3) svg { color: #16845b; }
  `,
  ResponseMeta: styled.span<{ $fast: boolean }>`
    color: ${({ $fast }) => $fast ? "#188353" : tokens.color.neutral[500]};

    svg { color: currentColor; }
  `,
  CardFooter: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
  `,
  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin: 0;
  `,
  Tag: styled.span`
    padding: 0;
    color: ${tokens.color.primary[500]};
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  `,
  ProfileLink: styled.button`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 5px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  `,
  PositionSheetHeader: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: -5px -9px 18px;
  `,
  PositionSheetClose: styled.button`
    position: absolute;
    left: 0;
    display: grid;
    width: 44px;
    height: 44px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  PositionSheetTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -1px;
  `,
  PositionSheetHeading: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -1.3px;
    line-height: 1.3;
  `,
  PositionSheetDescription: styled.p`
    margin: 9px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.6px;
  `,
  PositionGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 28px;
  `,
  PositionOption: styled.button<{ $selected: boolean }>`
    position: relative;
    display: grid;
    min-height: 118px;
    padding: 14px 12px;
    place-content: center;
    gap: 10px;
    border: 2px solid ${({ $selected }) => $selected ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 20px;
    background: ${({ $selected }) => $selected ? "#f5f8ff" : tokens.color.neutral[50]};
    color: ${({ $selected }) => $selected ? "#213f87" : tokens.color.neutral[700]};
    font: inherit;
    cursor: pointer;

    span { font-size: 18px; font-weight: 800; letter-spacing: -0.8px; }

    &:focus-visible { outline: 3px solid ${tokens.color.primary[500]}; outline-offset: 2px; }
  `,
  PositionCheck: styled.span`
    position: absolute;
    top: 12px;
    right: 12px;
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 50%;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
  `,
  PositionSheetFooter: styled.div`
    width: 100%;
  `,
  ViewPositionsButton: styled.button`
    width: 100%;
    height: 62px;
    border: 0;
    border-radius: 22px;
    background: #1d397d;
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -0.8px;
    cursor: pointer;
  `,
  StatusSheetHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0 14px;
  `,
  StatusSheetTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 25px;
    font-weight: 800;
    letter-spacing: -1px;
  `,
  StatusSheetClose: styled.button`
    display: grid;
    width: 40px;
    height: 40px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
    cursor: pointer;
  `,
  StatusSheetDescription: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 16px;
    letter-spacing: -0.6px;
  `,
  StatusOptionList: styled.div`
    margin-top: 24px;
  `,
  StatusOption: styled.button<{ $selected: boolean }>`
    display: grid;
    grid-template-columns: 52px 1fr;
    width: 100%;
    min-height: 76px;
    padding: 12px 0;
    align-items: center;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    color: ${tokens.color.neutral[900]};
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:first-of-type { border-top: 1px solid ${tokens.color.neutral[200]}; }
    &:focus-visible { outline: 2px solid ${tokens.color.primary[500]}; outline-offset: -2px; }

    strong { display: block; font-size: 18px; font-weight: 800; letter-spacing: -0.8px; }
    small { display: block; margin-top: 5px; color: ${tokens.color.neutral[500]}; font-size: 13px; letter-spacing: -0.5px; }
  `,
  StatusRadio: styled.span<{ $selected: boolean }>`
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 2px solid ${({ $selected }) => $selected ? tokens.color.primary[500] : "#b6becd"};
    border-radius: 50%;

    &::after {
      width: ${({ $selected }) => $selected ? "18px" : "0"};
      height: ${({ $selected }) => $selected ? "18px" : "0"};
      border-radius: 50%;
      background: ${tokens.color.primary[500]};
      content: "";
      transition: width 150ms ease, height 150ms ease;
    }
  `,
  StatusSheetFooter: styled.div`
    display: grid;
    grid-template-columns: .7fr 1.55fr;
    gap: 16px;
    align-items: center;
  `,
  ResetStatusButton: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
  `,
  ViewStatusButton: styled.button`
    height: 62px;
    border: 0;
    border-radius: 18px;
    background: ${tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
  `,
  DepartmentFooter: styled.div`
    position: sticky;
    bottom: 0;
    width: 100%;
    padding-top: 8px;
    background: ${tokens.color.neutral[50]};

    button { width: 100%; }
  `,
  SelectedGradeList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 4px 0 20px;
  `,
  SelectedGrade: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border: 1px solid #91b0ff;
    border-radius: 999px;
    background: #f4f7ff;
    color: ${tokens.color.primary[500]};
    font-size: 14px;
    font-weight: 800;

    button { padding: 0; border: 0; background: transparent; color: inherit; font: inherit; font-size: 20px; line-height: .7; cursor: pointer; }
  `,
  DepartmentHeading: styled.h3`
    margin: 20px 0 12px;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
  `,
  GradeGrid: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,
  GradeButton: styled.button<{ $selected: boolean }>`
    min-width: 74px;
    height: 42px;
    padding: 0 14px;
    border: 1px solid ${({ $selected }) => $selected ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 13px;
    background: ${({ $selected }) => $selected ? tokens.color.primary[500] : tokens.color.neutral[50]};
    color: ${({ $selected }) => $selected ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  `,
  DepartmentSearch: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 56px;
    padding: 0 17px;
    border-radius: 14px;
    background: #f2f5fb;
    color: ${tokens.color.neutral[500]};
    font-size: 15px;

    input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: ${tokens.color.neutral[900]}; font: inherit; }
    input::placeholder { color: ${tokens.color.neutral[500]}; }
  `,
  DepartmentTabs: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 18px 10px 12px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    color: ${tokens.color.neutral[500]};
    font-size: 14px;

  `,
  DepartmentTab: styled.button<{ $active: boolean }>`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 14px;
    font-weight: ${({ $active }) => $active ? 800 : 500};
    cursor: pointer;
  `,
  DepartmentList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    max-height: 142px;
    overflow-y: auto;
  `,
  DepartmentRow: styled.button<{ $selected?: boolean }>`
    position: relative;
    display: flex;
    min-width: 0;
    width: 100%;
    min-height: 64px;
    padding: 10px 34px 10px 10px;
    align-items: flex-start;
    border: 2px solid ${({ $selected }) => $selected ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${({ $selected }) => $selected ? "#f5f8ff" : tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    text-align: left;

    > span { position: absolute; top: 9px; right: 9px; display: grid; width: 24px; height: 24px; place-items: center; border: 2px solid ${({ $selected }) => $selected ? tokens.color.primary[500] : "#aeb7c8"}; border-radius: 50%; background: ${({ $selected }) => $selected ? tokens.color.primary[500] : "transparent"}; color: ${tokens.color.neutral[50]}; }

    &:focus-visible { outline: 3px solid ${tokens.color.primary[500]}; outline-offset: 2px; }
  `,
  EmptyState: styled.p`
    margin: 0;
    padding: 40px 16px;
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    text-align: center;
  `,
};
