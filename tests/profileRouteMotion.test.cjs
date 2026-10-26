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

test("이동 hook은 BrowserRouter navigate와 state를 보존하고 Data Router 전환을 요청하지 않는다", () => {
  const calls = [], starts = [];
  const { useProfileSlideNavigate } = loadModule("src/components/ProfileRouteMotion/useProfileSlideNavigate.ts", {
    "react-router-dom": { ...routerApi, useLocation: () => ({ pathname: "/giut-hub" }), useNavigate: () => (...args) => calls.push(args) },
    "./profileSlideController": { getProfileSlideController: () => ({ begin: (from, to, update) => { starts.push([from, to]); update(); } }) },
  });
  const navigate = useProfileSlideNavigate();
  const state = { returnTo: "/giut-hub?positions=개발" };
  navigate("/giut-hub/4", { state });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1].state, state);
  assert.equal(calls[0][1].viewTransition, false);
  assert.deepEqual(starts, [["/giut-hub", "/giut-hub/4"]]);
});

function harness({ native = true, reduced = false } = {}) {
  const listeners = new Set(), timers = new Map(), styles = new Set(), transitions = [];
  const window = {
    location: { pathname: "/giut-hub" }, scrollY: 0,
    history: { scrollRestoration: "auto" },
    matchMedia: () => ({ matches: reduced }),
    scrollTo: (_x, y) => { window.scrollY = y; },
    setTimeout: callback => { const key = Symbol(); timers.set(key, callback); return key; },
    clearTimeout: key => timers.delete(key),
    addEventListener: (_type, listener) => listeners.add(listener),
    removeEventListener: (_type, listener) => listeners.delete(listener),
    dispatchEvent: event => { for (const listener of listeners) listener(event); },
  };
  const document = {
    documentElement: { dataset: {} },
    head: { appendChild: style => styles.add(style) },
    createElement: () => { const style = { remove: () => styles.delete(style) }; return style; },
  };
  if (native) document.startViewTransition = update => {
    let finish;
    const transition = { update, finished: new Promise(resolve => { finish = resolve; }), finish: () => finish(), skipped: 0, skipTransition() { this.skipped++; finish(); } };
    transitions.push(transition);
    return transition;
  };
  const { createProfileSlideController } = loadModule("src/components/ProfileRouteMotion/profileSlideController.ts", {
    "../../styles/motion": motion,
    "./profileMotionRouting": loadModule(routingPath),
    "./ProfileRouteMotion.styles": { PROFILE_ROUTE_MOTION_CSS: "motion styles" },
  }, { queueMicrotask, PopStateEvent: class { constructor(type, init) { this.type = type; this.state = init.state; } } });
  const controller = createProfileSlideController(window, document);
  function mount(pathname, key = pathname, search = "") {
    window.location.pathname = pathname;
    const events = new Map();
    const element = {
      dataset: {}, addEventListener: (name, handler) => events.set(name, handler),
      removeEventListener: name => events.delete(name),
    };
    return { element, cleanup: controller.register({ pathname, search, key, element }),
      end(name, target = element) { events.get("animationend")?.({ animationName: name, target }); } };
  }
  return { ...controller, mount, window, document, timers, styles, transitions, listeners };
}

