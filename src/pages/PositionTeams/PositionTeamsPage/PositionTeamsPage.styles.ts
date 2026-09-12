import styled from "@emotion/styled";
import { Button } from "../../../components/Button";
import { tokens } from "../../../design-system/tokens.generated";

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[50]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 64px;
    background: ${tokens.color.neutral[50]};
  `,
  TopArea: styled.section`
    padding: 18px 13px 18px;
    background: ${tokens.color.neutral[50]};
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Brand: styled.div`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: ${tokens.color.primary[500]};
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1;
  `,
  BrandMark: styled.img`
    width: 23px;
    height: 19px;
    object-fit: contain;
  `,
  HeaderActions: styled.div`
    display: flex;
    gap: 6px;
  `,
  HeaderButton: styled.button`
    position: relative;
    display: grid;
    width: 30px;
    height: 30px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[700]};
    cursor: pointer;

    &:first-child {
      background: ${tokens.color.primary[100]};
      color: ${tokens.color.primary[500]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  HeaderBadge: styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    display: grid;
    min-width: 14px;
    height: 14px;
    padding: 0 3px;
    place-items: center;
    border-radius: 999px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
  `,
  NotificationDot: styled.span`
    position: absolute;
    top: 6px;
    right: 6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${tokens.color.danger[500]};
  `,
  Greeting: styled.p`
    margin: 21px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    font-weight: 500;
  `,
  Title: styled.h1`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.35;
  `,
  ListSection: styled.section`
    min-height: calc(100svh - 160px);
    padding: 16px 8px 20px;
    border-top: 8px solid ${tokens.color.neutral[100]};
    background: ${tokens.color.neutral[50]};
  `,
  ListHeader: styled.div`
    padding: 0 1px 10px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 12px;
    font-weight: 800;
  `,
  FilterList: styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TeamList: styled.div`
    display: grid;
    gap: 8px;
  `,
  TeamCard: styled.article`
    padding: 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  TeamTopline: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  `,
  PositionBadge: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  DDay: styled.span<{ $urgent: boolean }>`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${({ $urgent }) =>
      $urgent
        ? `color-mix(in srgb, ${tokens.color.danger[500]} 10%, ${tokens.color.neutral[50]})`
        : tokens.color.neutral[100]};
    color: ${({ $urgent }) =>
      $urgent ? tokens.color.danger[500] : tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  TeamTitle: styled.h3`
    margin: 10px 0 4px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  TeamDescription: styled.p`
    margin: 0;
    overflow: hidden;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  TeamActions: styled.div`
    display: flex;
    gap: 6px;
    margin-top: 10px;
  `,
  ApplyButton: styled(Button)<{ $featured: boolean }>`
    flex: 1;
    width: auto;
    height: 34px;
    padding: 0 10px;
    border-radius: 9px;
    background: ${({ $featured }) =>
      $featured ? tokens.color.primary[500] : tokens.color.primary[100]};
    color: ${({ $featured }) =>
      $featured ? tokens.color.neutral[50] : tokens.color.primary[500]};
    font-size: 10px;

    &:hover:not(:disabled) {
      background: ${({ $featured }) =>
        $featured ? tokens.color.primary[600] : tokens.color.primary[100]};
      opacity: 0.9;
    }
  `,
  FavoriteButton: styled.button<{ $favorite: boolean }>`
    display: grid;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 9px;
    background: ${tokens.color.neutral[100]};
    color: ${({ $favorite }) =>
      $favorite ? tokens.color.primary[500] : tokens.color.neutral[500]};
    cursor: pointer;

    &:hover {
      background: ${tokens.color.primary[100]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  InfoNote: styled.p`
    margin: 12px 3px 0;
    padding: 11px;
    border-radius: 10px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.5;
  `,
};
