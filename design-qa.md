# Design QA — 내 지원서

## Comparison target

- Source visual truth: 사용자 제공 대화 내 `내 지원서` 모바일 스크린샷.
- Implementation route: `/my-team/my-application`.
- Intended viewport: 모바일 360px 폭.
- State: ESG 캠페인 프로젝트에 수락된 팀원의 읽기 전용 지원서.

## Evidence

- Source pixels: 대화 내 이미지, 360px 폭 기준.
- Implementation screenshot: 브라우저 연결을 사용할 수 없어 캡처하지 못함.
- Browser and console check: blocked — 현재 작업 환경에 연결 가능한 브라우저가 없음.
- Primary interaction implemented: ESG 팀 선택 후 `지원서 원본 보기`를 누르면 `/my-team/my-application`으로 이동.

## Required fidelity surfaces

- Fonts and typography: 기존 SUIT Variable 및 프로젝트 토큰의 제목·본문·보조 텍스트 크기를 재사용함. 브라우저 캡처 비교는 blocked.
- Spacing and layout rhythm: 상단의 흰색 팀 정보·3단계 타임라인과 하단의 회색 콘텐츠 영역을 분리하고, 프로필 카드와 질문 카드를 8px 회색 간격으로 나눔. 브라우저 캡처 비교는 blocked.
- Colors and visual tokens: 중립 배경, primary 진행 상태, success 수락 상태, purple 역할 배지를 디자인 토큰으로 구현함. 브라우저 캡처 비교는 blocked.
- Image quality and asset fidelity: 새 래스터 이미지 자산이 없는 UI 화면이며, 기존 아이콘 컴포넌트를 사용함. 브라우저 캡처 비교는 blocked.
- Copy and content: 제공된 화면의 팀명, 상태, 세 지원 문항, 읽기 전용 안내문, 팀장 채팅 CTA를 반영함.

## Findings

- [P1] 브라우저 기반 시각 QA 미완료
  - Evidence: 브라우저 런타임이 `No browser is available`를 반환함.
  - Impact: 실제 360px 렌더 결과와 레퍼런스의 미세한 여백·텍스트 줄바꿈을 비교할 수 없음.
  - Fix: 브라우저가 연결된 환경에서 `/my-team/my-application`을 360px 폭으로 캡처하고 레퍼런스와 비교.

## Implementation checklist

- [x] 내 지원서 전용 경로와 화면 추가
- [x] 지원서 원본 보기 버튼의 경로 연결
- [x] 제출·열람·수락 타임라인을 점과 라벨이 같은 줄에 오도록 정렬
- [x] 타임라인까지 흰 배경으로 묶고 프로필·질문 카드를 회색 간격으로 분리
- [x] lint 및 production build 통과
- [ ] 브라우저 렌더·콘솔 검사 및 시각 비교

## Follow-up polish

- 브라우저 연결 후 타임라인 라벨의 줄바꿈과 하단 CTA의 safe-area 여백을 실제 기기 폭에서 점검.

final result: blocked
