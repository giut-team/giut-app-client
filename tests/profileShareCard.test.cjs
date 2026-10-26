const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const S = {
  Card: "article", Avatar: "img", Identity: "div", Status: ({ children }) => React.createElement("p", null, children),
  StatusDot: "span", Name: "h1", Summary: "p", Skills: "p", Signature: "p",
};
const { ProfileShareCard } = loadModule("src/pages/GiutHub/ProfileShareCard.tsx", {
  "../../assets/default_image/designer-female.png": "/designer.png",
  "../../assets/default_image/developer-female.png": "/developer.png",
  "../../assets/default_image/marketing-female.png": "/marketing.png",
  "../../assets/default_image/planner-female.png": "/planner.png",
  "./profileStatus": loadModule("src/pages/GiutHub/profileStatus.ts"),
  "./ProfileShareScreen.styles": { S },
});
const profile = {
  userId: 3, nickname: "김서연", profileImageUrl: "https://images.example.test/me.png",
  activityStatus: "OPEN_TO_OFFERS", activityStatusName: "합류 가능",
  primaryRoles: [{ code: "PLANNING", name: "기획" }], departmentName: "경영학부", grade: 3,
};

test("공유 카드는 실제 프로필과 SKILL만 표시하고 존재하지 않는 아이디를 만들지 않는다", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileShareCard, { profile: { ...profile, skills: [
    { name: "서비스 기획", type: "SKILL" }, { name: "UX 리서치", type: "SKILL" },
    { name: "PM", type: "SKILL" }, { name: "Notion", type: "SKILL" },
    { name: "디자인 관심", type: "INTEREST" },
  ] } }));
  assert.match(html, /김서연/); assert.match(html, /합류 가능/);
  assert.match(html, /기획 · 경영학부 3학년/);
  assert.match(html, /서비스 기획 · UX 리서치 · PM 외 1개/);
  assert.match(html, /https:\/\/images.example.test\/me.png/);
  assert.doesNotMatch(html, /디자인 관심|@seoyeon|@김서연/);
});

test("공유 카드의 사진과 스킬이 없으면 직무 기본 이미지와 빈 안내를 표시한다", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileShareCard, { profile: { ...profile, profileImageUrl: null } }));
  assert.match(html, /src="\/planner.png"/);
  assert.match(html, /스킬 소개 전/);
  assert.match(html, /기웃에서 만나요/);
});

test("이미지 저장은 실제 PNG 생성 후 다운로드하며 사진/생성 실패를 성공 처리하지 않는다", async () => {
  const downloads = [], urls = [], timers = [];
  let fetchOK = true, blob = { type: "image/png" }, options;
  const anchor = { click() { downloads.push([this.href, this.download]); }, remove() {} };
  const card = { querySelectorAll: () => [{ src: "/me.png", decode: async () => {} }] };
  const { saveProfileShareImage } = loadModule("src/pages/GiutHub/profileShareImage.ts", {
    "html-to-image": { toBlob: async (node, value) => { assert.equal(node, card); options = value; return blob; } },
  }, {
    document: { fonts: { ready: Promise.resolve() }, createElement: () => anchor, body: { append() {} } },
    fetch: async () => ({ ok: fetchOK }),
    URL: { createObjectURL: () => "blob:profile-card", revokeObjectURL: url => urls.push(url) },
    window: { setTimeout: fn => timers.push(fn) },
  });
  await saveProfileShareImage(card, "김/서연");
  assert.deepEqual(downloads, [["blob:profile-card", "기웃-김_서연-프로필.png"]]);
  assert.equal(options.pixelRatio, 2); assert.equal(options.style.boxShadow, "none");
  timers[0](); assert.deepEqual(urls, ["blob:profile-card"]);
  fetchOK = false;
  await assert.rejects(() => saveProfileShareImage(card, "김서연"), /사진/);
  fetchOK = true; blob = null;
  await assert.rejects(() => saveProfileShareImage(card, "김서연"), /이미지를 만들지 못/);
  assert.equal(downloads.length, 1);
});
