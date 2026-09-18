# Design QA — 팀장용 팀 상세 정보·팀원 영역

## Comparison target

- Source visual truth: 사용자가 제공한 일반 팀 상세의 활동 정보, 팀 소개, 팀원 목록 스크린샷.
- Implementation route: `/contests/seoul-data/teams/my-data-seoul/manage`.
- Intended viewport: 268 × 279 px source 이미지의 포지션 현황 아래 콘텐츠 영역.
- State: 팀장용 팀 상세에서 `포지션별 모집 현황` 아래를 본 상태.

## Evidence

- Source pixels: 268 × 279 px 사용자 제공 이미지.
- Implementation screenshot: unavailable.
- Browser and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary content implemented: 세 칸 활동 정보, 팀 소개, 아바타·역할 뱃지·전공을 포함한 세로 팀원 목록.

## Required fidelity surfaces

- Fonts and typography: 일반 팀 상세와 같은 제목·보조 텍스트·역할 뱃지 위계를 적용했으나 실제 렌더링 비교는 차단됨.
- Spacing and layout rhythm: 섹션 구분선, 3열 정보 그리드, 34px 아바타와 팀원 행 간격을 적용했으나 실제 간격 비교는 차단됨.
- Colors and visual tokens: neutral·primary·success·purple 토큰으로 정보와 팀원 상태를 구성했으나 실제 색상 비교는 차단됨.
- Image quality and asset fidelity: 참고 영역에 별도 이미지 자산은 없으며, 기존 앱의 텍스트 아바타와 역할 뱃지를 사용함. 실제 렌더 비교는 차단됨.
- Copy and content: 활동 방식, 모집 마감일, 주간 회의, 팀 소개, 팀원 역할·전공 정보를 반영했으나 줄바꿈 비교는 차단됨.

## Findings

- [P1] 브라우저 렌더 기반의 시각 비교를 수행할 수 없음.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: 정보 그리드 열 너비, 소개 문단 줄바꿈, 팀원 행 간격·아바타 크기를 참고 이미지와 동일한 뷰포트에서 검증할 수 없음.
  - Fix: 브라우저 연결 후 동일 뷰포트의 팀장용 상세 하단을 캡처하고 사용자 제공 이미지와 함께 비교한다.

## Comparison history

- 팀장용 상세의 칩 형태 팀원 목록을 일반 팀 상세와 동일한 세로형 상세 목록으로 교체함.
- 브라우저 캡처가 제공되지 않아 구현 후 시각 비교는 시작하지 못함.

## Implementation checklist

- [x] 활동 방식·모집 마감·주간 회의 정보 그리드 추가.
- [x] 팀 소개 섹션 추가.
- [x] 역할·전공을 포함한 세로형 팀원 목록 적용.
- [x] Lint 및 production build 실행.
- [ ] 브라우저 화면 캡처 후 참고 이미지와 시각 비교.

## Follow-up polish

- 브라우저가 연결되면 실제 콘텐츠 줄바꿈과 섹션 높이를 참고 이미지 기준으로 미세 조정한다.

final result: blocked
