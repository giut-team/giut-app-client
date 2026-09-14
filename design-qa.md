# Design QA — 이번 주 마감 공모전 정렬 시트

## Comparison target

- Source visual truth: user-provided mobile screenshots of the closing-contests page and its open sort bottom sheet in this conversation.
- Implementation route: `/closing-contests`.
- Intended viewport: 375 x 812 CSS px mobile viewport.
- State: `마감임박순` selected, then the sort control opened.

## Evidence

- Source pixels: 659 x 685 sort-sheet reference and prior 303 x 407 list references.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: the sort trigger opens a dismissible bottom sheet; selecting 조회수순, 스크랩순, 최신순, or 마감임박순 closes it, updates its red checkmark, changes the trigger label, and reorders the visible contest cards.

## Required fidelity surfaces

- Fonts and typography: uses the existing SUIT hierarchy with compact 8–10px metadata, 15px bottom-sheet title, and bold selected option; visual comparison blocked.
- Spacing and layout rhythm: uses the shared bottom-sheet handle, rounded top corners, compact option rows, gray dividers, and a final informational notice; visual comparison blocked.
- Colors and visual tokens: uses semantic neutral surfaces and borders, primary focus feedback, and the existing danger-red token for the selected checkmark; visual comparison blocked.
- Image quality and asset fidelity: source contains standard UI icons only. Existing Phosphor icons render the sort trigger and selected check state; visual comparison blocked.
- Copy and content: includes the four ordering options and the popularity-note copy from the requested interaction.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: sheet height, option-row density, and background-dimming opacity cannot be judged against the reference state.
  - Fix: capture the opened sort sheet at 375 x 812 and compare it side-by-side with the source image.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add the sort trigger and up/down icon.
- [x] Add the dismissible sort bottom sheet.
- [x] Add selectable sort options with a semantic red checkmark.
- [x] Apply each selected sort to the rendered contest list.
- [x] Run lint and production build.
- [ ] Capture and compare the open mobile sheet state.

## Follow-up polish

- Confirm exact 375px sheet height and option-row rhythm after browser capture.

final result: blocked
