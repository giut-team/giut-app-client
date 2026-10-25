const assert = require("node:assert/strict");
const test = require("node:test");
const { QueryClient, QueryObserver } = require("@tanstack/react-query");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const filters = { primaryRoles: [], departments: [], grades: [] };
const detail = { nickname: "김민재", recommended: false, recommendationCount: 0, profile: { userId: 9, portfolioItems: [{ id: 37, title: "작업물" }] } };
const waitUntil = async predicate => {
  for (let step = 0; step < 100; step += 1) {
    if (predicate()) return;
    await new Promise(resolve => setImmediate(resolve));
  }
  assert.fail("observer가 기대 상태에 도달하지 못함");
};

function harness(t, overrides = {}) {
  const calls = [];
  const client = new QueryClient();
  const subscriptions = [];
  t.after(() => { subscriptions.forEach(unsubscribe => unsubscribe()); client.clear(); });
  const options = loadModule("src/pages/GiutHub/profileQueries.ts", {
    "../../api/giutHub": {
      getPublicProfilesForFilters: async (selection, signal) => { calls.push({ type: "list", selection, signal }); return [{ userId: 9 }]; },
      getPublicProfile: async (id, signal) => { calls.push({ type: "detail", id, signal }); return detail; },
      ...overrides,
    },
  }, {}, { sameRealm: true });
  const mount = config => {
    const observer = new QueryObserver(client, config);
    const unsubscribe = observer.subscribe(() => {});
    subscriptions.push(unsubscribe);
    return { observer, unsubscribe };
  };
  return { client, calls, mount, ...options };
}

test("목록→프로필→목록, 기존/새 목록 재진입은 첫 목록 요청1회만 사용한다", async t => {
  const h = harness(t);
  const first = h.mount(h.profileListOptions(filters, 1));
  await waitUntil(() => first.observer.getCurrentResult().isSuccess);
  first.unsubscribe();
  const profile = h.mount(h.profileDetailOptions(9, 1));
  await waitUntil(() => profile.observer.getCurrentResult().isSuccess);
  profile.unsubscribe();
  const returned = h.mount(h.profileListOptions({ grades: [], departments: [], primaryRoles: [] }, 1));
  assert.equal(returned.observer.getCurrentResult().isSuccess, true);
  assert.equal(returned.observer.getCurrentResult().isFetching, false);
  returned.unsubscribe();
  const preview = h.mount(h.profileListOptions(filters, 1));
  assert.equal(preview.observer.getCurrentResult().isFetching, false);
  assert.equal(h.calls.filter(call => call.type === "list").length, 1);
  assert.equal(h.calls.filter(call => call.type === "detail").length, 1);
});

test("사용자ID 없는 정상 세션도 목록→4번→목록→3번→목록에서 목록은1회만 요청한다", async t => {
  const h = harness(t);
  const { createAuthQueryScope } = loadModule("src/contexts/authQueryScope.ts", {}, {}, { sameRealm: true });
  const session = createAuthQueryScope();
  const readScope = () => session.resolve(null, undefined);
  for (const target of [4, 3]) {
    const list = h.mount(h.profileListOptions(filters, readScope()));
    await waitUntil(() => list.observer.getCurrentResult().isSuccess);
    list.unsubscribe();
    const profile = h.mount(h.profileDetailOptions(target, readScope()));
    await waitUntil(() => profile.observer.getCurrentResult().isSuccess);
    profile.unsubscribe();
  }
  const returned = h.mount(h.profileListOptions(filters, readScope()));
  assert.equal(returned.observer.getCurrentResult().isFetching, false);
  assert.equal(h.calls.filter(call => call.type === "list").length, 1);
  assert.equal(h.calls.filter(call => call.type === "detail").length, 2);
  assert.equal(h.profileListOptions(filters, readScope()).staleTime, h.PROFILE_STALE_TIME);
});

test("인증ID 미확인 캐시는 자격증명 교체·인증 provider 재생성 시 분리하고 토큰은 key에 넣지 않는다", async t => {
  const h = harness(t);
  const { createAuthQueryScope } = loadModule("src/contexts/authQueryScope.ts", {}, {}, { sameRealm: true });
  const session = createAuthQueryScope();
  const first = session.resolve("synthetic-token-a");
  assert.equal(session.resolve("synthetic-token-a"), first);
  const otherCredential = session.resolve("synthetic-token-b");
  assert.notEqual(first, otherCredential);
  const otherProvider = createAuthQueryScope().resolve("synthetic-token-b");
  assert.notEqual(otherCredential, otherProvider);
  assert.notEqual(session.resolve("synthetic-token-b", 1), session.resolve("synthetic-token-b", 2));
  assert.equal([first, otherCredential, otherProvider].some(key => key.includes("synthetic-token")), false);
  await h.client.fetchQuery(h.profileListOptions(filters, first));
  await h.client.fetchQuery(h.profileListOptions(filters, otherCredential));
  assert.equal(h.calls.length, 2);
  assert.equal(JSON.stringify(h.client.getQueryCache().getAll().map(query => query.queryKey)).includes("synthetic-token"), false);
});

