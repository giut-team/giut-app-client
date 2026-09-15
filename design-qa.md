# Design QA — Contest detail page

## Comparison target

- Source visual truth: two user-provided mobile screenshots of the contest-detail screen in this conversation.
- Implementation route: `/contests/seoul-data`.
- Intended viewport: 305 x 510 CSS px mobile viewport, device scale factor 1.
- State: overview tab selected, all three recruiting teams visible, and the bottom team-composition action bar present.

## Evidence

- Source pixels: 305 x 510 for both the overview and recruiting-team continuation captures.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: contest cards open the detail route; overview and detail-guide tabs switch content; bookmark toggles state; share uses the platform share sheet or copies the URL; the bottom action button exposes its pending state.

## Required fidelity surfaces

- Fonts and typography: existing SUIT heading, metadata, badge, tab, and CTA hierarchy is applied. Visual comparison is blocked.
- Spacing and layout rhythm: the implementation follows the pale-blue contest hero, metadata rows, notice, tab band, card group, and fixed bottom action bar shown in the source. Visual comparison is blocked.
- Colors and visual tokens: primary, neutral, success, and danger tokens are used for source-matched labels, D-day badge, tabs, and action surfaces. Visual comparison is blocked.
- Image quality and asset fidelity: the reference contains standard UI icons only; the existing Phosphor icon set supplies navigation, bookmark, eye, check, and share affordances. Visual comparison is blocked.
- Copy and content: source-inspired contest title, organizer, schedule, eligibility, prize, source, description, and recruiting team information are represented. Visual comparison is blocked.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: title wrapping, compact information-row rhythm, recruiting-card density, and fixed action-bar spacing cannot be compared at the reference viewport.
  - Fix: capture `/contests/seoul-data` at 305 x 510 and compare overview and continuation states with the supplied screenshots.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add contest-detail route and contest-list entry point.
- [x] Add hero, information rows, tabs, recruiting-team list, and fixed action bar.
- [x] Add bookmark and share interactions.
- [x] Run lint and production build.
- [ ] Capture and compare the rendered mobile screen.

## Follow-up polish

- Confirm exact hero height, label scale, tab underline position, and bottom action safe-area spacing after browser capture is available.

final result: blocked
