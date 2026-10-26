const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
const React = require("react");
const routerApi = require("react-router-dom");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const routingPath = "src/components/ProfileRouteMotion/profileMotionRouting.ts";
const motion = loadModule("src/styles/motion.ts");

test("기존·새 목록과 숫자 프로필의 왕복만 좌우 방향을 정한다", () => {
  const { profileSlideDirection } = loadModule(routingPath);
  for (const base of ["/giut-hub", "/giut-hub-preview"]) {
    assert.equal(profileSlideDirection(base, `${base}/14`), "forward");
    assert.equal(profileSlideDirection(`${base}/14`, `${base}/`), "back");
    assert.equal(profileSlideDirection(`${base}/`, `${base}/4/`), "forward");
    for (const to of [base, `${base}/0`, `${base}/other`, `${base}/4/portfolio/1`, "/chat/1"]) {
      assert.equal(profileSlideDirection(base, to), null);
    }
  }
  assert.equal(profileSlideDirection("/giut-hub", "/giut-hub-preview/4"), null);
});

test("필터별 목록 스크롤은 history key가 달라도 복원하고 상세는 history별로 구분한다", () => {
  const { profileScrollKey } = loadModule(routingPath);
  const list = { pathname: "/giut-hub", search: "?positions=개발", key: "first" };
  assert.equal(profileScrollKey(list), profileScrollKey({ ...list, key: "returned" }));
  assert.notEqual(profileScrollKey(list), profileScrollKey({ ...list, search: "?positions=디자인" }));
  assert.equal(profileScrollKey({ ...list, pathname: "/giut-hub/4" }), "first");
});

test("네이티브 API가 있고 동작 줄이기가 꺼진 경우만 snapshot 전환을 요청한다", () => {
  const document = {};
  let reduced = false;
  const { supportsProfileViewTransition } = loadModule(routingPath, {}, {
    document, window: { matchMedia: () => ({ matches: reduced }) },
  });
  assert.equal(supportsProfileViewTransition(), false);
  document.startViewTransition = () => {};
  assert.equal(supportsProfileViewTransition(), true);
  reduced = true;
  assert.equal(supportsProfileViewTransition(), false);
  assert.equal(motion.PROFILE_SCREEN_MOTION_MS, 480);
});

test("이동 hook은 복귀 state를 보존하며 실제 navigate를 한 번만 호출한다", () => {
  const calls = [];
  let native = true;
  const routing = loadModule(routingPath);
  const { useProfileSlideNavigate } = loadModule("src/components/ProfileRouteMotion/useProfileSlideNavigate.ts", {
    "react-router-dom": { ...routerApi, useLocation: () => ({ pathname: "/giut-hub" }), useNavigate: () => (...args) => calls.push(args) },
    "./profileMotionRouting": { ...routing, supportsProfileViewTransition: () => native },
  });
  const navigate = useProfileSlideNavigate();
  const state = { returnTo: "/giut-hub?positions=개발" };
  navigate("/giut-hub/4", { state });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1].state, state);
  assert.equal(calls[0][1].viewTransition, true);
  native = false;
  navigate("/giut-hub/3");
  assert.equal(calls[1][1].viewTransition, false);
  native = true;
  navigate("/chat/1");
  assert.equal(calls[2][1].viewTransition, false);
});

