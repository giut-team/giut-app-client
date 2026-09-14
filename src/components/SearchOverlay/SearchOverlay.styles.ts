import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Overlay: styled.div`
    position: fixed;
    z-index: 20;
    inset: 0;
    display: flex;
    justify-content: center;
    background: rgb(16 21 34 / 52%);
  `,
  Panel: styled.section`
    width: min(calc(100% - 24px), 456px);
    height: fit-content;
    margin-top: 12px;
    padding: 18px 16px 17px;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 12px 28px rgb(16 21 34 / 16%);
  `,
  Form: styled.form`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
  `,
  Field: styled.div`
    position: relative;
  `,
  IconWrap: styled.span`
    position: absolute;
    top: 50%;
    left: 12px;
    display: grid;
    color: ${tokens.color.primary[500]};
    transform: translateY(-50%);
    pointer-events: none;
  `,
  Input: styled.input`
    width: 100%;
    height: 38px;
    padding: 0 12px 0 34px;
    border: 1px solid ${tokens.color.primary[500]};
    border-radius: 10px;
    outline: 0;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 11px;
    font-weight: 700;

    &::placeholder {
      color: ${tokens.color.neutral[500]};
      font-weight: 500;
    }

    &:focus {
      box-shadow: 0 0 0 2px ${tokens.color.primary[100]};
    }
  `,
  CancelButton: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  `,
  RecentTitle: styled.h2`
    margin: 14px 0 9px;
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  RecentList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  RecentChip: styled.div`
    display: inline-flex;
    align-items: center;
    min-height: 25px;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
  `,
  RecentTermButton: styled.button`
    height: 25px;
    padding: 0 3px 0 9px;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 9px;
    font-weight: 700;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  RecentRemoveButton: styled.button`
    display: grid;
    width: 22px;
    height: 25px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
};
