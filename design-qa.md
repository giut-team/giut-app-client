# Design QA — contest registration URL screen

## Comparison targets

- Source visual truth: mobile screenshot supplied in this conversation showing the contest-registration URL entry screen.
- Implementation route: `/contests/register`.
- Intended viewport: mobile, 270px-wide reference capture.
- Intended state: empty URL input with the example URL placeholder and an active `불러오기` button.

## Evidence

- Source image dimensions: 270 × 178 pixels (conversation attachment).
- Implementation screenshot: unavailable.
- Browser check: blocked — the browser runtime returned `No browser is available`.
- Code checks: `npm.cmd run lint` and `npm.cmd run build` passed.

## Implemented surfaces

- Added the contest-registration URL entry route and screen.
- Connected the registration buttons on the all, closing-soon, and popular contest lists.
- Added a controlled URL input, submission action, and back navigation.
- Added animated mock extraction steps and deterministic result states.
- `fintech-12` resolves to complete extraction, `data-contest-2024` resolves to a duplicate contest, and `partial` resolves to a partial-extraction state.

## Findings

- [P1] Visual comparison is blocked because a browser-rendered implementation screenshot could not be captured at the reference viewport.
  - Location: contest registration screen.
  - Impact: exact type scale, spacing, input height, and button alignment remain unverified against the supplied image.
  - Fix: when a browser becomes available, capture `/contests/register` at the same mobile viewport and compare the heading and URL field against the source.

## Required fidelity surfaces

- Fonts and typography: existing product type scale and weights were used; visual comparison is unverified.
- Spacing and layout rhythm: the screen uses the existing page header and a compact URL field; visual comparison is unverified.
- Colors and visual tokens: neutral and primary product tokens are used.
- Image quality and asset fidelity: no image assets are present in the source; the existing icon system provides the back affordance.
- Copy and content: source Korean copy and URL example are implemented.

## Implementation checklist

- [x] Add registration screen and route.
- [x] Connect contest-list registration actions.
- [x] Run lint and build checks.
- [ ] Capture and compare the rendered mobile screen when a browser becomes available.

## Latest extraction-flow update

- Additional source visual truth: the three supplied mobile screenshots showing loading extraction, full extraction, and duplicate-result states.
- Primary interactions: submit a URL, wait for the staged extraction checks, retry an extraction, edit a duplicate URL, and navigate to the existing duplicate contest.
- Browser-rendered evidence remains unavailable because the browser runtime returned `No browser is available`.
- Partial extraction is an additional mock-data state for the `partial` URL keyword; it shows missing fields and a direct-input continuation action.

## Direct-input form update

- Additional source visual truth: the two supplied mobile screenshots showing the post-partial-extraction editable form.
- Primary interaction: in the `partial` result state, select `직접 입력해서 계속하기` to open the auto-extracted field review form.
- Implemented form state: four extracted fields are editable, category selection is interactive, the prize field accepts direct input, and `등록하기` returns to the contests list.
- Browser-rendered implementation screenshot: unavailable. The browser runtime remains unavailable, so the 282px-wide source layout, field-card spacing, and fixed registration footer could not be visually compared.
- Code checks: `npm.cmd run lint` and `npm.cmd run build` passed after the direct-input form update.

final result: blocked
