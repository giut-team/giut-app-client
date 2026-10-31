const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { AxiosError } = require("axios");
const { MutationObserver, QueryClient } = require("@tanstack/react-query");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const team = { teamId: 1, name: "기웃 팀", myRole: "LEADER", status: "RECRUITING", currentMemberCount: 2, maxMemberCount: 4 };
const recruitment = { recruitmentId: 10, roleCode: "BACKEND_DEVELOPER", requiredCount: 2, filledCount: 1 };
const invitation = { applicationId: 9, teamId: 1, userId: 13, roleCode: "BACKEND_DEVELOPER", status: "PENDING" };
const failure = (status, message) => new AxiosError("failed", undefined, undefined, undefined, { status, data: { message } });
const loadApi = (get = async () => ({}), post = async () => ({})) => loadModule("src/api/teamInvitations.ts", { "./client": { api: { get, post } } });

test("내 소속 팀 GET은 인증 client와 취소 신호를 사용하고 팀장·모집·정원 조건을 구분한다", async () => {
  const calls = [], signal = new AbortController().signal;
  const api = loadApi(async (...args) => { calls.push(args); return { data: { teams: [team] } }; });
  assert.equal((await api.getMyInvitationTeams(signal))[0], team);
  assert.equal(calls[0][0], "/api/teams/me"); assert.equal(calls[0][1].signal, signal);
  assert.equal(api.canInviteToTeam(team), true);
  for (const overrides of [{ myRole: "MEMBER" }, { status: "CLOSED" }, { status: "ARCHIVED" }, { currentMemberCount: 4 }]) {
    assert.equal(api.canInviteToTeam({ ...team, ...overrides }), false);
  }
  for (const teams of [null, [{ ...team, myRole: "UNKNOWN" }], [{ ...team, currentMemberCount: -1 }]]) {
    await assert.rejects(loadApi(async () => ({ data: { teams } })).getMyInvitationTeams(), /팀 목록 응답/);
  }
  assert.equal((await loadApi(async () => ({ data: { teams: [] } })).getMyInvitationTeams()).length, 0);
});

test("선택한 팀 모집 분야만 조회하고 다른 팀 응답·잘못된 인원·팀 ID를 거부한다", async () => {
  const calls = [], signal = new AbortController().signal;
  const api = loadApi(async (...args) => { calls.push(args); return { data: { teamId: 1, recruitments: [recruitment] } }; });
  assert.equal((await api.getInvitationRecruitments(1, signal))[0], recruitment);
  assert.equal(calls[0][0], "/api/teams/1/recruitments"); assert.equal(calls[0][1].signal, signal);
  await assert.rejects(api.getInvitationRecruitments(0), /팀을 확인/); assert.equal(calls.length, 1);
  for (const data of [{ teamId: 2, recruitments: [] }, { teamId: 1, recruitments: [{ ...recruitment, filledCount: -1 }] }]) {
    await assert.rejects(loadApi(async () => ({ data })).getInvitationRecruitments(1), /모집 분야 응답/);
  }
});

test("서버 역할 목록 네 그룹의 실제 이름을 조합하고 코드에서 표시 이름을 만들지 않는다", async () => {
  const calls = [], signal = new AbortController().signal;
  const api = loadApi(async (...args) => {
    calls.push(args); return { data: { roles: [{ code: args[1].params.primaryRole, name: "서버 이름" }] } };
  });
  const names = await api.getInvitationRoleNames(signal);
  assert.deepEqual(Object.keys(names).sort(), ["DESIGN", "DEVELOPMENT", "MARKETING", "PLANNING"]);
  assert.equal(names.DEVELOPMENT, "서버 이름");
  assert.equal(calls.every(([path, options]) => path === "/api/profile/roles" && options.signal === signal), true);
  await assert.rejects(loadApi(async () => ({ data: { roles: [{ code: "DEV", name: "" }] } })).getInvitationRoleNames(), /포지션 이름/);
});

