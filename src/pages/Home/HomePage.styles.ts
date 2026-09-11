import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { tokens } from "../../design-system/tokens.generated";

type CategoryTone = "blue" | "orange" | "purple";
type BannerCirclePosition = "top" | "bottom";
type BannerTone = "primary" | "deep";

const categoryColors: Record<CategoryTone, { background: string; color: string }> = {
  blue: {
    background: tokens.color.primary[100],
    color: tokens.color.primary[500],
  },
  orange: {
    background: tokens.color.orange[100],
    color: tokens.color.orange[500],
  },
  purple: {
    background: tokens.color.purple[100],
    color: tokens.color.purple[500],
  },
};

export const S = {
  Page: styled.main`
    min-height: 100svh;
    background: ${tokens.color.neutral[100]};
  `,
  Content: styled.div`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding: 18px 13px 88px;
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
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    cursor: pointer;

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
    font-size: 8px;
    font-weight: 800;
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
    margin: 22px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    letter-spacing: -0.3px;
  `,
  Title: styled.h1`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.35;
  `,
  HeroViewport: styled.div`
    position: relative;
    min-height: 118px;
    margin-top: 24px;
    overflow: hidden;
    border-radius: 15px;
    background: ${tokens.color.primary[500]};
  `,
  HeroTrack: styled.div<{ $active: number; $count: number }>`
    display: flex;
    width: ${({ $count }) => `${$count * 100}%`};
    transform: ${({ $active, $count }) =>
      `translateX(-${($active * 100) / $count}%)`};
    transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,
  HeroBanner: styled.section<{ $slideCount: number; $tone: BannerTone }>`
    position: relative;
    flex: 0 0 ${({ $slideCount }) => `${100 / $slideCount}%`};
    min-height: 118px;
    overflow: hidden;
    background: ${({ $tone }) =>
      $tone === "deep"
        ? tokens.color.primary[600]
        : tokens.color.primary[500]};
    color: ${tokens.color.neutral[50]};
  `,
  BannerContent: styled.div`
    position: relative;
    z-index: 1;
    padding: 14px;
  `,
  BannerEyebrow: styled.p`
    display: inline-flex;
    align-items: center;
    min-height: 18px;
    margin: 0 0 7px;
    padding: 0 8px;
    border-radius: 999px;
    background: rgb(255 255 255 / 18%);
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
  `,
  BannerTitle: styled.h2`
    margin: 0;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.4px;
    line-height: 1.35;
    white-space: pre-line;
  `,
  BannerButton: styled(Button)`
    height: 27px;
    margin-top: 9px;
    padding: 0 11px;
    border-radius: 999px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.primary[500]};
    font-size: 9px;

    &:hover:not(:disabled) {
      background: ${tokens.color.neutral[50]};
      opacity: 0.9;
    }
  `,
  BannerCircle: styled.span<{ $position: BannerCirclePosition }>`
    position: absolute;
    right: ${({ $position }) => ($position === "top" ? "-16px" : "24px")};
    top: ${({ $position }) => ($position === "top" ? "-38px" : "auto")};
    bottom: ${({ $position }) => ($position === "bottom" ? "-34px" : "auto")};
    width: ${({ $position }) => ($position === "top" ? "80px" : "58px")};
    height: ${({ $position }) => ($position === "top" ? "80px" : "58px")};
    border-radius: 50%;
    background: rgb(255 255 255 / 12%);
  `,
  BannerNextButton: styled.button`
    position: absolute;
    top: 50%;
    right: 11px;
    z-index: 2;
    display: grid;
    width: 30px;
    height: 30px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: rgb(255 255 255 / 16%);
    color: ${tokens.color.neutral[50]};
    transform: translateY(-50%);
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.neutral[50]};
      outline-offset: 2px;
    }
  `,
  BannerPagination: styled.div`
    position: absolute;
    right: 14px;
    bottom: 10px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  PaginationDot: styled.span<{ $active: boolean }>`
    display: block;
    width: ${({ $active }) => ($active ? "16px" : "5px")};
    height: 5px;
    border-radius: 999px;
    background: ${tokens.color.neutral[50]};
    opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  `,
  Shortcuts: styled.div`
    display: grid;
    gap: 6px;
    margin-top: 16px;
  `,
  Shortcut: styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 50px;
    padding: 7px 10px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 12px;
    background: ${tokens.color.neutral[50]};
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  ShortcutIcon: styled.span`
    display: grid;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    place-items: center;
    border-radius: 10px;
    background: ${tokens.color.neutral[100]};
    font-size: 16px;
  `,
  ShortcutText: styled.span`
    display: grid;
    gap: 2px;
    min-width: 0;
  `,
  ShortcutTitle: styled.span`
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  ShortcutDescription: styled.span`
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
  Caret: styled.span`
    margin-left: auto;
    color: ${tokens.color.neutral[500]};
    font-size: 16px;
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 3px 10px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.3px;
  `,
  ViewAll: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 9px;
    cursor: pointer;
  `,
  ContestList: styled.div`
    display: grid;
    gap: 8px;
  `,
  ContestCard: styled.article`
    min-height: 86px;
    padding: 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 13px;
    background: ${tokens.color.neutral[50]};
  `,
  ContestTopline: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Category: styled.span<{ $tone: CategoryTone }>`
    padding: 4px 7px;
    border-radius: 6px;
    background: ${({ $tone }) => categoryColors[$tone].background};
    color: ${({ $tone }) => categoryColors[$tone].color};
    font-size: 8px;
    font-weight: 800;
  `,
  DDay: styled.span`
    padding: 4px 7px;
    border-radius: 6px;
    background: #fff0ee;
    color: ${tokens.color.danger[500]};
    font-size: 8px;
    font-weight: 800;
  `,
  ContestTitle: styled.h3`
    margin: 8px 0 3px;
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  ContestOrganization: styled.p`
    margin: 0;
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
  `,
};
