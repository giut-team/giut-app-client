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

test("공유 URL은 프론트 도메인과 token을 사용하고 소유자·만료 경계를 판정한다", () => {
  const utils = loadModule("src/pages/GiutHub/profileShare.ts");
  assert.equal(utils.buildProfileShareUrl(token, "https://app.example.test"), `https://app.example.test/api/profile/shares/${token}`);
  assert.equal(utils.buildProfileShareUrl("a/b", "https://app.example.test"), "https://app.example.test/api/profile/shares/a%2Fb");
  assert.equal(utils.canIssueProfileShare(4, 4), true);
  assert.equal(utils.canIssueProfileShare(4, 1), false);
  assert.equal(utils.canIssueProfileShare(4), false);
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

test("발급은 사용자 클릭에서만 실행하고 연속 클릭 및 타인 공유의 POST를 막는다", () => {
  const calls = [];
  let settle;
  const { useProfileShare } = loadModule("src/pages/GiutHub/useProfileShare.ts", {
    react: { useRef: () => ({ current: false }), useState: () => [false, () => {}] },
    "@tanstack/react-query": { useMutation: () => ({
      reset: () => {}, mutate: (_data, options) => { calls.push("POST"); settle = options.onSettled; },
    }) },
    "../../api/profileShares": { createProfileShareLink() {} },
  });
  const ownShare = useProfileShare(true);
  assert.equal(calls.length, 0);
  ownShare.openShare(); ownShare.openShare(); ownShare.issueLink();
  assert.equal(calls.length, 1);
  settle(); ownShare.issueLink();
  assert.equal(calls.length, 2);
  const otherShare = useProfileShare(false);
  otherShare.openShare(); otherShare.issueLink();
  assert.equal(calls.length, 2);
});

const S = new Proxy({}, { get: (_target, name) => {
  const tag = /Button|Channel$/.test(name) ? "button" : name === "Name" ? "h1" : "div";
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
  let options;
  const { SharedProfilePage } = loadModule("src/pages/GiutHub/SharedProfilePage.tsx", {
    "@tanstack/react-query": { useQuery: (value) => { options = value; return queryState; } },
    "react-router-dom": { useNavigate: () => () => {}, useParams: () => ({ token }) },
    "../../api/profileShares": { getSharedProfile() {}, getSharedProfileErrorMessage: () => "공유 링크가 만료되었어요" },
    "../../components/PageHeader": { PageHeader }, "../../components/Button": { Button },
    "../../components/icons": { Icon: () => null }, "./GiutHubProfilePage.styles": { S },
  });
  let html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /공유 사용자/); assert.match(html, /React/); assert.match(html, /함께 개발해요/);
  assert.doesNotMatch(html, /포트폴리오|활동 이력|제안 보내기/);
  assert.deepEqual(plain(options.queryKey), ["shared-profile", token]);
  assert.equal(options.gcTime, 0);
  queryState = { ...queryState, isError: true, error: {} };
  html = renderToStaticMarkup(React.createElement(SharedProfilePage));
  assert.match(html, /만료/); assert.doesNotMatch(html, /공유 사용자|함께 개발해요/);
  queryState = { ...queryState, data: undefined, isError: false, isPending: true };
  assert.match(renderToStaticMarkup(React.createElement(SharedProfilePage)), /불러오고 있어요/);
});

test("공유 시트는 로딩/만료/타인 상태에서 복사와 공유를 막고 발급된 URL만 표시한다", () => {
  const utils = loadModule("src/pages/GiutHub/profileShare.ts");
  const { ProfileShareSheet } = loadModule("src/pages/GiutHub/ProfileShareSheet.tsx", {
    "react-router-dom": { useNavigate: () => () => {} },
    "../../components/BottomSheet/BottomSheet": { BottomSheet: ({ children }) => React.createElement("div", null, children) },
    "../../components/icons": { Icon: () => null },
    "../../contexts/AuthContext": { useAuth: () => ({ isAuthenticated: true }) },
    "./profileShare": utils, "./GiutHubProfilePage.styles": { S },
  }, { window: { location: { origin: "https://app.example.test" } } });
  const share = { canIssue: true, issuance: { data: issuedLink, isPending: false }, closeShare() {}, issueLink() {} };
  const render = () => renderToStaticMarkup(React.createElement(ProfileShareSheet, { share, profileName: "공유 사용자" }));
  assert.match(render(), new RegExp(`https://app.example.test/api/profile/shares/${token}`));
  assert.doesNotMatch(render(), /복사됨|giut.kr\/u\//);
  share.issuance.isPending = true;
  assert.match(render(), /발급하고 있어요/);
  assert.equal((render().match(/disabled=""/g) ?? []).length, 4);
  share.issuance = { data: { ...issuedLink, expiresAt: "2020-01-01T00:00:00Z" }, isPending: false };
  assert.match(render(), /새 링크 발급/);
  assert.equal((render().match(/disabled=""/g) ?? []).length, 4);
  share.canIssue = false;
  assert.match(render(), /본인의 프로필/);
  assert.doesNotMatch(render(), new RegExp(token));
});
