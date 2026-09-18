# Design QA — 팀 지원 플로우

## Comparison target

- Source visual truth: user-provided mobile screenshots for all four application steps.
- Implementation route: `/contests/:contestId/teams/:teamId/apply`.
- Intended viewport: mobile, based on the supplied 287 × 608 px screens.
- States: field selection (1/4), role selection (2/4), application message (3/4), and completion (4/4).

## Implemented surfaces

- Four-step progress bar, back navigation, field and role selection.
- Step 3 editable introduction, weekly availability, and the two requested questions:
  - `이 팀에 지원한 이유를 알려주세요`
  - `지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?`
- Step 4 blue-theme submission completion, application summary, next-step status, and confirmation navigation back to the contest detail.
- Disabled `마감` and `미모집` states retain neutral gray styling; general text uses black.

## Evidence

- Source screenshots: supplied in the conversation.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.

## Findings

- [P1] Visual comparison is blocked because no browser is available for prototype capture.
  - Impact: the exact mobile spacing, component heights, and typography cannot be compared against the source screenshots.
  - Follow-up: capture steps 1–4 at the same viewport once the browser becomes available, then revise spacing and typography as needed.

## Implementation checklist

- [x] Team detail CTA opens the application flow.
- [x] Steps 1–4 are navigable and interactive.
- [x] Step 3 questions use the requested wording.
- [x] Blue application theme applied.
- [x] Lint and production build passed.
- [ ] Browser capture and visual comparison.

final result: blocked