test("randomUUID가 없는 모바일 HTTP 환경도 같은 세션 캐시 키를 유지한다", () => {
  const { createAuthQueryScope } = loadModule("src/contexts/authQueryScope.ts", {}, { crypto: { getRandomValues: array => { array.fill(123); return array; } } });
  const session = createAuthQueryScope();
  assert.equal(session.resolve(null), session.resolve(null));
  assert.match(session.resolve(null), /^auth-session:/);
});

test("AuthProvider는 profile:null 응답에서도 화면 재렌더 사이 같은 queryScope를 전달한다", async () => {
  const React = require("react");
  const { createAuthQueryScope } = loadModule("src/contexts/authQueryScope.ts", {}, {}, { sameRealm: true });
  let savedState, credential = null, refreshes = 0, storageBlocked = false;
  const { AuthProvider } = loadModule("src/contexts/AuthContext.tsx", {
    react: { ...React, useState: initializer => {
      savedState ??= initializer();
      return [savedState, next => { savedState = next; }];
    } },
    "@tanstack/react-query": { useQuery: () => ({ data: { profile: null, profileCompleted: false }, isPending: false, isError: false, refetch: async () => { refreshes += 1; } }) },
    "../api/authSession": { getAuthSession: async () => ({}) },
    "./authQueryScope": { createAuthQueryScope },
  }, { localStorage: { getItem: () => { if (storageBlocked) throw new Error("Storage blocked"); return credential; } } });
  const read = () => AuthProvider({ children: null }).props.value;
  const first = read();
  assert.equal(first.profile, null);
  assert.equal(first.isAuthenticated, true);
  assert.equal(read().queryScope, first.queryScope);
  credential = "synthetic-new-account";
  const changed = read();
  assert.notEqual(changed.queryScope, first.queryScope);
  await changed.refreshAuth();
  assert.equal(refreshes, 1);
  assert.notEqual(read().queryScope, changed.queryScope);
  storageBlocked = true;
  assert.doesNotThrow(read);
});

test("프로필·작품 상세는 같은 캐시를 쓰며 추천 성공 갱신 후 재요청하지 않는다", async t => {
  const h = harness(t);
  const first = h.mount(h.profileDetailOptions(9, 1));
  await waitUntil(() => first.observer.getCurrentResult().isSuccess);
  first.unsubscribe();
  const { updateDetailRecommendation } = loadModule("src/pages/GiutHub/profileDetail.ts");
  h.client.setQueryData(h.profileKeys.detail(9, 1), previous => updateDetailRecommendation(previous, { userId: 9, recommended: true, recommendationCount: 1 }));
  const portfolio = h.mount(h.profileDetailOptions(9, 1));
  const result = portfolio.observer.getCurrentResult();
  assert.equal(result.data.recommended, true);
  assert.equal(result.data.profile.portfolioItems[0].id, 37);
  assert.equal(result.isFetching, false);
  assert.equal(h.calls.length, 1);
});

test("필터·계정·프로필 변경은 별도 요청, 선택 순서만 다른 필터는 같은 캐시", async t => {
  const h = harness(t);
  const selection = { primaryRoles: ["DESIGN", "DEVELOPMENT"], departments: ["경제학부", "디자인학과"], grades: [5, 4] };
  await h.client.fetchQuery(h.profileListOptions(selection, 1));
  await h.client.fetchQuery(h.profileListOptions({ primaryRoles: ["DEVELOPMENT", "DESIGN", "DESIGN"], departments: ["디자인학과", "경제학부"], grades: [4, 5] }, 1));
  assert.equal(h.calls.length, 1);
  await h.client.fetchQuery(h.profileListOptions({ ...selection, grades: [3] }, 1));
  await h.client.fetchQuery(h.profileListOptions(selection, 2));
  assert.equal(h.calls.length, 3);
  assert.equal(h.client.getQueryData(h.profileKeys.detail(9, 2)), undefined);
  await h.client.fetchQuery(h.profileDetailOptions(9, 1));
  await h.client.fetchQuery(h.profileDetailOptions(10, 1));
  await h.client.fetchQuery(h.profileDetailOptions(9, 2));
  assert.equal(h.calls.filter(call => call.type === "detail").length, 3);
});

