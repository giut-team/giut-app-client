# Design QA — Popular contests sort sheet

## Comparison target

- Source visual truth: user-provided popular-contests screenshots and the earlier sorting bottom-sheet screenshot in this conversation.
- Implementation route: `/contests/popular`.
- Intended viewport: 375 x 812 CSS px mobile viewport, device scale factor 1.
- State: `전체` category selected; the `조회수순` control has opened the sort bottom sheet.

## Evidence

- Source pixels: popular-contests continuation captures are 338 x 605 and 338 x 598; the sort-sheet reference is 659 x 685.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: the home `전체보기` action opens `/contests/popular`; category pills filter both contest groups; `조회수순` opens the sort sheet; selecting 조회수순, 스크랩순, 최신순, or 마감임박순 updates both lists and closes the sheet; back returns to the previous view.

## Required fidelity surfaces

- Fonts and typography: reuses the established SUIT heading, card-title, metadata, and option-label hierarchy. Visual comparison is blocked.
- Spacing and layout rhythm: reuses the existing compact-card rhythm and shared BottomSheet geometry. Visual comparison is blocked.
- Colors and visual tokens: D-day now uses the same solid `danger.500` red badge with white text as the general contest list; the selected sort option uses the established red check state. Visual comparison is blocked.
- Image quality and asset fidelity: no source imagery is present; standard UI icons use the existing icon system. Visual comparison is blocked.
- Copy and content: the popular ranking, category badges, contest metadata, and all four sort labels are represented. Visual comparison is blocked.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: the D-day badge proportions and sorting-sheet spacing cannot be verified against the supplied reference at the target viewport.
  - Fix: capture `/contests/popular` at 375 x 812 with the sort sheet open and compare it alongside the source.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Use the shared solid-red D-day treatment.
- [x] Add the functional sort bottom sheet.
- [x] Apply the selected sorting to both contest groups.
- [x] Run lint and production build.
- [ ] Capture and compare the mobile rendered state.

## Follow-up polish

- Confirm exact D-day badge size, option-row rhythm, and sheet safe-area spacing after a browser capture is available.

final result: blocked