test("제안 POST는 실제 대상 ID·모집 코드·선택 메시지를 보내고 500자와 응답 대상을 검증한다", async () => {
  const calls = [];
  let response = invitation;
  const api = loadApi(undefined, async (...args) => { calls.push(args); return { data: response }; });
  assert.equal(await api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: "  함께해요  " }), invitation);
  assert.equal(calls[0][0], "/api/teams/1/invitations");
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0][1])), { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: "함께해요" });
  await api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: " \n " });
  assert.equal("message" in calls[1][1], false);
  await api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: "가".repeat(500) });
  await assert.rejects(api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: "가".repeat(501) }), /500자/);
  await assert.rejects(api.sendTeamInvitation(1, { inviteeUserId: 0, roleCode: "" }), /팀과 포지션/);
  assert.equal(calls.length, 3);
  for (const override of [{ userId: 99 }, { teamId: 2 }, { roleCode: "DESIGNER" }, { status: "APPROVED" }]) {
    response = { ...invitation, ...override };
    await assert.rejects(api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER" }), /전송 결과/);
  }
});

test("제안 인증·권한·대상·중복·연결 오류를 구분하며 실패를 성공 안내로 바꾸지 않는다", async () => {
  const api = loadApi(undefined, async () => { throw failure(409, "이미 대기 중인 요청이 있습니다."); });
  assert.match(api.getTeamInvitationError(failure(401), "load"), /로그인/);
  assert.match(api.getTeamInvitationError(failure(403), "load"), /팀장 권한/);
  assert.match(api.getTeamInvitationError(failure(404), "send"), /찾을 수 없어요/);
  assert.match(api.getTeamInvitationError(failure(409, "이미 팀원인 사용자입니다."), "send"), /이미 이 팀/);
  assert.match(api.getTeamInvitationError(failure(409), "send"), /모집 상태/);
  assert.match(api.getTeamInvitationError(new AxiosError("Network Error"), "send"), /결과를 확인하지 못했어요/);
  await assert.rejects(api.sendTeamInvitation(1, { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER" }), error => /응답을 기다리는/.test(api.getTeamInvitationError(error, "send")));
});

function textOf(element) {
  if (typeof element === "string" || typeof element === "number") return String(element);
  if (!React.isValidElement(element)) return "";
  return React.Children.toArray(element.props.children).map(textOf).join("");
}
function find(element, type, text) {
  if (!React.isValidElement(element)) return undefined;
  if (element.type === type && (text === undefined || textOf(element).includes(text))) return element;
  return [...React.Children.toArray(element.props.children), element.props.footer].map(child => find(child, type, text)).find(Boolean);
}
function createSheet(post = async () => ({ data: invitation })) {
  const fixture = {
    auth: { isAuthenticated: true, profile: { userId: 7 } },
    teams: { data: [team, { ...team, teamId: 2, myRole: "MEMBER", name: "팀원인 팀" }, { ...team, teamId: 3, status: "CLOSED", name: "마감 팀" }, { ...team, teamId: 4, currentMemberCount: 4, name: "정원 팀" }, { ...team, teamId: 5, name: "다른 팀" }] },
    recruitments: { data: [recruitment, { ...recruitment, recruitmentId: 11, roleCode: "DATA_ANALYST", requiredCount: 1, filledCount: 1 }] },
    roles: { data: { BACKEND_DEVELOPER: "백엔드 개발자" } },
  };
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false, gcTime: 0 } } });
  const states = [], queries = [], refetches = [], invalidated = [], navigated = [];
  const ref = { current: false };
  let stateIndex, observer, pending, closed = 0;
  const api = loadApi(undefined, post);
  const { TeamProposalBottomSheet } = loadModule("src/pages/GiutHub/TeamProposalBottomSheet.tsx", {
    react: {
      useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = value; }]; },
      useRef: () => ref, useId: () => "proposal-message",
    },
    "@tanstack/react-query": {
      useQuery(options) {
        queries.push(options);
        const result = fixture[options.queryKey[1] === "my-teams" ? "teams" : options.queryKey[1] === "recruitments" ? "recruitments" : "roles"];
        return { isPending: false, isFetching: false, isError: false, refetch: async () => { refetches.push(options.queryKey); }, ...result };
      },
      useQueryClient: () => ({ invalidateQueries: async options => { invalidated.push(options.queryKey); } }),
      useMutation(options) {
        if (!observer) observer = new MutationObserver(client, options);
        else observer.setOptions(options);
        return { ...observer.getCurrentResult(), mutate: input => { pending = observer.mutate(input); pending.catch(() => {}); } };
      },
    },
    "react-router-dom": { useNavigate: () => path => navigated.push(path) },
    "../../api/teamInvitations": api,
    "../../contexts/AuthContext": { useAuth: () => fixture.auth },
    "../../components/BottomSheet/BottomSheet": { BottomSheet: "BottomSheet" },
    "../../components/icons": { Icon: () => null },
    "./GiutHubProfilePage.styles": { S: new Proxy({}, { get: (_target, name) => name }) },
  });
  return {
    fixture, queries, refetches, invalidated, navigated,
    render() { stateIndex = 0; queries.length = 0; return TeamProposalBottomSheet({ profileName: "상대", targetUserId: 13, onClose: () => { closed++; } }); },
    pending: () => pending, closed: () => closed, clear: () => client.clear(),
  };
}
function selectPosition(sheet) {
  let tree = sheet.render(); find(tree, "ProposalTeamCard", "기웃 팀").props.onClick();
  tree = sheet.render(); find(tree, "ProposalPosition", "백엔드 개발자").props.onClick();
  return sheet.render();
}

