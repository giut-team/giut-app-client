const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const imports = {
  "../../components/icons": { Icon: () => React.createElement("svg", { "aria-hidden": true }) },
  "./ImageWithFallback.styles": { S: { Fallback: "div" } },
};

test("사진의 미등록·공백 이미지는 사진 없음으로 표시하고 정상 URL은 유지한다", () => {
  const { ImageWithFallback } = loadModule("src/pages/GiutHub/ImageWithFallback.tsx", imports);
  for (const src of [undefined, null, "", "   "]) {
    const html = renderToStaticMarkup(React.createElement(ImageWithFallback, { src, alt: "프로젝트 이미지" }));
    assert.match(html, /사진 없음/);
    assert.match(html, /role="img" aria-label="프로젝트 이미지 없음"/);
    assert.doesNotMatch(html, /<img/);
  }
  const html = renderToStaticMarkup(React.createElement(ImageWithFallback, { src: "https://example.test/photo.png", alt: "프로젝트 이미지" }));
  assert.match(html, /<img[^>]+src="https:\/\/example.test\/photo.png"[^>]+alt="프로젝트 이미지"/);
  assert.doesNotMatch(html, /사진 없음/);
  const avatar = renderToStaticMarkup(React.createElement(ImageWithFallback, { src: null, alt: "관리자 프로필" }));
  assert.match(avatar, /aria-label="관리자 프로필 없음"/);
  assert.match(avatar, /사진 없음/);
  assert.doesNotMatch(avatar, /<img/);
});

test("이미지 오류 후 깨진 img를 제거하고 새 URL로 바뀌면 새 이미지를 표시한다", () => {
  let failedSource = null;
  const { ImageWithFallback } = loadModule("src/pages/GiutHub/ImageWithFallback.tsx", {
    ...imports,
    react: { useState: () => [failedSource, value => { failedSource = value; }] },
  });
  const props = { src: "https://example.test/broken.png", alt: "관리자 프로필" };
  const initial = ImageWithFallback(props);
  assert.equal(initial.type, "img");
  initial.props.onError();
  const failed = ImageWithFallback(props);
  assert.notEqual(failed.type, "img");
  assert.match(renderToStaticMarkup(failed), /사진 없음/);
  assert.match(renderToStaticMarkup(failed), /aria-label="관리자 프로필 없음"/);
  assert.doesNotMatch(renderToStaticMarkup(failed), /broken.png|<img/);
  const replacement = ImageWithFallback({ ...props, src: "https://example.test/replacement.jpg" });
  assert.equal(replacement.type, "img");
  assert.equal(replacement.props.src, "https://example.test/replacement.jpg");
  initial.props.onError();
  assert.equal(ImageWithFallback({ ...props, src: replacement.props.src }).type, "img");
  replacement.props.onError();
  assert.match(renderToStaticMarkup(ImageWithFallback({ ...props, src: replacement.props.src })), /사진 없음/);
});
