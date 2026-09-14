# Design QA — 내 팀 지원 대기 카드

## Comparison target

- Source visual truth: 사용자 제공 대화 내 `지원 대기` 상태의 내 팀 모바일 스크린샷.
- Implementation route: `/my-team`.
- Intended viewport: 모바일 360px 폭.
- State: 수락된 ESG 팀 카드와 별도로, 검토 대기 중인 ESG 임팩트 캠페인 지원을 선택한 상태.

## Evidence

- Source pixels: 대화 내 이미지, 360px 폭 기준.
- Implementation screenshot: 브라우저 연결을 사용할 수 없어 캡처하지 못함.
- Browser and console check: blocked — 현재 작업 환경에 연결 가능한 브라우저가 없음.
- Primary interactions implemented: 대기 카드를 선택하면 보낸 지원서·열람 타임라인을 표시하고, `지원 취소하기`에서 확인·완료 바텀시트를 거친 뒤 대기 카드가 목록에서 제거됨. `지원서 원본 보기`는 `/my-team/my-application/pending`의 상태별 상세 화면으로 이동.

## Required fidelity surfaces

- Fonts and typography: 기존 SUIT Variable 및 프로젝트 토큰의 제목·본문·보조 텍스트 크기를 재사용함. 브라우저 캡처 비교는 blocked.
- Spacing and layout rhythm: 대기 프로젝트 카드, 보낸 지원서 요약, 3단계 타임라인, 읽기 전용 카드, 취소 CTA와 바텀시트 순서로 구성함. 브라우저 캡처 비교는 blocked.
- Colors and visual tokens: 수락된 팀은 success, 대기 프로젝트·결과 대기는 새 warning 토큰, 진행 상태는 primary 토큰으로 구분함. 브라우저 캡처 비교는 blocked.
- Image quality and asset fidelity: 새 래스터 이미지 자산이 없는 UI 화면이며, 기존 아이콘 컴포넌트를 사용함. 브라우저 캡처 비교는 blocked.
- Copy and content: 대기 상태, 경과일, 제출·열람·결과 대기, 세 지원 문항, 첨부 자료, 지원 취소 안내문을 반영함.

## Findings

- [P1] 브라우저 기반 시각 QA 미완료
  - Evidence: 브라우저 런타임이 `No browser is available`를 반환함.
  - Impact: 실제 360px 렌더 결과와 레퍼런스의 미세한 여백·텍스트 줄바꿈을 비교할 수 없음.
  - Fix: 브라우저가 연결된 환경에서 `/my-team`을 360px 폭으로 캡처하고 레퍼런스와 비교.

## Implementation checklist

- [x] 수락된 ESG 팀과 별도의 지원 대기 카드 추가
- [x] warning 색상 토큰을 추가하고 대기 상태·경과일·점선 테두리·결과 대기 타임라인에 적용
- [x] 첨부 자료를 제거하고 지원 취소 CTA·안내문 유지
- [x] 공용 BottomSheet에 지원 취소 확인·완료 상태 추가
- [x] 상태별 상세 화면 경로(`/my-team/my-application/pending`)로 결과 대기 타임라인 표시
- [x] lint 및 production build 통과
- [ ] 브라우저 렌더·콘솔 검사 및 시각 비교

## Follow-up polish

- 브라우저 연결 후 타임라인 라벨의 줄바꿈과 하단 CTA의 safe-area 여백을 실제 기기 폭에서 점검.

final result: blocked