test("native 전환은 BrowserRouter의 비동기 화면 commit을 기다리며 finished까지 스타일을 유지한다", async () => {
  const h = harness();
  const old = h.mount("/giut-hub", "list", "?positions=개발");
  h.window.scrollY = 430;
  let navigations = 0;
  h.begin("/giut-hub", "/giut-hub/4", () => { navigations++; });
  const transition = h.transitions[0];
  let committed = false;
  const update = transition.update().then(() => { committed = true; });
  await Promise.resolve();
  assert.equal(navigations, 1);
  assert.equal(committed, false, "navigate 호출만으로 새 snapshot을 찍지 않는다");
  assert.equal(h.window.history.scrollRestoration, "manual");
  h.window.scrollY = 0; // DOM이 짧아져 위치가 잘려도 출발 시 저장한 위치는 유지한다.
  old.cleanup();
  const detail = h.mount("/giut-hub/4", "detail");
  await update;
  assert.equal(committed, true);
  assert.equal(h.window.scrollY, 0);
  detail.end("giut-new-forward");
  assert.equal(h.styles.size, 1);
  assert.equal(h.document.documentElement.dataset.profileSlide, "forward");
  assert.equal(h.timers.size, 0);
  transition.finish();
  await Promise.resolve();
  assert.equal(h.styles.size, 0);
  assert.equal(h.document.documentElement.dataset.profileSlide, undefined);

  h.begin("/giut-hub/4", "/giut-hub", () => {});
  const returning = h.transitions[1];
  const commit = returning.update();
  detail.cleanup();
  const list = h.mount("/giut-hub", "different-history-key", "?positions=개발");
  await commit;
  assert.equal(h.window.scrollY, 430, "필터 목록으로 돌아오면 위치를 복원한다");
  assert.equal(h.document.documentElement.dataset.profileSlide, "back");
  returning.finish();
  await Promise.resolve();
  list.cleanup();
  await Promise.resolve();
  assert.equal(h.listeners.size, 0);
  assert.equal(h.window.history.scrollRestoration, "auto", "허브 밖의 스크롤 정책은 복원한다");
});

test("빠른 재이동은 이전 callback의 늦은 navigate를 막고 이전 finished가 새 전환을 지우지 않는다", async () => {
  const h = harness();
  h.mount("/giut-hub");
  let stale = 0, current = 0;
  h.begin("/giut-hub", "/giut-hub/4", () => stale++);
  h.begin("/giut-hub", "/giut-hub/3", () => current++);
  await h.transitions[0].update();
  assert.equal(stale, 0);
  assert.equal(h.transitions[0].skipped, 1);
  assert.equal(h.document.documentElement.dataset.profileSlide, "forward");
  const commit = h.transitions[1].update();
  h.mount("/giut-hub/3");
  await commit;
  assert.equal(current, 1);
  assert.equal(h.styles.size, 1);
  h.transitions[1].finish();
  await Promise.resolve();
  assert.equal(h.styles.size, 0);
});

test("BrowserRouter POP은 허브 왕복일 때만 캡처하고 원래 history state를 한 번 전달한다", async () => {
  const h = harness();
  const detail = h.mount("/giut-hub/4");
  h.window.location.pathname = "/giut-hub";
  const state = { idx: 1, usr: { filter: "개발" }, key: "old" };
  let stopped = 0;
  const event = { state, stopImmediatePropagation: () => stopped++ };
  for (const listener of h.listeners) listener(event);
  assert.equal(stopped, 1);
  const delivered = [];
  h.window.dispatchEvent = replay => {
    for (const listener of h.listeners) listener(replay);
    delivered.push(replay);
  };
  const update = h.transitions[0].update();
  assert.equal(delivered.length, 1);
  assert.equal(delivered[0].state, state);
  assert.equal(h.transitions.length, 1, "재전달한 popstate로 다시 전환을 시작하지 않는다");
  detail.cleanup();
  h.mount("/giut-hub");
  await update;
  h.transitions[0].finish();
  await Promise.resolve();
  h.window.location.pathname = "/chat";
  for (const listener of h.listeners) listener(event);
  assert.equal(stopped, 1);
  assert.equal(h.transitions.length, 1);
});

test("native 미지원은 fixed 컨테이너를 바꾸지 않는 입장 효과로 대체하고 animationend를 구분한다", async () => {
  const h = harness({ native: false });
  const old = h.mount("/giut-hub");
  let called = 0;
  h.begin("/giut-hub", "/giut-hub/4", () => called++);
  old.cleanup();
  const detail = h.mount("/giut-hub/4");
  assert.equal(called, 1);
  assert.equal(detail.element.dataset.profileFallback, "forward");
  detail.end("giut-fallback-forward", {});
  detail.end("unrelated");
  assert.equal(h.styles.size, 1);
  detail.end("giut-fallback-forward");
  assert.equal(h.styles.size, 0);
  assert.equal(h.timers.size, 0);
  assert.equal(detail.element.dataset.profileFallback, undefined);
  detail.cleanup();
  await Promise.resolve();
});

