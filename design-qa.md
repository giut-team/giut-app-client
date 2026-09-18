# Design QA — Team application and creation completion flows

## Comparison targets

- Team application: user-provided mobile screenshots for field selection, role selection, message writing, and completion.
- Team creation: user-provided team-creation completion screen.
- Routes:
  - `/contests/:contestId/teams/:teamId/apply`
  - `/contests/:contestId/teams/create`

## Implemented surfaces

- Three-step team application progress: field, role, and message; the final completion state is separate.
- Editable availability, introduction, and two application answers with 300-character counters.
- Team application confirmation and cancellation modals.
- Team creation completion screen after registration confirmation, with team summary, next steps, notice, and a final confirmation action.

## Evidence

- Source screenshots: supplied in the conversation.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.

## Findings

- [P1] Visual comparison is blocked because a browser capture is unavailable.
  - Impact: exact mobile spacing, card heights, and typography cannot be compared to the supplied screenshots.
  - Follow-up: capture both completion screens at the reference viewport when a browser becomes available.

## Implementation checklist

- [x] Application and creation completion screens implemented.
- [x] Primary completion actions navigate to the appropriate contest detail.
- [x] Lint and production build passed.
- [ ] Browser capture and visual comparison.

final result: blocked
