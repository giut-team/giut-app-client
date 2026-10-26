import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { tokens } from "../../design-system/tokens.generated";

// 선택한 시안의 파랑은 기존 프로필 액션 색상과 같으며, 나머지는 공통 토큰을 사용한다.
const blue = "#1c4ea3";
const buttonBase = `
  display:flex; align-items:center; justify-content:center; gap:6px;
  min-height:44px; border:0; font:inherit; font-weight:700; cursor:pointer;
  &:disabled { opacity:.5; cursor:default; }
  &:focus-visible { outline:2px solid ${blue}; outline-offset:3px; }
`;

export const S = {
  Page: styled.div`
    width:100%; min-width:0; min-height:100svh; background:#f9f8ff;
    color:${tokens.color.neutral[900]};
    button, a, input { -webkit-tap-highlight-color:transparent; }
    a:focus-visible, input:focus-visible { outline:2px solid ${blue}; outline-offset:3px; }
    h1,h2,h3,p { margin:0; }
  `,
  ListHeader: styled.header`display:flex; flex-direction:column; gap:24px; padding:12px 20px 20px;`,
  TopBar: styled.div`display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:52px;`,
  Brand: styled.span`color:${blue}; font-size:23px; font-weight:850; letter-spacing:-.8px;`,
  IconButton: styled.button`${buttonBase} flex:0 0 44px; width:44px; padding:0; border-radius:10px; color:inherit; background:transparent;`,
  TopActions: styled.div`display:flex; align-items:center; gap:4px;`,
  Intro: styled.div`display:flex; flex-direction:column; gap:10px;`,
  Heading: styled.h1`font-size:clamp(23px,6.3vw,28px); font-weight:850; letter-spacing:-.9px; line-height:1.3; word-break:keep-all; overflow-wrap:anywhere;`,
  Description: styled.p`font-size:14px; line-height:1.6; color:#687387; word-break:keep-all; overflow-wrap:anywhere;`,
  Filters: styled.div`display:flex; flex-direction:column; gap:10px;`,
  FilterRow: styled.div`display:flex; gap:6px;`,
  FilterButton: styled.button<{ $active: boolean }>`
    ${buttonBase} flex:1; min-width:0; padding:8px 6px; border:1px solid ${({ $active }) => $active ? blue : tokens.color.neutral[200]};
    border-radius:12px; background:${({ $active }) => $active ? tokens.color.primary[100] : "transparent"};
    color:${({ $active }) => $active ? blue : tokens.color.neutral[700]}; font-size:12px;
    span { min-width:0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
    svg { flex-shrink:0; transform:rotate(90deg); }
  `,
  Search: styled.input`width:100%; min-width:0; height:44px; padding:10px 12px; border:1px solid ${tokens.color.neutral[200]}; border-radius:10px; background:white; color:inherit; font:inherit; font-size:14px;`,
  FilterSummary: styled.div`display:flex; align-items:flex-start; justify-content:space-between; gap:8px; font-size:13px; line-height:1.5; color:#687387;`,
  Reset: styled.button`${buttonBase} flex-shrink:0; min-height:32px; padding:0 4px; color:${blue}; background:transparent; font-size:12px;`,
  List: styled.main`display:flex; flex-direction:column; padding:0 20px calc(88px + env(safe-area-inset-bottom)); background:white;`,
  Person: styled(Link)`
    display:flex; align-items:center; gap:8px; padding:24px 0; border-bottom:1px solid ${tokens.color.neutral[200]};
    color:inherit; text-decoration:none;
    &:hover { background:#fafaff; }
    > svg { flex:0 0 18px; color:#9da5b6; }
  `,
  PersonBody: styled.div`display:flex; flex:1; min-width:0; flex-direction:column; gap:18px;`,
  QuoteRow: styled.div`display:flex; align-items:flex-start; gap:10px; > svg { flex:0 0 20px; color:${blue}; }`,
  Quote: styled.h2`
    min-width:0; font-size:20px; font-weight:800; letter-spacing:-.5px; line-height:1.4;
    display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:3; overflow:hidden;
    word-break:keep-all; overflow-wrap:anywhere; white-space:pre-line;
  `,
  Identity: styled.div`display:flex; align-items:center; gap:14px; min-width:0;`,
  Avatar: styled.div<{ $large?: boolean }>`
    flex:0 0 ${({ $large }) => $large ? "104px" : "64px"};
    width:${({ $large }) => $large ? "104px" : "64px"}; aspect-ratio:1; overflow:hidden;
    border-radius:50%; background:${tokens.color.neutral[100]};
    img { display:block; width:100%; height:100%; object-fit:cover; }
    span { font-size:10px; }
    @media(max-width:360px) { ${({ $large }) => $large ? "flex-basis:80px; width:80px;" : ""} }
  `,
  IdentityCopy: styled.div`display:flex; flex:1; min-width:0; flex-direction:column; gap:8px;`,
  NameRow: styled.div`display:flex; align-items:center; flex-wrap:wrap; gap:6px 10px;`,
  Name: styled.h2`font-size:19px; font-weight:850; letter-spacing:-.5px; overflow-wrap:anywhere;`,
  Status: styled.span<{ $color: string }>`display:inline-flex; align-items:center; gap:6px; color:${({ $color }) => $color}; font-size:12px; font-weight:700; line-height:1.4; svg { flex-shrink:0; }`,
  Facts: styled.p`font-size:13px; line-height:1.5; color:#687387; word-break:keep-all; overflow-wrap:anywhere;`,
  Skills: styled.p`font-size:14px; line-height:1.55; color:#687387; overflow-wrap:anywhere;`,
  DetailHeader: styled.header`padding:8px 12px;`,
  DetailMain: styled.main<{ $noDock?: boolean }>`display:flex; flex-direction:column; gap:28px; padding:16px 20px ${({ $noDock }) => $noDock ? "40px" : "calc(148px + env(safe-area-inset-bottom))"};`,
  Biography: styled.h1`font-size:26px; font-weight:850; line-height:1.4; letter-spacing:-.8px; word-break:keep-all; overflow-wrap:anywhere; white-space:pre-line;`,
  Section: styled.section`display:flex; flex-direction:column; gap:18px; border-top:1px solid ${tokens.color.neutral[200]}; padding:24px 0 0;`,
  SectionTitle: styled.h2`font-size:21px; font-weight:800; letter-spacing:-.5px;`,
  Portfolio: styled(Link)`display:flex; flex-direction:column; gap:10px; color:inherit; text-decoration:none;`,
  PortfolioImage: styled.div`width:100%; aspect-ratio:16/9; overflow:hidden; border-radius:12px; background:${tokens.color.neutral[100]}; img { display:block; width:100%; height:100%; object-fit:cover; }`,
  PortfolioCopy: styled.div`display:flex; flex-direction:column; gap:5px; h3 { font-size:17px; font-weight:800; overflow-wrap:anywhere; } p { color:#687387; font-size:14px; line-height:1.55; overflow-wrap:anywhere; }`,
  Activities: styled.div`display:flex; flex-direction:column; gap:22px;`,
  Activity: styled.div`display:flex; align-items:flex-start; gap:12px; > svg { flex-shrink:0; color:${blue}; }`,
  Empty: styled.div`display:flex; flex-direction:column; align-items:flex-start; gap:10px; padding:20px 0; color:#687387; font-size:14px; line-height:1.6; strong { color:${tokens.color.neutral[700]}; font-size:16px; } > svg { color:${blue}; }`,
  Dock: styled.footer`
    position:fixed; z-index:6; bottom:0; left:50%; transform:translateX(-50%); width:min(100%,var(--app-content-width));
    display:flex; flex-direction:column; gap:10px; padding:12px 16px max(16px,env(safe-area-inset-bottom));
    border-top:1px solid ${tokens.color.neutral[200]}; background:rgba(255,255,255,.98);
  `,
  ActionRow: styled.div`display:flex; align-items:stretch; gap:8px;`,
  Action: styled.button<{ $primary?: boolean }>`
    ${buttonBase} flex:1 1 0; min-width:0; height:48px; padding:0 5px; border-radius:12px;
    background:${({ $primary }) => $primary ? blue : tokens.color.neutral[100]};
    color:${({ $primary }) => $primary ? "white" : tokens.color.neutral[900]}; font-size:13px;
    svg { flex-shrink:0; }
    @media(max-width:350px) { font-size:12px; gap:4px; }
  `,
  Star: styled.button<{ $active: boolean }>`
    ${buttonBase} flex:0 0 44px; width:44px; height:48px; padding:0; border:1px solid ${tokens.color.neutral[200]}; border-radius:12px;
    background:${({ $active }) => $active ? tokens.color.primary[100] : "white"}; color:${({ $active }) => $active ? blue : tokens.color.neutral[700]};
  `,
  Feedback: styled.p`font-size:13px; line-height:1.5; color:${tokens.color.neutral[700]}; overflow-wrap:anywhere;`,
  Menu: styled.div`display:flex; flex-direction:column;`,
  MenuButton: styled.button<{ $danger?: boolean }>`${buttonBase} justify-content:flex-start; gap:14px; padding:14px 0; background:transparent; color:${({ $danger }) => $danger ? tokens.color.danger[500] : tokens.color.neutral[900]}; font-size:16px;`,
  Form: styled.form`display:flex; flex-direction:column; gap:20px;`,
  Options: styled.div`display:flex; flex-direction:column; gap:4px;`,
  Option: styled.label`
    display:flex; align-items:center; gap:12px; min-height:48px; padding:10px 4px; font-size:15px; cursor:pointer;
    input { flex-shrink:0; width:18px; height:18px; accent-color:${blue}; }
  `,
  Field: styled.label`display:flex; flex-direction:column; gap:10px; font-size:14px; font-weight:700;`,
  Markdown: styled.div`font-size:15px; line-height:1.8; overflow-wrap:anywhere; h2 { font-size:20px; padding:20px 0 8px; } p { padding:8px 0; } ul { margin:0; padding:8px 0 8px 20px; }`,
};
