# Design QA — Applied team review detail

## Comparison targets

- Source visual truth: the four mobile screenshots supplied in this conversation, showing the applied-team review and accepted-member states.
- Intended routes: `/contests/seoul-data/teams/applied-data-seoul` and `/contests/seoul-data/teams/joined-data-seoul`.
- Intended states: an open team where the current user's application is under review, plus the accepted state after joining the team.

## Evidence

- Source image dimensions: 320 × 640 and 320 × 520 pixels (conversation attachments).
- Implementation screenshot: unavailable.
- Intended implementation viewport: 320px wide mobile layout at device scale factor 1.
- Browser, interaction, and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm.cmd run lint` and `npm.cmd run build` passed.

## Implemented surfaces

- Recruiting team list includes both `지원 검토 중` and `내 팀` status tags on Data Seoul team entries.
- Opening either entry renders the matching review or accepted detail state with progress timeline, applied role, recruitment status, team information, members, and bottom actions.
- `내 지원서 보기` navigates to the pending or accepted application page; the team-list card and back navigation work.

## Findings

- [P1] Visual comparison is blocked because no browser-rendered implementation screenshot is available.
  - Location: full screens and the review/accepted status cards.
  - Evidence: the supplied mobile screenshots are available, but a same-viewport implementation capture could not be created.
  - Impact: typography, spacing rhythm, colors, responsive behavior, and icon alignment have not been visually verified against the target.
  - Fix: when a browser is available, capture the target route at 320px width, compare the full page and the review card to the source, then correct P1/P2 differences.

## Required fidelity surfaces

- Fonts and typography: implementation uses the existing product type scale; visual weight and wrapping remain unverified.
- Spacing and layout rhythm: the source section order and compact mobile spacing were implemented; visual measurements remain unverified.
- Colors and visual tokens: existing neutral/primary tokens are used with a pale amber review state; exact visual match remains unverified.
- Image quality and asset fidelity: no visual image assets are present in the target; existing icon-library icons are used.
- Copy and content: source-like Korean review status, team details, position, and action labels are implemented.

## Comparison history

- No visual comparison iteration could begin because implementation capture is blocked.

## Implementation checklist

- [x] Add applied and accepted-member team states to the recruiting list.
- [x] Implement the review and accepted detail states and routes.
- [x] Connect primary navigation and run lint/build checks.
- [ ] Capture and compare the implemented route when a browser becomes available.

final result: blocked
