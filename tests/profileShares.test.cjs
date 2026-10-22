const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const token = "test_" + "a".repeat(38);
const issuedLink = { id: 1, token, createdAt: "2026-10-09T00:00:00Z", expiresAt: "2100-01-01T00:00:00Z" };
const plain = (value) => JSON.parse(JSON.stringify(value));

function loadApi(post, get = async () => ({ data: {} })) {
  let publicClientOptions;
  const api = loadModule("src/api/profileShares.ts", {
    axios: { __esModule: true, default: {
      create: (options) => { publicClientOptions = options; return { get }; },
      isAxiosError: (error) => error?.isAxiosError === true,
    } },
    "./client": { api: { post }, API_BASE_URL: "https://api.example.test" },
  });
  return { api, getOptions: () => publicClientOptions };
}

test("공유 토큰은 본인 발급 API를 body 없이 호출하고 받은 token/만료를 사용한다", async () => {
  const calls = [];
  const { api } = loadApi(async (...args) => { calls.push(args); return { data: issuedLink }; });
  assert.deepEqual(await api.createProfileShareLink(), issuedLink);
  assert.deepEqual(calls, [["/api/users/me/profile-share-links"]]);
  const broken = loadApi(async () => ({ data: { ...issuedLink, token: "" } })).api;
  await assert.rejects(() => broken.createProfileShareLink(), /발급 응답/);
  const invalidDate = loadApi(async () => ({ data: { ...issuedLink, expiresAt: "invalid" } })).api;
  await assert.rejects(() => invalidDate.createProfileShareLink(), /발급 응답/);
});

