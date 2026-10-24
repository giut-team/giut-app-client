import styled from "@emotion/styled";

const border = "#dfe3eb";
const navy = "#111827";
const blue = "#23459b";
const muted = navy;

export const S = {
  Page: styled.main`
    display: grid;
    grid-template-columns: 282px minmax(0, 1fr);
    min-height: 100svh;
    overflow: hidden;
    background: #f4f6f9;
    color: ${navy};

    @media (max-width: 960px) {
      grid-template-columns: 220px minmax(900px, 1fr);
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
  Nav: styled.nav`
    display: grid;
    gap: 3px;
    margin-top: 56px;
  `,
  NavItem: styled.button<{ $active?: boolean }>`
    width: 100%;
    padding: 13px 12px;
    border: 0;
    border-radius: 9px;
    background: ${({ $active }) => ($active ? "#eaf0ff" : "transparent")};
    color: ${({ $active }) => ($active ? blue : "#273248")};
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
    padding: 15px 6px 0;
    border-top: 1px solid #eaedf2;
  `,
  AccountName: styled.strong`
    color: ${navy};
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

    &:hover { background: #f7f8fa; }
  `,
  Main: styled.section`
    min-width: 0;
    padding: 35px 26px 48px 36px;
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 29px;
    font-weight: 850;
    letter-spacing: -0.8px;
  `,
  Description: styled.p`
    margin: 6px 0 0;
    color: ${muted};
    font-size: 16px;
  `,
  CreateButton: styled.button`
    display: flex;
    height: 50px;
    align-items: center;
    gap: 5px;
    padding: 0 20px;
    border: 0;
    border-radius: 9px;
    background: ${blue};
    color: #fff;
    font: inherit;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;

    &:hover { background: #1d3b89; }
  `,
  Table: styled.section`
    min-width: 900px;
    overflow: hidden;
    border: 1px solid ${border};
    border-radius: 16px;
    background: #fff;
  `,
  TableToolbar: styled.div`
    display: flex;
    min-height: 61px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #e7eaf0;

    strong {
      color: ${navy};
      font-size: 17px;
      font-weight: 800;
    }
  `,
  ToolbarControls: styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
  `,
  SearchBox: styled.label`
    display: flex;
    width: 220px;
    height: 38px;
    align-items: center;
    gap: 8px;
    padding: 0 11px;
    border: 1px solid #d5dbe5;
    border-radius: 8px;
    background: #fff;
    color: ${navy};

    &:focus-within {
      border-color: ${blue};
      box-shadow: 0 0 0 3px rgba(35, 69, 155, 0.1);
    }

    input {
      min-width: 0;
      flex: 1;
      border: 0;
      outline: 0;
      background: transparent;
      color: ${navy};
      font: inherit;
      font-size: 13px;

      &::placeholder { color: ${navy}; }
      &::-webkit-search-cancel-button { cursor: pointer; }
    }
  `,
  VerifiedToggle: styled.label`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${navy};
    font-size: 14px;
    font-weight: 650;
    cursor: pointer;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
      cursor: pointer;
    }
  `,
  ToggleBox: styled.span<{ $checked: boolean }>`
    display: grid;
    width: 23px;
    height: 23px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid ${({ $checked }) => ($checked ? blue : "#cbd3df")};
    border-radius: 6px;
    background: ${({ $checked }) => ($checked ? "#3261ca" : "#fff")};
    color: #fff;
  `,
  TableHeader: styled.div`
    display: grid;
    grid-template-columns: minmax(390px, 1fr) 202px 136px 178px;
    min-height: 44px;
    align-items: center;
    padding: 0 19px;
    border-bottom: 1px solid #e7eaf0;
    color: ${muted};
    font-size: 13px;

    span { text-align: center; }
  `,
  TableBody: styled.div`
    display: grid;
  `,
  TableState: styled.div`
    display: grid;
    min-height: 180px;
    place-items: center;
    color: ${navy};
    font-size: 14px;
  `,
  Row: styled.article`
    display: grid;
    grid-template-columns: minmax(390px, 1fr) 202px 136px 178px;
    min-height: 81px;
    align-items: center;
    padding: 0 19px;
    border-bottom: 1px solid #e7eaf0;

    &:last-child { border-bottom: 0; }
  `,
  ContestInfo: styled.div`
    display: grid;
    gap: 4px;
    justify-items: center;
    min-width: 0;
    padding: 0 20px;
    text-align: center;

    strong {
      overflow: hidden;
      font-size: 15px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      overflow: hidden;
      color: ${muted};
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
  Period: styled.div`
    display: grid;
    gap: 2px;
    justify-items: center;
    color: ${navy};
    font-size: 14px;
    text-align: center;
  `,
  Status: styled.div`
    display: grid;
    justify-items: center;
    gap: 4px;
  `,
  StatusBadge: styled.span<{
    $status: "DRAFT" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
  }>`
    padding: 4px 10px;
    border-radius: 999px;
    background: ${({ $status }) => ($status === "PUBLISHED" ? "#e4f6e9" : "#f0f2f5")};
    color: ${({ $status }) => ($status === "PUBLISHED" ? "#17894e" : navy)};
    font-size: 12px;
    font-weight: 750;
  `,
  Verified: styled.span`
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${muted};
    font-size: 12px;
  `,
  Actions: styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
  `,
  EditButton: styled.button<{ $wide?: boolean }>`
    width: ${({ $wide }) => ($wide ? "112px" : "auto")};
    height: 40px;
    padding: 0 16px;
    border: 1px solid #d5dbe5;
    border-radius: 8px;
    background: #fff;
    color: ${navy};
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;

    &:hover { background: #f7f8fa; }
  `,
  ApproveButton: styled.button`
    height: 40px;
    padding: 0 16px;
    border: 0;
    border-radius: 8px;
    background: #2d5ac4;
    color: #fff;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
    cursor: pointer;

    &:hover { background: #244da9; }

    &:disabled {
      cursor: wait;
      opacity: 0.6;
    }
  `,
  Editor: styled.div`
    padding: 28px 30px 30px;
    color: ${navy};
  `,
  EditorTitle: styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 850;
  `,
  EditorDescription: styled.p`
    margin: 7px 0 22px;
    color: ${navy};
    font-size: 14px;
  `,
  EditorForm: styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 14px;
  `,
  Field: styled.label<{ $wide?: boolean }>`
    display: grid;
    grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
    gap: 7px;
    color: ${navy};
    font-size: 13px;
    font-weight: 750;

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid #d5dbe5;
      border-radius: 9px;
      outline: none;
      background: #fff;
      color: ${navy};
      font: inherit;
      font-size: 14px;
      font-weight: 500;
    }

    input,
    select {
      height: 44px;
      padding: 0 12px;
    }

    textarea {
      min-height: 88px;
      padding: 12px;
      resize: vertical;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: ${blue};
      box-shadow: 0 0 0 3px rgba(35, 69, 155, 0.1);
    }
  `,
  EditorActions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 22px;
  `,
  EditorSubmit: styled.button`
    min-width: 88px;
    height: 46px;
    padding: 0 20px;
    border: 0;
    border-radius: 9px;
    background: ${blue};
    color: #fff;
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    &:disabled { cursor: wait; opacity: 0.6; }
  `,
  EditorCancel: styled.button`
    min-width: 88px;
    height: 46px;
    padding: 0 20px;
    border: 1px solid #d5dbe5;
    border-radius: 9px;
    background: #fff;
    color: ${navy};
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    &:disabled { cursor: wait; opacity: 0.6; }
  `,
};
