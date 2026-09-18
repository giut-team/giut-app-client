# Design QA — 팀 모집 마감 상태

## Comparison target

- Source visual truth: 사용자가 제공한 모집 마감 팀 상세 화면 스크린샷.
- Implementation route: `/contests/seoul-data/teams/my-data-seoul/manage`.
- Intended viewport: 모바일 세로 화면. 소스 이미지 픽셀은 270 × 549 px입니다.
- State: 팀장이 `모집 마감하기`를 확인한 뒤의 상태이며, 팀 정원이 모두 찬 경우에도 동일한 상태가 자동 적용됩니다.

## Evidence

- Source pixels: 270 × 549 px (사용자 제공 이미지).
- Implementation screenshot: unavailable.
- Browser and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Implemented state: 마감 배지와 회색 진행 바, 전체 마감 포지션, 비활성 마감 안내 버튼을 표시합니다. 활동 방식·팀 소개·팀원 목록은 일반 팀 상세와 같은 상세 행 UI를 유지합니다.

## Required fidelity surfaces

- Fonts and typography: 기존 팀 상세의 제목·보조 텍스트·상태 텍스트 스타일을 재사용했습니다. 실제 렌더 비교는 브라우저 부재로 차단되었습니다.
- Spacing and layout rhythm: 기존 상세의 섹션 구분과 팀원 상세 행을 재사용했습니다. 닫힌 상태의 하단 액션 영역은 새로 추가했으며 실제 화면 비교가 필요합니다.
- Colors and visual tokens: 모집 마감 상태에 neutral 토큰, 모집 중 상태에 primary 토큰을 사용했습니다. 실제 색상 비교는 차단되었습니다.
- Image quality and asset fidelity: 참고 화면에 비교가 필요한 별도 이미지 자산은 없습니다.
- Copy and content: `모집 마감`, `모집이 마감된 팀이에요`, 마감 포지션 텍스트를 소스 상태에 맞춰 반영했습니다.

## Findings

- [P1] 브라우저 렌더 기반의 시각 비교를 수행하지 못했습니다.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: 마감 화면의 간격, 줄바꿈, 하단 고정 버튼 위치를 참고 이미지와 같은 뷰포트에서 검증할 수 없습니다.
  - Fix: 브라우저 연결 후 동일한 모바일 뷰포트에서 마감 상태를 캡처하고, 소스 스크린샷과 나란히 비교합니다.

## Comparison history

- 모집 마감 확인 시 같은 팀 상세 화면이 마감 상태로 전환되도록 구현했습니다.
- 팀원 수가 정원 이상이면 별도의 버튼 동작 없이도 동일한 마감 상태가 적용되도록 처리했습니다.
- 구현 스크린샷을 확보할 수 없어 시각 비교 반복은 시작하지 못했습니다.

## Implementation checklist

- [x] 수동 모집 마감 후 마감 상태 전환.
- [x] 팀 정원 충족 시 마감 상태 자동 적용.
- [x] 모든 포지션의 마감 상태와 회색 진행 바 반영.
- [x] 활동 방식, 팀 소개, 팀원 목록을 일반 팀 상세와 같은 UI로 구성.
- [x] Lint 및 production build 실행.
- [ ] 브라우저 캡처와 참고 이미지 시각 비교.

## Follow-up polish

- 브라우저가 연결되면 하단 비활성 버튼과 채팅 버튼의 안전 영역 간격을 참고 이미지 기준으로 미세 조정합니다.

final result: blocked
