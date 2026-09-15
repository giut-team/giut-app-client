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
    background: ${tokens.color.neutral[50]};
    box-sizing: border-box;
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
  ProgressSegment: styled.span<{ $active: boolean }>`
    height: 4px;
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    transition: background-color 180ms ease;
  `,
  Form: styled.div`
    padding: 14px 14px 28px;
  `,
  ContestNotice: styled.div`
    display: grid;
    gap: 5px;
    padding: 13px 12px;
    border-radius: 12px;
    background: ${tokens.color.primary[100]};

    strong {
      color: ${tokens.color.primary[500]};
      font-size: 9px;
      font-weight: 800;
    }

    span {
      color: ${tokens.color.primary[500]};
      font-size: 9px;
    }
  `,
  Field: styled.section<{ $outlined?: boolean }>`
    position: relative;
    margin-top: 18px;
    padding: ${({ $outlined }) => ($outlined === false ? "0" : "13px")};
    border: ${({ $outlined }) =>
      $outlined === false
        ? "0"
        : `1px solid ${tokens.color.neutral[200]}`};
    border-radius: 11px;
    background: ${({ $outlined }) =>
      $outlined === false ? "transparent" : tokens.color.neutral[50]};
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

    &:disabled {
      color: ${tokens.color.neutral[200]};
      cursor: default;
    }
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
    border: 1px solid
      ${({ $active }) =>
        $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? tokens.color.primary[500] : tokens.color.neutral[50]};
    color: ${({ $active }) =>
      $active ? tokens.color.neutral[50] : tokens.color.neutral[700]};
    font: inherit;
    font-size: 9px;
    font-weight: ${({ $active }) => ($active ? 800 : 600)};
    cursor: pointer;
    transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
  `,
  ActionBar: styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 10px 6px max(10px, env(safe-area-inset-bottom));
    box-sizing: border-box;
    background: ${tokens.color.neutral[50]};
  `,
  NextButton: styled.button`
    width: 100%;
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
};
