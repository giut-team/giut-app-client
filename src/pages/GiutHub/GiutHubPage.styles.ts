import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 453px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(88px + env(safe-area-inset-bottom));
    background: ${tokens.color.neutral[50]};
  `,
  Hero: styled.section`
    position: relative;
    overflow: hidden;
    padding: max(28px, env(safe-area-inset-top)) 22px 23px;
    border-radius: 0 0 30px 30px;
    background: #24449a;

    &::after {
      position: absolute;
      top: -62px;
      right: -35px;
      width: 202px;
      height: 202px;
      border-radius: 50%;
      border: 1px solid rgb(255 255 255 / 4%);
      background: rgb(255 255 255 / 7%);
      content: "";
    }
  `,
  HubLabel: styled.p`
    position: relative;
    z-index: 1;
    margin: 0;
    color: #a9b9ec;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -.4px;
  `,
  Title: styled.h1`
    position: relative;
    z-index: 1;
    margin: 11px 0 0;
    color: ${tokens.color.neutral[50]};
    font-size: clamp(21px, 5.8vw, 25px);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.42;
  `,
  ResetButton: styled.button`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 14px 0 9px auto;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: #c9d4fa;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  `,
  FilterPanel: styled.div`
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    padding: 14px 12px;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
  `,
  FilterButton: styled(Button)<{ $active: boolean }>`
    height: 47px;
    min-width: 0;
    padding: 0 6px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 999px;
    background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font-size: 13px;
    font-weight: 700;

    &:hover:not(:disabled) { background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]}; }
  `,
  Results: styled.section`
    padding: 23px 20px 20px;
    background: #f7f8fb;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.65px;
    line-height: 1.35;
  `,
  CategoryList: styled.div`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    margin: 15px -20px 20px;
    padding: 0 20px;
    border-bottom: 1px solid ${tokens.color.neutral[200]};

    button {
      position: relative;
      height: 38px;
      padding: 0 6px 11px;
      border: 0;
      border-radius: 0;
      background: transparent;
      color: ${tokens.color.neutral[500]};
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;

      &[aria-pressed="true"] {
        background: transparent;
        color: ${tokens.color.primary[500]};
      }

      &[aria-pressed="true"]::after {
        position: absolute;
        right: 0;
        bottom: -1px;
        left: 0;
        height: 2px;
        border-radius: 999px;
        background: ${tokens.color.primary[500]};
        content: "";
      }
    }
  `,
  ProfileList: styled.div`
    display: grid;
    gap: 14px;
  `,
  ProfileCard: styled.article`
    position: relative;
    padding: 19px 14px 16px;
    border: 0;
    border-radius: 20px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 4px 14px rgb(38 50 71 / 6%);
  `,
  ProfileTop: styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
  `,
  Avatar: styled.div<{ $tone: "blue" | "purple" | "orange" | "green" }>`
    display: grid;
    flex: 0 0 74px;
    width: 74px;
    height: 74px;
    overflow: hidden;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => ({ blue: "#e0ecff", purple: "#eee8ff", orange: "#fff0e5", green: "#e5f6ec" })[$tone]};
    color: ${({ $tone }) => ({ blue: "#2b57d9", purple: "#6845d8", orange: "#db6e2d", green: "#16845b" })[$tone]};
    font-size: 30px;
    font-weight: 800;

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  ProfileHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
  `,
  ProfileIdentity: styled.div`
    min-width: 0;
    flex: 1;
  `,
  Name: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.7px;
    line-height: 1.2;
  `,
  Availability: styled.span<{ $available: boolean }>`
    display: flex;
    align-items: center;
    gap: 7px;
    color: ${({ $available }) => $available ? tokens.color.success[500] : tokens.color.neutral[500]};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -.3px;
    white-space: nowrap;
  `,
  AvailabilityDot: styled.span<{ $available: boolean }>`
    width: 8px;
    height: 8px;
    margin: 0;
    border: 0;
    border-radius: 50%;
    background: ${({ $available }) => $available ? "currentColor" : "transparent"};
  `,
  ProfileSummary: styled.p`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[500]};
    overflow: hidden;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -.35px;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Introduction: styled.p`
    margin: 16px 0 0;
    color: ${tokens.color.neutral[700]};
    font-size: 13px;
    letter-spacing: -.35px;
    line-height: 1.5;
  `,
  DetailButton: styled.button`
    display: grid;
    flex: 0 0 20px;
    width: 28px;
    height: 36px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[200]};
    cursor: pointer;
  `,
  ProfileMeta: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 15px;
    color: #617087;
    font-size: 12px;
    font-weight: 600;

    span { display: inline-flex; align-items: center; gap: 6px; }
    span:nth-of-type(3) svg { color: #16845b; }
  `,
  ResponseMeta: styled.span<{ $fast: boolean }>`
    color: ${({ $fast }) => $fast ? "#188353" : tokens.color.neutral[500]};

    svg { color: currentColor; }
  `,
  CardFooter: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
  `,
  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin: 0;
  `,
  Tag: styled.span`
    padding: 0;
    color: ${tokens.color.primary[500]};
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
  `,
  ProfileLink: styled.button`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 5px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  `,
  EmptyState: styled.p`
    margin: 0;
    padding: 40px 16px;
    border-radius: 18px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 13px;
    text-align: center;
  `,
};
