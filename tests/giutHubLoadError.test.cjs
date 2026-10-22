const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { AxiosError } = require("axios");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const S = new Proxy({}, { get: (_target, name) => {
  const tag = name === "LoadError" ? "section" : name === "LoadErrorButton" ? "button"
    : name === "LoadErrorTitle" ? "h3" : name === "LoadErrorDescription" ? "p" : "div";
  return ({ children, ...props }) => React.createElement(tag, props, children);
} });
const { GiutHubLoadError } = loadModule("src/pages/GiutHub/GiutHubLoadError.tsx", {
  "./GiutHubPage.styles": { S },
  "../../components/icons": { Icon: () => null },
});
const httpError = status => new AxiosError("internal server detail", undefined, undefined, undefined, { status });

test("기웃허브 오류 안내는 실제 오류에 따라 원인과 복구 행동을 구분한다", () => {
  const cases = [
    [httpError(401), "로그인이 필요해요", "로그인하기", "login"],
    [httpError(403), "이용 권한을 확인해 주세요", "내 프로필 확인", "profile"],
    [new AxiosError("internal connection detail", "ERR_NETWORK"), "연결을 확인해 주세요", "다시 불러오기", "retry"],
    [httpError(503), "팀원 목록을 불러오지 못했어요", "다시 불러오기", "retry"],
    [new Error("internal unexpected detail"), "팀원 목록을 불러오지 못했어요", "다시 불러오기", "retry"],
  ];
  for (const [error, title, label, expectedAction] of cases) {
    const actions = [];
    const tree = GiutHubLoadError({ error, isRetrying: false,
      onRetry: () => actions.push("retry"), onLogin: () => actions.push("login"),
      onCheckProfile: () => actions.push("profile"),
    });
    const html = renderToStaticMarkup(tree);
    assert.match(html, /role="alert"/);
    assert.ok(html.includes(`<h3>${title}</h3>`));
    assert.ok(html.includes(label));
    assert.doesNotMatch(html, /internal|disabled=""/);
    const button = React.Children.toArray(tree.props.children).find(child => child.props.onClick);
    button.props.onClick();
    assert.deepEqual(actions, [expectedAction]);
  }
});

test("목록 재요청 중에는 진행 상태와 비활성 버튼을 표시한다", () => {
  const html = renderToStaticMarkup(React.createElement(GiutHubLoadError, {
    error: httpError(503), isRetrying: true,
    onRetry() {}, onLogin() {}, onCheckProfile() {},
  }));
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /불러오는 중…/);
});
