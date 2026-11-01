# Design QA
# TASK-050 — 선택한 세번째 프로필 시안 구현 QA (2026-10-24)

- Source visual truth: docs/harness/tasks/artifacts/TASK-050/direction-introduction.png (1358 × 1158 생성 이미지, 목록·상세 좌우 보드).
- Implementation: /giut-hub-preview, /giut-hub-preview/:profileNumber, 작품 하위 경로.
- Intended viewport: 각390 × 844 CSS px, 320/480px 및 넓은 웹480px 상한 확인 필요. Source는390×844 각 화면의 정확한 픽셀 캡처가 아닌 생성 보드이므로 임의의1:1 픽셀 일치를 주장하지 않는다.
- State: 인증된 사용자의 실제 목록/상세. API 원본 이름·소개·사진·스킬·작품/활동을 사용하므로 시안의 예시 인물 내용과 다를 수 있다.
- Implementation screenshot: 없음. 앞선 사용자 “지금은 코드 적용만” 범위를 유지해 브라우저/Playwright/외부 데모를 실행하지 않았다.
- Full-view/focused comparison evidence: 미확보. 렌더링 캡처가 없어 비교 불가. Source 이미지만 직접 열어 확인했으며 코드를 시각 증거로 대체하지 않는다.
- Fonts/typography: 기존 SUIT, 코드상 소개20/26px와 본문13~15px. 실제 줄바꿈/굵기 미검증.
- Spacing/layout: flex/gap/padding, 전역 폭 상한, 고정 액션 바와 하단 문서 padding. 실제320/390/480·키보드/확대/스크롤 미검증.
- Colors/tokens: 기존 neutral·상태 helper와 프로필 파랑#1C4EA3. 실제 대비/상태색 비교 미검증.
- Assets: API 사진과 기존 ImageWithFallback, 기존 Phosphor 아이콘. 새 인물/작품 이미지 생성·외부 데모 사용 없음. 실제 이미지 오류/CORS 미검증.
- Copy/content: 실제 필드 및 콘텐츠 없음 안내. 생성 시안의 임의 보조 문구·가상 경력은 복사하지 않음. 긴 한국어 가독성 미검증.
- Primary interactions: 필터/검색/목록→상세→작품/공유·추천·메시지·신고·제안 코드 연결. 경계 모의 테스트와 타입/빌드는 별도 기록하며 실제 계정 저장·조작을 통과로 간주하지 않는다.
- Browser console errors: 미확인.
- Comparison history: 브라우저 비교0회. 수정 후 캡처/비교도 미실행.
- Findings: 시각 근거가 없어 P0/P1/P2 일치 여부를 판단할 수 없음. 로컬 서버 실행/읽기 sandbox EPERM은 환경 권한 재시도로 해소. 새 경로/모듈 HTTP200과56개 테스트·타입·린트·빌드는 확인했으나 브라우저 캡처/시각 QA와는 별개다.
- Next: 같은 인증/콘텐츠/390px 상태로 목록·상세 캡처를 확보해 원본과 동시 비교하고 작은 폭/긴 문구/빈 상태/액션·키보드를 확인.

final result: blocked

---

# Design QA — contest registration URL screen

## Reference

- User-provided mobile screenshots for the profile report list and report detail screens.
- Target viewport: phone layout, up to 480px wide.

## Implemented

- Split the former side-by-side workspace into list and detail views.
- Added report-row navigation and a detail back button.
- Matched the compact header, rounded list card, five-row pagination, status badges, profile snapshot card, and fixed bottom navigation/actions.
- Preserved status filtering, logout, pagination, report review mutations, confirmation modals, and toast feedback.

## Validation

- `npm.cmd run build`: passed.
- `npm.cmd run lint`: passed with six existing Fast Refresh warnings outside the changed admin files.
- Visual browser comparison: blocked because no browser or native computer-use surface is available in this session.

## Final result

Blocked for screenshot comparison only. Code and static validation passed.
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

## Chat origin context card update

- Source visual truth: the two supplied mobile chat screenshots showing a compact origin card above the date divider for a contest-team inquiry and a GiutHub team proposal.
- Implementation route: `/chat/:chatId`.
- Implemented interactions: team-detail inquiry, direct GiutHub message, and GiutHub team proposal now attach context to the opened chat room; the card links back to the relevant team, contest, GiutHub list, or profile.
- Responsive treatment: the existing 480px mobile shell and the established context-card styles are used, with two equal action buttons and the card placed before the `오늘` divider.
- Browser-rendered implementation screenshot: unavailable. Computer Use reported no browsers or native app connection, so exact visual comparison against the supplied screenshots is blocked.
- Code checks: `npm.cmd run build` passed. The repository has no `test` script. `npm.cmd run lint` remains blocked by the pre-existing unused `applicationQuestions` value in `MyApplicationPage.tsx`.

**Findings**

