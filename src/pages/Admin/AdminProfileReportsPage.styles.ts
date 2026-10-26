import styled from "@emotion/styled";

const navy = "#101828";
const blue = "#23459b";
const border = "#e7eaf0";
const muted = "#667085";

const shell = `
  width: min(100%, 480px);
  min-height: 100svh;
  margin: 0 auto;
  color: ${navy};
  background: #f4f6fa;
`;

export const S = {
  Page: styled.main`
    ${shell}
    display: flex;
    flex-direction: column;
    padding: 54px 26px 76px;
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 25px;
    font-weight: 850;
    letter-spacing: -0.8px;
  `,
  LogoutButton: styled.button`
    padding: 8px 0 8px 12px;
    border: 0;
    background: transparent;
    color: ${muted};
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  `,
  ListPanel: styled.section`
    position: relative;
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    overflow: visible;
    border-radius: 16px;
    background: #fff;
  `,
  ListHeader: styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    border-bottom: 1px solid ${border};
  `,
  SectionTitle: styled.h2`
    margin: 0;
    font-size: 15px;
    font-weight: 850;
  `,
  FilterWrap: styled.div`
    position: relative;
  `,
  FilterButton: styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 0 8px 8px;
    border: 0;
    background: transparent;
    color: ${navy};
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;
  `,
  FilterMenu: styled.div`
    position: absolute;
    z-index: 10;
    top: calc(100% + 10px);
    right: -10px;
    display: grid;
    width: min(220px, calc(100vw - 52px));
    padding: 9px;
    border: 1px solid ${border};
    border-radius: 17px;
    background: #fff;
    box-shadow: 0 14px 36px rgba(16, 24, 40, 0.16);
  `,
  FilterOption: styled.button<{ $selected: boolean }>`
    display: flex;
    min-height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border: 0;
    border-radius: 11px;
    background: ${({ $selected }) => ($selected ? "#f0f2f6" : "transparent")};
    color: ${navy};
    font: inherit;
    font-size: 16px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
    cursor: pointer;
  `,
  ReportList: styled.div`
    min-height: 0;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
  `,
  ReportItem: styled.button`
    display: grid;
    width: 100%;
    gap: 7px;
    padding: 17px 18px 16px;
    border: 0;
    border-bottom: 1px solid ${border};
    background: #fff;
    color: ${navy};
    font: inherit;
    text-align: left;
    cursor: pointer;

    &:hover { background: #f8f9fb; }
  `,
  ReportTop: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    strong {
      overflow: hidden;
      font-size: 14px;
      font-weight: 850;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  ReportMeta: styled.span`
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    color: ${muted};
    font-size: 12px;
    font-weight: 500;
    line-height: 1.35;

    strong { color: ${navy}; font-weight: inherit; }
  `,
  StatusBadge: styled.span<{ $status: "PENDING" | "ACTIONED" | "DISMISSED" }>`
    flex: 0 0 auto;
    padding: 4px 9px;
    border-radius: 999px;
    background: ${({ $status }) => $status === "PENDING" ? "#fff3dd" : $status === "ACTIONED" ? "#e2f6eb" : "#f0f2f5"};
    color: ${({ $status }) => $status === "PENDING" ? "#b36b00" : $status === "ACTIONED" ? "#11804f" : "#596579"};
    font-size: 11px;
    font-weight: 800;
  `,
  Loading: styled.div`
    display: grid;
    min-height: 240px;
    flex: 1;
    padding: 24px;
    place-items: center;
    color: ${muted};
    font-size: 13px;
    text-align: center;
  `,
  Pagination: styled.nav`
    display: flex;
    min-height: 62px;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 10px;
  `,
  PageButton: styled.button<{ $active?: boolean }>`
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: ${({ $active }) => ($active ? "0" : "1px solid #e0e5ed")};
    border-radius: 9px;
    background: ${({ $active }) => ($active ? blue : "#fff")};
    color: ${({ $active }) => ($active ? "#fff" : "#344054")};
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;

    &:disabled { cursor: default; opacity: 0.35; }
  `,
  BottomNav: styled.nav`
    position: fixed;
    z-index: 5;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    width: min(100%, 480px);
    height: 62px;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid ${border};
    background: #fff;
  `,
  BottomNavItem: styled.button<{ $active?: boolean }>`
    border: 0;
    background: transparent;
    color: ${({ $active }) => ($active ? blue : "#98a2b3")};
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  `,

  DetailPage: styled.main`
    ${shell}
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-bottom: 82px;
  `,
  DetailTopbar: styled.header`
    display: flex;
    min-height: 58px;
    align-items: center;
    padding: 10px 22px;
    border-bottom: 1px solid ${border};
  `,
  BackButton: styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 8px 8px 0;
    border: 0;
    background: transparent;
    color: #2d5ac4;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  `,
  DetailContent: styled.div`
    display: grid;
    gap: 24px;
    padding: 18px 22px 28px;
  `,
  DetailIntro: styled.header`
    display: grid;
    justify-items: start;
    gap: 7px;
  `,
  DetailTitle: styled.h1`
    margin: 0;
    font-size: 20px;
    font-weight: 850;
    letter-spacing: -0.4px;
  `,
  ReceivedAt: styled.p`
    margin: 0;
    color: ${navy};
    font-size: 11px;
  `,
  Subsection: styled.section`
    display: grid;
    gap: 10px;
  `,
  SubsectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    h2 { margin: 0; font-size: 14px; font-weight: 850; }
    span { color: ${navy}; font-size: 11px; }
  `,
  ProfileCard: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 14px;
    border-radius: 14px;
    background: #f4f6fa;
  `,
  Avatar: styled.div`
    display: grid;
    width: 58px;
    height: 58px;
    flex: 0 0 auto;
    overflow: hidden;
    place-items: center;
    border-radius: 12px;
    background: #e4eafb;
    color: ${blue};
    font-size: 20px;
    font-weight: 850;

    img { width: 100%; height: 100%; object-fit: cover; }
  `,
  ProfileInfo: styled.div`
    min-width: 0;

    strong { display: block; margin-bottom: 3px; font-size: 14px; font-weight: 850; }
    p { margin: 7px 0 0; color: ${navy}; font-size: 11px; line-height: 1.45; overflow-wrap: anywhere; }
  `,
  UserId: styled.span`
    display: block;
    color: ${navy};
    font-size: 11px;
    font-weight: 650;
  `,
  ReportDescription: styled.p`
    margin: 0;
    color: ${navy};
    font-size: 12px;
    line-height: 1.75;
    white-space: pre-wrap;
  `,
  Facts: styled.dl`
    display: grid;
    grid-template-columns: 70px minmax(0, 1fr);
    gap: 10px 8px;
    margin: 0;
    padding-top: 17px;
    border-top: 1px solid ${border};
    font-size: 12px;

    dt { color: ${navy}; }
    dd { margin: 0; color: ${navy}; }
  `,
  ReviewNote: styled.p`
    margin: 0;
    padding: 13px 15px;
    border-radius: 10px;
    background: #f4f6fa;
    color: ${navy};
    font-size: 12px;
  `,
  BottomActions: styled.div`
    position: fixed;
    z-index: 5;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    width: min(100%, 480px);
    margin: 0 auto;
    padding: 10px 22px 18px;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    border-top: 1px solid ${border};
    background: #fff;
  `,
  ActionButton: styled.button<{ $primary?: boolean }>`
    height: 48px;
    border: ${({ $primary }) => ($primary ? "0" : "1px solid #d7dde7")};
    border-radius: 10px;
    background: ${({ $primary }) => ($primary ? blue : "#fff")};
    color: ${({ $primary }) => ($primary ? "#fff" : navy)};
    font: inherit;
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  `,

  ApprovalModal: styled.div`
    padding: 26px 22px 24px;
    color: ${navy};
  `,
  ApprovalTitle: styled.h2`
    margin: 0;
    font-size: 21px;
    font-weight: 850;
  `,
  ApprovalDescription: styled.p`
    margin: 7px 0 20px;
    color: ${navy};
    font-size: 13px;
    line-height: 1.55;
  `,
  ApprovalSummary: styled.dl`
    display: grid;
    grid-template-columns: 74px minmax(0, 1fr);
    gap: 10px;
    margin: 0 0 18px;
    padding: 16px;
    border-radius: 13px;
    background: #f4f6fa;
    font-size: 13px;

    dt { color: ${navy}; }
    dd { margin: 0; color: ${navy}; }
    span { color: ${navy}; }
  `,
  MemoLabel: styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 800;
  `,
  MemoTextarea: styled.textarea`
    width: 100%;
    min-height: 110px;
    padding: 14px;
    resize: vertical;
    border: 1px solid #d5dbe5;
    border-radius: 11px;
    outline: none;
    color: ${navy};
    font: inherit;
    font-size: 13px;
    line-height: 1.5;

    &:focus { border-color: ${blue}; box-shadow: 0 0 0 3px rgba(35, 69, 155, 0.1); }
  `,
  ApprovalActions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 18px;
  `,
  ModalButton: styled.button<{ $primary?: boolean }>`
    min-width: 78px;
    height: 46px;
    padding: 0 18px;
    border: ${({ $primary }) => ($primary ? "0" : "1px solid #d5dbe5")};
    border-radius: 10px;
    background: ${({ $primary }) => ($primary ? blue : "#fff")};
    color: ${({ $primary }) => ($primary ? "#fff" : navy)};
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    &:disabled { cursor: wait; opacity: 0.6; }
  `,
};
