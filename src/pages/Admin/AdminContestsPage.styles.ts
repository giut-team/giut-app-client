import styled from "@emotion/styled";

const border = "#e4e8ef";
const navy = "#111827";
const blue = "#23459b";

export const S = {
  Page: styled.main`
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    padding-bottom: 70px;
    overflow-x: hidden;
    background: #f4f6f9;
    color: ${navy};
  `,
  Main: styled.section`
    min-width: 0;
    padding: 54px 26px 36px;
  `,
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 23px;
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 25px;
    font-weight: 850;
    letter-spacing: -0.8px;
  `,
  HeaderActions: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  CreateButton: styled.button`
    display: flex;
    height: 34px;
    align-items: center;
    gap: 3px;
    padding: 0 12px;
    border: 0;
    border-radius: 999px;
    background: ${blue};
    color: #fff;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;

    &:hover { background: #1d3b89; }
  `,
  LogoutButton: styled.button`
    padding: 8px 0;
    border: 0;
    background: transparent;
    color: #667085;
    font: inherit;
    font-size: 12px;
    cursor: pointer;
  `,
  SearchBox: styled.label`
    display: flex;
    width: 100%;
    height: 58px;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    padding: 0 16px;
    border: 1px solid #d8dee8;
    border-radius: 14px;
    background: #fff;
    color: #98a2b3;

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
      font-size: 15px;

      &::placeholder { color: #667085; }
      &::-webkit-search-cancel-button { cursor: pointer; }
    }
  `,
  ListToolbar: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    padding: 0 4px;

    > span { color: #667085; font-size: 12px; }
  `,
  VerifiedToggle: styled.label`
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    color: ${navy};
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
    }
  `,
  ToggleBox: styled.span<{ $checked: boolean }>`
    display: grid;
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid ${({ $checked }) => ($checked ? blue : "#cbd3df")};
    border-radius: 5px;
    background: ${({ $checked }) => ($checked ? "#3261ca" : "#fff")};
    color: #fff;
  `,
  Table: styled.section`
    min-width: 0;
  `,
  TableBody: styled.div`
    display: grid;
    gap: 12px;
  `,
  TableState: styled.div`
    display: grid;
    min-height: 220px;
    place-items: center;
    color: ${navy};
    font-size: 13px;
  `,
  Row: styled.article`
    display: grid;
    gap: 6px;
    padding: 14px;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.02);
  `,
  Status: styled.div`
    display: flex;
    min-height: 22px;
    align-items: center;
    gap: 7px;
  `,
  StatusBadge: styled.span<{
    $status: "DRAFT" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
  }>`
    padding: 4px 9px;
    border-radius: 999px;
    background: ${({ $status }) => ($status === "PUBLISHED" ? "#e4f6e9" : "#f0f2f5")};
    color: ${({ $status }) => ($status === "PUBLISHED" ? "#17894e" : "#596579")};
    font-size: 10px;
    font-weight: 750;
  `,
  Verified: styled.span`
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${navy};
    font-size: 10px;
  `,
  ContestInfo: styled.div`
    display: grid;
    gap: 3px;
    min-width: 0;

    strong {
      font-size: 14px;
      font-weight: 850;
      overflow-wrap: anywhere;
    }

    span {
      color: ${navy};
      font-size: 11px;
      line-height: 1.4;
      overflow-wrap: anywhere;
    }
  `,
  Period: styled.div`
    color: ${navy};
    font-size: 11px;
    line-height: 1.4;
  `,
  Actions: styled.div`
    display: flex;
    gap: 7px;
    margin-top: 2px;
  `,
  ApproveButton: styled.button`
    height: 36px;
    min-width: 0;
    flex: 2.15;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: #2d5ac4;
    color: #fff;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
    cursor: pointer;

    &:hover { background: #244da9; }
    &:disabled { cursor: wait; opacity: 0.6; }
  `,
  EditButton: styled.button<{ $wide?: boolean }>`
    height: 36px;
    min-width: 0;
    flex: 1;
    padding: 0 10px;
    border: 1px solid #d5dbe5;
    border-radius: 8px;
    background: #fff;
    color: ${navy};
    font: inherit;
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;

    &:hover { background: #f7f8fa; }
  `,
  DeleteButton: styled.button`
    height: 36px;
    min-width: 0;
    flex: 1;
    padding: 0 10px;
    border: 1px solid #fecaca;
    border-radius: 8px;
    background: #fff;
    color: #dc2626;
    font: inherit;
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;

    &:hover:not(:disabled) { background: #fef2f2; }
    &:disabled { cursor: wait; opacity: 0.6; }
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

  Editor: styled.div`
    padding: 24px 20px;
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
    grid-template-columns: minmax(0, 1fr);
    gap: 16px 14px;
  `,
  Field: styled.label<{ $wide?: boolean }>`
    display: grid;
    grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
    gap: 7px;
    color: ${navy};
    font-size: 13px;
    font-weight: 750;

    input, select, textarea {
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

    input, select { height: 44px; padding: 0 12px; }
    textarea { min-height: 88px; padding: 12px; resize: vertical; }

    input:focus, select:focus, textarea:focus {
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
  EditorDelete: styled.button`
    min-width: 88px;
    height: 46px;
    margin-right: auto;
    padding: 0 20px;
    border: 1px solid #dc2626;
    border-radius: 9px;
    background: #fff;
    color: #dc2626;
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    &:hover:not(:disabled) { background: #fef2f2; }
    &:disabled { cursor: wait; opacity: 0.6; }
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
  DeleteDialog: styled.div`
    padding: 26px 22px;
    color: ${navy};
  `,
  DeleteConfirm: styled.button`
    min-width: 88px;
    height: 46px;
    padding: 0 20px;
    border: 0;
    border-radius: 9px;
    background: #dc2626;
    color: #fff;
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    &:hover:not(:disabled) { background: #b91c1c; }
    &:disabled { cursor: wait; opacity: 0.6; }
  `,
};
