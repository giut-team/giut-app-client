# Design QA — 공모전 찾기 목록

## Comparison target

- Source visual truth: user-provided mobile screenshot of the contests page in this conversation.
- Implementation route: `/contests`.
- Intended viewport: 375 x 812 CSS px mobile viewport.
- State: `전체` category and `조회수순` selected.

## Evidence

- Source pixels: 338 x 738 image including the visible app content.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: the home `공모전 찾기` shortcut opens `/contests`; category pills filter cards; the sort control opens a dismissible sheet and applies 조회수/스크랩/최신/마감임박 ordering.

## Required fidelity surfaces

- Fonts and typography: uses the existing SUIT hierarchy with compact filter labels, card metadata, and prominent card titles; visual comparison blocked.
- Spacing and layout rhythm: follows the screenshot's white header/filter band, neutral list controls, 8px card spacing, and rounded white cards; visual comparison blocked.
- Colors and visual tokens: uses semantic category badges, verification states, soft danger D-day badges, and primary team-count badges; visual comparison blocked.
- Image quality and asset fidelity: the target contains standard interface icons only, rendered with the existing Phosphor set; visual comparison blocked.
- Copy and content: reproduces visible Korean contest names, organizations, D-days, team counts, view counts, and comment counts with realistic mock data.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: exact 375px type wrapping, card density, arrow placement, and soft-red D-day contrast cannot be judged against the source.
  - Fix: capture `/contests` at 375 x 812 and compare it side-by-side with the supplied screenshot.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add the contests route and connect the home shortcut.
- [x] Add category filters and contest cards.
- [x] Add selectable ordering and sort sheet.
- [x] Run lint and production build.
- [ ] Capture and visually compare the mobile rendered state.

## Follow-up polish

- Confirm exact card height and D-day color treatment after browser capture.

final result: blocked
