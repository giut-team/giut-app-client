# Design QA — Notifications Page

## Comparison target

- Source visual truth: user-provided mobile notifications-page screenshot in this conversation.
- Implementation route: `/notifications`.
- Intended viewport: 375 × 812 CSS px mobile viewport.
- State: two unread notifications visible; the `모두 읽음` action is available.

## Evidence

- Source pixels: 317 × 696 image including mobile device chrome.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — the available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: home bell navigates to the notifications page; a notification click clears its unread state; `모두 읽음` clears all unread markers; the back action returns to the preceding page.

## Required fidelity surfaces

- Fonts and typography: uses the existing SUIT-based hierarchy for header, notification title, supporting copy, and relative timestamps; visual comparison blocked.
- Spacing and layout rhythm: follows the source with a compact header, neutral page background, and vertically separated rounded notification cards; visual comparison blocked.
- Colors and visual tokens: uses primary blue unread borders, danger unread dots, and semantic icon backgrounds from existing tokens; visual comparison blocked.
- Image quality and asset fidelity: the target contains standard interface icons only, implemented with the existing icon library; visual comparison blocked.
- Copy and content: reproduces five Korean notification scenarios, titles, descriptions, and relative timestamps modeled on the reference.

## Findings

- [P1] Browser-rendered visual comparison unavailable.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: card height, compact text wrapping, icon alignment, and unread-border contrast cannot be judged against the source at the target width.
  - Fix: capture `/notifications` at 375 × 812, then compare its open state with the supplied reference.

## Implementation checklist

- [x] Add the notifications route and connect the home bell action.
- [x] Add unread notification cards and mark-as-read controls.
- [x] Run lint and production build.
- [ ] Capture and compare the mobile rendered state.

## Follow-up polish

- Confirm card density and individual icon hues after browser capture.

final result: blocked
