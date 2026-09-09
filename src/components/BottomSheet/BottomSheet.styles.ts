import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  InnerPadding: styled.div`
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    padding: 17px 27px 0;
  `,
  HandleWrapper: styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 18px;
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
  Title: styled.h2`
    margin: 0 0 22px;
    color: ${tokens.color.neutral[900]};
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.7px;
  `,
  Header: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  `,
  Eyebrow: styled.p`
    margin: 0 0 8px;
    color: ${tokens.color.primary[500]};
    font-size: 13px;
    font-weight: 800;
  `,
  CloseButton: styled.button`
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    margin: -2px -8px 0 16px;
    border: 0;
    border-radius: 50%;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: 28px;
    font-weight: 300;
    line-height: 1;
    cursor: pointer;
  `,
  Content: styled.div`
    min-height: 0;
    flex: 1;
  `,
  Options: styled.div`
    border-bottom: 1px solid ${tokens.color.neutral[300]};
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
      $first ? 0 : `1px solid ${tokens.color.neutral[300]}`};
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
    color: ${tokens.color.danger};
    font-size: 23px;
    font-weight: 700;
  `,
  Footer: styled.div`
    margin-top: 22px;
    padding: 17px 16px;
    border-radius: 15px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    line-height: 1.65;
    letter-spacing: -0.35px;
  `,
};
