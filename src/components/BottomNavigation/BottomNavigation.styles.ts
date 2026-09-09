import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Nav: styled.nav`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: rgba(255, 255, 255, .96);
    box-shadow: 0 -4px 16px rgba(38, 50, 71, .04);
  `,
  Inner: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: min(100%, 550px);
    height: 64px;
    padding: 5px 12px 7px;
  `,
  Item: styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    border: 0;
    background: transparent;
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 10px;
    font-weight: ${({ $active }) => $active ? 800 : 500};
    cursor: pointer;
    &:focus-visible { outline: 2px solid ${tokens.color.primary[500]}; outline-offset: -2px; border-radius: 10px; }
  `,
  Badge: styled.span`
    position: absolute;
    top: 2px;
    right: calc(50% - 17px);
    display: grid;
    min-width: 15px;
    height: 15px;
    padding: 0 3px;
    place-items: center;
    border-radius: 999px;
    background: ${tokens.color.danger};
    color: ${tokens.color.neutral[50]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
};
