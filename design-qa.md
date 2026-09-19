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

## Recruiting-teams page update

- Source visual truth: the 822px-wide recruiting-teams screenshot supplied in this conversation.
- Implementation route: `/contests/:contestId/teams`.
- Intended state: the team recruitment list with category and verification badges, contest metadata, a recruitment-field filter, and five open-team ticket cards.
- Implemented interactions: recruitment-field filtering updates the card list; team-status badges identify the current user's owner, member, and application states; card selection opens its matching existing team-detail route; bookmarks toggle independently; footer actions route to application, team view, management, or application-status flows as appropriate.
- Browser-rendered implementation screenshot: unavailable. The browser runtime is not available in this chat, so the 822px-wide source capture could not be compared with a same-viewport rendering.
- Code checks: `npm.cmd run build` passed.

**Findings**
- [P1] Visual fidelity is unverified.
  Location: recruiting-teams route.
  Evidence: the provided reference has no captured implementation counterpart.
  Impact: exact header sizing, card height, copy wrapping, and dashed-divider alignment remain unverified.
  Fix: when browser rendering is available, capture the recruiting-teams route at the source viewport and compare full page plus an individual team card.

**Required fidelity surfaces**
- Fonts and typography: uses the existing product type system; visual comparison is blocked.
- Spacing and layout rhythm: implements the reference hierarchy with a summary divider, section header, and bordered cards; visual comparison is blocked.
- Colors and visual tokens: primary, neutral, and danger design tokens are used for the target hierarchy.
- Image quality and asset fidelity: no raster or custom image assets appear in the supplied target; existing icon components are used for UI controls.
- Copy and content: existing contest and recruiting-team mock data are retained within the redesigned layout.

final result: blocked

## Contest-detail team tickets update

- Source visual truth: the contest-detail team-list screenshot supplied in this conversation, together with the previously approved recruiting-team ticket card.
- Implementation route: `/contests/:contestId`.
- Implemented state: the section displays `모집 중인 팀 5` while rendering the first three existing mock teams as ticket cards with a dashed divider and connected circular notches.
- Implemented interactions: each card opens its existing team route; per-team bookmarks toggle independently; owner cards open team management and other cards can open the application form.
- Browser-rendered implementation screenshot: unavailable. The browser runtime remains unavailable, so the ticket-card geometry cannot be compared at the supplied viewport.
- Code checks: `npm.cmd run build` passed.

final result: blocked

## Contest-detail share-sheet update

- Source visual truth: the mobile share bottom-sheet screenshot supplied in this conversation.
- Implementation route: `/contests/:contestId`.
- Implemented state: selecting the header share icon opens a dimmed share sheet with a close control, contest preview, link row, copy action, and KakaoTalk/message/more options.
- Implemented interactions: copy writes the current URL and shows a toast; more uses the platform share sheet when available or falls back to copying; KakaoTalk and message options display their unavailable-state feedback.
- Browser-rendered implementation screenshot: unavailable. The browser runtime remains unavailable, so sheet height and spacing cannot be compared at the supplied viewport.
- Code checks: `npm.cmd run build` passed.

final result: blocked

## Chat-room detail update

- Source visual truth: the two mobile chat-room screenshots supplied in this conversation for 이서연 and 최유진.
- Implementation routes: `/chat/seoul-data` and `/chat/startup-package`.
- Intended state: an open chat room with profile header, conversation-origin card, today marker, left/right message bubbles, and a fixed message composer.
- Implemented interactions: selecting a chat from `/chat` opens its room; back returns to the list; message text can be entered and sent into the current thread; contextual action buttons open their matching team, contest, or profile route; the more menu toggles chat notifications, confirms reports, and confirms leaving the room; the attachment control is visual-only.
- Browser-rendered implementation screenshot: unavailable. The browser runtime returned `No browser is available`, so no same-viewport full-view or focused-region comparison could be captured.
- Code checks: `npm.cmd run build` passed. The existing lint blocker remains the five pre-existing `react-refresh/only-export-components` errors in GiutHub files.

**Findings**
- [P1] Visual fidelity is unverified.
  Location: chat-room detail routes.
  Evidence: source screenshots are available, but no browser-rendered implementation screenshot can be captured.
  Impact: exact message-wrap width, header rhythm, context-card height, and composer placement cannot be compared.
  Fix: capture both routes at the supplied mobile viewport when a browser runtime is available and iterate on any visible P1/P2 differences.

**Required fidelity surfaces**
- Fonts and typography: existing product tokens and type conventions are used; visual comparison is blocked.
- Spacing and layout rhythm: mobile-width header, thread, and fixed composer were implemented; visual comparison is blocked.
- Colors and visual tokens: neutral, primary, success, orange, and purple product colors are used.
- Image quality and asset fidelity: no raster or custom image assets are present in the supplied chat-room screens; existing icon components are used for controls.
- Copy and content: the supplied Korean sample conversations and labels were implemented for the matching participants.

final result: blocked

## Chat list update

- Source visual truth: mobile chat-list screenshot supplied in this conversation.
- Implementation route: `/chat`.
- Implemented surfaces: chat header and search affordance, all/unread tabs, three chat previews, the unread count badge, and the fixed bottom navigation with the chat tab active.
- Primary interactions: the unread tab filters the list; opening the unread conversation clears its unread state; the search icon opens an inline search field that filters by name or team title; bottom navigation links to Home, GiutHub, and My Page.
- Browser-rendered implementation screenshot: unavailable. The browser runtime remains unavailable, so the supplied 355px-wide reference cannot be visually overlaid against the implementation.
- Code checks: `npm.cmd run build` passed. `npm.cmd run lint` remains blocked by five pre-existing `react-refresh/only-export-components` errors in `GiutHubPage.tsx` and `GiutHubProfilePage.tsx`; no chat-page lint errors were reported.

final result: blocked
