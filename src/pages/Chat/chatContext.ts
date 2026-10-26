export type ChatContextAction = {
  label: string;
  path: string;
};

export type ChatRoomContext = {
  kind: "TEAM_INQUIRY" | "TEAM_PROPOSAL" | "PROFILE";
  label: string;
  title: string;
  primaryAction: ChatContextAction;
  secondaryAction?: ChatContextAction;
};

const storageKey = (chatRoomId: number) => `chat-room-context:${chatRoomId}`;

const isChatContextAction = (value: unknown): value is ChatContextAction => {
  if (!value || typeof value !== "object") return false;
  const action = value as Partial<ChatContextAction>;
  return typeof action.label === "string" && typeof action.path === "string";
};

const isChatRoomContext = (value: unknown): value is ChatRoomContext => {
  if (!value || typeof value !== "object") return false;
  const context = value as Partial<ChatRoomContext>;
  return (
    (context.kind === "TEAM_INQUIRY" ||
      context.kind === "TEAM_PROPOSAL" ||
      context.kind === "PROFILE") &&
    typeof context.label === "string" &&
    typeof context.title === "string" &&
    isChatContextAction(context.primaryAction) &&
    (context.secondaryAction === undefined ||
      isChatContextAction(context.secondaryAction))
  );
};

export const saveChatRoomContext = (
  chatRoomId: number,
  context: ChatRoomContext,
) => {
  try {
    localStorage.setItem(storageKey(chatRoomId), JSON.stringify(context));
  } catch {
    // 저장소를 사용할 수 없어도 채팅 진입은 계속 진행합니다.
  }
};

export const getChatRoomContext = (chatRoomId: number) => {
  try {
    const stored = localStorage.getItem(storageKey(chatRoomId));
    if (!stored) return null;
    const context: unknown = JSON.parse(stored);
    return isChatRoomContext(context) ? context : null;
  } catch {
    return null;
  }
};
