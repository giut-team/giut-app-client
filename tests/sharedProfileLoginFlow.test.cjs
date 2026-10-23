const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { AxiosError } = require("axios");
const { loadModule } = require("./helpers/loadTypeScript.cjs");
const token = "B".repeat(43);

function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}

test("OAuth 복귀는 공유 링크만 허용하고 반복 effect에서 다른 화면으로 덮어쓰지 않는다", () => {
  const utils = loadModule("src/pages/Login/loginReturn.ts");
  const store = storage();
  utils.saveSharedProfileReturn(token, store);
  store.setItem("kakao-login-pending", "true");
  assert.equal(utils.completePendingLogin(true, store), `/api/profile/shares/${token}`);
  assert.equal(utils.completePendingLogin(true, store), null);
  assert.equal(store.getItem("giut-login-return"), null);
  for (const path of ["https://evil.example", "//evil.example", "/login", `/api/profile/shares/${token}?redirect=evil`]) {
    store.setItem("giut-login-return", path);
    store.setItem("kakao-login-pending", "true");
    assert.equal(utils.completePendingLogin(true, store), "/student-verification");
  }
  utils.saveSharedProfileReturn(token, store);
  store.setItem("kakao-login-pending", "true");
  assert.equal(utils.completePendingLogin(false, store), null);
  assert.equal(store.getItem("giut-login-return"), `/api/profile/shares/${token}`);
});

test("새 카카오 로그인은 공유 복귀 경로를 보존하고 이전 bearer를 정리한다", () => {
  const store = storage(), removed = [], destinations = [];
  const utils = loadModule("src/pages/Login/loginReturn.ts");
  utils.saveSharedProfileReturn(token, store);
  const { LoginPage } = loadModule("src/pages/Login/LoginPage.tsx", {
    "../../api/client": { API_BASE_URL: "https://api.example" },
    "../../assets/giut-logo.svg": "/logo.svg",
    "../../components/icons": { Icon: () => null },
    "./LoginPage.styles": { S: new Proxy({}, { get: () => "div" }) },
  }, { sessionStorage: store, localStorage: { removeItem: key => removed.push(key) },
    window: { location: { assign: path => destinations.push(path) } } });
  function findAction(element) {
    if (!React.isValidElement(element)) return undefined;
    if (element.props.onClick) return element;
    return React.Children.toArray(element.props.children).map(findAction).find(Boolean);
  }
  findAction(LoginPage()).props.onClick();
  assert.deepEqual(removed, ["accessToken"]);
  assert.deepEqual(destinations, ["https://api.example/api/oauth/kakao/authorization"]);
  assert.equal(utils.completePendingLogin(true, store), `/api/profile/shares/${token}`);
});

test("학교 미인증403은 허용된 세션 확인 API로 검증하고401/네트워크 실패를 로그인 성공으로 바꾸지 않는다", async () => {
  const calls = [];
  let failure = new AxiosError("forbidden", undefined, undefined, undefined, { status: 403 });
  const { getAuthSession } = loadModule("src/api/authSession.ts", {
    "./client": { api: { get: async path => {
      calls.push(path);
      if (path.endsWith("/profile")) throw failure;
      return { data: { universityVerified: false } };
    } } },
  });
  assert.equal((await getAuthSession()).universityVerified, false);
  assert.deepEqual(calls, ["/api/userprofile/me/profile", "/api/members/university-email/status"]);
  failure = new AxiosError("expired", undefined, undefined, undefined, { status: 401 });
  calls.length = 0;
  await assert.rejects(getAuthSession, /expired/);
  assert.equal(calls.length, 1);
  failure = new Error("network");
  await assert.rejects(getAuthSession, /network/);
});

test("회원용 공유 식별 API는 인증 client로 token과 취소 신호를 보내고 잘못된 ID를 거부한다", async () => {
  const calls = [];
  let userId = 13;
  const { getSharedProfileTarget } = loadModule("src/api/profileShares.ts", {
    "./client": { API_BASE_URL: "https://api.example", api: { get: async (...args) => { calls.push(args); return { data: { userId } }; } } },
  });
  const controller = new AbortController();
  assert.equal((await getSharedProfileTarget("a/b", controller.signal)).userId, 13);
  assert.equal(calls[0][0], "/api/profile/shares/a%2Fb/target");
  assert.equal(calls[0][1].signal, controller.signal);
  userId = 0;
  await assert.rejects(() => getSharedProfileTarget(token), /프로필/);
});

