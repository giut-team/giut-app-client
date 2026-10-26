const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { AxiosError } = require("axios");
const { MutationObserver, QueryClient } = require("@tanstack/react-query");
const { loadModule } = require("./helpers/loadTypeScript.cjs");

const response = { id: 7, status: "PENDING", createdAt: "2026-10-22T10:00:00Z" };
const actionErrors = loadModule("src/api/profileActions.ts", { "./client": {} });
const failure = status => new AxiosError("failed", undefined, undefined, undefined, { status });
function loadApi(post) {
  return loadModule("src/api/profileReports.ts", { "./client": { api: { post } }, "./profileActions": actionErrors });
}

test("프로필 신고는 네 가지 실제 enum을 인증 client의 reports 경로로 보내고 선택 설명은 생략한다", async () => {
  const calls = [];
  let invalidResponse = false;
  const api = loadApi(async (...args) => { calls.push(args); return { data: invalidResponse ? { ...response, id: 0 } : response }; });
  const expected = ["SPAM_ADVERTISING", "FALSE_INFORMATION_IMPERSONATION", "INAPPROPRIATE_BEHAVIOR", "OTHER"];
  for (const reason of expected) assert.equal(await api.createProfileReport(13, reason), response);
  assert.deepEqual(calls.map(([path, body]) => [path, body.reason, Object.keys(body)]), expected.map(reason => ["/api/profile/13/reports", reason, ["reason"]]));
  await assert.rejects(() => api.createProfileReport(0, "OTHER"), /프로필과 사유/);
  await assert.rejects(() => api.createProfileReport(13, "UNKNOWN"), /프로필과 사유/);
  assert.equal(calls.length, 4, "잘못된 ID·사유는 요청하지 않음");
  invalidResponse = true;
  await assert.rejects(() => api.createProfileReport(13, "OTHER"), /접수 응답/);
});

test("신고409는 이미 검토 중으로 안내하고 인증·본인·대상 없음·연결 실패를 성공으로 바꾸지 않는다", async () => {
  const api = loadApi(async () => { throw failure(409); });
  await assert.rejects(() => api.createProfileReport(13, "OTHER"), error => error.response.status === 409);
  assert.match(api.getProfileReportError(failure(409)), /이미 검토 중/);
  assert.match(api.getProfileReportError(failure(400)), /본인 프로필/);
  assert.match(api.getProfileReportError(failure(401)), /다시 로그인/);
  assert.match(api.getProfileReportError(failure(403)), /이용 권한/);
  assert.match(api.getProfileReportError(failure(404)), /공개 상태/);
  assert.match(api.getProfileReportError(new Error("network")), /결과를 확인하지 못했어요/);
});

test("신고 추가 설명은 description으로 전달하고 공백 생략 및1,000자 제한을 지킨다", async () => {
  const calls = [];
  const api = loadApi(async (...args) => { calls.push(args); return { data: response }; });
  await api.createProfileReport(13, "FALSE_INFORMATION_IMPERSONATION", "  타인의 경력을 본인 경력으로 적었습니다.  ");
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0][1])), {
    reason: "FALSE_INFORMATION_IMPERSONATION", description: "타인의 경력을 본인 경력으로 적었습니다.",
  });
  await api.createProfileReport(13, "OTHER", " \n ");
  assert.deepEqual(Object.keys(calls[1][1]), ["reason"]);
  await api.createProfileReport(13, "OTHER", "가".repeat(1000));
  assert.equal(calls[2][1].description.length, 1000);
  await assert.rejects(() => api.createProfileReport(13, "OTHER", "가".repeat(1001)), /1,000자/);
  assert.equal(calls.length, 3, "길이 초과 시 요청하지 않음");
});

