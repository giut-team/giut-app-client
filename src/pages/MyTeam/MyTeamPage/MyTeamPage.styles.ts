import styled from "@emotion/styled";
import { Button } from "../../../components/Button";
import { tokens } from "../../../design-system/tokens.generated";

type TeamTone = "primary" | "success" | "pending";
type TimelineState = "complete" | "pending";
type ApplicantTone = "blue" | "purple" | "success";

const colorMix = (color: string, amount: number) =>
  `color-mix(in srgb, ${color} ${amount}%, ${tokens.color.neutral[50]})`;

const applicantColors: Record<
  ApplicantTone,
  { background: string; color: string }
> = {
  blue: {
    background: tokens.color.primary[100],
    color: tokens.color.primary[500],
  },
  purple: {
    background: tokens.color.purple[100],
    color: tokens.color.purple[500],
  },
  success: {
    background: colorMix(tokens.color.success[500], 12),
    color: tokens.color.success[500],
  },
};

export const S = {
  Page: styled.main`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    background: ${tokens.color.neutral[50]};
  `,
  TopArea: styled.section`
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 18px 13px 12px;
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
    background: ${tokens.color.neutral[50]};
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
    margin: 22px 0 0;
    color: ${tokens.color.neutral[500]};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: -0.1px;
  `,
  Title: styled.h1`
    margin: 7px 0 0;
    color: ${tokens.color.neutral[900]};
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.8px;
    line-height: 1.35;
  `,
  TeamSection: styled.section`
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 12px 0 20px;
    background: ${tokens.color.neutral[50]};
  `,
  SectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 11px;
  `,
  SectionTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.4px;
  `,
  ViewAll: styled.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    font: inherit;
    font-size: 10px;
    font-weight: 500;
    cursor: pointer;
  `,
  TeamScroller: styled.div`
    display: flex;
    gap: 9px;
    overflow-x: auto;
    padding: 0 14px 2px;
    scroll-padding-inline: 28px;
    scroll-snap-type: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TeamScrollTrack: styled.div`
    position: relative;
    width: calc(100% - 28px);
    height: 22px;
    margin: 11px 14px 0;
  `,
  TeamScrollRail: styled.span`
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 5px;
    transform: translateY(-50%);
    border-radius: 999px;
    background: ${tokens.color.neutral[200]};
  `,
  TeamScrollThumb: styled.span<{ $progress: number }>`
    position: absolute;
    top: 50%;
    left: ${({ $progress }) => $progress}%;
    width: 144px;
    height: 28px;
    transform: translate(-${({ $progress }) => $progress}%, -50%);
    border-radius: 999px;
    background: transparent;
    cursor: grab;
    touch-action: none;

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      height: 9px;
      transform: translateY(-50%);
      border-radius: inherit;
      background: ${tokens.color.neutral[700]};
      content: "";
    }

    &:active {
      cursor: grabbing;
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  TeamCard: styled.article<{ $selected: boolean; $pending: boolean }>`
    position: relative;
    flex: 0 0 204px;
    min-height: 128px;
    border: 1px solid
      ${({ $pending, $selected }) =>
        $pending
          ? colorMix(tokens.color.warning[500], 45)
          : $selected
          ? tokens.color.primary[500]
          : tokens.color.neutral[200]};
    border-style: ${({ $pending }) => ($pending ? "dashed" : "solid")};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
    scroll-snap-align: start;
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;

    ${({ $pending, $selected }) =>
      $selected &&
      !$pending &&
      `
        box-shadow: 0 0 0 2px color-mix(in srgb, ${tokens.color.primary[500]} 12%, transparent);
      `}

  `,
  TeamSelectButton: styled.button`
    display: block;
    width: 100%;
    min-height: 126px;
    padding: 14px 40px 12px 12px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  ContestShortcut: styled.button`
    position: absolute;
    top: 10px;
    right: 9px;
    display: inline-flex;
    width: 26px;
    height: 26px;
    padding: 0;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: ${tokens.color.primary[500]};
    cursor: pointer;

    &:hover {
      background: ${tokens.color.primary[100]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  ContestShortcutIcon: styled.img`
    width: 16px;
    height: 16px;
  `,
  TeamBadges: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  TeamStatus: styled.span<{ $tone: TeamTone }>`
    padding: 4px 6px;
    border-radius: 6px;
    background: ${({ $tone }) =>
      $tone === "success"
        ? colorMix(tokens.color.success[500], 12)
        : $tone === "pending"
          ? tokens.color.warning[100]
        : tokens.color.primary[100]};
    color: ${({ $tone }) =>
      $tone === "success"
        ? tokens.color.success[500]
        : $tone === "pending"
          ? tokens.color.warning[500]
        : tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
  `,
  NewApplications: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.danger[500]};
    color: ${tokens.color.neutral[50]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  ElapsedBadge: styled.span`
    padding: 4px 6px;
    border-radius: 6px;
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
  `,
  TeamTitle: styled.h3`
    margin: 11px 0 5px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.35px;
  `,
  TeamDescription: styled.p`
    margin: 0;
    overflow: hidden;
    color: #000;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: -0.15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  ProgressTrack: styled.div`
    height: 5px;
    margin-top: 14px;
    overflow: hidden;
    border-radius: 999px;
    background: ${tokens.color.neutral[100]};
  `,
  ProgressBar: styled.span<{ $progress: number; $tone: TeamTone }>`
    display: block;
    width: ${({ $progress }) => `${$progress}%`};
    height: 100%;
    border-radius: inherit;
    background: ${({ $tone }) =>
      $tone === "success"
        ? tokens.color.success[500]
        : tokens.color.primary[500]};
  `,
  PendingMessage: styled.p`
    margin: 13px 0 0;
    color: ${tokens.color.warning[500]};
    font-size: 9px;
    font-weight: 600;
  `,
  ApplicationSection: styled.section`
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 13px 16px 88px;
    background: ${tokens.color.neutral[50]};
  `,
  MemberApplicationSection: styled.section<{ $pending: boolean }>`
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 13px 16px 88px;
    background: ${tokens.color.neutral[50]};
  `,
  MemberSectionTitle: styled.h2`
    margin: 0 0 10px;
    color: ${tokens.color.neutral[900]};
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.25px;
  `,
  MemberSectionSubtitle: styled.p`
    margin: 5px 0 11px;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
    line-height: 1.4;
  `,
  MemberTimeline: styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 9px;
    padding: 10px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
  `,
  MemberTimelineStep: styled.span<{ $state: TimelineState }>`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 4px;
    color: ${({ $state }) =>
      $state === "pending" ? tokens.color.warning[500] : tokens.color.primary[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
  `,
  MemberTimelineDot: styled.span`
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  `,
  MemberTimelineLine: styled.span`
    flex: 1;
    height: 1px;
    margin: 0 7px;
    background: ${tokens.color.neutral[200]};
  `,
  MemberApplicationCard: styled.article`
    padding: 4px 12px 11px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  MemberApplicationHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  MemberStatus: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${colorMix(tokens.color.success[500], 12)};
    color: ${tokens.color.success[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  PendingStatus: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.warning[100]};
    color: ${tokens.color.warning[500]};
    font-size: 8px;
    font-weight: 800;
    line-height: 1;
  `,
  MemberRole: styled.span`
    padding: 4px 6px;
    border-radius: 5px;
    background: ${tokens.color.purple[100]};
    color: ${tokens.color.purple[500]};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
  `,
  MemberReceivedAt: styled.time`
    margin-left: auto;
    color: ${tokens.color.neutral[500]};
    font-size: 8px;
  `,
  MemberProfile: styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 10px;
  `,
  MemberAvatar: styled.span`
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 12px;
    font-weight: 800;
  `,
  MemberIdentity: styled.div`
    display: grid;
    gap: 3px;
  `,
  MemberNameRow: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  MemberName: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 10px;
    font-weight: 800;
  `,
  MemberSchool: styled.span`
    color: #000;
    font-size: 9px;
    font-weight: 500;
  `,
  MemberQuestion: styled.section`
    margin-top: 11px;
  `,
  MemberQuestionTitle: styled.h3`
    margin: 0;
    color: ${tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  MemberAnswer: styled.p`
    margin: 4px 0 0;
    color: ${tokens.color.neutral[700]};
    font-size: 9px;
    line-height: 1.55;
  `,
  MemberOriginalLink: styled.button`
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px 0 0;
    border-top: 1px solid ${tokens.color.neutral[200]};
    background: transparent;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    color: ${tokens.color.primary[500]};
    font: inherit;
    font-size: 8px;
    font-weight: 700;
    cursor: pointer;
  `,
  MemberChatButton: styled(Button)`
    height: 36px;
    margin-top: 9px;
    border-radius: 10px;
    gap: 5px;
    font-size: 10px;
  `,
  MemberCancelButton: styled.button`
    width: 100%;
    height: 36px;
    margin-top: 9px;
    padding: 0;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 10px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[700]};
    font: inherit;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: ${tokens.color.neutral[100]};
    }
  `,
  ApplicationHeader: styled.div`
    padding: 0 1px 10px;
  `,
  ApplicationTitle: styled.h2`
    margin: 0;
    color: ${tokens.color.neutral[900]};
    font-size: 14px;
    font-weight: 800;
    letter-spacing: -0.4px;
  `,
  ApplicantList: styled.div`
    display: grid;
    gap: 8px;
  `,
  EmptyApplications: styled.p`
    margin: 0;
    padding: 24px 16px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
    color: ${tokens.color.neutral[500]};
    font-size: 11px;
    text-align: center;
  `,
  ApplicantCard: styled.article`
    position: relative;
    padding: 14px 13px 12px;
    border: 1px solid ${tokens.color.neutral[200]};
    border-radius: 14px;
    background: ${tokens.color.neutral[50]};
  `,
  ApplicantHeader: styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    color: ${tokens.color.neutral[500]};
  `,
  Avatar: styled.span<{ $tone: ApplicantTone }>`
    display: grid;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $tone }) => applicantColors[$tone].background};
    color: ${({ $tone }) => applicantColors[$tone].color};
    font-size: 12px;
    font-weight: 800;
  `,
  ApplicantIdentity: styled.div`
    display: flex;
    min-width: 0;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 6px;
    row-gap: 3px;
  `,
  ApplicantName: styled.strong`
    color: ${tokens.color.neutral[900]};
    font-size: 11px;
    font-weight: 800;
  `,
  ApplicantRole: styled.span<{ $tone: ApplicantTone }>`
    padding: 3px 5px;
    border-radius: 5px;
    background: ${({ $tone }) => applicantColors[$tone].background};
    color: ${({ $tone }) => applicantColors[$tone].color};
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
  `,
  ApplicantSchool: styled.span`
    flex-basis: 100%;
    color: #000;
    font-size: 9px;
    font-weight: 500;
  `,
  ApplicantIntroductionLabel: styled.strong`
    display: block;
    margin-top: 12px;
    color: ${tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  ApplicantMessage: styled.p`
    margin: 4px 0 7px;
    color: ${tokens.color.neutral[700]};
    font-size: 10px;
    font-weight: 500;
    line-height: 1.5;
  `,
  ReasonLabel: styled.strong`
    display: block;
    color: ${tokens.color.primary[500]};
    font-size: 9px;
    font-weight: 800;
  `,
  ApplicantAnswer: styled.p`
    display: -webkit-box;
    margin: 4px 0 0;
    overflow: hidden;
    color: #000;
    font-size: 9px;
    line-height: 1.55;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,
  ApplicantActions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 8px;
  `,
  RejectButton: styled(Button)`
    width: 42px;
    height: 28px;
    padding: 0;
    border-radius: 8px;
    font-size: 10px;
  `,
  AcceptButton: styled(Button)`
    width: 42px;
    height: 28px;
    padding: 0;
    border-radius: 8px;
    font-size: 10px;
  `,
  DetailButton: styled.button`
    position: absolute;
    top: 50%;
    right: 8px;
    display: grid;
    width: 28px;
    height: 28px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: ${tokens.color.neutral[500]};
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      background: ${tokens.color.neutral[100]};
    }

    &:focus-visible {
      outline: 2px solid ${tokens.color.primary[500]};
      outline-offset: 2px;
    }
  `,
  ManageButton: styled(Button)`
    height: 38px;
    margin-top: 12px;
    border-radius: 11px;
    background: ${tokens.color.primary[100]};
    color: ${tokens.color.primary[500]};
    font-size: 11px;

    &:hover:not(:disabled) {
      background: ${tokens.color.primary[100]};
      opacity: 0.85;
    }
  `,
};