const S = new Proxy({}, { get: (_target, name) => {
  const tag = name === "Name" ? "h1" : name === "EmptyTitle" ? "h2" : name === "EmptyDescription" ? "p" : "div";
  return ({ children }) => React.createElement(tag, null, children);
} });
const { SharedProfileLoginPrompt } = loadModule("src/pages/GiutHub/SharedProfileLoginPrompt.tsx", {
  "../../components/Button": { Button: ({ children, onClick }) => React.createElement("button", { onClick }, children) },
  "../../components/icons": { Icon: () => null },
  "../../design-system/tokens.generated": loadModule("src/design-system/tokens.generated.ts"),
});

test("공유 페이지는 인증 확인 후 중앙 로그인 안내 또는 정확한 회원 상세로 분기하고 만료 정보를 숨긴다", () => {
  let auth = { isAuthenticated: false, isLoading: false };
  let shared = { data: { nickname: "상대", primaryRoles: [], skills: [], departmentName: "학과", grade: 3 }, isError: false };
  let target = {};
  const options = {}, navigations = [], returns = [];
  const { SharedProfilePage } = loadModule("src/pages/GiutHub/SharedProfilePage.tsx", {
    react: { useState: initial => [initial, () => {}] },
    "@tanstack/react-query": { useQuery: value => {
      options[value.queryKey[0]] = value;
      return value.queryKey[0] === "shared-profile" ? shared : target;
    } },
    "react-router-dom": { useParams: () => ({ token }), useNavigate: () => path => navigations.push(path),
      Navigate: ({ to }) => React.createElement("a", { href: to }, "이동") },
    "../../api/profileShares": { getSharedProfile() {}, getSharedProfileTarget() {}, getSharedProfileErrorMessage: () => "만료된 링크예요" },
    "../../contexts/AuthContext": { useAuth: () => auth },
    "./SharedProfileLoginPrompt": { SharedProfileLoginPrompt },
    "../../components/PageHeader": { PageHeader: () => null },
    "../../components/Button": { Button: ({ children }) => React.createElement("button", null, children) },
    "../../components/icons": { Icon: () => null },
    "../../design-system/tokens.generated": loadModule("src/design-system/tokens.generated.ts"),
    "./GiutHubProfilePage.styles": { S },
    "./profileStatus": loadModule("src/pages/GiutHub/profileStatus.ts"),
    "../Login/loginReturn": { saveSharedProfileReturn: value => returns.push(value) },
  });
  const render = () => renderToStaticMarkup(SharedProfilePage());
  assert.match(render(), /role="dialog"/);
  assert.equal(options["shared-profile-target"].enabled, false);
  const tree = SharedProfilePage();
  const modal = React.Children.toArray(tree.props.children).find(child => child.type === SharedProfileLoginPrompt);
  modal.props.onLogin();
  assert.deepEqual(returns, [token]); assert.deepEqual(navigations, ["/login"]);
  auth = { isAuthenticated: false, isLoading: true };
  assert.doesNotMatch(render(), /role="dialog"/);
  auth = { isAuthenticated: true, isLoading: false };
  target = { data: { userId: 13 } };
  assert.match(render(), /href="\/giut-hub\/13"/);
  assert.equal(options["shared-profile-target"].enabled, true);
  target = { data: { userId: 13 }, isFetching: true };
  assert.doesNotMatch(render(), /href="\/giut-hub\/13"/, "인증 대상 재검증 중 캐시만으로 이동하면 안 됨");
  target = { data: { userId: 13 } };
  shared = { ...shared, isError: true };
  assert.match(render(), /만료된 링크/);
  assert.doesNotMatch(render(), /상대|href="\/giut-hub/);
  shared = { ...shared, isError: false };
  target = { isError: true, error: new AxiosError("expired", undefined, undefined, undefined, { status: 401 }) };
  assert.match(render(), /role="dialog"/);
  target = { isError: true, error: new AxiosError("forbidden", undefined, undefined, undefined, { status: 403 }) };
  assert.match(render(), /인증 상태를 확인/);
  assert.doesNotMatch(render(), /role="dialog"/);
});

test("프로필 추천은 Swagger 경로·응답으로 조회·추천·취소하고 실패와 취소 신호를 전달한다", async () => {
  let recommended = false, fail = false;
  const calls = [];
  const response = () => ({ data: { userId: 13, recommended, recommendationCount: recommended ? 5 : 4 } });
  const { getProfileRecommendation, setProfileRecommendation } = loadModule("src/api/profileActions.ts", {
    "./client": { api: {
      get: async (path, config) => { calls.push(["GET", path, config]); if (fail) throw new Error("denied"); return response(); },
      post: async (...args) => { calls.push(["POST", ...args]); if (fail) throw new Error("denied"); recommended = true; return response(); },
      delete: async (...args) => { calls.push(["DELETE", ...args]); if (fail) throw new Error("denied"); recommended = false; return response(); },
    } },
  });
  const controller = new AbortController();
  assert.equal((await getProfileRecommendation(13, controller.signal)).recommended, false);
  assert.equal(calls[0][2].signal, controller.signal);
  const added = await setProfileRecommendation(13, true);
  assert.equal(added.recommended, true);
  assert.equal(added.recommendationCount, 5);
  assert.equal((await getProfileRecommendation(13)).recommended, true);
  const removed = await setProfileRecommendation(13, false);
  assert.equal(removed.recommended, false);
  assert.equal(removed.recommendationCount, 4);
  assert.equal((await getProfileRecommendation(13)).recommended, false);
  assert.deepEqual(calls.map(([method]) => method), ["GET", "POST", "GET", "DELETE", "GET"]);
  assert.ok(calls.every(([, path]) => path === "/api/profile/13/recommendations"));
  assert.ok(calls.filter(([method]) => method !== "GET").every(call => call.length === 2), "추천·취소는 요청 본문 없음");
  fail = true;
  await assert.rejects(() => getProfileRecommendation(13), /denied/);
  await assert.rejects(() => setProfileRecommendation(13, true), /denied/);
  await assert.rejects(() => setProfileRecommendation(13, false), /denied/);
  assert.equal(recommended, false, "저장 실패를 성공 상태로 바꾸지 않음");
});

test("추천 조회404와 연결 실패는 해당 동작의 안내를 유지하고 인증 오류는 구분한다", () => {
  const { getProfileActionError } = loadModule("src/api/profileActions.ts", { "./client": {} });
  const fallback = "추천 상태를 확인하지 못했어요.";
  const error = status => new AxiosError("failed", undefined, undefined, undefined, { status });
  assert.equal(getProfileActionError(error(404), fallback), fallback);
  assert.equal(getProfileActionError(error(500), fallback), fallback);
  assert.equal(getProfileActionError(new Error("network"), fallback), fallback);
  assert.match(getProfileActionError(error(401), fallback), /다시 로그인/);
  assert.match(getProfileActionError(error(403), fallback), /이용 권한/);
});

test("변경된 상세 DTO를 그대로 수신하고 최상위 인증·추천·제안 수와 중첩 콘텐츠를 보존한다", async () => {
  const detail = {
    nickname: "김민재", universityVerified: true, receivedProposalCount: 2, recommended: true, recommendationCount: 5,
    profile: {
      userId: 13, nickname: "김민재", departmentName: "컴퓨터과학부", grade: 3,
      primaryRoles: [{ code: "DEVELOPMENT", name: "개발" }], activityStatusName: "팀 찾는 중",
      profileImageUrl: null, bio: "AI로 더 편리한 캠퍼스 서비스를 만들고 싶어요.", searchable: true,
      roles: [{ code: "BACKEND_DEVELOPER", name: "백엔드 개발자" }],
      tags: [{ id: 1, type: "SKILL", name: "Python", relatedRoles: [{ code: "DATA_ANALYST", name: "데이터 분석" }] }],
      portfolioItems: [{ id: 1, title: "서울시 데이터 공모전 발표", representative: true }],
      activityHistories: [{ id: 1, title: "서울시 데이터 활용 공모전 우수상" }],
    },
  };
  const { getPublicProfile } = loadModule("src/api/giutHub.ts", {
    axios: { __esModule: true, default: { create: () => ({
      get: async path => { assert.equal(path, "/api/profile/13"); return { data: detail }; },
      interceptors: { request: { use() {} } },
    }) } },
    "./client": { API_BASE_URL: "https://api.example" },
  });
  const received = await getPublicProfile(13);
  assert.equal(received, detail);
  const { toDetailProfileSummary, updateDetailRecommendation } = loadModule("src/pages/GiutHub/profileDetail.ts");
  const summary = toDetailProfileSummary(received);
  assert.equal(summary.universityVerified, true, "인증은 최상위 필드에서 가져옴");
  assert.equal(summary.activityStatus, "LOOKING_FOR_TEAM", "상세에는 상태 enum 없이 이름만 있음");
  assert.equal(summary.skills[0].relatedRoles[0].code, "DATA_ANALYST");
  assert.equal(summary.roles[0].name, "백엔드 개발자");
  for (const [name, code] of [["프로필 쓰는 중", "OPEN_TO_OFFERS"], ["지금은 쉬는 중", "RESTING"]]) {
    assert.equal(toDetailProfileSummary({ ...detail, profile: { ...detail.profile, activityStatusName: name } }).activityStatus, code);
  }
  const updated = updateDetailRecommendation(received, { userId: 13, recommended: false, recommendationCount: 4 });
  assert.equal(updated.recommended, false);
  assert.equal(updated.recommendationCount, 4);
  assert.equal(updated.receivedProposalCount, 2);
  assert.equal(updated.profile, received.profile, "포트폴리오·활동 이력·태그를 포함한 상세 정보 보존");
  assert.equal(received.recommended, true, "기존 캐시 객체는 변경하지 않음");
  assert.equal(updateDetailRecommendation(received, { userId: 99, recommended: false, recommendationCount: 0 }), received);
  assert.equal(updateDetailRecommendation(undefined, { userId: 13, recommended: true, recommendationCount: 5 }), undefined);
});

test("채팅은 실제 상대 방을 생성하고 메시지 저장/전체 페이지 재조회 및 실패를 전달한다", async () => {
  const calls = [];
  let fail = false, wrongTarget = false;
  const { createPersonalChatRoom, sendChatMessage, getChatMessages, getChatRooms, getChatUnreadCount } = loadModule("src/api/chat.ts", {
    "./client": { api: {
      post: async (path, body) => { calls.push(["POST", path, body]);
        if (fail) throw new Error("send failed");
        return { data: path.endsWith("/personal") ? { chatRoomId: 5, targetUserId: wrongTarget ? 99 : body.targetUserId } : { messageId: 3, content: body.content } };
      },
      get: async (path, config) => { calls.push(["GET", path]);
        if (path === "/api/chat-rooms") return { data: { chatRooms: [{ chatRoomId: 5 }] } };
        if (path.endsWith("/unread-count")) return { data: { unreadCount: 2 } };
        return { data: config.params.page === 0 ? { messages: [{ messageId: 1 }, { messageId: 2 }], hasNext: true }
          : { messages: [{ messageId: 2 }, { messageId: 3 }], hasNext: false } };
      },
    } },
  });
  assert.equal((await createPersonalChatRoom(13)).chatRoomId, 5);
  assert.equal(calls[0][2].targetUserId, 13);
  wrongTarget = true; await assert.rejects(() => createPersonalChatRoom(13), /대화 상대/);
  assert.equal((await sendChatMessage(5, " 안녕하세요 ")).content, "안녕하세요");
  await assert.rejects(() => sendChatMessage(5, "  "), /2000/);
  await assert.rejects(() => sendChatMessage(5, "a".repeat(2001)), /2000/);
  assert.deepEqual(Array.from(await getChatMessages(5), message => message.messageId), [1, 2, 3]);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(() => getChatMessages(5, controller.signal));
  fail = true; await assert.rejects(() => sendChatMessage(5, "다시"), /send failed/);
  calls.length = 0;
  await getChatRooms(); assert.equal(await getChatUnreadCount(5), 2);
  assert.ok(calls.every(([, path]) => !path.endsWith("/messages")), "채팅 목록 조회가 메시지를 읽음 처리하면 안 됨");
});
