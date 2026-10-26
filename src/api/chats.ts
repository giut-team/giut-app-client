import { api } from "./client";

export type ChatRoomType = "PERSONAL" | "TEAM";
export type ChatRoomStatus = "ACTIVE" | "CLOSED" | "DELETED";
export type ChatMessageType = "TEXT" | "IMAGE" | "SYSTEM";
export type ChatMessageStatus = "ACTIVE" | "DELETED";

export type ChatRoomResponse = {
  chatRoomId: number;
  type: ChatRoomType;
  status: ChatRoomStatus;
  targetUserId: number | null;
  created: boolean;
  createdAt: string;
};

export type ChatRoomListResponse = {
  chatRooms: ChatRoomResponse[];
};

export type ChatMessageResponse = {
  messageId: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  messageType: ChatMessageType;
  status: ChatMessageStatus;
  createdAt: string;
};

export type ChatMessageListResponse = {
  chatRoomId: number;
  page: number;
  size: number;
  hasNext: boolean;
  messages: ChatMessageResponse[];
};

export type ChatRoomUnreadCountResponse = {
  chatRoomId: number;
  unreadCount: number;
};

export type ChatParticipantProfile = {
  nickname: string;
  profile: {
    userId: number;
    nickname: string;
    departmentName: string;
    grade: number;
    profileImageUrl: string | null;
    primaryRoles: Array<{ code: string; name: string }>;
  } | null;
};

export const fetchChatRooms = async (): Promise<ChatRoomListResponse> => {
  const { data } = await api.get<ChatRoomListResponse>("/api/chat-rooms");
  return data;
};

export const fetchChatRoom = async (
  chatRoomId: number,
): Promise<ChatRoomResponse> => {
  const { data } = await api.get<ChatRoomResponse>(
    `/api/chat-rooms/${chatRoomId}`,
  );
  return data;
};

export const createPersonalChatRoom = async (
  targetUserId: number,
): Promise<ChatRoomResponse> => {
  const { data } = await api.post<ChatRoomResponse>("/api/chat-rooms/personal", {
    targetUserId,
  });
  return data;
};

export const fetchChatMessages = async (
  chatRoomId: number,
  page = 0,
  size = 30,
): Promise<ChatMessageListResponse> => {
  const { data } = await api.get<ChatMessageListResponse>(
    `/api/chat-rooms/${chatRoomId}/messages`,
    { params: { page, size } },
  );
  return data;
};

export const sendChatMessage = async (
  chatRoomId: number,
  content: string,
): Promise<ChatMessageResponse> => {
  const { data } = await api.post<ChatMessageResponse>(
    `/api/chat-rooms/${chatRoomId}/messages`,
    { content },
  );
  return data;
};

export const markChatRoomAsRead = async (
  chatRoomId: number,
  messageId: number,
): Promise<void> => {
  await api.patch(`/api/chat-rooms/${chatRoomId}/read`, undefined, {
    params: { messageId },
  });
};

export const fetchUnreadMessageCount = async (
  chatRoomId: number,
): Promise<ChatRoomUnreadCountResponse> => {
  const { data } = await api.get<ChatRoomUnreadCountResponse>(
    `/api/chat-rooms/${chatRoomId}/unread-count`,
  );
  return data;
};

export const fetchTotalUnreadMessageCount = async (): Promise<number> => {
  const { chatRooms } = await fetchChatRooms();
  const results = await Promise.allSettled(
    chatRooms.map((room) => fetchUnreadMessageCount(room.chatRoomId)),
  );

  return results.reduce(
    (total, result) =>
      result.status === "fulfilled" ? total + result.value.unreadCount : total,
    0,
  );
};

export const deleteChatMessage = async (
  chatRoomId: number,
  messageId: number,
): Promise<void> => {
  await api.delete(`/api/chat-rooms/${chatRoomId}/messages/${messageId}`);
};

export const leaveChatRoom = async (chatRoomId: number): Promise<void> => {
  await api.delete(`/api/chat-rooms/${chatRoomId}`);
};

export const fetchChatParticipantProfile = async (
  userId: number,
): Promise<ChatParticipantProfile> => {
  const { data } = await api.get<ChatParticipantProfile>(`/api/profile/${userId}`);
  return data;
};
