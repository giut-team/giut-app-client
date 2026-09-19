import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

type AvatarTone = "blue" | "purple" | "orange" | "green";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 92px;
    background: ${tokens.color.neutral[50]};
  `,
  ShareButton: styled.button`
    display: grid;
    width: 36px;
    height: 36px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[900]};
  `,
  HeroImage: styled.div`
    aspect-ratio: 1.58;
    overflow: hidden;
    background: ${tokens.color.neutral[100]};

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  Body: styled.article`
    padding: 28px 24px 32px;
  `,
  Author: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    span { display: grid; gap: 5px; }
    strong { color: ${tokens.color.neutral[900]}; font-size: 18px; font-weight: 800; }
    small { color: ${tokens.color.neutral[500]}; font-size: 14px; }
  `,
  Avatar: styled.div<{ $tone: AvatarTone }>`
    display: grid;
    width: 70px;
    height: 70px;
    overflow: hidden;
    place-items: center;
    border-radius: 14px;
    background: ${({ $tone }) => ({ blue: "#e0ecff", purple: "#eee8ff", orange: "#fff0e5", green: "#e5f6ec" })[$tone]};
    color: ${tokens.color.primary[500]};
    font-size: 24px;
    font-weight: 800;
    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  Title: styled.h1`
    margin: 26px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1.3px;
    line-height: 1.3;
  `,
  Meta: styled.p`
    margin: 10px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 15px;
  `,
  Markdown: styled.section`
    margin-top: 20px;
    border-top: 1px solid ${tokens.color.neutral[200]};

    h2 { margin: 0; padding-top: 21px; color: ${tokens.color.neutral[900]}; font-size: 20px; font-weight: 800; letter-spacing: -.8px; }
    p { margin: 14px 0 0; color: ${tokens.color.neutral[700]}; font-size: 15px; letter-spacing: -.45px; line-height: 1.65; }
    ul { display: grid; gap: 8px; margin: 14px 0 0; padding: 0 0 20px 19px; border-bottom: 1px solid ${tokens.color.neutral[200]}; color: ${tokens.color.neutral[700]}; font-size: 15px; line-height: 1.5; }
    li::marker { color: ${tokens.color.primary[500]}; }
    strong { font-weight: 800; }
  `,
  StackTitle: styled.h2`
    margin: 20px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
  `,
  StackList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  `,
  Stack: styled.span<{ $index: number }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 9px 8px;
    border-radius: 10px;
    background: ${({ $index }) => ["#437b9c", "#2c4964", "#8953d9", "#2f3446"][$index % 4]};
    color: white;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;

    img { width: 14px; height: 14px; filter: brightness(0) invert(1); }
  `,
  ProposalBar: styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    justify-content: center;
    padding: 10px 20px calc(12px + var(--app-safe-bottom));
    box-sizing: border-box;
    border-top: 1px solid ${tokens.color.neutral[100]};
    background: rgb(255 255 255 / 96%);
  `,
  ProposalButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: min(100%, 413px);
    padding: 14px 20px;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
  `,
};
