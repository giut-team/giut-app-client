import { useEffect, useMemo, useRef, useState } from "react";
import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteChatMessage,
  fetchChatMessages,
  fetchChatParticipantProfile,
  fetchChatRoom,
  leaveChatRoom,
  markChatRoomAsRead,
  sendChatMessage,
  type ChatMessageResponse,
  type ChatMessageListResponse,
} from "../../api/chats";
import { subscribeToChatRoom } from "../../api/chatSocket";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { Toast } from "../../components/Toast/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { S } from "./ChatRoomPage.styles";

type AvatarTone = "mint" | "peach" | "purple";
type ConfirmationAction = "report" | "leave" | null;

const avatarTones: AvatarTone[] = ["mint", "peach", "purple"];

const formatMessageTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

const uniqueChronologicalMessages = (messages: ChatMessageResponse[]) => {
  const unique = new Map(messages.map((message) => [message.messageId, message]));
  return [...unique.values()].sort(
    (left, right) =>
      new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime(),
  );
};

export function ChatRoomPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { chatId } = useParams();
  const { profile: myProfile } = useAuth();
  const chatRoomId = Number(chatId);
  const isValidChatRoomId = Number.isSafeInteger(chatRoomId) && chatRoomId > 0;
  const [draft, setDraft] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction>(null);
  const [messageMenuId, setMessageMenuId] = useState<number | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const messageMenuRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const lastReadMessageIdRef = useRef<number | null>(null);

  const roomQuery = useQuery({
    queryKey: ["chat-room", chatRoomId],
    queryFn: () => fetchChatRoom(chatRoomId),
    enabled: isValidChatRoomId,
    retry: false,
  });

  const participantQuery = useQuery({
    queryKey: ["chat-participant-profile", roomQuery.data?.targetUserId],
    queryFn: () => fetchChatParticipantProfile(roomQuery.data!.targetUserId!),
    enabled:
      roomQuery.data?.type === "PERSONAL" &&
      Boolean(roomQuery.data.targetUserId),
  });

  const messagesQuery = useInfiniteQuery({
    queryKey: ["chat-messages", chatRoomId],
    queryFn: ({ pageParam }) => fetchChatMessages(chatRoomId, pageParam, 30),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    enabled:
      isValidChatRoomId && roomQuery.data?.status === "ACTIVE",
    refetchInterval: 10_000,
    retry: false,
  });

  const messages = useMemo(
    () =>
      uniqueChronologicalMessages(
        messagesQuery.data?.pages.flatMap((page) => page.messages) ?? [],
      ),
    [messagesQuery.data],
  );

  useEffect(() => {
    if (!isValidChatRoomId || roomQuery.data?.status !== "ACTIVE") return;

    return subscribeToChatRoom({
      chatRoomId,
      onMessage: (receivedMessage) => {
        queryClient.setQueryData<InfiniteData<ChatMessageListResponse>>(
          ["chat-messages", chatRoomId],
          (current) => {
            if (!current) return current;
            const alreadyExists = current.pages.some((page) =>
              page.messages.some(
                (message) => message.messageId === receivedMessage.messageId,
              ),
            );
            if (alreadyExists) return current;

            return {
              ...current,
              pages: current.pages.map((page, index) =>
                index === 0
                  ? { ...page, messages: [...page.messages, receivedMessage] }
                  : page,
              ),
            };
          },
        );
        void queryClient.invalidateQueries({
          queryKey: ["chat-room-summary", chatRoomId],
        });
        void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
      },
    });
  }, [chatRoomId, isValidChatRoomId, queryClient, roomQuery.data?.status]);

  const participantProfile = participantQuery.data?.profile;
  const roomName =
    participantProfile?.nickname ||
    participantQuery.data?.nickname ||
    (roomQuery.data?.type === "TEAM"
      ? `팀 채팅 #${chatRoomId}`
      : `개인 채팅 #${roomQuery.data?.targetUserId ?? chatRoomId}`);
  const roomSubtitle = participantProfile
    ? [
        participantProfile.departmentName,
        participantProfile.grade ? `${participantProfile.grade}학년` : "",
        participantProfile.primaryRoles[0]?.name,
      ]
        .filter(Boolean)
        .join(" · ")
    : roomQuery.data?.type === "TEAM"
      ? "팀 채팅"
      : "1:1 채팅";
  const avatarTone = avatarTones[chatRoomId % avatarTones.length];

  const readMutation = useMutation({
    mutationFn: (messageId: number) =>
      markChatRoomAsRead(chatRoomId, messageId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["chat-room-summary", chatRoomId] });
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
      void queryClient.invalidateQueries({ queryKey: ["chat-unread-total"] });
    },
  });

  const sendMutation = useMutation({
    mutationFn: (content: string) => sendChatMessage(chatRoomId, content),
    onSuccess: () => {
      setDraft("");
      void queryClient.invalidateQueries({ queryKey: ["chat-messages", chatRoomId] });
      void queryClient.invalidateQueries({ queryKey: ["chat-room-summary", chatRoomId] });
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
    },
    onError: () => setToastMessage("메시지를 보내지 못했어요."),
  });

  const deleteMutation = useMutation({
    mutationFn: (messageId: number) =>
      deleteChatMessage(chatRoomId, messageId),
    onSuccess: (_, messageId) => {
      queryClient.setQueryData<InfiniteData<ChatMessageListResponse>>(
        ["chat-messages", chatRoomId],
        (current) =>
          current
            ? {
                ...current,
                pages: current.pages.map((page) => ({
                  ...page,
                  messages: page.messages.map((message) =>
                    message.messageId === messageId
                      ? { ...message, status: "DELETED" as const }
                      : message,
                  ),
                })),
              }
            : current,
      );
      setMessageToDelete(null);
      setMessageMenuId(null);
      setToastMessage("메시지를 삭제했어요.");
      void queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatRoomId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["chat-room-summary", chatRoomId],
      });
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
    },
    onError: () => {
      setMessageToDelete(null);
      setToastMessage("메시지를 삭제하지 못했어요.");
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leaveChatRoom(chatRoomId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
      void queryClient.invalidateQueries({ queryKey: ["chat-unread-total"] });
      navigate("/chat", {
        replace: true,
        state: { toastMessage: "채팅방을 나갔어요." },
      });
    },
    onError: () => {
      setConfirmationAction(null);
      setToastMessage("채팅방을 나가지 못했어요.");
    },
  });

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeWhenClickedOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("pointerdown", closeWhenClickedOutside);
    return () => window.removeEventListener("pointerdown", closeWhenClickedOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (messageMenuId === null) return;
    const closeWhenClickedOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !messageMenuRef.current?.contains(event.target)
      ) {
        setMessageMenuId(null);
      }
    };
    window.addEventListener("pointerdown", closeWhenClickedOutside);
    return () => window.removeEventListener("pointerdown", closeWhenClickedOutside);
  }, [messageMenuId]);

  useEffect(
    () => () => {
      if (longPressTimerRef.current !== null) {
        window.clearTimeout(longPressTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!myProfile?.userId || messages.length === 0) return;
    const latestReceivedMessage = [...messages]
      .reverse()
      .find((message) => message.senderId !== myProfile.userId);
    if (
      !latestReceivedMessage ||
      lastReadMessageIdRef.current === latestReceivedMessage.messageId
    ) {
      return;
    }
    lastReadMessageIdRef.current = latestReceivedMessage.messageId;
    readMutation.mutate(latestReceivedMessage.messageId);
  }, [messages, myProfile?.userId, readMutation]);

  if (!isValidChatRoomId) return <Navigate replace to="/chat" />;

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setIsMenuOpen(false);
    setToastMessage(nextMuted ? "채팅방 알림을 껐어요." : "채팅방 알림을 켰어요.");
  };

  const completeConfirmation = () => {
    if (messageToDelete !== null) {
      deleteMutation.mutate(messageToDelete);
      return;
    }
    if (confirmationAction === "leave") {
      leaveMutation.mutate();
      return;
    }
    setConfirmationAction(null);
    setToastMessage("신고가 접수되었어요.");
  };

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current === null) return;
    window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  return (
    <S.Page>
      <S.Header>
        <S.BackButton aria-label="채팅 목록으로" onClick={() => navigate("/chat")} type="button">
          <Icon name="arrow-left" size={23} weight="bold" />
        </S.BackButton>
        <S.Avatar $tone={avatarTone}>
          {roomQuery.data?.type === "TEAM" ? "팀" : roomName.slice(0, 1)}
        </S.Avatar>
        <S.Profile>
          <S.Name>{roomQuery.isPending ? "채팅방을 불러오는 중" : roomName}</S.Name>
          <S.Subtitle>{roomSubtitle}</S.Subtitle>
        </S.Profile>
        <S.MenuAnchor ref={menuRef}>
          <S.MoreButton
            aria-expanded={isMenuOpen}
            aria-label="대화 메뉴"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name="more" size={21} weight="bold" />
          </S.MoreButton>
          {isMenuOpen && (
            <S.ChatMenu aria-label="채팅방 메뉴">
              <S.ChatMenuButton onClick={toggleMute} type="button">
                {isMuted ? "알림 켜기" : "알림 끄기"}
              </S.ChatMenuButton>
              <S.ChatMenuButton
                onClick={() => {
                  setIsMenuOpen(false);
                  setConfirmationAction("report");
                }}
                type="button"
              >
                신고하기
              </S.ChatMenuButton>
              <S.ChatMenuButton
                $danger
                onClick={() => {
                  setIsMenuOpen(false);
                  setConfirmationAction("leave");
                }}
                type="button"
              >
                채팅방 나가기
              </S.ChatMenuButton>
            </S.ChatMenu>
          )}
        </S.MenuAnchor>
      </S.Header>

      <S.Thread>
        {messagesQuery.hasNextPage && (
          <S.LoadMoreButton
            disabled={messagesQuery.isFetchingNextPage}
            onClick={() => void messagesQuery.fetchNextPage()}
            type="button"
          >
            {messagesQuery.isFetchingNextPage ? "불러오는 중..." : "이전 메시지 보기"}
          </S.LoadMoreButton>
        )}
        <S.DateDivider>대화</S.DateDivider>
        <S.Messages aria-label={`${roomName}님과의 대화`}>
          {messages.map((message) => {
            const sender = message.senderId === myProfile?.userId ? "me" : "other";
            const canDelete = sender === "me" && message.status === "ACTIVE";
            return (
              <S.MessageRow $sender={sender} key={message.messageId}>
                {sender === "me" && <S.MessageTime>{formatMessageTime(message.createdAt)}</S.MessageTime>}
                <S.MessageBubbleArea>
                  <S.Bubble
                    $sender={sender}
                    aria-haspopup={canDelete ? "menu" : undefined}
                    onContextMenu={(event) => {
                      if (!canDelete) return;
                      event.preventDefault();
                      setMessageMenuId(message.messageId);
                    }}
                    onPointerCancel={clearLongPressTimer}
                    onPointerDown={(event) => {
                      if (!canDelete || event.pointerType === "mouse") return;
                      clearLongPressTimer();
                      longPressTimerRef.current = window.setTimeout(() => {
                        setMessageMenuId(message.messageId);
                        longPressTimerRef.current = null;
                      }, 550);
                    }}
                    onPointerLeave={clearLongPressTimer}
                    onPointerUp={clearLongPressTimer}
                  >
                    {message.status === "DELETED"
                      ? "삭제된 메시지입니다."
                      : message.content}
                  </S.Bubble>
                  {messageMenuId === message.messageId && (
                    <S.MessageActionMenu ref={messageMenuRef} role="menu">
                      <S.MessageDeleteButton
                        onClick={() => {
                          setMessageMenuId(null);
                          setMessageToDelete(message.messageId);
                        }}
                        role="menuitem"
                        type="button"
                      >
                        삭제
                      </S.MessageDeleteButton>
                    </S.MessageActionMenu>
                  )}
                </S.MessageBubbleArea>
                {sender === "other" && <S.MessageTime>{formatMessageTime(message.createdAt)}</S.MessageTime>}
              </S.MessageRow>
            );
          })}
          {(roomQuery.isPending || messagesQuery.isPending) && (
            <S.ThreadStatus>메시지를 불러오는 중이에요.</S.ThreadStatus>
          )}
          {roomQuery.isError && (
            <S.ThreadStatus>채팅방에 접근할 수 없어요.</S.ThreadStatus>
          )}
          {!roomQuery.isError && messagesQuery.isError && (
            <S.ThreadStatus>메시지를 불러오지 못했어요.</S.ThreadStatus>
          )}
          {!roomQuery.isPending &&
            !roomQuery.isError &&
            !messagesQuery.isPending &&
            !messagesQuery.isError &&
            messages.length === 0 && (
            <S.ThreadStatus>첫 메시지를 보내보세요.</S.ThreadStatus>
          )}
        </S.Messages>
      </S.Thread>

      <Modal
        description={
          messageToDelete !== null
            ? "삭제한 메시지는 다시 복구할 수 없어요."
            : confirmationAction === "leave"
            ? "나가면 이 채팅방의 메시지를 더 이상 확인할 수 없어요."
            : "신고 내용은 운영팀이 검토해요. 허위 신고는 서비스 이용에 제한이 있을 수 있어요."
        }
        emphasizeDescription
        icon={<Icon name={messageToDelete !== null || confirmationAction === "leave" ? "x" : "warning"} size={22} weight="bold" />}
        onClose={() => {
          setConfirmationAction(null);
          setMessageToDelete(null);
        }}
        open={confirmationAction !== null || messageToDelete !== null}
        primaryAction={{
          label:
            messageToDelete !== null && deleteMutation.isPending
              ? "삭제 중..."
              : messageToDelete !== null
                ? "삭제하기"
                : confirmationAction === "leave" && leaveMutation.isPending
              ? "나가는 중..."
              : confirmationAction === "leave"
                ? "나가기"
                : "신고하기",
          onClick: completeConfirmation,
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => {
            setConfirmationAction(null);
            setMessageToDelete(null);
          },
        }}
        title={
          messageToDelete !== null
            ? "메시지를 삭제할까요?"
            : confirmationAction === "leave"
              ? "채팅방을 나갈까요?"
              : `${roomName}님을 신고할까요?`
        }
      />

      <S.Composer
        onSubmit={(event) => {
          event.preventDefault();
          const content = draft.trim();
          if (content) sendMutation.mutate(content);
        }}
      >
        <S.PlusButton aria-label="첨부하기" disabled type="button">
          <Icon name="plus" size={18} weight="bold" />
        </S.PlusButton>
        <S.MessageInput
          aria-label="메시지"
          disabled={sendMutation.isPending || roomQuery.data?.status !== "ACTIVE"}
          maxLength={2000}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={
            roomQuery.isPending
              ? "채팅방을 불러오는 중입니다"
              : roomQuery.isError
                ? "채팅방에 접근할 수 없습니다"
                : roomQuery.data?.status === "ACTIVE"
                  ? "메시지를 입력하세요"
                  : "종료된 채팅방입니다"
          }
          value={draft}
        />
        <S.SendButton
          aria-label="메시지 전송"
          disabled={!draft.trim() || sendMutation.isPending || roomQuery.data?.status !== "ACTIVE"}
          type="submit"
        >
          <Icon name="paper-plane" size={19} weight="fill" />
        </S.SendButton>
      </S.Composer>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