test("제안 화면은 로그인·본인·로딩·빈 목록·조회 실패를 구분하고 불가 상태에서 전송하지 않는다", () => {
  const sheet = createSheet();
  sheet.fixture.auth.isAuthenticated = false;
  let tree = sheet.render(); assert.match(textOf(tree), /로그인 후/);
  assert.equal(sheet.queries.every(query => !query.enabled), true);
  find(tree, "ProposalCancelButton", "로그인하기").props.onClick(); assert.equal(sheet.navigated[0], "/login");
  sheet.fixture.auth = { isAuthenticated: true, profile: { userId: 13 } };
  assert.match(textOf(sheet.render()), /본인에게는/);
  sheet.fixture.auth.profile.userId = 7;
  sheet.fixture.teams = { isPending: true, data: undefined };
  tree = sheet.render(); assert.match(textOf(tree), /내 팀을 불러오고/); assert.equal(find(tree, "ProposalConfirmButton").props.disabled, true);
  sheet.fixture.teams = { data: [{ ...team, myRole: "MEMBER" }] };
  assert.match(textOf(sheet.render()), /제안할 팀이 아직 없어요/);
  sheet.fixture.teams = { data: [team], isError: true, error: failure(401) };
  tree = sheet.render(); assert.match(textOf(tree), /로그인이 만료/); assert.equal(find(tree, "ProposalTeamCard"), undefined);
  find(tree, "ProposalCancelButton", "다시 불러오기").props.onClick(); assert.equal(sheet.refetches.length, 1);
  sheet.clear();
});

test("팀장 팀만 표시하고 마감·정원·포지션 충원을 반영하며 팀 변경 시 포지션 선택을 초기화한다", () => {
  const sheet = createSheet();
  let tree = sheet.render();
  assert.equal(find(tree, "ProposalTeamCard", "팀원인 팀"), undefined);
  assert.equal(find(tree, "ProposalTeamCard", "마감 팀").props.disabled, true);
  assert.equal(find(tree, "ProposalTeamCard", "정원 팀").props.disabled, true);
  assert.equal(find(tree, "ProposalConfirmButton").props.disabled, true);
  tree = selectPosition(sheet);
  assert.equal(find(tree, "ProposalPosition", "DATA_ANALYST"), undefined);
  assert.equal(find(tree, "ProposalConfirmButton").props.disabled, false);
  assert.equal(sheet.queries.find(query => query.queryKey[1] === "recruitments").queryKey[3], 1);
  find(tree, "ProposalTeamCard", "다른 팀").props.onClick();
  tree = sheet.render(); assert.equal(find(tree, "ProposalConfirmButton").props.disabled, true);
  assert.equal(find(tree, "ProposalPosition", "백엔드 개발자").props["aria-pressed"], false);
  assert.equal(sheet.queries.find(query => query.queryKey[1] === "recruitments").queryKey[3], 5);
  sheet.clear();
});

test("모집 재조회·오류·빈 분야·누락된 이름에서는 오래된 선택으로 제안하지 않는다", () => {
  const sheet = createSheet();
  selectPosition(sheet);
  for (const state of [{ isFetching: true }, { isError: true, error: failure(500) }, { data: [] }]) {
    const original = sheet.fixture.recruitments;
    sheet.fixture.recruitments = { ...original, ...state };
    const tree = sheet.render(); assert.equal(find(tree, "ProposalConfirmButton").props.disabled, true);
    sheet.fixture.recruitments = original;
  }
  sheet.fixture.roles.data = {};
  const tree = sheet.render();
  assert.equal(find(tree, "ProposalConfirmButton").props.disabled, true);
  assert.equal(find(tree, "ProposalPosition").props.disabled, true);
  assert.match(textOf(tree), /이름을 확인할 수 없는 포지션/);
  sheet.clear();
});