function motionHarness() {
  let location, transitioning = false, refIndex = 0, effect, effectDeps, shouldRun, cleanup;
  const environment = { native: false, reduced: false };
  const refs = [], timers = new Map(), listeners = new Map();
  const document = {
    documentElement: { dataset: {} },
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
  };
  const window = {
    matchMedia: () => ({ matches: environment.reduced }),
    setTimeout: handler => { const id = Symbol(); timers.set(id, handler); return id; },
    clearTimeout: id => timers.delete(id),
  };
  const routing = loadModule(routingPath, {}, { document, window });
  const { ProfileRouteMotion } = loadModule("src/components/ProfileRouteMotion/ProfileRouteMotion.tsx", {
    react: {
      ...React,
      useRef: initial => refs[refIndex++] ??= { current: initial },
      useLayoutEffect: (callback, deps) => {
        shouldRun = !effectDeps || deps.some((value, index) => !Object.is(value, effectDeps[index]));
        effectDeps = deps;
        effect = callback;
      },
    },
    "react-router-dom": {
      useLocation: () => location, useViewTransitionState: () => transitioning,
      Outlet: () => null, ScrollRestoration: () => null,
    },
    "../../styles/motion": motion,
    "./profileMotionRouting": { ...routing, supportsProfileViewTransition: () => environment.native },
    "./ProfileRouteMotion.styles": { ProfileRouteMotionStyles: () => null },
  }, { document, window });
  return {
    environment, timers, listeners, root: document.documentElement,
    get frame() { return refs[1].current; },
    render(pathname, key, active = false) {
      location = { pathname, key };
      transitioning = active;
      refIndex = 0;
      const tree = ProfileRouteMotion();
      refs[1].current ??= { dataset: {} };
      if (shouldRun) { cleanup?.(); cleanup = effect(); }
      return tree;
    },
    end(name, target = refs[1].current) { listeners.get("animationend")?.({ animationName: name, target }); },
    unmount() { cleanup?.(); },
  };
}

test("공통 레이아웃은 진입·역방향·중단·동작 줄이기를 처리하고 fallback 상태를 정리한다", () => {
  const h = motionHarness();
  const initial = h.render("/giut-hub", "list");
  assert.equal(h.root.dataset.profileSlide, undefined);
  assert.equal(initial.props.children[1].props.children.type.name, "Outlet");
  h.render("/giut-hub/4", "detail");
  assert.equal(h.root.dataset.profileSlide, "forward");
  assert.equal(h.frame.dataset.profileFallback, "forward");
  h.render("/giut-hub", "back");
  assert.equal(h.root.dataset.profileSlide, "back");
  assert.equal(h.timers.size, 1);
  h.end("giut-fallback-back", {});
  assert.equal(h.root.dataset.profileSlide, "back", "다른 요소의 이벤트는 전환을 종료하지 않는다");
  h.end("unrelated");
  assert.equal(h.root.dataset.profileSlide, "back");
  h.end("giut-fallback-back");
  assert.equal(h.root.dataset.profileSlide, undefined);
  assert.equal(h.frame.dataset.profileFallback, undefined);
  // API가 있어도 Router의 native 전환이 없는 이동은 fallback을 제공한다.
  h.environment.native = true;
  h.render("/giut-hub/4", "detail-again");
  assert.equal(h.frame.dataset.profileFallback, "forward");
  for (const handler of h.timers.values()) handler();
  assert.equal(h.root.dataset.profileSlide, undefined);
  h.environment.reduced = true;
  h.render("/giut-hub", "back-reduced");
  assert.equal(h.root.dataset.profileSlide, undefined);
  assert.equal(h.timers.size, 0);
  assert.equal(h.listeners.size, 0);
});

test("native CSS 종료 후에도 스타일을 유지하고 Router finished 또는 중단 뒤에만 정리한다", () => {
  const h = motionHarness();
  h.environment.native = true;
  h.render("/giut-hub", "list");
  h.render("/giut-hub", "list", true); // 이전 화면에서 전환 시작
  h.render("/giut-hub/4", "detail", true);
  assert.equal(h.root.dataset.profileSlide, "forward");
  assert.equal(h.frame.dataset.profileFallback, undefined);
  h.end("giut-new-forward"); // snapshot 제거보다 앞선 CSS animationend
  assert.equal(h.root.dataset.profileSlide, "forward", "기본 fade로 되돌아갈 속성을 먼저 제거하면 안 된다");
  assert.equal(h.timers.size, 0, "native 전환은 시간 추정으로 종료하지 않는다");
  h.render("/giut-hub/4", "detail", true); // 조회 완료 등 일반 재렌더
  assert.equal(h.root.dataset.profileSlide, "forward");
  h.render("/giut-hub/4", "detail", false); // Router가 finished 후 상태 해제
  assert.equal(h.root.dataset.profileSlide, undefined);
  h.render("/giut-hub/4", "detail", true);
  h.render("/giut-hub", "back", true);
  assert.equal(h.root.dataset.profileSlide, "back");
  h.end("giut-new-back");
  assert.equal(h.root.dataset.profileSlide, "back");
  h.render("/giut-hub/3", "interrupted", true);
  assert.equal(h.root.dataset.profileSlide, "forward");
  h.unmount();
  assert.equal(h.root.dataset.profileSlide, undefined);
});