test("다른 사람의 공유 토큰은 해당 사용자 ID의 공개 프로필 발급 API를 호출한다", async () => {
  const calls = [];
  const { api } = loadApi(async (...args) => { calls.push(args); return { data: issuedLink }; });
  assert.deepEqual(await api.createProfileShareLink(13), issuedLink);
  assert.deepEqual(calls, [["/api/users/13/profile-share-links"]]);
  for (const invalid of [0, -1, NaN, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(() => api.createProfileShareLink(invalid), /공유할 프로필/);
  }
  assert.equal(calls.length, 1);
  const rejected = loadApi(async () => { throw new Error("공유할 프로필을 찾을 수 없습니다."); }).api;
  await assert.rejects(() => rejected.createProfileShareLink(13), /찾을 수 없습니다/);
});

test("비회원 조회는 발급 API client와 분리하고 토큰 경로 및 취소 신호를 전달한다", async () => {
  const calls = [];
  const controller = new AbortController();
  const profile = { nickname: "공유 사용자" };
  const { api, getOptions } = loadApi(async () => { throw new Error("must not issue"); }, async (...args) => {
    calls.push(args); return { data: profile };
  });
  assert.equal(await api.getSharedProfile("a/b ?", controller.signal), profile);
  assert.equal(calls[0][0], "/api/profile/shares/a%2Fb%20%3F");
  assert.equal(calls[0][1].signal, controller.signal);
  assert.equal(getOptions().baseURL, "https://api.example.test");
  assert.equal(getOptions().withCredentials, false);
  assert.equal(getOptions().headers, undefined);
  assert.match(api.getSharedProfileErrorMessage({ isAxiosError: true, response: { status: 404 } }), /만료/);
  assert.match(api.getSharedProfileErrorMessage({ isAxiosError: true, response: { status: 500 } }), /네트워크/);
});

test("공유 URL은 프론트 도메인과 token을 사용하고 만료 경계를 판정한다", () => {
  const utils = loadModule("src/pages/GiutHub/profileShare.ts");
  assert.equal(utils.buildProfileShareUrl(token, "https://app.example.test"), `https://app.example.test/api/profile/shares/${token}`);
  assert.equal(utils.buildProfileShareUrl("a/b", "https://app.example.test"), "https://app.example.test/api/profile/shares/a%2Fb");
  const expires = Date.parse(issuedLink.expiresAt);
  assert.equal(utils.isProfileShareExpired(issuedLink, expires - 1), false);
  assert.equal(utils.isProfileShareExpired(issuedLink, expires), true);
  assert.equal(utils.isProfileShareExpired({ ...issuedLink, expiresAt: "invalid" }), true);
});

test("복사와 기기 공유는 표시한 발급 URL을 전달하고 복사 실패를 성공으로 숨기지 않는다", async () => {
  const copied = [];
  const shared = [];
  const url = `https://app.example.test/api/profile/shares/${token}`;
  const nav = { clipboard: { writeText: async (text) => copied.push(text) }, share: async (data) => shared.push(plain(data)) };
  const utils = loadModule("src/pages/GiutHub/profileShare.ts", {}, { navigator: nav });
  await utils.copyProfileShareUrl(url);
  assert.equal(await utils.shareProfileUrl("공유 사용자", url), "shared");
  assert.deepEqual(copied, [url]);
  assert.equal(shared[0].url, url);
  nav.share = undefined;
  assert.equal(await utils.shareProfileUrl("공유 사용자", url), "copied");
  nav.clipboard.writeText = async () => { throw new Error("denied"); };
  await assert.rejects(() => utils.copyProfileShareUrl(url), /denied/);
  nav.clipboard = undefined;
  await assert.rejects(() => utils.copyProfileShareUrl(url), /자동 복사/);
  nav.share = async () => { const error = new Error("cancel"); error.name = "AbortError"; throw error; };
  assert.equal(await utils.shareProfileUrl("공유 사용자", url), "cancelled");
});

test("본인과 타인 발급 대상을 구분하고 사용자 클릭·중복 방지·로그인 조건을 유지한다", () => {
  const calls = [];
  const targets = [];
  let settle;
  const { useProfileShare } = loadModule("src/pages/GiutHub/useProfileShare.ts", {
    react: { useRef: () => ({ current: false }), useState: () => [false, () => {}] },
    "@tanstack/react-query": { useMutation: (mutation) => ({
      reset: () => {}, mutate: () => { calls.push("POST"); mutation.mutationFn(); settle = mutation.onSettled; },
    }) },
    "../../api/profileShares": { createProfileShareLink: (userId) => targets.push(userId) },
  });
  const ownShare = useProfileShare(true);
  assert.equal(calls.length, 0);
  ownShare.openShare(); ownShare.openShare(); ownShare.issueLink();
  assert.equal(calls.length, 1);
  settle(); ownShare.issueLink();
  assert.equal(calls.length, 2);
  const otherShare = useProfileShare(true, 13);
  otherShare.openShare(); otherShare.issueLink();
  assert.equal(calls.length, 3);
  assert.deepEqual(targets, [undefined, undefined, 13]);
  const loggedOutShare = useProfileShare(false, 13);
  loggedOutShare.openShare(); loggedOutShare.issueLink();
  assert.equal(calls.length, 3);
});

const S = new Proxy({}, { get: (_target, name) => {
  const tag = /Button|Channel$/.test(name) ? "button" : name === "Name" ? "h1" : name === "EmptyTitle" ? "h2" : name === "EmptyDescription" ? "p" : name === "Screen" ? "dialog" : "div";
  return ({ children, disabled, role, ...props }) => React.createElement(tag, {
    disabled, role, "aria-label": props["aria-label"],
  }, children);
} });
const Button = ({ children, disabled }) => React.createElement("button", { disabled }, children);
const PageHeader = ({ title }) => React.createElement("h2", null, title);

test("공유 방문 화면은 비회원 DTO만 렌더링하고 만료 시 이전 프로필을 노출하지 않는다", () => {
  const profile = {
    nickname: "공유 사용자", departmentName: "컴퓨터과학부", grade: 3,
    primaryRoles: [{ code: "DEVELOPMENT", name: "개발" }],
    activityStatusName: "팀 찾는 중", bio: "함께 개발해요", profileImageUrl: null,
    skills: [{ id: 1, type: "SKILL", name: "React" }],
  };
  let queryState = { data: profile, isPending: false, isError: false, refetch() {} };
  let routeToken = token;
  let options;
  const { SharedProfilePage } = loadModule("src/pages/GiutHub/SharedProfilePage.tsx", {
    "./profileStatus": loadModule("src/pages/GiutHub/profileStatus.ts"),
    "../../design-system/tokens.generated": loadModule("src/design-system/tokens.generated.ts"),
    "@tanstack/react-query": { useQuery: (value) => {
      if (value.queryKey[0] === "shared-profile-target") return {};
      options = value; return queryState;
    } },
    "react-router-dom": { useNavigate: () => () => {}, useParams: () => ({ token: routeToken }) },
    "../../api/profileShares": { getSharedProfile() {}, getSharedProfileErrorMessage: error => error.status === 404 ? "공유 링크가 만료되었어요" : "네트워크 연결을 확인한 뒤 다시 시도해 주세요." },
    "../../components/PageHeader": { PageHeader }, "../../components/Button": { Button },
    "../../contexts/AuthContext": { useAuth: () => ({ isAuthenticated: false, isLoading: false }) },
    "./SharedProfileLoginPrompt": { SharedProfileLoginPrompt: () => null },
    "../Login/loginReturn": { saveSharedProfileReturn() {} },
    "../../components/icons": { Icon: () => null }, "./GiutHubProfilePage.styles": { S },
  });
  let html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /공유 사용자/); assert.match(html, /React/); assert.match(html, /함께 개발해요/);
  assert.doesNotMatch(html, /포트폴리오|활동 이력|제안 보내기/);
  assert.deepEqual(plain(options.queryKey), ["shared-profile", token]);
  assert.equal(options.gcTime, 0);
  queryState = { ...queryState, isError: true, error: { status: 404 } };
  html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /만료/); assert.doesNotMatch(html, /공유 사용자|함께 개발해요/);
  assert.match(html, /<h2>프로필을 불러오지 못했어요<\/h2>/);
  assert.match(html, /<section[^>]*role="alert"/);
  assert.match(html, /다시 불러오기/);
  queryState = { ...queryState, error: {}, isFetching: true };
  html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /네트워크 연결을 확인/);
  assert.match(html, /<button disabled="">불러오는 중…<\/button>/);
  queryState = { ...queryState, data: undefined, isError: false, isPending: true };
  assert.match(renderToStaticMarkup(React.createElement(SharedProfilePage)), /불러오고 있어요/);
  routeToken = "";
  html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /공유 링크를 확인해 주세요/);
  assert.doesNotMatch(html, /<button/);
  assert.equal(options.enabled, false);
});

