import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./ChatPage.styles";

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

const chatRows: ChatRow[] = [
  {
    id: "seoul-data",
    initial: "서",
    avatarTone: "mint",
    title: "이서연 · 서울 데이터 공모전 팀장",
    preview: "주 1회 온라인이고, 마감 전 한번 오프라인으로 모일 ...",
    time: "오후 2:40",
    latestMessageAt: "2026-09-19T14:40:00+09:00",
  },
  {
    id: "esg-campaign",
    initial: "하",
    avatarTone: "peach",
    title: "장하늘 · ESG 캠페인 팀장",
    preview: "디자인 포지션 아직 열려 있어요...!",
    time: "어제",
    latestMessageAt: "2026-09-18T18:20:00+09:00",
  },
  {
    id: "startup-package",
    initial: "우",
    avatarTone: "purple",
    title: "최유진 · 예비창업패키지 팀장",
    preview: "기웃허브에서 포트폴리오 잘 봤어요! 저희 팀 백엔드로 ...",
    time: "오후 6:30",
    latestMessageAt: "2026-09-19T18:30:00+09:00",
    unread: 1,
  },
];

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [readChatIds, setReadChatIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState(
    () => (location.state as { toastMessage?: string } | null)?.toastMessage ?? "",
  );

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const unreadCount = chatRows.filter(
    (chat) => chat.unread && !readChatIds.includes(chat.id),
  ).length;
  const sortedChats = useMemo(
    () =>
      [...chatRows].sort(
        (left, right) =>
          new Date(right.latestMessageAt).getTime() -
          new Date(left.latestMessageAt).getTime(),
      ),
    [],
  );
  const normalizedQuery = searchQuery.trim().replaceAll(" ", "").toLowerCase();
  const visibleChats = sortedChats.filter((chat) => {
    const matchesTab =
      activeTab === "all" || (chat.unread && !readChatIds.includes(chat.id));
    const matchesSearch =
      normalizedQuery.length === 0 ||
      chat.title.replaceAll(" ", "").toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesSearch;
  });

  const handleChatClick = (chat: ChatRow) => {
    if (chat.unread && !readChatIds.includes(chat.id)) {
      setReadChatIds((ids) => [...ids, chat.id]);
    }
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
          {visibleChats.map((chat) => {
            const isUnread = Boolean(chat.unread && !readChatIds.includes(chat.id));

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
          {visibleChats.length === 0 && (
            <S.EmptyMessage>
              {searchQuery ? "검색 결과가 없어요." : "읽지 않은 채팅이 없어요."}
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