test("5분 경과 후 재진입은 기존 데이터를 유지하며 갱신, 수동 새로고침도 가능", async t => {
  const h = harness(t);
  const config = h.profileListOptions(filters, 1);
  await h.client.fetchQuery(config);
  h.client.setQueryData(config.queryKey, [{ userId: 9 }], { updatedAt: Date.now() - h.PROFILE_STALE_TIME - 1 });
  const expired = h.mount(config);
  assert.equal(expired.observer.getCurrentResult().isPending, false);
  assert.equal(expired.observer.getCurrentResult().isFetching, true);
  await waitUntil(() => !expired.observer.getCurrentResult().isFetching);
  assert.equal(h.calls.length, 2);
  await expired.observer.refetch();
  assert.equal(h.calls.length, 3);
});

test("창 포커스는 재요청하지 않고 명시적 무효화는 fresh 상세도 갱신한다", async t => {
  const h = harness(t);
  const config = h.profileDetailOptions(9, 1);
  const first = h.mount(config);
  await waitUntil(() => first.observer.getCurrentResult().isSuccess);
  h.client.setQueryData(config.queryKey, detail, { updatedAt: Date.now() - h.PROFILE_STALE_TIME - 1 });
  assert.equal(first.observer.shouldFetchOnWindowFocus(), false);
  h.client.getQueryCache().onFocus();
  assert.equal(h.calls.length, 1);
  h.client.setQueryData(config.queryKey, detail);
  await h.client.invalidateQueries({ queryKey: ["giut-hub", "profile", 9] });
  assert.equal(h.calls.length, 2);
});

test("오류는 성공 캐시가 아니며 재진입에서 재시도, 잘못된id는 조회하지 않는다", async t => {
  let attempts = 0;
  const h = harness(t, { getPublicProfilesForFilters: async () => { attempts += 1; if (attempts === 1) throw new Error("연결 실패"); return []; } });
  const first = h.mount(h.profileListOptions(filters, 1));
  await waitUntil(() => first.observer.getCurrentResult().isError);
  first.unsubscribe();
  const second = h.mount(h.profileListOptions(filters, 1));
  await waitUntil(() => second.observer.getCurrentResult().isSuccess);
  assert.equal(attempts, 2);
  for (const id of [0, -1, NaN, 1.2]) h.mount(h.profileDetailOptions(id, 1));
  assert.equal(h.calls.length, 0);
});

test("사용자를 식별하지 못하면 장기 캐시를 피하고 기존 API 취소 신호를 전달한다", async t => {
  const h = harness(t);
  assert.equal(h.profileListOptions(filters).staleTime, 0);
  assert.equal(h.profileDetailOptions(9).gcTime, 0);
  assert.equal(h.profileListOptions(filters, 1).gcTime, 30 * 60 * 1000);
  await h.client.fetchQuery(h.profileListOptions(filters, 1));
  await h.client.fetchQuery(h.profileDetailOptions(9, 1));
  assert.equal(h.calls.every(call => typeof call.signal?.aborted === "boolean"), true);
});

test("기존 화면 필터 주소를 복원하면 같은 요청 조건이며 외부 복귀 주소를 허용하지 않는다", () => {
  const { readHubFilterSelection, writeHubFilterSelection, buildPublicProfileFilters, hubListReturnTo } = loadModule("src/pages/GiutHub/giutHubFilters.ts", {}, { URLSearchParams });
  const selection = { selectedPositions: ["개발", "디자인"], selectedTeamStatus: "팀 찾는 중", selectedDepartments: ["컴퓨터과학부"], selectedGrades: [4] };
  const address = writeHubFilterSelection(new URLSearchParams("keep=1"), selection);
  const restored = readHubFilterSelection(new URLSearchParams(address.toString()));
  assert.equal(JSON.stringify(restored), JSON.stringify(selection));
  assert.equal(address.get("keep"), "1");
  const request = value => buildPublicProfileFilters({ activeCategory: "전체", ...value });
  assert.equal(JSON.stringify(request(restored)), JSON.stringify(request(selection)));
  const cleared = writeHubFilterSelection(address, { selectedPositions: [], selectedTeamStatus: "전체", selectedDepartments: [], selectedGrades: [] });
  assert.equal(cleared.toString(), "keep=1");
  assert.equal(hubListReturnTo(`/giut-hub?${address.toString()}`), `/giut-hub?${address.toString()}`);
  for (const input of ["https://example.test", "//example.test", "/giut-hub-elsewhere", null]) assert.equal(hubListReturnTo(input), "/giut-hub");
});