test("동작 줄이기·허브 외 이동은 즉시 처리하고 guard 이탈·목적 화면 미도착도 정리한다", async () => {
  const h = harness({ reduced: true });
  let called = 0;
  h.begin("/giut-hub", "/giut-hub/4", () => called++);
  assert.equal(called, 1);
  assert.equal(h.styles.size, 0);
  const normal = harness();
  normal.begin("/giut-hub", "/chat", () => called++);
  assert.equal(called, 2);
  assert.equal(normal.styles.size, 0);
  const old = normal.mount("/giut-hub");
  normal.begin("/giut-hub", "/giut-hub/4", () => {});
  const update = normal.transitions[0].update();
  old.cleanup();
  await Promise.resolve();
  await update;
  await Promise.resolve();
  assert.equal(normal.styles.size, 0);
  assert.equal(normal.transitions[0].skipped, 1);
  assert.equal(normal.timers.size, 0);

  const waiting = harness();
  waiting.mount("/giut-hub");
  waiting.begin("/giut-hub", "/giut-hub/4", () => {});
  const pending = waiting.transitions[0].update();
  for (const timeout of waiting.timers.values()) timeout();
  await pending;
  await Promise.resolve();
  assert.equal(waiting.styles.size, 0);
});

test("페이지 wrapper는 Data Router context 없이 일반 MemoryRouter 안에서 렌더링한다", () => {
  const { renderToStaticMarkup } = require("react-dom/server");
  const { ProfileRouteMotion } = loadModule("src/components/ProfileRouteMotion/ProfileRouteMotion.tsx", {
    "./profileSlideController": { getProfileSlideController: () => { throw Error("서버 렌더에서 DOM을 읽으면 안 된다"); } },
  });
  const html = renderToStaticMarkup(React.createElement(routerApi.MemoryRouter, { initialEntries: ["/giut-hub"] },
    React.createElement(ProfileRouteMotion, null, React.createElement("span", null, "기웃허브"))));
  assert.match(html, /data-profile-route-frame/);
  assert.match(html, /기웃허브/);
});

test("Router의 BrowserRouter·Routes와 기존 guard·공모전·팀 작성 경로를 유지한다", () => {
  const source = ts.createSourceFile("Router.tsx", fs.readFileSync("src/Router.tsx", "utf8"), ts.ScriptTarget.Latest, true);
  const mocks = {};
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.moduleSpecifier.text.startsWith(".")) continue;
    mocks[statement.moduleSpecifier.text] = Object.fromEntries(statement.importClause.namedBindings.elements.map(item => [item.name.text, () => null]));
  }
  const { AppRouter } = loadModule("src/Router.tsx", mocks);
  const tree = AppRouter();
  assert.equal(tree.type, routerApi.BrowserRouter);
  assert.equal(tree.props.children.type, routerApi.Routes);
  const routes = routerApi.createRoutesFromElements(tree.props.children.props.children);
  for (const [url, expected] of [
    ["/giut-hub", "/giut-hub"], ["/giut-hub/4", "/giut-hub/:profileNumber"],
    ["/giut-hub/4/portfolio/2", "/giut-hub/:profileNumber/portfolio/:portfolioNumber"],
    ["/chat/3", "/chat/:chatId"], ["/contests/2/teams/create", undefined],
    ["/contests/2/teams/create/members", ":step"],
    ["/my-profile/edit", "/my-profile/edit"],
  ]) {
    const matches = routerApi.matchRoutes(routes, url);
    assert.equal(matches.at(-1).route.path, expected, url);
  }
  for (const path of ["/giut-hub", "/giut-hub/:profileNumber"]) {
    assert.equal(routes.find(route => route.path === path).element.type.name, "UniversityVerifiedRoute");
  }
});
