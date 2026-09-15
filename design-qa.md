# Design QA — Home matched teams route

## Comparison target

- Source visual truth: user-provided mobile screenshots of the "내게 맞는 팀" screen in this conversation.
- Implementation route: `/matched-teams`, opened from the home "팀원으로 지원하기" shortcut.
- Intended viewport: 372 x 772 CSS px mobile viewport, device scale factor 1.
- State: 데이터 분석 filter selected; three matching-position cards and two overlapping-skill cards are shown.

## Evidence

- Source pixels: 372 x 772 for the first screen and 372 x 772 for the continuation screen.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: home shortcut opens the dedicated route; skill filters update visible cards; heart buttons toggle saved state; header back returns home.

## Required fidelity surfaces

- Fonts and typography: existing SUIT hierarchy is applied to headings, card titles, metadata, labels, and badges. Visual comparison is blocked.
- Spacing and layout rhythm: the page follows the source's header, compact hero/filter band, grouped cards, section dividers, and bottom guidance note. Visual comparison is blocked.
- Colors and visual tokens: primary, neutral, purple, and danger semantic tokens are used for filters, cards, skills, buttons, and D-day badges. Visual comparison is blocked.
- Image quality and asset fidelity: the source contains standard UI icons only, rendered with the existing Phosphor icon system. Visual comparison is blocked.
- Copy and content: team, position, technical-stack, and metadata content is modeled on the supplied reference. Visual comparison is blocked.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: mobile card density, badge sizing, and continuation spacing cannot be compared against the reference.
  - Fix: capture `/matched-teams` at 372 x 772 and compare its top and continuation states with the supplied screenshots.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add a dedicated matched-teams route.
- [x] Connect the home shortcut to that route.
- [x] Implement filters and favorite interactions.
- [x] Run lint and production build.
- [ ] Capture and compare the rendered mobile page.

## Follow-up polish

- Confirm exact card height, type scale, and D-day badge proportions after browser capture is available.

final result: blocked
