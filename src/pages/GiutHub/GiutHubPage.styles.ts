import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { tokens } from "../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: calc(88px + env(safe-area-inset-bottom));
    background: ${tokens.color.neutral[50]};
  `,
  Hero: styled.section`
    position: relative;
    overflow: hidden;
    padding: max(21px, env(safe-area-inset-top)) 16px 29px;
    background: ${tokens.color.primary[100]};

    &::after {
      position: absolute;
      top: -70px;
      right: -100px;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: rgb(255 255 255 / 36%);
      content: "";
    }
  `,
  HubLabel: styled.p`
    position: relative;
    z-index: 1;
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.4px;
  `,
  Title: styled.h1`
    position: relative;
    z-index: 1;
    margin: 14px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: clamp(22px, 5.8vw, 27px);
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
    margin: 16px 0 10px auto;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.primary[500]};
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
    padding: 12px;
    border-radius: 21px;
    background: ${tokens.color.neutral[50]};
  `,
  FilterButton: styled(Button)<{ $active: boolean }>`
    height: 48px;
    min-width: 0;
    padding: 0 6px;
    border: 1px solid ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[200]};
    border-radius: 15px;
    background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]};
    color: ${({ $active }) => $active ? tokens.color.primary[500] : tokens.color.neutral[700]};
    font-size: clamp(11px, 3vw, 13px);
    font-weight: 700;

    &:hover:not(:disabled) { background: ${({ $active }) => $active ? tokens.color.primary[100] : tokens.color.neutral[50]}; }
  `,
  Results: styled.section`
    padding: 25px 16px 20px;
    background: #f6f7fa;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -.65px;
    line-height: 1.35;
  `,
  CategoryList: styled.div`
    display: flex;
    gap: 7px;
    margin: 16px -16px 20px;
    padding: 0 16px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }

    button { height: 38px; padding: 0 16px; font-size: 12px; }
  `,
  ProfileList: styled.div`
    display: grid;
    gap: 20px;
  `,
  ProfileCard: styled.article`
    padding: 16px;
    border: 1px solid #e8ebf2;
    border-radius: 18px;
    background: ${tokens.color.neutral[50]};
    box-shadow: 0 3px 10px rgb(38 50 71 / 3%);
  `,
  StatusList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  StatusBadge: styled.span`
    padding: 7px 10px;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
  `,
  ProfileMain: styled.div`
    display: flex;
    gap: 14px;
    margin-top: 16px;
  `,
  ProfileImage: styled.img`
    flex: 0 0 72px;
    width: 72px;
    height: 92px;
    border-radius: 18px;
    object-fit: cover;
    object-position: center top;
  `,
  ProfileDetails: styled.div`
    min-width: 0;
    flex: 1;
  `,
  NameRow: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  Name: styled.h3`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -.7px;
    line-height: 1.2;
  `,
  Verified: styled.span`
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    border-radius: 50%;
    background: #18b98d;
    color: ${tokens.color.neutral[50]};
  `,
  InfoRow: styled.div`
    display: flex;
    gap: 15px;
    margin-top: 8px;
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
    letter-spacing: -.3px;

    span { flex: 0 0 28px; }
    strong { overflow: hidden; color: ${tokens.color.neutral[700]}; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
  `,
  Introduction: styled.p`
    display: -webkit-box;
    margin: 13px 0 0;
    overflow: hidden;
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
    letter-spacing: -.3px;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,
  DetailButton: styled.button`
    display: grid;
    align-self: center;
    flex: 0 0 28px;
    width: 28px;
    height: 36px;
    padding: 0;
    place-items: center;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[200]};
    cursor: pointer;
  `,
  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 17px;
    padding-top: 16px;
    border-top: 1px solid ${tokens.color.neutral[100]};
  `,
  Tag: styled.span`
    padding: 8px 10px;
    border-radius: 7px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
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
