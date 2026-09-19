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
  Metrics: styled.section`
    display: grid;
    grid-template-columns: 1fr 1.25fr .8fr;
    margin: 0;
    padding: 20px 0;
    border-top: 1px solid ${tokens.color.neutral[200]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  Metric: styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    justify-content: center;
    padding: 0 18px;
    color: #647087;

    + div { border-left: 1px solid ${tokens.color.neutral[200]}; }
    svg { flex: 0 0 auto; }
    span { display: grid; gap: 3px; font-size: 12px; font-weight: 500; white-space: nowrap; }
    strong { color: ${tokens.color.neutral[900]}; font-size: 17px; font-weight: 800; }
    small { color: ${tokens.color.neutral[500]}; font-size: 11px; }

    &:last-child span {
      text-align: center;
    }
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 12px 24px;
    background: ${tokens.color.neutral[50]};
  `,
  Skill: styled.span<{ $index: number }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 9px 8px;
    border-radius: 12px;
    background: ${({ $index }) => ["#437b9c", "#2c4964", "#8953d9", "#2f3446"][$index % 4]};
    color: white;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;

    img {
      width: 14px;
      height: 14px;
      filter: brightness(0) invert(1);
    }
  `,
  ActionRow: styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) auto;
    gap: 12px;
    padding: 0 16px 30px;
    background: ${tokens.color.neutral[50]};

    > button:first-of-type { height: auto; gap: 9px; padding: 14px 12px; border-radius: 14px; font-size: 16px; }
  `,
  MessageButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    height: auto;
    padding: 0 8px;
    padding-block: 14px;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[900]};
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
  `,
  FavoriteButton: styled.button<{ $active: boolean }>`
    display: grid;
    height: auto;
    padding: 12px;
    place-items: center;
    border: 0;
    border-radius: 14px;
    background: ${tokens.color.neutral[100]};
    color: ${({ $active }) => $active ? "#f1b900" : "#63718a"};
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
  PortfolioContent: styled.section`
    padding: 25px 22px 30px;
  `,
  FeaturedPortfolioCard: styled.article`
    display: grid;
    grid-template-columns: minmax(108px, .9fr) minmax(0, 1fr) 20px;
    align-items: center;
    gap: 16px;
    min-height: 154px;
    padding: 18px;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
    cursor: pointer;
  `,
  FeaturedPortfolioImage: styled.div`
    align-self: center;
    aspect-ratio: 1.58;
    overflow: hidden;
    border-radius: 13px;
    background: ${tokens.color.neutral[100]};

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  PortfolioList: styled.section`
    display: grid;
    gap: 0;
    margin-top: 14px;
    padding: 0 18px;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
  `,
  PortfolioCard: styled.article`
    display: grid;
    grid-template-columns: 104px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 14px;
    min-height: 104px;
    padding: 14px 0;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    cursor: pointer;

    &:last-child { border-bottom: 0; }
  `,
  PortfolioImage: styled.div`
    align-self: center;
    aspect-ratio: 1.72;
    overflow: hidden;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  PortfolioCopy: styled.div`
    min-width: 0;
  `,
  RepresentativeLabel: styled.span`
    display: inline-flex;
    margin-bottom: 10px;
    padding: 6px 9px;
    border-radius: 8px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 11px;
    font-weight: 700;
  `,
  PortfolioTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -.5px;
    line-height: 1.45;
  `,
  PortfolioDescription: styled.p`
    margin: 8px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 12px;
    letter-spacing: -.4px;
    line-height: 1.45;
  `,
  PortfolioArrow: styled.span`
    color: #647087;
  `,
  ActivityList: styled.section`
    display: grid;
    gap: 4px;
    margin: 25px 22px 30px;
    padding: 24px 28px 12px;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
  `,
  ActivityItem: styled.article<{ $last: boolean }>`
    position: relative;
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 15px;
    min-height: ${({ $last }) => $last ? "55px" : "82px"};

    &::before {
      position: absolute;
      top: 16px;
      bottom: -4px;
      left: 8px;
      width: 2px;
      background: ${({ $last }) => $last ? "transparent" : tokens.color.primary[100]};
      content: "";
    }
  `,
  ActivityDot: styled.span`
    position: relative;
    z-index: 1;
    width: 16px;
    height: 16px;
    margin-top: 3px;
    border-radius: 50%;
    background: ${tokens.color.primary[500]};
  `,
  ActivityCopy: styled.div`
    min-width: 0;
  `,
  ActivityTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -.7px;
    line-height: 1.4;
  `,
  ActivityDescription: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 15px;
    letter-spacing: -.5px;
  `,
  EmptyTab: styled.p`
    margin: 0;
    padding: 64px 20px;
    color: ${tokens.color.neutral[500]};
    text-align: center;
  `,
};