- [P1] Cross-account team-origin metadata cannot be reconstructed from the current chat-room API response, which only supplies room type, target user, status, and timestamps. The initiating browser retains the full context; another account receives a profile-based fallback until the backend returns shared origin metadata.
- [P1] Visual fidelity is unverified because no browser-rendered implementation capture is available.

final result: blocked

## Profile edit selection sheets update

- Source visual truth: the supplied mobile screenshots for 학과 선택, 학년 선택, and 현재 상태 sheets.
- Implementation route: `/my-profile/edit`.
- Implemented interactions: the 학과, 학년, and 현재 상태 controls open their respective selection sheets; selections update the edit form and the footer confirms the current choice.
- Browser-rendered implementation screenshot: unavailable. The browser runtime returned `No browser is available`, so this update could not be compared against the supplied mobile captures at a matching viewport.
- Code checks: `npm run build` passed.

**Findings**

- [P1] Visual fidelity is unverified because no browser-rendered implementation capture is available.

final result: blocked

## My profile reference-alignment update

- Source visual truth: the supplied My Page screenshot showing the dashed profile-photo and featured-project upload areas, visible skill chips above the tabs, and the navy profile-edit action.
- Implementation route: `/my-profile`.
- Implemented state: profile and featured-project thumbnails use the referenced dashed upload treatment; the existing GiutHub skill chips now appear between the metrics and tab list; the local My Page primary action uses the reference navy tone.
- Browser-rendered implementation screenshot: unavailable. The browser runtime remains unavailable, so the updated image-free layout could not be compared to the reference at a matching viewport.
- Code checks: `npm run build` passed.

final result: blocked

## My profile page update

- Source visual truth: the supplied mobile screenshot (`스크린샷 2026-09-20 오후 11.17.25.png`) showing the My Page profile overview.
- Implementation route: `/my-profile`.
- Implemented state: the page reuses the GiutHub profile, portfolio, and skill-stack mock data. It provides the profile overview, edit/share controls, collaboration/proposal/recommendation metrics, and interactive portfolio, team, and saved-item tabs.
- Primary interactions: all bottom-navigation My Page entries route to `/my-profile`; portfolio items retain the existing portfolio-detail navigation; the three tabs switch their content.
- Browser-rendered implementation screenshot: unavailable. The browser runtime returned `No browser is available`, and no local preview could be captured at the reference mobile viewport.
- Code checks: `npm run build` passed.

**Findings**

- [P1] Visual fidelity is unverified.
  Location: `/my-profile`.
  Evidence: the supplied reference is available, but no browser-rendered implementation screenshot could be captured for a same-viewport comparison.
  Impact: profile-header height, portfolio-card image proportion, and tab spacing may differ from the target.
  Fix: when a browser runtime is available, capture `/my-profile` at the supplied mobile viewport and compare the full page plus the profile and featured-project regions.

**Required fidelity surfaces**

- Fonts and typography: existing SUIT typography and GiutHub detail type hierarchy are reused; visual comparison is blocked.
- Spacing and layout rhythm: the reference's profile/metrics/tabs/portfolio sequence is implemented; exact spacing is unverified.
- Colors and visual tokens: the GiutHub primary `#1C4EA3` and existing neutral tokens are used.
- Image quality and asset fidelity: existing profile and portfolio raster assets are reused; visual crop verification is blocked.
- Copy and content: the screen uses existing GiutHub mock profile and portfolio data.

final result: blocked

## Pending application-detail update

- Source visual truth: the supplied pending-application screenshot showing a timeline followed by a support-position summary card, two question-and-answer cards, and an informational notice.
- Implementation route: `/my-team/my-application/pending`.
- Implemented state: the timeline remains above the content; below it, the page now presents a `데이터 시각화` position summary with team, submission time, and weekly availability, followed by separate Q1 and Q2 answer cards and the pending-state notice.
- Primary interaction: the fixed cancellation action remains available for a pending application.
- Browser-rendered implementation screenshot: unavailable. The browser runtime is unavailable in this chat, so the supplied reference and the rendered route could not be compared at a matching viewport.
- Code checks: `npm.cmd run build` passed.

**Findings**
- [P1] Visual fidelity is unverified.
  Location: pending application-detail route.
  Evidence: the source screenshot is available but no browser-rendered implementation screenshot can be captured.
  Impact: exact card heights, typography, timeline spacing, and fixed-footer placement may still differ from the reference.
  Fix: when browser rendering is available, capture `/my-team/my-application/pending` at the reference viewport and compare the full page plus the position-summary region.

**Required fidelity surfaces**
- Fonts and typography: uses the existing product type system; visual comparison is blocked.
- Spacing and layout rhythm: implements the supplied timeline-to-summary-to-question-card hierarchy; visual comparison is blocked.
- Colors and visual tokens: primary and neutral product tokens are used for bordered cards, position state, and the informational notice.
- Image quality and asset fidelity: no non-standard raster assets are visible in the supplied target.
- Copy and content: the pending application retains the current data-visualization role and sample application data while adopting the supplied structure.

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

