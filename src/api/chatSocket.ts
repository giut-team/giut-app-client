import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import type { ChatMessageResponse } from "./chats";
import { API_BASE_URL } from "./client";

export const CHAT_WEBSOCKET_URL =
  import.meta.env.VITE_CHAT_WS_URL ??
  `${API_BASE_URL.replace(/^http/, "ws")}/ws/chat`;

type ChatSocketStatus = "connecting" | "connected" | "disconnected" | "error";

type SubscribeToChatRoomOptions = {
  chatRoomId: number;
  onMessage: (message: ChatMessageResponse) => void;
  onStatusChange?: (status: ChatSocketStatus) => void;
};

const parseChatMessage = (frame: IMessage): ChatMessageResponse | null => {
  try {
    const message = JSON.parse(frame.body) as Partial<ChatMessageResponse>;
    if (
      typeof message.messageId !== "number" ||
      typeof message.chatRoomId !== "number" ||
      typeof message.senderId !== "number" ||
      typeof message.content !== "string" ||
      typeof message.createdAt !== "string"
    ) {
      return null;
    }
    return message as ChatMessageResponse;
  } catch {
    return null;
  }
};

export const subscribeToChatRoom = ({
  chatRoomId,
  onMessage,
  onStatusChange,
}: SubscribeToChatRoomOptions) => {
  let subscription: StompSubscription | undefined;
  let stopped = false;

  const client = new Client({
    brokerURL: CHAT_WEBSOCKET_URL,
    reconnectDelay: 5_000,
    heartbeatIncoming: 10_000,
    heartbeatOutgoing: 10_000,
    discardWebsocketOnCommFailure: true,
    beforeConnect: async () => {
      const accessToken = localStorage.getItem("accessToken");
      client.connectHeaders = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
      onStatusChange?.("connecting");
    },
    onConnect: () => {
      if (stopped) return;
      onStatusChange?.("connected");
      subscription = client.subscribe(
        `/user/queue/chat-rooms/${chatRoomId}`,
        (frame) => {
          const message = parseChatMessage(frame);
          if (message && message.chatRoomId === chatRoomId) onMessage(message);
        },
      );
    },
    onDisconnect: () => onStatusChange?.("disconnected"),
    onStompError: () => onStatusChange?.("error"),
    onWebSocketError: () => onStatusChange?.("error"),
  });

  client.activate();

  return () => {
    stopped = true;
    subscription?.unsubscribe();
    onStatusChange?.("disconnected");
    void client.deactivate();
  };
};
