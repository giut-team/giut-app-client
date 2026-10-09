const assert = require("node:assert/strict");
const test = require("node:test");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

function loadApi(get) {
  return loadModule("src/api/giutHub.ts", {
    axios: { __esModule: true, default: {
      create: () => ({ get, interceptors: { request: { use() {} } } }),
    } },
    "./client": { API_BASE_URL: "https://api.example.test" },
  });
}

const { buildPublicProfileFilters } = loadModule("src/pages/GiutHub/giutHubFilters.ts");
const emptyState = {
  activeCategory: "전체", selectedPositions: [], selectedTeamStatus: "전체",
  selectedDepartments: [], selectedGrades: [],
};
const plain = (value) => JSON.parse(JSON.stringify(value));
const pause = () => new Promise((resolve) => setTimeout(resolve, 5));

test("UI 선택을 서버 enum으로 변환하고 4학년 이상은 4/5학년으로 조회한다", () => {
  const state = {
    ...emptyState, selectedPositions: ["개발", "디자인"],
    selectedTeamStatus: "팀 찾는 중", selectedDepartments: ["컴퓨터과학부"],
    selectedGrades: [3, 4],
  };
  assert.deepEqual(plain(buildPublicProfileFilters(state)), {
    primaryRoles: ["DESIGN", "DEVELOPMENT"], departments: ["컴퓨터과학부"],
    grades: [3, 4, 5], activityStatus: "LOOKING_FOR_TEAM",
  });
  assert.equal(buildPublicProfileFilters({ ...state, selectedTeamStatus: "제안 검토 중" }).activityStatus, "OPEN_TO_OFFERS");
  assert.deepEqual(plain(buildPublicProfileFilters(emptyState)), {
    primaryRoles: [], departments: [], grades: [],
  });
});

test("동일한 복수 선택은 선택 순서와 무관하게 같은 캐시 키 데이터를 만든다", () => {
  const first = buildPublicProfileFilters({
    ...emptyState, selectedPositions: ["개발", "디자인", "개발"],
    selectedDepartments: ["컴퓨터과학부", "디자인학과"], selectedGrades: [4, 3],
  });
  const second = buildPublicProfileFilters({
    ...emptyState, selectedPositions: ["디자인", "개발"],
    selectedDepartments: ["디자인학과", "컴퓨터과학부"], selectedGrades: [3, 4],
  });
  assert.deepEqual(plain(first), plain(second));
  assert.deepEqual(plain(buildPublicProfileFilters({ ...emptyState, activeCategory: "기획", selectedPositions: ["개발"] }).primaryRoles), ["PLANNING"]);
});

test("전체 필터 AND 조건과 취소 신호를 모든 페이지에 동일하게 전달한다", async () => {
  const calls = [];
  const controller = new AbortController();
  const api = loadApi(async (url, options) => {
    assert.equal(url, "/api/profile");
    calls.push(options);
    return { data: { totalPages: 2, profiles: [{ userId: options.params.page === 0 ? 2 : 3 }] } };
  });
  const filters = {
    primaryRoles: ["DEVELOPMENT"], departments: ["컴퓨터과학부"], grades: [3],
    activityStatus: "LOOKING_FOR_TEAM", role: "BACKEND_DEVELOPER", skillTagId: 1,
  };
  const profiles = await api.getPublicProfilesForFilters(filters, controller.signal);
  assert.deepEqual(plain(profiles.map(({ userId }) => userId)), [3, 2]);
  assert.equal(calls.length, 2);
  calls.forEach(({ params, signal }, page) => {
    assert.deepEqual(plain(params), {
      page, primaryRole: "DEVELOPMENT", department: "컴퓨터과학부", grade: 3,
      activityStatus: "LOOKING_FOR_TEAM", role: "BACKEND_DEVELOPER", skillTagId: 1,
    });
    assert.equal(signal, controller.signal);
  });
});

test("복수 선택은 조합별 OR로 합치고 최대 4개 요청, 중복 제거 및 서버 정렬을 유지한다", async () => {
  const calls = [];
  let active = 0;
  let peak = 0;
  const api = loadApi(async (_url, { params }) => {
    calls.push(plain(params));
    active += 1;
    peak = Math.max(peak, active);
    await pause();
    active -= 1;
    const userId = 10 + (params.primaryRole === "DESIGN" ? 4 : 0)
      + (params.department === "디자인학과" ? 2 : 0) + (params.grade === 5 ? 1 : 0);
    return { data: { totalPages: 1, profiles: [{ userId: 1 }, { userId }] } };
  });
  const profiles = await api.getPublicProfilesForFilters({
    primaryRoles: ["DEVELOPMENT", "DESIGN", "DEVELOPMENT"],
    departments: ["컴퓨터과학부", "디자인학과"], grades: [4, 5], activityStatus: "OPEN_TO_OFFERS",
  });
  assert.equal(calls.length, 8);
  assert.equal(new Set(calls.map((call) => JSON.stringify(call))).size, 8);
  assert.equal(peak, 4);
  assert.ok(calls.every(({ activityStatus }) => activityStatus === "OPEN_TO_OFFERS"));
  assert.deepEqual(plain(profiles.map(({ userId }) => userId)), [17, 16, 15, 14, 13, 12, 11, 10, 1]);
});

test("초기화는 모든 조건을 생략하고 취소된 조회는 추가 페이지를 요청하지 않는다", async () => {
  const calls = [];
  const controller = new AbortController();
  const api = loadApi(async (_url, { params }) => {
    calls.push(plain(params));
    controller.abort();
    return { data: { totalPages: 2, profiles: [] } };
  });
  await assert.rejects(
    () => api.getPublicProfilesForFilters(buildPublicProfileFilters(emptyState), controller.signal),
    { name: "AbortError" },
  );
  assert.deepEqual(calls, [{ page: 0 }]);
  await assert.rejects(
    () => api.getPublicProfilesForFilters(buildPublicProfileFilters(emptyState), controller.signal),
    { name: "AbortError" },
  );
  assert.equal(calls.length, 1);
});

test("한 조합 실패를 부분 성공으로 숨기지 않고 대기 중인 조합을 중단한다", async () => {
  let calls = 0;
  const api = loadApi(async () => {
    calls += 1;
    if (calls === 1) throw new Error("API failure");
    await pause();
    return { data: { totalPages: 1, profiles: [] } };
  });
  await assert.rejects(() => api.getPublicProfilesForFilters({
    primaryRoles: ["DEVELOPMENT", "DESIGN"], departments: ["컴퓨터과학부", "디자인학과"], grades: [4, 5],
  }), /API failure/);
  await pause();
  assert.equal(calls, 4);
});
