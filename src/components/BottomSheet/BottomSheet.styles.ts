import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

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
  Header: styled.div<{ $compact: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    ${({ $compact }) =>
      $compact &&
      `
        padding-bottom: 12px;
        border-bottom: 1px solid ${tokens.color.neutral[200]};
        margin-bottom: 12px;
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
      $variant === "action" ? "0" : "17px 16px"};
    border-radius: 15px;
    background: ${({ $variant }) =>
      $variant === "action" ? "transparent" : tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    line-height: 1.65;
    letter-spacing: -0.35px;
  `,
};
