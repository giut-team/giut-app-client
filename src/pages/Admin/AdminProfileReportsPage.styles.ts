import styled from "@emotion/styled";

const border = "#dfe3eb";
const navy = "#111827";
const blue = "#23459b";
const muted = "#8792a5";

export const S = {
  Page: styled.main`
    display: grid;
    grid-template-columns: 284px minmax(0, 1fr);
    min-height: 100svh;
    overflow: hidden;
    background: #f4f6f9;
    color: ${navy};

    @media (max-width: 960px) {
      grid-template-columns: 220px minmax(720px, 1fr);
      overflow-x: auto;
    }
  `,
  Sidebar: styled.aside`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100svh;
    padding: 30px 17px 18px;
    border-right: 1px solid ${border};
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
  NavLabel: styled.p`
    margin: 35px 8px 10px;
    color: ${muted};
    font-size: 13px;
  `,
  Nav: styled.nav`
    display: grid;
    gap: 3px;
  `,
  NavItem: styled.button<{ $active?: boolean }>`
    width: 100%;
    padding: 13px 12px;
    border: 0;
    border-radius: 9px;
    background: ${({ $active }) => ($active ? "#eaf0ff" : "transparent")};
    color: ${({ $active }) => ($active ? blue : "#485368")};
    font: inherit;
    font-size: 16px;
    font-weight: ${({ $active }) => ($active ? 750 : 650)};
    text-align: left;
    cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  `,
  Account: styled.div`
    display: grid;
    gap: 2px;
    margin-top: auto;
    padding: 15px 8px 0;
    border-top: 1px solid #eaedf2;
  `,
  AccountName: styled.strong`
    font-size: 14px;
  `,
  AccountId: styled.span`
    color: ${muted};
    font-size: 13px;
  `,
  LogoutButton: styled.button`
    height: 40px;
    margin-top: 11px;
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
    padding: 38px 36px 42px;
  `,
  Header: styled.header`
    margin-bottom: 28px;
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 29px;
    font-weight: 850;
    letter-spacing: -0.8px;
  `,
  Description: styled.p`
    margin: 7px 0 0;
    color: #748095;
    font-size: 16px;
  `,
  Workspace: styled.div`
    display: grid;
    grid-template-columns: minmax(390px, 446px) minmax(520px, 1fr);
    gap: 20px;
    min-height: 542px;
    height: calc(100svh - 157px);
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
    grid-template-rows: 60px minmax(0, 1fr) 62px;
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
    padding: 0 20px;
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
    width: 238px;
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
    padding: 19px 20px 18px;
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
    color: #465166;
    font-size: 14px;
    word-spacing: 5px;
  `,
  ReportSubMeta: styled.span`
    color: ${muted};
    font-size: 14px;
  `,
  StatusBadge: styled.span<{ $status: "PENDING" | "ACTIONED" | "DISMISSED" }>`
    flex: 0 0 auto;
    padding: 4px 10px;
    border-radius: 999px;
    background: ${({ $status }) =>
      $status === "PENDING"
        ? "#fff1d8"
        : $status === "ACTIONED"
          ? "#ffe7e7"
          : "#eef0f4"};
    color: ${({ $status }) =>
      $status === "PENDING"
        ? "#b87700"
        : $status === "ACTIONED"
          ? "#dd4d4d"
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
    padding: 0 16px;
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
    width: 38px;
    height: 38px;
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
    overflow: auto;
    border: 1px solid ${border};
    border-radius: 16px;
    background: #fff;
  `,
  DetailHeader: styled.header`
    padding: 26px 30px 22px;
    border-bottom: 1px solid #e7eaf0;
  `,
  DetailEyebrow: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${muted};
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
  `,
  DetailTitle: styled.h2`
    margin: 10px 0 4px;
    font-size: 23px;
    font-weight: 850;
  `,
  DetailBody: styled.div`
    display: grid;
    gap: 25px;
    padding: 25px 30px 30px;
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
      color: ${muted};
      font-size: 13px;
    }
  `,
  ProfileCard: styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 20px;
    border-radius: 14px;
    background: #f4f6f9;
  `,
  Avatar: styled.div`
    display: grid;
    width: 90px;
    height: 90px;
    flex: 0 0 auto;
    overflow: hidden;
    place-items: center;
    border-radius: 15px;
    background: #e3e9f8;
    color: ${blue};
    font-size: 27px;
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
    grid-template-columns: 105px minmax(0, 1fr);
    gap: 10px 14px;
    margin: 2px 0 0;
    padding: 18px 0;
    border-top: 1px solid #e7eaf0;
    border-bottom: 1px solid #e7eaf0;
    font-size: 14px;

    dt {
      color: ${muted};
    }

    dd {
      margin: 0;
      color: ${navy};
    }
  `,
  ReviewResult: styled.section`
    display: grid;
    gap: 13px;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
    }
  `,
  ReviewActions: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  `,
  ReviewButton: styled.button<{ $primary?: boolean }>`
    height: 58px;
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
};
