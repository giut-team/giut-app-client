const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { loadModule } = require("./helpers/loadTypeScript.cjs");
const helpers = loadModule("src/pages/GiutHubPreview/profilePreview.ts", {}, { URLSearchParams });

test("새 프로필 주소의 유효한 조건만 API에 보내며4학년 이상은4·5로 조회한다", () => {
  const filters = helpers.readPreviewFilters(new URLSearchParams("position=DEVELOPMENT&grade=4&status=RESTING&department=%20컴퓨터과학부%20&search=Python"));
  assert.deepEqual(JSON.parse(JSON.stringify(helpers.toPreviewRequest(filters))), {
    primaryRoles: ["DEVELOPMENT"], departments: ["컴퓨터과학부"], grades: [4, 5], activityStatus: "RESTING",
  });
  const invalid = helpers.readPreviewFilters(new URLSearchParams("position=ADMIN&grade=9&status=HIDDEN"));
  assert.deepEqual(JSON.parse(JSON.stringify(helpers.toPreviewRequest(invalid))), { primaryRoles: [], departments: [], grades: [] });
  assert.equal(helpers.readPreviewFilters(new URLSearchParams({ search: "가".repeat(150) })).search.length, 100);
});

test("스킬·역할이 없는 프로필에 임의의 기술이나 개발 역할을 만들어 붙이지 않는다", () => {
  assert.equal(helpers.profileFacts({ primaryRoles: [], departmentName: "경제학부", grade: 3 }), "경제학부 · 3학년");
  assert.equal(helpers.skillNames(undefined).length, 0);
  const skills = helpers.skillNames([{ type: "INTEREST", name: "Python" }, { type: "SKILL", name: " React " }, { type: "SKILL", name: "React" }, { type: "SKILL", name: "  " }]);
  assert.equal(skills.join(" · "), "React");
  const profile = { nickname: "김민재", bio: "캠퍼스 서비스를 만들어요", primaryRoles: [], departmentName: "컴퓨터과학부", grade: 3, skills: [{ type: "SKILL", name: "React" }] };
  assert.equal(helpers.matchesProfileSearch(profile, " react "), true);
  assert.equal(helpers.matchesProfileSearch(profile, "컴퓨터과학부"), true);
  assert.equal(helpers.matchesProfileSearch(profile, "Figma"), false);
});

test("대표 작품과 공개 순서를 우선하되 원본 API 배열과 실제 id는 보존한다", () => {
  const items = [{ id: 42, representative: false, showcaseOrder: null }, { id: 91, representative: true, showcaseOrder: 3 }, { id: 20, representative: false, showcaseOrder: 1 }];
  assert.equal(helpers.orderedPortfolios(items).map(item => item.id).join(","), "91,20,42");
  assert.equal(items.map(item => item.id).join(","), "42,91,20");
  assert.equal(helpers.detailStatus("합류 가능"), "OPEN_TO_OFFERS");
  assert.equal(helpers.detailStatus("둘러보는 중"), "RESTING");
});

function actionHarness(viewerId = 1) {
  const mutations = [];
  const calls = [];
  const S = new Proxy({}, { get: (_, key) => key });
  const { PreviewProfileActions } = loadModule("src/pages/GiutHubPreview/PreviewProfileActions.tsx", {
    react: { useRef: value => ({ current: value }), useState: value => [value, () => {}] },
    "@tanstack/react-query": {
      useQueryClient: () => ({ cancelQueries: key => calls.push(["cancel", key]), setQueryData: () => {} }),
      useMutation: config => {
        const state = { config, variables: [], isPending: false, isError: false, reset: () => {}, mutate: (...args) => state.variables.push(args) };
        mutations.push(state); return state;
      },
    },
    "react-router-dom": { useNavigate: () => path => calls.push(["navigate", path]) },
    "../../contexts/AuthContext": { useAuth: () => ({ profile: { userId: viewerId }, isAuthenticated: true, queryScope: viewerId }) },
    "../../api/profileActions": { setProfileRecommendation: (...args) => calls.push(["recommend", ...args]), getProfileActionError: () => "" },
    "../../api/chat": { createPersonalChatRoom: id => calls.push(["contact", id]) },
    "../../components/BottomSheet/BottomSheet": { BottomSheet: () => null },
    "../../components/icons": { Icon: () => null },
    "../GiutHub/ProfileShareScreen": { ProfileShareScreen: () => null },
    "../GiutHub/ProfileReportModal": { ProfileReportModal: () => null },
    "../GiutHub/TeamProposalBottomSheet": { TeamProposalBottomSheet: () => null },
    "../GiutHub/profileDetail": { toDetailProfileSummary: () => ({}), updateDetailRecommendation: () => {} },
    "../GiutHub/profileQueries": { profileKeys: { detail: (id, viewer) => ["giut-hub", "profile", id, viewer] } },
    "../GiutHub/useProfileShare": { useProfileShare: () => ({ isOpen: false, openShare: () => calls.push(["share"]) }) },
    "./ProfilePreview.styles": { S },
  });
  const tree = PreviewProfileActions({ detail: { nickname: "김민재", recommended: false, profile: { userId: 9 } }, onBack: () => {} });
  const elements = [];
  const walk = value => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!React.isValidElement(value)) return;
    elements.push(value); walk(value.props.children);
  };
  walk(tree);
  return { calls, mutations, elements };
}

test("새 상세의 단순 진입은 쓰기 요청을 하지 않고 추천·메시지 연속 클릭은 한 번만 실행한다", async () => {
  const { calls, mutations, elements } = actionHarness();
  assert.equal(calls.length, 0);
  assert.equal(mutations.every(mutation => mutation.variables.length === 0), true);
  const star = elements.find(element => element.type === "Star");
  star.props.onClick(); star.props.onClick();
  assert.equal(mutations[0].variables.length, 1);
  assert.equal(mutations[0].variables[0][0], true);
  await mutations[0].config.onMutate();
  assert.equal(JSON.stringify(calls[0]), JSON.stringify(["cancel", { queryKey: ["giut-hub", "profile", 9, 1] }]));
  mutations[0].config.mutationFn(true);
  assert.equal(JSON.stringify(calls[1]), JSON.stringify(["recommend", 9, true]));
  const message = elements.find(element => element.type === "Action" && !element.props.$primary);
  message.props.onClick(); message.props.onClick();
  assert.equal(mutations[1].variables.length, 1);
  assert.equal(calls.some(call => call[0] === "navigate"), false);
  mutations[1].variables[0][1].onSuccess({ chatRoomId: 17 });
  assert.equal(JSON.stringify(calls.at(-1)), JSON.stringify(["navigate", "/chat/17"]));
});

test("본인 프로필의 추천·메시지는 UI와 동작 경계 모두 막는다", () => {
  const { mutations, elements } = actionHarness(9);
  const star = elements.find(element => element.type === "Star");
  const message = elements.find(element => element.type === "Action" && !element.props.$primary);
  assert.equal(star.props.disabled, true); assert.equal(message.props.disabled, true);
  star.props.onClick(); message.props.onClick();
  assert.equal(mutations.every(mutation => mutation.variables.length === 0), true);
});
