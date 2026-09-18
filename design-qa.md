# Design QA — 팀장용 팀 관리 상세

## Comparison target

- Source visual truth: 사용자가 제공한 팀장용 모바일 팀 상세 화면 스크린샷.
- Implementation routes: `/contests/seoul-data` 및 `/contests/seoul-data/teams/my-data-seoul/manage`.
- Intended viewport: 393 × 720 CSS px mobile viewport, device scale factor 1.
- State: 공모전 상세 또는 전체 팀 목록에서 `내가 만든 팀`으로 표시된 `데이터로 서울을` 카드를 선택한 상태.

## Evidence

- Source pixels: 393 × 720 px (사용자 제공 이미지).
- Implementation screenshot: unavailable.
- Browser and console check: blocked — available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: 공모전 상세와 전체 팀 목록의 내 팀 카드는 팀장용 상세로 이동한다. 받은 지원 CTA는 지원서 관리로 이동하고, 모집 마감은 마감/재개 상태를 전환한다. 수정 및 팀원 초대는 안내 토스트를 표시한다.

## Required fidelity surfaces

- Fonts and typography: 기존 SUIT 기반의 제목·배지·보조 문구 계층을 적용했다. 렌더 화면 비교는 차단됨.
- Spacing and layout rhythm: 공모전 상세의 팀 카드, 팀 요약, 모집 포지션 카드, 가로 팀원 칩, 하단 CTA를 참고 화면 구조에 맞춰 구현했다. 렌더 화면 비교는 차단됨.
- Colors and visual tokens: primary·neutral·success·purple 토큰으로 팀장 상태, 모집 여부, 인원 수, CTA를 구성했다. 렌더 화면 비교는 차단됨.
- Image quality and asset fidelity: 참고 화면은 표준 UI와 이니셜 팀원 표기를 사용한다. 프로젝트의 기존 아이콘과 텍스트 기반 이니셜 표현을 사용했고 별도 래스터 자산은 필요하지 않다. 렌더 화면 비교는 차단됨.
- Copy and content: 참고 화면의 팀명, 공모전명, 포지션 현황, 팀원, 지원 관리 문구를 반영했다. 렌더 화면 비교는 차단됨.

## Findings

- [P1] 브라우저 렌더 기반의 시각 비교를 수행할 수 없음.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: 공모전 상세 카드의 배지 위치와 모바일 폭에서 포지션 카드·팀원 칩·하단 CTA의 높이 및 간격을 참고 화면과 대조할 수 없다.
  - Fix: 브라우저 연결 후 두 진입 경로와 팀장용 상세를 같은 뷰포트에서 캡처해 제공된 이미지와 비교한다.

## Comparison history

- 시각 비교 이력 없음. 브라우저 렌더 캡처가 제공되지 않아 첫 비교를 시작할 수 없었다.

## Implementation checklist

- [x] 전체 팀 목록에 팀장 권한의 내 팀 카드 추가.
- [x] 공모전 상세에 내 팀 카드와 식별 배지 추가.
- [x] 두 카드에서 같은 팀 관리 상세 경로로 이동 연결.
- [x] 모집 현황, 팀원 요약, 지원서 관리·모집 마감 인터랙션 구현.
- [x] Lint 및 production build 실행.
- [ ] 동일 뷰포트의 구현 화면을 캡처해 참고 이미지와 비교.

## Follow-up polish

- 브라우저를 사용할 수 있을 때 공모전 상세 카드의 배지 위치, 포지션 카드 세로 밀도, 팀원 칩 폭, 하단 버튼 높이와 여백을 참고 이미지에 맞춘다.

final result: blocked