function createModal(post) {
  const api = loadApi(post);
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false, gcTime: 0 } } });
  let observer, pending, closed = 0, stateIndex = 0;
  const states = [];
  const ref = { current: false };
  const S = new Proxy({}, { get: (_target, name) => name });
  const { ProfileReportModal } = loadModule("src/pages/GiutHub/ProfileReportModal.tsx", {
    react: {
      useState: initial => {
        const index = stateIndex++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => { states[index] = value; }];
      },
      useRef: () => ref, useId: () => "report-description",
    },
    "@tanstack/react-query": { useMutation: options => {
      if (!observer) observer = new MutationObserver(client, options);
      const state = observer.getCurrentResult();
      return { ...state, mutate: reason => { pending = observer.mutate(reason); pending.catch(() => {}); } };
    } },
    "../../api/profileReports": api,
    "./GiutHubDialog": { GiutHubDialog: "dialog" },
    "./GiutHubProfilePage.styles": { S },
  });
  return {
    render: () => { stateIndex = 0; return ProfileReportModal({ userId: 13, onClose: () => { closed += 1; } }); },
    pending: () => pending, closed: () => closed, clear: () => client.clear(),
  };
}
function find(element, type, content) {
  if (!React.isValidElement(element)) return undefined;
  if (element.type === type && (content === undefined || React.Children.toArray(element.props.children).includes(content))) return element;
  return React.Children.toArray(element.props.children).map(child => find(child, type, content)).find(Boolean);
}

test("신고 확인창은 명시적 사유 선택 후 한 번만 접수하고 처리 중 닫기·중복 요청을 막는다", async () => {
  let resolve, calls = 0;
  const modal = createModal(async (path, body) => {
    calls += 1; assert.equal(path, "/api/profile/13/reports"); assert.equal(body.reason, "OTHER");
    return new Promise(done => { resolve = () => done({ data: response }); });
  });
  let tree = modal.render();
  assert.equal(find(tree, "ReportDescriptionInput"), undefined, "사유 선택 전 입력란 숨김");
  assert.equal(find(tree, "DialogDangerButton").props.disabled, true);
  find(tree, "ReportReason", "기타").props.onClick();
  tree = modal.render();
  assert.equal(find(tree, "DialogDangerButton").props.disabled, false);
  assert.equal(find(tree, "ReportDescriptionInput").props.maxLength, 1000);
  assert.equal(find(tree, "ReportDescriptionLabel").props.htmlFor, find(tree, "ReportDescriptionInput").props.id);
  const submit = find(tree, "DialogDangerButton").props.onClick;
  submit(); submit();
  await new Promise(setImmediate);
  tree = modal.render();
  assert.equal(calls, 1);
  assert.equal(find(tree, "DialogDangerButton").props.children, "접수 중…");
  assert.equal(find(tree, "DialogCancelButton").props.disabled, true);
  assert.equal(find(tree, "ReportDescriptionInput").props.disabled, true);
  tree.props.onClose(); assert.equal(modal.closed(), 0, "배경/Escape로 처리 중 종료하지 않음");
  resolve(); await modal.pending();
  tree = modal.render();
  assert.equal(tree.props.title, "신고가 접수되었어요");
  assert.equal(find(tree, "DialogDangerButton"), undefined);
  find(tree, "DialogCancelButton", "확인").props.onClick();
  assert.equal(modal.closed(), 1);
  modal.clear();
});

test("신고 실패는 확인창·선택 사유·작성한 설명을 보존하고 자동 재시도나 성공 안내를 표시하지 않는다", async () => {
  let calls = 0;
  const modal = createModal(async (_path, body) => {
    calls += 1;
    assert.equal(body.reason, "FALSE_INFORMATION_IMPERSONATION");
    assert.equal(body.description, "타인의 경력을 본인 경력으로 적었습니다.");
    throw failure(409);
  });
  let tree = modal.render();
  find(tree, "ReportReason", "허위 경력 · 정보 도용").props.onClick();
  tree = modal.render();
  find(tree, "ReportDescriptionInput").props.onChange({ target: { value: "타인의 경력을 본인 경력으로 적었습니다." } });
  tree = modal.render();
  find(tree, "DialogDangerButton").props.onClick();
  await assert.rejects(modal.pending());
  tree = modal.render();
  assert.equal(tree.props.title, "신고하기");
  assert.equal(find(tree, "ReportReason", "허위 경력 · 정보 도용").props["aria-pressed"], true);
  assert.equal(find(tree, "ReportDescriptionInput").props.value, "타인의 경력을 본인 경력으로 적었습니다.");
  assert.match(find(tree, "ReportError").props.children, /이미 검토 중/);
  assert.equal(calls, 1); assert.equal(modal.closed(), 0);
  assert.equal(find(tree, "DialogCancelButton").props.disabled, false);
  modal.clear();
});
