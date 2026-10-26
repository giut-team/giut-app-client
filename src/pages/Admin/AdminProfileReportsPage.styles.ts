import styled from "@emotion/styled";

const border = "#dfe3eb";
const navy = "#111827";
const blue = "#23459b";
const muted = "#8792a5";

export const S = {
  Page: styled.main`
    display: grid;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    overflow-x: hidden;
    background: #f4f6f9;
    color: ${navy};
    grid-template-columns: minmax(0, 1fr);
  `,
  Sidebar: styled.aside`
    display: grid;
    width: 100%;
    padding: 20px 16px 16px;
    border-bottom: 1px solid ${border};
    background: #fff;
  `,
  Brand: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 0 6px;
    font-size: 18px;
    font-weight: 800;
  `,
  BrandMark: styled.span`
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 7px;
    background: ${blue};
    color: #fff;
    font-size: 17px;
    font-weight: 800;
  `,
  Nav: styled.nav`
    display: flex;
    gap: 8px;
    margin-top: 18px;
  `,
  NavItem: styled.button<{ $active?: boolean }>`
    flex: 1;
    padding: 11px 12px;
    border: 0;
    border-radius: 9px;
    background: ${({ $active }) => ($active ? "#eaf0ff" : "transparent")};
    color: ${({ $active }) => ($active ? blue : "#485368")};
    font: inherit;
    font-size: 16px;
    font-weight: ${({ $active }) => ($active ? 750 : 650)};
    text-align: center;
    cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  `,
  Account: styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2px;
    margin-top: 16px;
    padding: 14px 6px 0;
    border-top: 1px solid #eaedf2;
  `,
  AccountName: styled.strong`
    grid-column: 1;
    font-size: 14px;
  `,
  AccountId: styled.span`
    grid-column: 1;
    color: ${muted};
    font-size: 13px;
  `,
  LogoutButton: styled.button`
    width: 92px;
    height: 38px;
    grid-column: 2;
    grid-row: 1 / span 2;
    margin: 0;
    border: 1px solid #d4dae5;
    border-radius: 8px;
    background: #fff;
    color: #657084;
    font: inherit;
    cursor: pointer;

    &:hover {
      background: #f7f8fa;
    }
  `,
  Main: styled.section`
    min-width: 0;
    padding: 24px 14px 40px;
  `,
  Header: styled.header`
    margin-bottom: 20px;
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 26px;
    font-weight: 850;
    letter-spacing: -0.8px;
  `,
  Description: styled.p`
    margin: 7px 0 0;
    color: ${navy};
    font-size: 14px;
    line-height: 1.5;
  `,
  Workspace: styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    min-height: 0;
  `,
  Panel: styled.section`
    min-width: 0;
    overflow: hidden;
    border: 1px solid ${border};
    border-radius: 16px;
    background: #fff;
  `,
  ListPanel: styled.section`
    position: relative;
    display: grid;
    min-width: 0;
    height: 560px;
    grid-template-rows: 56px minmax(0, 1fr) 56px;
    overflow: visible;
    border: 1px solid ${border};
    border-radius: 16px;
    background: #fff;
  `,
  ListHeader: styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid ${border};
  `,
  SectionTitle: styled.h2`
    margin: 0;
    font-size: 17px;
    font-weight: 800;
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
    font-size: 14px;
    font-weight: 750;
    cursor: pointer;
  `,
  FilterMenu: styled.div`
    position: absolute;
    z-index: 10;
    top: calc(100% + 9px);
    right: -9px;
    display: grid;
    width: min(238px, calc(100vw - 48px));
    padding: 10px;
    border: 1px solid ${border};
    border-radius: 18px;
    background: #fff;
    box-shadow: 0 12px 30px rgba(25, 37, 61, 0.14);
  `,
  FilterOption: styled.button<{ $selected: boolean }>`
    display: flex;
    min-height: 55px;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;
    border: 0;
    border-radius: 12px;
    background: ${({ $selected }) => ($selected ? "#f0f2f6" : "transparent")};
    color: ${navy};
    font: inherit;
    font-size: 17px;
    font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
    text-align: left;
    cursor: pointer;

    &:hover {
      background: #f5f6f8;
    }
  `,
  ReportList: styled.div`
    overflow-y: auto;
    scrollbar-color: #929292 transparent;
    scrollbar-width: thin;
  `,
  ReportItem: styled.button<{ $selected: boolean }>`
    position: relative;
    display: grid;
    width: 100%;
    gap: 7px;
    padding: 17px 16px 16px;
    border: 0;
    border-bottom: 1px solid #eaedf2;
    background: ${({ $selected }) => ($selected ? "#f1f3f7" : "#fff")};
    color: ${navy};
    font: inherit;
    text-align: left;
    cursor: pointer;

    &::before {
      position: absolute;
      inset: 0 auto 0 0;
      width: 4px;
      background: ${({ $selected }) => ($selected ? blue : "transparent")};
      content: "";
    }

    &:hover {
      background: #f7f8fa;
    }
  `,
  ReportTop: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    strong {
      overflow: hidden;
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  ReportMeta: styled.span`
    display: flex;
    flex-wrap: wrap;
    gap: 5px 14px;
    color: ${navy};
    font-size: 14px;

    strong {
      color: ${navy};
      font-weight: 700;
    }
  `,
  ReportSubMeta: styled.span`
    display: flex;
    flex-wrap: wrap;
    gap: 5px 14px;
    color: ${navy};
    font-size: 14px;

    strong {
      color: ${navy};
      font-weight: 600;
    }
  `,
  StatusBadge: styled.span<{ $status: "PENDING" | "ACTIONED" | "DISMISSED" }>`
    flex: 0 0 auto;
    padding: 4px 10px;
    border-radius: 999px;
    background: ${({ $status }) =>
      $status === "PENDING"
        ? "#fff1d8"
        : $status === "ACTIONED"
          ? "#e3f5ec"
          : "#eef0f4"};
    color: ${({ $status }) =>
      $status === "PENDING"
        ? "#b87700"
        : $status === "ACTIONED"
          ? "#16845b"
          : "#687386"};
    font-size: 12px;
    font-weight: 750;
  `,
  Loading: styled.div`
    display: grid;
    min-height: 180px;
    padding: 24px;
    place-items: center;
    color: ${muted};
    font-size: 14px;
    text-align: center;
  `,
  Pagination: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-top: 1px solid ${border};
    color: ${muted};
    font-size: 14px;
  `,
  PageButtons: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  PageButton: styled.button<{ $active?: boolean }>`
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border: ${({ $active }) => ($active ? "0" : "1px solid #dfe3eb")};
    border-radius: 8px;
    background: ${({ $active }) => ($active ? blue : "#fff")};
    color: ${({ $active }) => ($active ? "#fff" : "#536077")};
    font: inherit;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
      cursor: default;
      opacity: 0.4;
    }
  `,
  DetailPanel: styled.section`
    display: flex;
    min-width: 0;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid ${border};
    border-radius: 16px;
    background: #fff;
  `,
  DetailHeader: styled.header`
    padding: 22px 20px 18px;
    border-bottom: 1px solid #e7eaf0;
  `,
  DetailEyebrow: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${navy};
    font-size: 13px;
    font-weight: 700;
  `,
  DetailTitle: styled.h2`
    margin: 10px 0 4px;
    font-size: 23px;
    font-weight: 850;
  `,
  ReasonCode: styled.p`
    margin: 0;
    color: #596579;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1px;
  `,
  DetailBody: styled.div`
    display: grid;
    gap: 22px;
    padding: 22px 20px 24px;
  `,
  Subsection: styled.section`
    display: grid;
    gap: 12px;
  `,
  SubsectionHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
    }

    span {
      color: ${navy};
      font-size: 13px;
      font-weight: 700;
    }
  `,
  ProfileCard: styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    border-radius: 14px;
    background: #f4f6f9;
  `,
  Avatar: styled.div`
    display: grid;
    width: 70px;
    height: 70px;
    flex: 0 0 auto;
    overflow: hidden;
    place-items: center;
    border-radius: 15px;
    background: #e3e9f8;
    color: ${blue};
    font-size: 23px;
    font-weight: 800;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  ProfileInfo: styled.div`
    min-width: 0;

    strong {
      display: block;
      margin-bottom: 6px;
      font-size: 18px;
    }

    p {
      margin: 9px 0 0;
      overflow-wrap: anywhere;
      color: #334057;
      font-size: 14px;
      line-height: 1.55;
    }
  `,
  UserId: styled.span`
    display: block;
    color: ${navy};
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.1px;
  `,
  ReportDescription: styled.p`
    margin: 0;
    color: #273248;
    font-size: 15px;
    line-height: 1.8;
    white-space: pre-wrap;
  `,
  Facts: styled.dl`
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 10px 14px;
    margin: 2px 0 0;
    padding: 18px 0;
    border-top: 1px solid #e7eaf0;
    border-bottom: 1px solid #e7eaf0;
    font-size: 14px;

    dt {
      color: ${navy};
      font-weight: 700;
    }

    dd {
      margin: 0;
      color: ${navy};
    }
  `,
  ReviewResult: styled.section`
    display: grid;
    gap: 13px;
  `,
  ReviewActions: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  `,
  ReviewButton: styled.button<{ $primary?: boolean }>`
    height: 50px;
    border: ${({ $primary }) => ($primary ? "0" : "1px solid #d5dbe5")};
    border-radius: 11px;
    background: ${({ $primary }) => ($primary ? blue : "#fff")};
    color: ${({ $primary }) => ($primary ? "#fff" : navy)};
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  `,
  ReviewNote: styled.p`
    margin: 0;
    padding: 13px 15px;
    border-radius: 9px;
    background: #f4f6f9;
    color: #5d687b;
    font-size: 14px;
  `,
  ApprovalModal: styled.div`
    padding: 28px 30px 30px;
    color: ${navy};
  `,
  ApprovalTitle: styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 850;
    letter-spacing: -0.5px;
  `,
  ApprovalDescription: styled.p`
    margin: 7px 0 23px;
    color: ${navy};
    font-size: 14px;
    line-height: 1.55;
  `,
  ApprovalSummary: styled.dl`
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 10px 12px;
    margin: 0 0 19px;
    padding: 17px 20px;
    border-radius: 13px;
    background: #f4f6f9;
    font-size: 14px;

    dt {
      color: ${navy};
    }

    dd {
      margin: 0;
      color: ${navy};
    }

    span {
      color: ${navy};
    }
  `,
  MemoLabel: styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 800;
  `,
  MemoTextarea: styled.textarea`
    width: 100%;
    min-height: 120px;
    padding: 15px;
    resize: vertical;
    border: 1px solid #d5dbe5;
    border-radius: 12px;
    outline: none;
    color: ${navy};
    font: inherit;
    font-size: 14px;
    line-height: 1.55;

    &::placeholder {
      color: #8792a5;
    }

    &:focus {
      border-color: ${blue};
      box-shadow: 0 0 0 3px rgba(35, 69, 155, 0.1);
    }
  `,
  ApprovalActions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  `,
  ModalButton: styled.button<{ $primary?: boolean }>`
    min-width: 76px;
    height: 54px;
    padding: 0 20px;
    border: ${({ $primary }) => ($primary ? "0" : "1px solid #d5dbe5")};
    border-radius: 11px;
    background: ${({ $primary }) => ($primary ? blue : "#fff")};
    color: ${({ $primary }) => ($primary ? "#fff" : navy)};
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;

    &:disabled {
      cursor: wait;
      opacity: 0.6;
    }
  `,
};
