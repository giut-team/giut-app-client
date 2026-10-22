import { api } from "./client";

export type PersonalChatRoom = { chatRoomId: number; targetUserId: number; createdAt: string; type: string; status: string };
export type ChatMessage = { messageId: number; chatRoomId: number; senderId: number; content: string; status: string; createdAt: string };
type MessagePage = { messages: ChatMessage[]; hasNext: boolean };

export async function createPersonalChatRoom(targetUserId: number): Promise<PersonalChatRoom> {
  const { data } = await api.post<PersonalChatRoom>("/api/chat-rooms/personal", { targetUserId });
  if (!Number.isSafeInteger(data.chatRoomId) || data.chatRoomId <= 0 || data.targetUserId !== targetUserId) {
    throw new Error("대화 상대를 확인할 수 없어요.");
  }
  return data;
}

export async function getChatRooms(signal?: AbortSignal): Promise<PersonalChatRoom[]> {
  return (await api.get<{ chatRooms: PersonalChatRoom[] }>("/api/chat-rooms", { signal })).data.chatRooms;
}

export async function getChatRoom(chatRoomId: number, signal?: AbortSignal): Promise<PersonalChatRoom> {
  return (await api.get<PersonalChatRoom>(`/api/chat-rooms/${chatRoomId}`, { signal })).data;
}

export async function getChatMessages(chatRoomId: number, signal?: AbortSignal): Promise<ChatMessage[]> {
  const messages = new Map<number, ChatMessage>();
  for (let page = 0; ; page += 1) {
    signal?.throwIfAborted();
    const { data } = await api.get<MessagePage>(`/api/chat-rooms/${chatRoomId}/messages`, { params: { page, size: 100 }, signal });
    data.messages.forEach(message => messages.set(message.messageId, message));
    if (!data.hasNext) break;
    if (!data.messages.length) throw new Error("대화 목록 응답을 확인할 수 없어요.");
  }
  return [...messages.values()].sort((left, right) => left.messageId - right.messageId);
}

export async function sendChatMessage(chatRoomId: number, content: string): Promise<ChatMessage> {
  const trimmed = content.trim();
  if (!trimmed || trimmed.length > 2000) throw new Error("메시지는 1~2000자로 입력해 주세요.");
  return (await api.post<ChatMessage>(`/api/chat-rooms/${chatRoomId}/messages`, { content: trimmed })).data;
}

export async function getChatUnreadCount(chatRoomId: number, signal?: AbortSignal): Promise<number> {
  return (await api.get<{ unreadCount: number }>(`/api/chat-rooms/${chatRoomId}/unread-count`, { signal })).data.unreadCount;
}
