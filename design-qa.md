# Design QA — Team creation flow, steps 1–4

## Comparison target

- Source visual truth: the four user-provided mobile screenshots of the team-creation flow in this conversation.
- Implementation routes: `/contests/seoul-data/teams/create` through `/contests/seoul-data/teams/create/4`.
- Intended viewport: 300 x 640 CSS px mobile viewport, device scale factor 1.
- States: draft setup, role and headcount allocation, activity details, and final introduction/questions.

## Evidence

- Source pixels: 300 x 640 for steps 2–4, plus the earlier first-step mobile screenshot.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: all four stage routes navigate forward/back; data persists through the flow; headcount controls, multi-select role/skill chips, member add/remove, activity preferences, questions, and final registration state all update in the UI. Question addition now opens a bottom sheet with a 200-character draft, cancel/confirm states, and selectable suggested prompts that fill the draft.

## Required fidelity surfaces

- Fonts and typography: SUIT hierarchy is applied across compact headers, labels, helper copy, chips, cards, form controls, and fixed CTAs. Visual comparison is blocked.
- Spacing and layout rhythm: source-inspired four-segment progress bars, grouped form sections, compact cards, dividers, and bottom action bars are implemented. Visual comparison is blocked.
- Colors and visual tokens: existing primary, neutral, success, and semantic tokens represent active steps, selections, inputs, cards, helper surfaces, and buttons. Visual comparison is blocked.
- Image quality and asset fidelity: the references use standard UI controls and one generic member avatar. The existing icon library is used for all icons; no raster asset is required. Visual comparison is blocked.
- Copy and content: the screens implement the source structure and the project-wide 2026 contest convention. Visual comparison is blocked.
- Question-add bottom sheet: the supplied reference's title, usage count, multi-line question field, character counter, suggested-question chips, guidance panel, and dual actions are implemented. Visual comparison is blocked.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: compact mobile spacing, form density, fixed CTA placement, and cross-step visual continuity cannot be compared with the supplied screenshots.
  - Fix: capture each route at 300 x 640 and compare against its matching source screenshot.

## Comparison history

- No visual comparison iteration could run because a browser-rendered implementation capture is unavailable.

## Implementation checklist

- [x] Add routes for steps 1–4.
- [x] Preserve the team-creation draft with Context across route transitions.
- [x] Implement role allocation, activity settings, and team introduction/question controls.
- [x] Run lint and production build.
- [ ] Capture and compare each mobile step.
- [ ] Capture the opened question-add bottom sheet and compare it against its reference.

## Follow-up polish

- Verify exact vertical rhythm, chip widths, card elevation, and bottom safe-area spacing when a browser is available.

final result: blocked
