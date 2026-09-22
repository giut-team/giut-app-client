import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { tokens } from "../../design-system/tokens.generated";

const giutHubPrimary = "#1C4EA3";

const enterFromRight = keyframes`
  from { opacity: 0; transform: translateX(28px); }
  to { opacity: 1; transform: translateX(0); }
`;

const exitToRight = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(28px); }
`;

type AvatarTone = "blue" | "purple" | "orange" | "green";

export const S = {
  Page: styled.main<{ $isLeaving: boolean }>`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
    animation: ${({ $isLeaving }) => ($isLeaving ? exitToRight : enterFromRight)} 0.24s
      cubic-bezier(0.2, 0.8, 0.2, 1) both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
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
    cursor: pointer;
  `,
  SharePreview: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 26px;
    padding: 19px 20px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};

    span {
      display: grid;
      min-width: 0;
      gap: 6px;
    }
    strong {
      overflow: hidden;
      color: ${tokens.color.neutral[900]};
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.55px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    small {
      color: ${tokens.color.neutral[500]};
      font-size: 13px;
      letter-spacing: -0.4px;
    }
  `,
  SharePreviewThumbnail: styled.span`
    display: block;
    width: 58px;
    aspect-ratio: 1;
    flex: 0 0 auto;
    border-radius: 14px;
    background: linear-gradient(135deg, #d6e8ff, #a6c9f8);
  `,
  ShareLinkBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 18px;
    padding: 12px 13px 12px 18px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};

    code {
      min-width: 0;
      overflow: hidden;
      color: ${tokens.color.neutral[700]};
      font-family: inherit;
      font-size: 14px;
      letter-spacing: -0.3px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  CopyButton: styled.button`
    flex: 0 0 auto;
    padding: 11px 16px;
    border: 0;
    border-radius: 12px;
    background: ${giutHubPrimary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
  `,
  ShareChannelList: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 22px 0 28px;
  `,
  ShareChannel: styled.button`
    display: grid;
    place-items: center;
    gap: 9px;
    padding: 17px 5px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  `,
  ShareChannelIcon: styled.span`
    display: grid;
    width: 48px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 15px;
    background: #edf2fb;
    color: ${giutHubPrimary};
  `,
  KakaoMark: styled.span`
    display: grid;
    width: 48px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 15px;
    background: #ffe500;
    color: #371d1e;
  `,
  ShareCloseButton: styled.button`
    width: 100%;
    padding: 17px 12px;
    border: 0;
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
  `,
  HeroImage: styled.div`
    aspect-ratio: 1.58;
    overflow: hidden;
    background: ${tokens.color.neutral[100]};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  Body: styled.article`
    padding: 28px 24px 32px;
  `,
  Author: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    span {
      display: grid;
      gap: 5px;
    }
    strong {
      color: ${tokens.color.neutral[900]};
      font-size: 18px;
      font-weight: 800;
    }
    small {
      color: ${tokens.color.neutral[500]};
      font-size: 14px;
    }
  `,
  Avatar: styled.div<{ $tone: AvatarTone }>`
    display: grid;
    width: 70px;
    height: 70px;
    overflow: hidden;
    place-items: center;
    border-radius: 14px;
    background: ${({ $tone }) =>
      ({ blue: "#e0ecff", purple: "#eee8ff", orange: "#fff0e5", green: "#e5f6ec" })[
        $tone
      ]};
    color: ${giutHubPrimary};
    font-size: 24px;
    font-weight: 800;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

    h2 {
      margin: 0;
      padding-top: 21px;
      color: ${tokens.color.neutral[900]};
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.8px;
    }
    p {
      margin: 14px 0 0;
      color: ${tokens.color.neutral[700]};
      font-size: 15px;
      letter-spacing: -0.45px;
      line-height: 1.65;
    }
    ul {
      display: grid;
      gap: 8px;
      margin: 14px 0 0;
      padding: 0 0 20px 19px;
      border-bottom: 1px solid ${tokens.color.neutral[200]};
      color: ${tokens.color.neutral[700]};
      font-size: 15px;
      line-height: 1.5;
    }
    li::marker {
      color: ${giutHubPrimary};
    }
    strong {
      font-weight: 800;
    }
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
    background: ${({ $index }) =>
      ["#437b9c", "#2c4964", "#8953d9", "#2f3446"][$index % 4]};
    color: white;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;

    img {
      width: 14px;
      height: 14px;
      filter: brightness(0) invert(1);
    }
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