---

# TASK-028 — 전체 화면 프로필 공유 검수 기록

## 범위와 현재 결과

- 코드 적용과 자동 검증 완료. 실제 화면 비교는 미완료다.
- 사용자 최신 선택: 별도 Playwright 실행 제안에 **지금은 코드 적용만**이라고 답변. 그 뒤 별도 브라우저 도구를 실행하지 않았다.
- source visual truth: 이번 대화에 사용자가 첨부한 전체 화면 프로필 공유 이미지. 원본 파일 경로/정확한 픽셀 크기는 제공되지 않았다. 이전 Desktop 스크린샷은 다른 내용이라 비교 근거로 사용하지 않았다.
- implementation screenshot path: 미생성. CUA inventory 및 reset/Safari 재연결은 Sky Computer Use native pipe startup failed, iab는 unavailable.
- viewport: 375×737/320×640/440×860 CSS px 검수 페이지를 준비했으나 실제 렌더링 미실행.
- source/implementation pixels 및 density normalization: 미확인/미실행. 1:1 비교를 했다고 주장하지 않는다.
- state: 준비된 화면은 실제 컴포넌트와 모의 HTTP 응답의 ready/긴 문구/빈 스킬. 추가 pending/error/expired/other 분기도 검수용으로 준비. 실서버 응답/인증을 검증한 결과가 아니다.

## Findings

- [검수 차단] 전체/집중 영역의 원본과 구현 스크린샷 비교를 수행하지 못했다. 실제 간격/줄바꿈/넘침/초점/스크롤/네이티브 공유 및 PNG 다운로드는 미검증.
- 의도된 데이터 차이: API에 username/handle이 없어 원본의 @아이디를 기웃에서 만나요로 변경했다. 닉네임으로 가짜 계정을 만들지 않는다. 사진은 실제 사용자 사진/기존 기본 아바타를 사용한다. 추가 스킬은3개와 나머지 개수로 표시한다.

## 필수 시각 항목 — 코드 대조와 미검증 구분

| 항목 | 코드에서 확인한 적용 | 실제 시각 비교 |
| --- | --- | --- |
| 글꼴/타이포그래피 | 기존 SUIT 상속, 반응형 제목24~28px/상태12~14px, 긴 한글 keep-all/anywhere | 미실행 |
| 배치/간격 | native dialog 전체 화면, max453px 본문, 부모 flex/gap 및 padding, 동일 너비3버튼과 원형 X | 미실행 |
| 색상/토큰 | #F9F8FF/흰 카드, 기존 #1C4EA3 및 지정된 상태 팔레트, 중립색 | 미실행 |
| 이미지/아이콘 | 실제 사진 및 기존 직무 아바타, 공통 Phosphor 아이콘, PNG는 실제 DOM 캡처 | 실제 렌더링/PNG 미실행 |
| 문구/데이터 | 실제 공개 카드 DTO, 스킬 없음/발급중/오류/만료/재발급 안내 | SSR/유닛 확인, 브라우저 미실행 |

## 상호작용 및 검사

- docs/typecheck/lint/build/test 모두 통과. 테스트19개(필터6/빈 화면2/공유 및 카드11), 린트 오류0/경고10(기존 앱6+로컬 보관본4). e2e는 미설정 skipped.
- 발급된 동일 URL의 복사/공유, 중복 동작 차단, 만료 차단, close/cancel 콜백, 본인 권한, 공유 DTO 조회 조건 및 AbortSignal, 카드 데이터/SKILL 필터/기본 이미지, PNG 생성·사진 실패·다운로드 요청을 모의 경계와 SSR로 검증했다.
- 브라우저 console 확인: 미실행. 실제 사진 CORS/모바일 파일 저장/OS 공유 창 및 native dialog 포커스·배경 inert·스크롤 복원은 실브라우저에서 재확인 필요.
- full-view/focused comparison evidence: 없음. 상태/이미지/문구 확인은 자동 검사이며 시각 QA를 대체하지 않는다.
- comparison history: 시각 비교를 수행하지 않아 시각 수정 iteration 없음. 테스트의 이미지 mock 보정과 카드 조회 경로 개선은 별도 구현 기록이며 시각 QA 반복으로 세지 않는다.

## Implementation Checklist

- [x] 두 공유 진입점의 전체 화면 코드 적용
- [x] 공유/복사/PNG 저장 및 실패/만료 상태 연결
- [x] 자동 검사와 회귀 테스트 통과
- [ ] 실제 모바일 렌더링과 주요 조작 확인
- [ ] 원본과 같은 조건의 스크린샷을 함께 비교하고 P0/P1/P2 판정

final result: blocked