test("전체 화면 공유는 본인·타인 카드와 세 동작을 표시하고 로딩/만료/미로그인을 구분한다", () => {
  const utils = loadModule("src/pages/GiutHub/profileShare.ts");
  let queryOptions;
  const queries = [];
  const { ProfileShareScreen } = loadModule("src/pages/GiutHub/ProfileShareScreen.tsx", {
    "@tanstack/react-query": { useQuery: (options) => { queryOptions = options; return {}; } },
    "../../api/profileShares": { getSharedProfile: (...args) => queries.push(args) },
    "react-router-dom": { useNavigate: () => () => {} },
    "../../components/icons": { Icon: () => null },
    "../../contexts/AuthContext": { useAuth: () => ({ isAuthenticated: true }) },
    "./ProfileShareCard": { ProfileShareCard: ({ profile }) => React.createElement("article", null, profile.nickname) },
    "./profileShareImage": { saveProfileShareImage() {} },
    "./profileShare": utils, "./ProfileShareScreen.styles": { S },
  }, { window: { location: { origin: "https://app.example.test" } } });
  const share = { canIssue: true, issuance: { data: issuedLink, isPending: false }, closeShare() {}, issueLink() {} };
  let suppliedProfile = { nickname: "공유 사용자" };
  const render = () => renderToStaticMarkup(React.createElement(ProfileShareScreen, { share, profileName: "공유 사용자", profile: suppliedProfile }));
  assert.match(render(), /<dialog/);
  assert.match(render(), /<article>공유 사용자/);
  assert.match(render(), /프로필 공유 닫기/);
  assert.match(render(), /링크 복사/);
  assert.match(render(), /이미지 저장/);
  assert.doesNotMatch(render(), /카카오톡|복사 완료|giut.kr\/u\//);
  suppliedProfile = { nickname: "다른 사용자" };
  assert.match(render(), /<article>다른 사용자/);
  assert.doesNotMatch(render(), /내 프로필로 이동|disabled=""/);
  assert.equal(queryOptions.enabled, false);
  suppliedProfile = undefined; render();
  assert.equal(queryOptions.enabled, true);
  assert.equal(queryOptions.gcTime, 0);
  const controller = new AbortController();
  queryOptions.queryFn({ signal: controller.signal });
  assert.equal(queries[0][0], token);
  assert.equal(queries[0][1], controller.signal);
  suppliedProfile = { nickname: "공유 사용자" };
  share.issuance.isPending = true;
  assert.match(render(), /발급하고 있어요/);
  assert.equal((render().match(/disabled=""/g) ?? []).length, 3);
  share.issuance = { data: { ...issuedLink, expiresAt: "2020-01-01T00:00:00Z" }, isPending: false };
  assert.match(render(), /새 링크 발급/);
  assert.equal((render().match(/disabled=""/g) ?? []).length, 3);
  share.issuance = { data: issuedLink, isPending: false, isError: true, error: new Error("network") };
  assert.match(render(), /다시 발급/);
  assert.equal((render().match(/disabled=""/g) ?? []).length, 3);
  share.canIssue = false;
  assert.match(render(), /프로필을 공유하려면 로그인해 주세요/);
  assert.equal(queryOptions.enabled, false);
  assert.doesNotMatch(render(), /<article/);
  assert.doesNotMatch(render(), new RegExp(token));
});

test("공유 화면의 복사와 기기 공유는 발급된 동일 URL을 사용하며 중복 실행과 만료 후 동작을 막는다", async () => {
  const copies = [], shares = [];
  const utils = loadModule("src/pages/GiutHub/profileShare.ts", {}, { navigator: {
    clipboard: { writeText: async (url) => copies.push(url) },
    share: async (data) => shares.push(data),
  } });
  let closed = 0;
  const { ProfileShareScreen } = loadModule("src/pages/GiutHub/ProfileShareScreen.tsx", {
    react: { useEffect() {}, useRef: () => ({ current: false }), useState: (initial) => [initial, () => {}] },
    "@tanstack/react-query": { useQuery: () => ({}) },
    "../../api/profileShares": { getSharedProfile() {} },
    "react-router-dom": { useNavigate: () => () => {} },
    "../../components/icons": { Icon: () => null },
    "../../contexts/AuthContext": { useAuth: () => ({ isAuthenticated: true }) },
    "./ProfileShareCard": { ProfileShareCard: () => null },
    "./profileShareImage": { saveProfileShareImage() {} },
    "./profileShare": utils, "./ProfileShareScreen.styles": { S },
  }, { window: { location: { origin: "https://app.example.test" } } });
  const share = { canIssue: true, issuance: { data: issuedLink }, closeShare() { closed++; }, issueLink() {} };
  function actions(tree, result = []) {
    if (!React.isValidElement(tree)) return result;
    if (tree.props.onClick) result.push(tree);
    React.Children.forEach(tree.props.children, child => actions(child, result));
    return result;
  }
  const tree = ProfileShareScreen({ share, profileName: "공유 사용자" });
  const buttons = actions(tree);
  buttons[1].props.onClick(); buttons[2].props.onClick();
  await new Promise(setImmediate);
  assert.equal(shares.length, 1); assert.equal(copies.length, 0);
  buttons[2].props.onClick(); await new Promise(setImmediate);
  assert.equal(copies[0], `https://app.example.test/api/profile/shares/${token}`);
  assert.equal(shares[0].url, copies[0]);
  buttons[0].props.onClick(); assert.equal(closed, 1);
  let prevented = false;
  tree.props.onCancel({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true); assert.equal(closed, 2);
  share.issuance.data = { ...issuedLink, expiresAt: "2020-01-01T00:00:00Z" };
  actions(ProfileShareScreen({ share, profileName: "공유 사용자" }))[1].props.onClick();
  await new Promise(setImmediate); assert.equal(shares.length, 1);
});
