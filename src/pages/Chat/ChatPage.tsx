import { useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./ChatPage.styles";
import { getChatRooms, getChatUnreadCount } from "../../api/chat";
import { getPublicProfile } from "../../api/giutHub";
import { getProfileActionError } from "../../api/profileActions";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";

type ChatTab = "all" | "unread";
type AvatarTone = "mint" | "peach" | "purple";

type ChatRow = {
  id: string;
  initial: string;
  avatarTone: AvatarTone;
  title: string;
  preview: string;
  time: string;
  latestMessageAt: string;
  unread?: number;
};

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading, profile: me } = useAuth();
  const rooms = useQuery({ queryKey: ["chat-rooms", me?.userId],
    queryFn: ({ signal }) => getChatRooms(signal), enabled: isAuthenticated, retry: false, refetchInterval: 10_000 });
  const activeRooms = isAuthenticated && !rooms.isError ? rooms.data ?? [] : [];
  const profiles = useQueries({ queries: activeRooms.map(room => ({
    queryKey: ["chat-target", room.targetUserId], queryFn: () => getPublicProfile(room.targetUserId), retry: false,
  })) });
  const unread = useQueries({ queries: activeRooms.map(room => ({
    queryKey: ["chat-unread", me?.userId, room.chatRoomId],
    queryFn: ({ signal }: { signal: AbortSignal }) => getChatUnreadCount(room.chatRoomId, signal),
    retry: false, refetchInterval: 10_000,
  })) });
  const chatRows: ChatRow[] = activeRooms.map((room, index) => {
    const profile = profiles[index]?.data;
    const title = profile?.nickname ?? "대화 상대";
    return { id: String(room.chatRoomId), initial: title.slice(0, 1), avatarTone: "mint", title,
      preview: profile ? `${profile.profile.departmentName} · ${profile.profile.grade}학년` : "대화를 이어가 보세요.",
      time: new Date(room.createdAt).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" }),
      latestMessageAt: room.createdAt, unread: unread[index]?.data };
  });
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(
    () => (location.state as { toastMessage?: string } | null)?.toastMessage ?? "",
  );

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const unreadCount = chatRows.filter(chat => chat.unread).length;
  const sortedChats = [...chatRows].sort(
        (left, right) =>
          new Date(right.latestMessageAt).getTime() -
          new Date(left.latestMessageAt).getTime(),
      );
  const normalizedQuery = searchQuery.trim().replaceAll(" ", "").toLowerCase();
  const visibleChats = sortedChats.filter((chat) => {
    const matchesTab =
      activeTab === "all" || chat.unread;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      chat.title.replaceAll(" ", "").toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesSearch;
  });

  const handleChatClick = (chat: ChatRow) => {
    navigate(`/chat/${chat.id}`);
  };

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
          {(authLoading || (isAuthenticated && rooms.isPending)) && <S.EmptyMessage role="status">대화를 불러오고 있어요.</S.EmptyMessage>}
          {!authLoading && !isAuthenticated && <S.EmptyMessage><p>로그인 후 대화를 확인할 수 있어요.</p><Button onClick={() => navigate("/login")}>로그인하기</Button></S.EmptyMessage>}
          {rooms.isError && isAuthenticated && <S.EmptyMessage role="alert"><p>{getProfileActionError(rooms.error, "대화 목록을 불러오지 못했어요.")}</p><Button onClick={() => void rooms.refetch()}>다시 불러오기</Button></S.EmptyMessage>}
          {unread.some(result => result.isError) && <S.EmptyMessage role="alert">일부 대화의 읽지 않은 메시지 수를 확인하지 못했어요.</S.EmptyMessage>}
          {visibleChats.map((chat) => {
            const isUnread = Boolean(chat.unread);

            return (
              <S.ChatItem
                aria-label={`${chat.title} 채팅`}
                key={chat.id}
                onClick={() => handleChatClick(chat)}
                type="button"
              >
                <S.Avatar $tone={chat.avatarTone}>{chat.initial}</S.Avatar>
                <S.ChatContent>
                  <S.ChatTitle>{chat.title}</S.ChatTitle>
                  <S.ChatPreview>{chat.preview}</S.ChatPreview>
                </S.ChatContent>
                <S.ChatMeta>
                  <S.Time>{chat.time}</S.Time>
                  {isUnread && <S.UnreadBadge>{chat.unread}</S.UnreadBadge>}
                </S.ChatMeta>
              </S.ChatItem>
            );
          })}
          {!authLoading && isAuthenticated && !rooms.isPending && !rooms.isError && visibleChats.length === 0 && (
            <S.EmptyMessage>
              {searchQuery ? "검색 결과가 없어요." : activeTab === "unread" ? "읽지 않은 채팅이 없어요." : "아직 시작한 대화가 없어요."}
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
