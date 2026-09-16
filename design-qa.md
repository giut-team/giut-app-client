# Design QA — 팀 상세 페이지

## Comparison target

- Source visual truth: 사용자가 제공한 모바일 팀 상세 화면 스크린샷.
- Implementation route: `/contests/seoul-data/teams/data-seoul`.
- Intended viewport: 340 × 720 CSS px mobile viewport, device scale factor 1.
- State: `데이터로 서울을` 팀의 모집 중 상태.

## Evidence

- Source pixels: 340 × 720 px (사용자 제공 이미지).
- Implementation screenshot: unavailable.
- Browser and console check: blocked — available browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: 공모전 상세와 전체 팀 목록의 모집 중 팀 카드를 클릭하거나 상세 보기 버튼을 누르면 팀 상세 경로로 이동한다. 팀 상세의 뒤로 가기는 이전 화면으로 돌아가며, 하단 팀 지원 버튼은 팀 목록으로 이동한다.

## Required fidelity surfaces

- Fonts and typography: 기존 SUIT 기반의 제목·보조 문구·배지 계층을 적용했다. 렌더 화면 비교는 차단됨.
- Spacing and layout rhythm: 헤더, 모집 진행률, 섹션 구분선, 팀원 목록, 하단 고정 CTA의 모바일 리듬을 구현했다. 렌더 화면 비교는 차단됨.
- Colors and visual tokens: 기존 primary·neutral·success·purple 토큰으로 모집 상태, 인원 수, 팀원 역할과 CTA를 구성했다. 렌더 화면 비교는 차단됨.
- Image quality and asset fidelity: 참고 화면은 표준 UI 아이콘과 이니셜 아바타를 사용한다. 프로젝트의 기존 아이콘 라이브러리를 사용했고 별도 래스터 자산은 필요하지 않다. 렌더 화면 비교는 차단됨.
- Copy and content: 참고 화면의 팀명, 공모전명, 포지션, 활동 정보, 소개, 팀원 데이터를 반영했다. 렌더 화면 비교는 차단됨.

## Findings

- [P1] 브라우저 렌더 기반의 시각 비교를 수행할 수 없음.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: 340px 모바일 폭에서의 글자 줄바꿈, 세로 간격, 하단 CTA 안전 영역, 카드 높이를 참고 화면과 대조할 수 없다.
  - Fix: 브라우저 연결 후 같은 뷰포트에서 상세 페이지를 캡처하고, 제공된 스크린샷과 전체·팀원 영역을 비교한다.

## Comparison history

- 시각 비교 이력 없음. 브라우저 렌더 캡처가 제공되지 않아 첫 비교를 시작할 수 없었다.

## Implementation checklist

- [x] 팀 상세 라우트 추가.
- [x] 공모전 상세 및 팀 목록 카드에서 팀 상세로 이동 연결.
- [x] 모집 현황, 활동 정보, 소개, 팀원 목록, 하단 CTA 구현.
- [x] Lint 및 production build 실행.
- [ ] 동일 뷰포트의 구현 화면을 캡처해 참고 이미지와 비교.

## Follow-up polish

- 브라우저를 사용할 수 있을 때 제목·배지의 줄바꿈, 팀원 행 간격, 하단 CTA 높이를 참고 이미지와 맞춘다.

final result: blocked
