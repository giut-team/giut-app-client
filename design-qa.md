# Design QA — Recruiting teams page

## Comparison target

- Source visual truth: two user-provided mobile screenshots of the contest recruiting-teams screen in this conversation.
- Implementation route: `/contests/seoul-data/teams`, entered from the contest-detail "전체 보기" action.
- Intended viewport: 380 x 699 CSS px mobile viewport, device scale factor 1.
- State: 전체 5 filter selected; three active teams and two closed teams shown with the fixed team-creation action.

## Evidence

- Source pixels: 380 x 699 for the active-team screen and 380 x 699 for the closed-team continuation.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: detail-page "전체 보기" opens this route; position filters update teams; hearts toggle saved state; closed-team detail controls are disabled; header back returns to contest detail.

## Required fidelity surfaces

- Fonts and typography: existing SUIT hierarchy is applied across header, subtitle, chips, cards, timestamps, and CTA. Visual comparison is blocked.
- Spacing and layout rhythm: source-inspired header, contest context line, filter band, separated active/closed groups, cards, guidance note, and fixed CTA are implemented. Visual comparison is blocked.
- Colors and visual tokens: primary, neutral, warning, and danger semantic tokens are used for selected pills, counts, availability labels, cards, and the action button. Visual comparison is blocked.
- Image quality and asset fidelity: the reference uses standard UI icons only; existing Phosphor icons are used for navigation, favorites, and directional affordances. Visual comparison is blocked.
- Copy and content: the contest title, D-day, group labels, team names, availability, position chips, timestamps, and team-creation guidance match the reference structure. Visual comparison is blocked.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: card heights, compact type scale, fixed action-bar position, and continuation density cannot be compared with the supplied screenshots.
  - Fix: capture `/contests/seoul-data/teams` at 380 x 699 and compare active and closed team states alongside the source screenshots.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add a dedicated recruiting-teams route.
- [x] Connect contest-detail "전체 보기".
- [x] Add filters, favorite interactions, and closed-team states.
- [x] Run lint and production build.
- [ ] Capture and compare the rendered mobile page.

## Follow-up polish

- Confirm exact card elevation, title wrapping, and bottom safe-area spacing after browser capture is available.

final result: blocked