test("제안은 실제 선택을 한 번만 전송하고 처리 중 닫기·편집을 막으며 성공 후에만 완료를 표시한다", async () => {
  let resolve, calls = 0;
  const sheet = createSheet(async (path, body) => {
    calls++; assert.equal(path, "/api/teams/1/invitations");
    assert.deepEqual(JSON.parse(JSON.stringify(body)), { inviteeUserId: 13, roleCode: "BACKEND_DEVELOPER", message: "함께해요" });
    return new Promise(done => { resolve = () => done({ data: invitation }); });
  });
  let tree = selectPosition(sheet);
  find(tree, "ProposalMessageInput").props.onChange({ target: { value: "  함께해요  " } });
  tree = sheet.render();
  const submit = find(tree, "ProposalConfirmButton").props.onClick;
  submit(); submit(); tree.props.onClose(); assert.equal(sheet.closed(), 0);
  await new Promise(setImmediate);
  tree = sheet.render(); assert.equal(calls, 1);
  assert.equal(tree.props.dragDisabled, true);
  assert.equal(find(tree, "ProposalConfirmButton").props.children, "제안 보내는 중…");
  assert.equal(find(tree, "ProposalMessageInput").props.disabled, true);
  assert.equal(find(tree, "ProposalTeamCard", "기웃 팀").props.disabled, true);
  tree.props.onClose(); assert.equal(sheet.closed(), 0);
  resolve(); await sheet.pending(); tree = sheet.render();
  assert.equal(tree.props.title, "제안을 보냈어요"); assert.equal(find(tree, "ProposalMessageInput"), undefined);
  assert.deepEqual(JSON.parse(JSON.stringify(sheet.invalidated)), [["giut-hub", "profile", 13]]);
  find(tree, "ProposalConfirmButton", "확인").props.onClick(); assert.equal(sheet.closed(), 1);
  sheet.clear();
});

test("전송 중 시트는 드래그를 시작하지 않고 일반 시트의 드래그 동작은 유지한다", () => {
  let captures = 0;
  const { BottomSheet } = loadModule("src/components/BottomSheet/BottomSheet.tsx", {
    react: { useEffect() {}, useId: () => "sheet", useRef: initial => ({ current: initial }), useState: initial => [initial, () => {}] },
    "../OverlayShell/OverlayShell": { OverlayShell: "OverlayShell" },
    "../icons": { Icon: () => null },
    "./BottomSheet.styles": { S: new Proxy({}, { get: (_target, name) => name }) },
  });
  const event = { clientY: 0, pointerId: 1, pointerType: "touch", currentTarget: { setPointerCapture() { captures++; } } };
  find(BottomSheet({ open: true, dragDisabled: true, onClose() {} }), "HandleWrapper").props.onPointerDown(event);
  assert.equal(captures, 0);
  find(BottomSheet({ open: true, onClose() {} }), "HandleWrapper").props.onPointerDown(event);
  assert.equal(captures, 1);
});

test("제안 실패는 선택과 메시지를 보존하고 최신 팀·모집 정보를 확인하며 POST를 자동 재시도하지 않는다", async () => {
  let calls = 0;
  const sheet = createSheet(async () => { calls++; throw failure(409, "이미 대기 중인 요청이 있습니다."); });
  let tree = selectPosition(sheet);
  find(tree, "ProposalMessageInput").props.onChange({ target: { value: "작성한 메시지" } });
  find(sheet.render(), "ProposalConfirmButton").props.onClick();
  await assert.rejects(sheet.pending());
  tree = sheet.render(); assert.equal(calls, 1); assert.equal(sheet.closed(), 0);
  assert.match(find(tree, "ProposalError").props.children, /응답을 기다리는/);
  assert.equal(find(tree, "ProposalMessageInput").props.value, "작성한 메시지");
  assert.equal(find(tree, "ProposalPosition").props["aria-pressed"], true);
  assert.equal(sheet.refetches.length, 2);
  assert.equal(tree.props.title, "팀 제안 보내기");
  sheet.clear();
});
