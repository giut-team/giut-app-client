import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Content: styled.div`
    padding: 34px 34px 32px;
  `,
  Icon: styled.div<{ $tone: "default" | "danger" }>`
    display: grid;
    width: 58px;
    aspect-ratio: 1;
    margin: 0 auto 24px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => $tone === "danger" ? "#fff0f1" : "#edf2fb"};
    color: ${({ $tone }) => $tone === "danger" ? tokens.color.danger[500] : "#1C4EA3"};
  `,
  Title: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.35;
  `,
  Description: styled.p`
    margin: 12px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -.45px;
    line-height: 1.7;
    white-space: pre-line;
  `,
};
