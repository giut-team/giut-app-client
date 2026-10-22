const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const S = {
  TabEmptyState: "section", EmptyIcon: "div", EmptyTitle: "h2",
  EmptyDescription: "p", EmptyAction: "button",
};
const { ProfileTabEmptyState } = loadModule("src/pages/GiutHub/ProfileTabEmptyState.tsx", {
  "./GiutHubProfilePage.styles": { S },
  "../../components/icons": { Icon: () => null },
});

test("빈 포트폴리오는 본인에게만 작성 동작을 제공하고 방문자에게는 공개 안내를 표시한다", () => {
  let navigations = 0;
  const props = { kind: "portfolio", onAddPortfolio: () => { navigations += 1; } };
  const own = ProfileTabEmptyState({ ...props, isOwnProfile: true });
  const ownMarkup = renderToStaticMarkup(own);
  assert.match(ownMarkup, /<h2>아직 공개된 포트폴리오가 없어요<\/h2>/);
  assert.match(ownMarkup, /포트폴리오 작성하기/);
  const action = React.Children.toArray(own.props.children).find((child) => child.type === "button");
  action.props.onClick();
  assert.equal(navigations, 1);

  const visitorMarkup = renderToStaticMarkup(React.createElement(ProfileTabEmptyState, { ...props, isOwnProfile: false }));
  assert.doesNotMatch(visitorMarkup, /<button/);
  assert.match(visitorMarkup, /프로젝트가 공개되면/);
  assert.equal(navigations, 1);
});

test("빈 활동 이력은 본인과 방문자 모두에 안내만 표시하며 포트폴리오 작성 동작을 노출하지 않는다", () => {
  for (const isOwnProfile of [true, false]) {
    const markup = renderToStaticMarkup(React.createElement(ProfileTabEmptyState, {
      kind: "activity", isOwnProfile,
      onAddPortfolio: () => assert.fail("활동 이력에서 포트폴리오 작성으로 이동하면 안 됨"),
    }));
    assert.match(markup, /아직 등록된 활동 이력이 없어요/);
    assert.match(markup, /공모전·대외활동/);
    assert.doesNotMatch(markup, /<button/);
  }
});
