# Design QA — Home Search Overlay

## Comparison target

- Source visual truth: user-provided mobile home-search overlay screenshot in this conversation.
- Implementation route: `/home`.
- Intended viewport: 375 × 812 CSS px mobile viewport.
- State: search icon selected; overlay, focused search input, and recent-search chips visible.

## Evidence

- Source pixels: 375 × 772 image including mobile device chrome.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: search icon opens the panel; the input receives focus; recent-search chips populate the input; Enter records a recent search; cancel and backdrop clicks close the panel.

## Required fidelity surfaces

- Fonts and typography: uses the existing SUIT-based application typography; visual comparison blocked.
- Spacing and layout rhythm: panel is a constrained, rounded top overlay with an inline cancel action and chip row; visual comparison blocked.
- Colors and visual tokens: uses primary blue for the active search border and neutral overlay, panel, and history-chip tokens; visual comparison blocked.
- Image quality and asset fidelity: the target contains no custom raster or illustrative asset. Existing icon-library search and close icons are used.
- Copy and content: includes a Korean search prompt, cancel action, and the three recent-search labels shown in the source.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: mobile width, panel radius, typography, and overlay opacity cannot be compared directly with the source state.
  - Fix: capture `/home` at 375 × 812 with the search overlay open, then compare it with the supplied reference.

## Implementation checklist

- [x] Add a dimmed overlay and top search panel.
- [x] Add focused search input, recent-search chips, cancel, and backdrop-close interactions.
- [x] Run lint and production build.
- [ ] Capture and compare the mobile rendered state.

## Follow-up polish

- Confirm the overlay’s top spacing and dimmed background opacity against a browser capture.

final result: blocked
