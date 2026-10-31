import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchChatMessages,
  fetchChatParticipantProfile,
  fetchChatRooms,
  fetchUnreadMessageCount,
  type ChatMessageResponse,
  type ChatRoomResponse,
} from "../../api/chats";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./ChatPage.styles";

type ChatTab = "all" | "unread";
type AvatarTone = "mint" | "peach" | "purple";

type ChatRow = {
  id: number;
  initial: string;
  avatarTone: AvatarTone;
  title: string;
  preview: string;
  time: string;
  latestMessageAt: string;
  unread: number;
};

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

const avatarTones: AvatarTone[] = ["mint", "peach", "purple"];

const formatChatTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "어제";

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
  }).format(date);
};

const getFallbackTitle = (room: ChatRoomResponse) =>
  room.type === "TEAM"
    ? `팀 채팅 #${room.chatRoomId}`
    : `개인 채팅 #${room.targetUserId ?? room.chatRoomId}`;

const getLatestMessage = (messages: ChatMessageResponse[]) =>
  messages.reduce<ChatMessageResponse | null>((latest, message) => {
    if (!latest) return message;

    const timeDifference =
      new Date(message.createdAt).getTime() -
      new Date(latest.createdAt).getTime();

    return timeDifference > 0 ||
      (timeDifference === 0 && message.messageId > latest.messageId)
      ? message
      : latest;
  }, null);

export function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(
    () => (location.state as { toastMessage?: string } | null)?.toastMessage ?? "",
  );

  const roomsQuery = useQuery({
    queryKey: ["chat-rooms"],
    queryFn: fetchChatRooms,
    refetchInterval: 30_000,
  });
  const rooms = useMemo(
    () => roomsQuery.data?.chatRooms ?? [],
    [roomsQuery.data?.chatRooms],
  );

  const summaryQueries = useQueries({
    queries: rooms.map((room) => ({
      queryKey: ["chat-room-summary", room.chatRoomId, room.targetUserId],
      queryFn: async () => {
        const [unreadResult, messagesResult, profileResult] =
          await Promise.allSettled([
            fetchUnreadMessageCount(room.chatRoomId),
            fetchChatMessages(room.chatRoomId, 0, 30),
            room.type === "PERSONAL" && room.targetUserId
              ? fetchChatParticipantProfile(room.targetUserId)
              : Promise.resolve(null),
          ]);

        return {
          unread:
            unreadResult.status === "fulfilled"
              ? unreadResult.value.unreadCount
              : 0,
          latestMessage:
            messagesResult.status === "fulfilled"
              ? getLatestMessage(messagesResult.value.messages)
              : null,
          profile:
            profileResult.status === "fulfilled" ? profileResult.value : null,
        };
      },
      refetchInterval: 30_000,
    })),
  });

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const chatRows = useMemo<ChatRow[]>(
    () =>
      rooms.flatMap((room, index) => {
        const summary = summaryQueries[index]?.data;
        if (!summary?.latestMessage) return [];

        const nickname = summary?.profile?.profile?.nickname || summary?.profile?.nickname;
        const title = nickname || getFallbackTitle(room);
        const latestMessageAt = summary.latestMessage.createdAt;

        return [{
          id: room.chatRoomId,
          initial: room.type === "TEAM" ? "팀" : title.slice(0, 1),
          avatarTone: avatarTones[room.chatRoomId % avatarTones.length],
          title,
          preview:
            summary.latestMessage.status === "DELETED"
              ? "삭제된 메시지입니다."
              : summary.latestMessage.content,
          time: formatChatTime(latestMessageAt),
          latestMessageAt,
          unread: summary?.unread ?? 0,
        }];
      }),
    [rooms, summaryQueries],
  );

  const areSummariesPending =
    rooms.length > 0 && summaryQueries.some((query) => query.isPending);

  const unreadCount = chatRows.filter((chat) => chat.unread > 0).length;
  const sortedChats = [...chatRows].sort(
    (left, right) =>
      new Date(right.latestMessageAt).getTime() -
      new Date(left.latestMessageAt).getTime(),
  );
  const normalizedQuery = searchQuery.trim().replaceAll(" ", "").toLowerCase();
  const visibleChats = sortedChats.filter((chat) => {
    const matchesTab = activeTab === "all" || chat.unread > 0;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      chat.title.replaceAll(" ", "").toLowerCase().includes(normalizedQuery);
    return matchesTab && matchesSearch;
  });

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.Title>채팅</S.Title>
          <S.SearchButton
            aria-label="채팅 검색"
            aria-pressed={isSearchOpen}
            onClick={() => {
              setIsSearchOpen((open) => !open);
              if (isSearchOpen) setSearchQuery("");
            }}
            type="button"
          >
            <Icon name="search" size={18} weight="bold" />
          </S.SearchButton>
        </S.Header>

        {isSearchOpen && (
          <S.SearchField>
            <Icon name="search" size={18} weight="bold" />
            <input
              aria-label="이름 또는 팀 이름 검색"
              autoFocus
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="이름 또는 팀 이름 검색"
              value={searchQuery}
            />
            {searchQuery && (
              <S.ClearSearchButton
                aria-label="검색어 지우기"
                onClick={() => setSearchQuery("")}
                type="button"
              >
                <Icon name="x" size={16} weight="bold" />
              </S.ClearSearchButton>
            )}
          </S.SearchField>
        )}

        <S.Tabs aria-label="채팅 필터">
          <S.Tab
            $active={activeTab === "all"}
            aria-pressed={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            type="button"
          >
            전체 {chatRows.length}
          </S.Tab>
          <S.Tab
            $active={activeTab === "unread"}
            aria-pressed={activeTab === "unread"}
            onClick={() => setActiveTab("unread")}
            type="button"
          >
            안 읽음 {unreadCount}
          </S.Tab>
        </S.Tabs>

        <S.ChatList aria-label="채팅 목록">
          {visibleChats.map((chat) => (
            <S.ChatItem
              aria-label={`${chat.title} 채팅`}
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              type="button"
            >
              <S.Avatar $tone={chat.avatarTone}>{chat.initial}</S.Avatar>
              <S.ChatContent>
                <S.ChatTitle>{chat.title}</S.ChatTitle>
                <S.ChatPreview>{chat.preview}</S.ChatPreview>
              </S.ChatContent>
              <S.ChatMeta>
                <S.Time>{chat.time}</S.Time>
                {chat.unread > 0 && <S.UnreadBadge>{chat.unread}</S.UnreadBadge>}
              </S.ChatMeta>
            </S.ChatItem>
          ))}
          {(roomsQuery.isPending || areSummariesPending) && (
            <S.EmptyMessage>채팅을 불러오는 중이에요.</S.EmptyMessage>
          )}
          {roomsQuery.isError && <S.EmptyMessage>채팅을 불러오지 못했어요.</S.EmptyMessage>}
          {!roomsQuery.isPending &&
            !areSummariesPending &&
            !roomsQuery.isError &&
            visibleChats.length === 0 && (
            <S.EmptyMessage>
              {searchQuery
                ? "검색 결과가 없어요."
                : activeTab === "unread"
                  ? "읽지 않은 채팅이 없어요."
                  : "아직 참여 중인 채팅이 없어요."}
            </S.EmptyMessage>
            )}
        </S.ChatList>
      </S.Content>

      <BottomNavigation
        activeKey="chat"
        items={navigationItems}
        onChange={(key) => {
          if (key === "home") navigate("/home");
          if (key === "hub") navigate("/giut-hub");
          if (key === "mypage") navigate("/my-profile");
        }}
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
