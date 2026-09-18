# Design QA — 아이디로 팀원 초대

## Comparison target

- Source visual truth: 사용자가 제공한 아이디 초대 검색 화면과 초대 확인 바텀시트 스크린샷.
- Implementation route: 팀장 팀 상세의 `팀원 초대하기` → `아이디로 초대`.
- Intended viewport: 모바일 세로 화면. 소스 이미지 픽셀은 627 × 638 px이며, 검색 결과와 확인 시트 두 상태를 함께 담고 있습니다.
- States: 아이디 검색 결과, 후보의 `초대 보내기` 선택 후 확인 바텀시트.

## Evidence

- Source pixels: 627 × 638 px (사용자 제공 이미지).
- Implementation screenshot: unavailable.
- Browser and console check: blocked — browser runtime returned `No browser is available`.
- Code checks: `npm run lint` and `npm run build` passed.
- Primary interactions implemented: 검색어 입력·초기화, 후보 검색 결과, 후보별 초대 확인, 초대 전송 토스트, 전송 후 `초대 보냄` 상태, 팀 상세의 초대 수락 대기 표시.

## Required fidelity surfaces

- Fonts and typography: 기존 팀 상세의 SUIT 기반 제목·보조 문구·버튼 위계를 재사용했습니다. 실제 렌더 비교는 브라우저 부재로 차단되었습니다.
- Spacing and layout rhythm: 검색 영역, 결과 카드, 스킬 배지, 확인 시트의 요약 행과 하단 액션 영역을 소스 구성에 맞춰 구현했습니다. 실제 간격 비교가 필요합니다.
- Colors and visual tokens: primary·neutral 토큰으로 검색 결과의 초대 CTA, 후보 배지, 확인 상태와 오버레이를 구성했습니다. 실제 색상 비교는 차단되었습니다.
- Image quality and asset fidelity: 참고 화면에 비교가 필요한 별도 이미지·일러스트 자산은 없습니다. 표준 UI 아이콘은 기존 아이콘 시스템을 사용합니다.
- Copy and content: 아이디 검색, 후보 프로필, 초대 포지션, 팀 인원 변화, 안내 메시지 내용을 화면 목적에 맞춰 반영했습니다.

## Findings

- [P1] 브라우저 렌더 기반의 시각 비교를 수행하지 못했습니다.
  - Evidence: browser runtime returned `No browser is available`.
  - Impact: 검색 결과 카드 높이, 초대 확인 시트의 세로 여백, 하단 안전 영역을 참고 이미지와 같은 뷰포트에서 검증할 수 없습니다.
  - Fix: 브라우저 연결 후 동일한 모바일 뷰포트에서 검색 결과와 확인 시트를 각각 캡처해 소스 이미지와 비교합니다.

## Comparison history

- 기존 팀원 초대 바텀시트의 아이디 초대 항목을 검색 화면으로 연결했습니다.
- 공통 `BottomSheet`를 재사용해 후보별 초대 확인 흐름을 추가했습니다.
- 초대 전송 뒤 후보 카드와 팀 상세의 팀원 영역에 초대 보냄 상태를 추가했습니다.
- 구현 스크린샷을 확보할 수 없어 시각 비교 반복은 시작하지 못했습니다.

## Implementation checklist

- [x] 아이디·닉네임 검색 입력과 검색어 초기화.
- [x] 후보 프로필, 스킬, 초대 CTA 카드 구성.
- [x] 후보 선택 후 초대 확인 공통 바텀시트 표시.
- [x] 초대 전송 토스트와 취소 동작.
- [x] 초대 전송 후 후보 카드 및 팀 상세의 초대 수락 대기 상태 표시.
- [x] Lint 및 production build 실행.
- [ ] 브라우저 캡처와 참고 이미지 시각 비교.

## Follow-up polish

- 브라우저가 연결되면 카드와 바텀시트의 패딩·글자 크기를 참고 이미지 기준으로 미세 조정합니다.

final result: blocked
