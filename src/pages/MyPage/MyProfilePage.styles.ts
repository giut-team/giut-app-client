import styled from "@emotion/styled";
import { tokens } from "../../design-system/tokens.generated";

const primary = "#24449a";
type ScrapTone = "green" | "blue" | "purple" | "pink" | "orange";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(86px + var(--app-safe-bottom));
    background: #f6f7fb;
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 27px 30px 25px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  PageTitle: styled.h1`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 25px;
    font-weight: 800;
    letter-spacing: -1.1px;
  `,
  SettingsButton: styled.button`
    display: grid;
    padding: 5px;
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
    padding: 24px 30px;
    background: ${tokens.color.neutral[50]};
  `,
  ProfilePhotoPlaceholder: styled.div`
    display: grid;
    width: 130px;
    aspect-ratio: 1;
    place-items: center;
    align-content: center;
    gap: 9px;
    border: 2px dashed #a4a4a4;
    border-radius: 22px;
    color: #858585;

    span { color: ${tokens.color.neutral[700]}; font-size: 15px; }
    small { color: ${tokens.color.neutral[700]}; font-size: 13px; }
  `,
  ProfileInfo: styled.div`
    min-width: 0;
  `,
  Name: styled.h2`
    margin: 0 0 16px;
    color: ${tokens.color.neutral[900]};
    font-size: 27px;
    font-weight: 800;
    letter-spacing: -1.3px;
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
    margin-top: 10px;
    padding: 8px 13px;
    border-radius: 10px;
    background: #e5f8f1;
    color: #10a877;
    font-size: 13px;
    font-weight: 700;
  `,
  ProfileActions: styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    padding: 12px 30px 28px;
    background: ${tokens.color.neutral[50]};
  `,
  EditButton: styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px 14px;
    border: 0;
    border-radius: 18px;
    background: ${primary};
    color: ${tokens.color.neutral[50]};
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
  `,
  ShareButton: styled.button`
    display: grid;
    padding: 15px;
    place-items: center;
    border: 0;
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};
    color: #647087;
    cursor: pointer;
  `,
  Metrics: styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 23px 0;
    border-top: 8px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  SkillSection: styled.section`
    padding: 22px 20px 24px;
    border-top: 1px solid ${tokens.color.neutral[200]};
    border-bottom: 8px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  Metric: styled.div<{ $primary?: boolean }>`
    display: grid;
    place-items: center;
    padding: 0 8px;

    + div { border-left: 1px solid ${tokens.color.neutral[200]}; }
    span { display: grid; gap: 7px; color: ${tokens.color.neutral[500]}; font-size: 13px; text-align: center; white-space: nowrap; }
    strong { color: ${({ $primary }) => $primary ? primary : tokens.color.neutral[900]}; font-size: 22px; font-weight: 800; }
  `,
  TabList: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 8px solid ${tokens.color.neutral[100]};
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: ${tokens.color.neutral[50]};
  `,
  Tab: styled.button<{ $active: boolean }>`
    position: relative;
    padding: 21px 4px 19px;
    border: 0;
    background: transparent;
    color: ${({ $active }) => $active ? tokens.color.neutral[900] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;

    &::after { position: absolute; right: 8px; bottom: -1px; left: 8px; height: 3px; background: ${tokens.color.neutral[900]}; content: ${({ $active }) => $active ? '""' : "none"}; }
  `,
  TabContent: styled.section`
    padding: 22px 20px;
  `,
  FeaturedPortfolio: styled.button`
    display: grid;
    grid-template-columns: 116px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 16px;
    border: 0;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[900]};
    text-align: left;
    cursor: pointer;
  `,
  FeaturedImage: styled.div`
    display: grid;
    aspect-ratio: 1.25;
    align-content: center;
    justify-items: center;
    gap: 7px;
    border: 2px dashed #aaa;
    border-radius: 13px;
    color: #888;

    span { color: ${tokens.color.neutral[700]}; font-size: 13px; }
    small { color: ${tokens.color.neutral[700]}; font-size: 11px; }
  `,
  PortfolioCopy: styled.span`
    display: grid;
    min-width: 0;
    gap: 8px;
    strong { overflow: hidden; color: ${tokens.color.neutral[900]}; font-size: 15px; font-weight: 800; letter-spacing: -.65px; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
    small { color: ${tokens.color.neutral[500]}; font-size: 12px; letter-spacing: -.4px; }
  `,
  RepresentativeLabel: styled.span`
    width: fit-content;
    padding: 6px 9px;
    border-radius: 8px;
    background: #e8efff;
    color: ${primary};
    font-size: 11px;
    font-weight: 800;
  `,
  PortfolioList: styled.div`
    margin-top: 14px;
    overflow: hidden;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  PortfolioItem: styled.button`
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 94px;
    padding: 17px 18px;
    border: 0;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    color: #aab3c3;
    text-align: left;
    cursor: pointer;
    &:last-child { border-bottom: 0; }
  `,
  ListDot: styled.span`
    width: 12px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #cbd3e0;
  `,
  SkillList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
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
    white-space: nowrap;

    img { width: 14px; height: 14px; filter: brightness(0) invert(1); }
  `,
  SimpleList: styled.div`
    overflow: hidden;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  SimpleItem: styled.article`
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    min-height: 88px;
    padding: 16px 18px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};
    &:last-child { border-bottom: 0; }
    strong { color: ${tokens.color.neutral[900]}; font-size: 15px; font-weight: 800; }
    small { color: ${tokens.color.neutral[500]}; font-size: 12px; }
  `,
  SimpleCopy: styled.div`
    display: grid;
    gap: 7px;
  `,
  ScrapContent: styled.section`
    padding: 14px 12px 28px;
  `,
  ScrapFilterList: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 6px;
    border-radius: 18px;
    background: #e9ecf4;
  `,
  ScrapFilterButton: styled.button<{ $active: boolean }>`
    padding: 13px 5px;
    border: 0;
    border-radius: 13px;
    background: ${({ $active }) => $active ? tokens.color.neutral[50] : "transparent"};
    box-shadow: ${({ $active }) => $active ? "0 2px 5px rgb(38 50 71 / 12%)" : "none"};
    color: ${({ $active }) => $active ? tokens.color.neutral[900] : tokens.color.neutral[500]};
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
  `,
  ScrapGroup: styled.section`
    margin-top: 23px;
  `,
  ScrapGroupTitle: styled.h2`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 13px;
    color: ${tokens.color.neutral[700]};
  `,
  ScrapGroupLabel: styled.span<{ $team?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 800;

    > span { width: 11px; aspect-ratio: 1; border-radius: 50%; background: ${({ $team }) => $team ? "#7a4bd3" : "#2b57ed"}; }
    em { color: ${tokens.color.neutral[500]}; font-style: normal; }
  `,
  ViewAllButton: styled.button`
    display: inline-flex;
    align-items: center;
    gap: 1px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 11px;
    cursor: pointer;
  `,
  ScrapCardList: styled.div`
    display: grid;
    gap: 14px;
  `,
  ScrapPostCard: styled.article`
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    align-items: center;
    gap: 13px;
    min-height: 96px;
    padding: 14px 16px;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
  `,
  ScrapThumbnail: styled.span<{ $tone: ScrapTone }>`
    width: 56px;
    aspect-ratio: 1;
    border-radius: 13px;
    background: ${({ $tone }) => ({ green: "linear-gradient(135deg, #d1f4df, #93d8b5)", blue: "linear-gradient(135deg, #d9e9ff, #99c4f5)", purple: "linear-gradient(135deg, #e4ddff, #aea0ef)", pink: "linear-gradient(135deg, #ffe0ef, #eca5c7)", orange: "linear-gradient(135deg, #ffe7c4, #f6bf77)" })[$tone]};
  `,
  ScrapPostCopy: styled.div`
    display: grid;
    min-width: 0;
    gap: 5px;

    > span { display: flex; align-items: center; gap: 9px; }
    > span > small { color: ${tokens.color.neutral[500]}; font-size: 10px; }
    strong { overflow: hidden; color: ${tokens.color.neutral[900]}; font-size: 13px; font-weight: 800; letter-spacing: -.55px; text-overflow: ellipsis; white-space: nowrap; }
    p { margin: 0; color: ${tokens.color.neutral[500]}; font-size: 10px; }
  `,
  ScrapCategory: styled.span<{ $tone: ScrapTone }>`
    width: fit-content;
    padding: 4px 6px;
    border-radius: 6px;
    background: ${({ $tone }) => ({ green: "#e3f8ea", blue: "#e3efff", purple: "#f0e9ff", pink: "#fee9f5", orange: "#fff0dc" })[$tone]};
    color: ${({ $tone }) => ({ green: "#14884d", blue: "#2b57ed", purple: "#7544cb", pink: "#d54391", orange: "#bd6b0d" })[$tone]};
    font-size: 9px;
    font-weight: 800;
  `,
  ScrapPostAction: styled.div`
    display: grid;
    align-content: center;
    justify-items: end;
    gap: 12px;
    color: #2b57ed;

    b { color: ${tokens.color.danger[500]}; font-size: 11px; font-weight: 800; }
  `,
  ScrapTeamCard: styled.article`
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    align-items: center;
    gap: 13px;
    min-height: 96px;
    padding: 14px 16px;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
  `,
  TeamThumbnail: styled.span`
    display: grid;
    width: 56px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 13px;
    background: ${tokens.color.neutral[100]};
    color: #66728a;
  `,
  ScrapTeamCopy: styled.div`
    display: grid;
    min-width: 0;
    gap: 5px;

    > span { display: flex; align-items: center; gap: 8px; }
    > span > small { color: #16845b; font-size: 10px; font-weight: 700; }
    strong { color: ${tokens.color.neutral[900]}; font-size: 13px; font-weight: 800; }
    p { margin: 0; color: ${tokens.color.neutral[500]}; font-size: 10px; }
  `,
  TeamBadge: styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 6px;
    border-radius: 6px;
    background: #f0e9ff;
    color: #7544cb;
    font-size: 9px;
    font-weight: 800;
  `,
  ScrapTeamAction: styled.span`
    display: grid;
    gap: 9px;
    color: #2b57ed;

    svg:last-child { color: #a8b1c0; }
  `,
};
