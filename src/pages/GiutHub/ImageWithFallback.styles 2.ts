import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Fallback: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    gap: 4px;
    min-width: 0;
    padding: 8px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    svg { flex-shrink: 0; }
  `,
};
