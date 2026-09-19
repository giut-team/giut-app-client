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
    padding-bottom: calc(24px + var(--app-safe-bottom));
    background: #f6f7fb;
  `,
  MoreButton: styled.button`
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
  ProfileSection: styled.section`
    display: grid;
    grid-template-columns: 130px minmax(0, 1fr);
    gap: 20px;
    padding: 27px 30px 22px;
    background: ${tokens.color.neutral[50]};
  `,
  Avatar: styled.div<{ $tone: AvatarTone }>`
    display: grid;
    width: 130px;
    height: 130px;
    overflow: hidden;
    place-items: center;
    border-radius: 22px;
    background: ${({ $tone }) => ({ blue: "#e0ecff", purple: "#eee8ff", orange: "#fff0e5", green: "#e5f6ec" })[$tone]};
    color: ${({ $tone }) => ({ blue: "#2b57d9", purple: "#6845d8", orange: "#db6e2d", green: "#16845b" })[$tone]};
    font-size: 38px;
    font-weight: 800;

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  ProfileInfo: styled.div`
    min-width: 0;
    padding-top: 1px;
  `,
  Name: styled.h1`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 15px;
    color: ${tokens.color.neutral[900]};
    font-size: 25px;
    font-weight: 800;
    letter-spacing: -1.2px;

    svg { padding: 3px; border-radius: 50%; background: #18b887; color: white; }
  `,
  DetailRow: styled.p`
    display: grid;
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 6px;
    margin: 0 0 10px;
    font-size: 14px;
    letter-spacing: -.5px;

    span { color: ${tokens.color.neutral[500]}; }
    strong { color: ${tokens.color.neutral[900]}; font-weight: 700; white-space: nowrap; }
  `,
  Status: styled.span`
    display: inline-flex;
    margin-top: 11px;
    padding: 8px 13px;
    border-radius: 10px;
    background: #e5f8f1;
    color: #10a877;
    font-size: 13px;
    font-weight: 700;
  `,
  IntroductionSection: styled.section`
    display: grid;
    grid-template-columns: 88px minmax(0, 1fr);
    gap: 12px;
    padding: 22px 30px 18px;
    background: ${tokens.color.neutral[50]};
  `,
  FieldLabel: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 14px;
    font-weight: 500;
  `,
  Introduction: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[700]};
    font-size: 14px;
    letter-spacing: -.5px;
    line-height: 1.65;
    white-space: pre-line;
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    padding: 16px 30px 24px;
    background: ${tokens.color.neutral[50]};
  `,
  Skill: styled.span<{ $index: number }>`
    padding: 11px 13px;
    border-radius: 12px;
    background: ${({ $index }) => ["#437b9c", "#2c4964", "#8953d9", "#2f3446"][$index % 4]};
    color: white;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  `,
  ActionRow: styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.25fr) 68px;
    gap: 10px;
    padding: 0 30px 30px;
    background: ${tokens.color.neutral[50]};

    > button:first-of-type { gap: 7px; padding: 0 10px; border-radius: 14px; font-size: 14px; }
  `,
  MessageButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    height: 48px;
    padding: 0 8px;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
  `,
  FavoriteButton: styled.button`
    display: grid;
    height: 48px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: #63718a;
    cursor: pointer;
  `,
  TabList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 8px solid ${tokens.color.neutral[100]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  Tab: styled.button<{ $active: boolean }>`
    position: relative;
    height: 69px;
    border: 0;
    background: transparent;
    color: ${({ $active }) => $active ? tokens.color.neutral[900] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;

    &::after { position: absolute; right: 20px; bottom: -1px; left: 20px; height: 3px; background: ${tokens.color.neutral[900]}; content: ${({ $active }) => $active ? '""' : "none"}; }
  `,
  PortfolioGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    padding: 25px 28px 30px;
  `,
  PortfolioCard: styled.article`
    overflow: hidden;
    border-radius: 0 0 18px 18px;
    background: ${tokens.color.neutral[50]};
  `,
  PortfolioImage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    aspect-ratio: 1.15;
    border: 2px dashed #aeb4bf;
    background: #fbfbfc;
    color: #828895;
    font-size: 13px;
  `,
  PortfolioTitle: styled.h3`
    margin: 13px 12px 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -.5px;
    line-height: 1.4;
  `,
  PortfolioDescription: styled.p`
    margin: 8px 12px 17px;
    color: ${tokens.color.neutral[500]};
    font-size: 12px;
    letter-spacing: -.4px;
    line-height: 1.45;
  `,
  EmptyTab: styled.p`
    margin: 0;
    padding: 64px 20px;
    color: ${tokens.color.neutral[500]};
    text-align: center;
  `,
};