test("실제 memory router는 forward와 브라우저 POP에 양방향 snapshot 정보를 전달한다", async t => {
  const router = routerApi.createMemoryRouter([
    { path: "/giut-hub", element: null }, { path: "/giut-hub/:id", element: null },
  ], { initialEntries: ["/giut-hub?position=개발"] });
  t.after(() => router.dispose());
  const transitions = [];
  router.subscribe((state, options) => {
    if (options.viewTransitionOpts) transitions.push({ action: state.historyAction, destination: state.location.pathname, ...options.viewTransitionOpts });
  });
  await router.navigate("/giut-hub/4", { viewTransition: true, state: { returnTo: "/giut-hub?position=개발" } });
  assert.equal(router.state.location.state.returnTo, "/giut-hub?position=개발");
  await router.navigate(-1);
  assert.equal(router.state.location.search, "?position=개발");
  // POP 메타데이터는 최초 전환 쌍을 유지한다. 실제 역방향은 state.location으로 판단한다.
  assert.deepEqual(transitions.map(item => item.destination), ["/giut-hub/4", "/giut-hub"]);
  assert.deepEqual(transitions.map(item => [item.action, item.currentLocation.pathname, item.nextLocation.pathname]), [
    ["PUSH", "/giut-hub", "/giut-hub/4"], ["POP", "/giut-hub", "/giut-hub/4"],
  ]);
});

test("Data Router 변경 후 기존·새 화면·공유·팀 작성 경로를 유지하고 router를 재생성하지 않는다", () => {
  const source = ts.createSourceFile("Router.tsx", fs.readFileSync("src/Router.tsx", "utf8"), ts.ScriptTarget.Latest, true);
  const mocks = {};
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.moduleSpecifier.text.startsWith(".")) continue;
    mocks[statement.moduleSpecifier.text] = Object.fromEntries(statement.importClause.namedBindings.elements.map(item => [item.name.text, () => null]));
  }
  let routes, creations = 0;
  const router = {};
  mocks["react-router-dom"] = { ...routerApi, createBrowserRouter: value => { creations++; routes = value; return router; } };
  const { AppRouter } = loadModule("src/Router.tsx", mocks);
  assert.equal(AppRouter().props.router, router);
  assert.equal(AppRouter().props.router, router);
  assert.equal(creations, 1);
  for (const [url, expected] of [
    ["/giut-hub", "/giut-hub"], ["/giut-hub/4", "/giut-hub/:profileNumber"],
    ["/giut-hub/4/portfolio/2", "/giut-hub/:profileNumber/portfolio/:portfolioNumber"],
    ["/giut-hub-preview/4", "/giut-hub-preview/:profileNumber"],
    ["/api/profile/shares/example", "/api/profile/shares/:token"],
    ["/chat/3", "/chat/:chatId"], ["/contests/2/teams/create", undefined],
    ["/contests/2/teams/create/members", ":step"],
    ["/my-profile/edit", "/my-profile/edit"],
  ]) {
    const matches = routerApi.matchRoutes(routes, url);
    assert.equal(matches.at(-1).route.path, expected, url);
  }
});
