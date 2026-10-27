import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getChatRoom, getChatMessages, sendChatMessage, type ChatMessage } from "../../api/chat";
import { leaveChatRoom } from "../../api/chats";
import { getPublicProfile } from "../../api/giutHub";
import { getProfileActionError } from "../../api/profileActions";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./PersonalChatRoomPage.styles";

export function PersonalChatRoomPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const roomId = Number(chatId);
  const { isAuthenticated, isLoading: authLoading, profile: me } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const room = useQuery({ queryKey: ["chat-room", me?.userId, roomId],
    queryFn: ({ signal }) => getChatRoom(roomId, signal), enabled: isAuthenticated, retry: false });
  const target = useQuery({ queryKey: ["chat-target", room.data?.targetUserId],
    queryFn: () => getPublicProfile(room.data!.targetUserId), enabled: isAuthenticated && !!room.data && !room.isError, retry: false });
  const messageKey = ["chat-messages", me?.userId, roomId];
  const messages = useQuery({ queryKey: messageKey,
    queryFn: ({ signal }) => getChatMessages(roomId, signal), enabled: isAuthenticated && !!room.data && !room.isError,
    retry: false, refetchInterval: 10_000 });
  const send = useMutation({ mutationFn: (content: string) => sendChatMessage(roomId, content), retry: false,
    onSuccess: message => {
      queryClient.setQueryData<ChatMessage[]>(messageKey, current => {
        const all = new Map((current ?? []).map(item => [item.messageId, item]));
        all.set(message.messageId, message);
        return [...all.values()].sort((a, b) => a.messageId - b.messageId);
      });
      setDraft("");
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
    },
    onSettled: () => { sending.current = false; },
  });
  const leave = useMutation({
    mutationFn: () => leaveChatRoom(roomId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
      void queryClient.invalidateQueries({ queryKey: ["chat-unread-total"] });
      navigate("/chat", {
        replace: true,
        state: { toastMessage: "채팅방을 나갔어요." },
      });
    },
    onError: () => {
      setIsLeaveModalOpen(false);
      setToastMessage("채팅방을 나가지 못했어요.");
    },
  });
  const visibleMessages = messages.isError ? [] : messages.data ?? [];
  const lastMessageId = visibleMessages.at(-1)?.messageId;
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [lastMessageId]);
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
  const name = target.data?.nickname ?? "대화 상대";

  return (
    <S.Page>
      <S.Header>
        <S.BackButton aria-label="채팅 목록으로" onClick={() => navigate("/chat")} type="button"><Icon name="arrow-left" size={23} /></S.BackButton>
        <S.Avatar $tone="mint">{name.slice(0, 1)}</S.Avatar>
        <S.Profile><S.Name>{name}</S.Name><S.Subtitle>기웃허브에서 시작한 대화</S.Subtitle></S.Profile>
        <S.HeaderActions>
          <S.NotificationButton
            $muted={isMuted}
            aria-label={isMuted ? "채팅방 알림 켜기" : "채팅방 알림 끄기"}
            aria-pressed={isMuted}
            onClick={() => {
              setIsMuted((muted) => {
                setToastMessage(muted ? "채팅방 알림을 켰어요." : "채팅방 알림을 껐어요.");
                return !muted;
              });
            }}
            type="button"
          >
            <Icon
              name={isMuted ? "bell-slash" : "bell"}
              size={21}
              weight={isMuted ? "regular" : "fill"}
            />
          </S.NotificationButton>
          <S.MenuAnchor ref={menuRef}>
            <S.MoreButton
              aria-expanded={isMenuOpen}
              aria-label="대화 메뉴"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              <Icon name="more" size={22} weight="bold" />
            </S.MoreButton>
            {isMenuOpen && (
              <S.ChatMenu aria-label="채팅방 메뉴">
                <S.ChatMenuButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsReportModalOpen(true);
                  }}
                  type="button"
                >
                  <Icon name="warning" size={18} weight="regular" />
                  신고하기
                </S.ChatMenuButton>
                <S.ChatMenuButton
                  $danger
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLeaveModalOpen(true);
                  }}
                  type="button"
                >
                  <Icon name="sign-out" size={18} weight="regular" />
                  채팅방 나가기
                </S.ChatMenuButton>
              </S.ChatMenu>
            )}
          </S.MenuAnchor>
        </S.HeaderActions>
      </S.Header>
      <S.Thread>
        {authLoading ? <S.Notice role="status">로그인 상태를 확인하고 있어요.</S.Notice>
          : !isAuthenticated ? <S.Notice><p>로그인 후 대화를 확인할 수 있어요.</p><Button onClick={() => navigate("/login")}>로그인하기</Button></S.Notice>
          : room.isError ? <S.Notice role="alert"><p>{getProfileActionError(room.error, "대화를 불러오지 못했어요.")}</p><Button onClick={() => void room.refetch()}>다시 불러오기</Button></S.Notice>
          : room.isPending || messages.isPending ? <S.Notice role="status">대화를 불러오고 있어요.</S.Notice>
          : messages.isError ? <S.Notice role="alert"><p>{getProfileActionError(messages.error, "메시지를 불러오지 못했어요.")}</p><Button onClick={() => void messages.refetch()}>다시 불러오기</Button></S.Notice>
          : <>
            {visibleMessages.length === 0 && <S.Notice>첫 메시지로 인사를 건네보세요.</S.Notice>}
            <S.Messages aria-label={`${name}님과의 대화`}>
              {visibleMessages.map(message => {
                const sender = message.senderId === me?.userId ? "me" : "other";
                return <S.MessageRow key={message.messageId} $sender={sender}>
                  <S.Bubble $sender={sender}>{message.content}</S.Bubble>
                  <S.MessageTime dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</S.MessageTime>
                </S.MessageRow>;
              })}
            </S.Messages>
            <div ref={endRef} />
          </>}
        {send.isError && <S.Notice role="alert"><p>{getProfileActionError(send.error, "전송 결과를 확인하지 못했어요. 대화를 다시 불러와 확인해 주세요.")}</p><Button onClick={() => void messages.refetch()}>전송 상태 확인</Button></S.Notice>}
      </S.Thread>
      <Modal
        description="나가면 이 채팅방의 메시지를 더 이상 확인할 수 없어요."
        emphasizeDescription
        icon={<Icon name="sign-out" size={22} weight="bold" />}
        onClose={() => setIsLeaveModalOpen(false)}
        open={isLeaveModalOpen}
        primaryAction={{
          label: leave.isPending ? "나가는 중..." : "나가기",
          onClick: () => {
            if (!leave.isPending) leave.mutate();
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsLeaveModalOpen(false),
        }}
        title="채팅방을 나갈까요?"
      />
      <Modal
        description="신고 내용은 운영팀이 검토해요. 허위 신고는 서비스 이용에 제한이 있을 수 있어요."
        emphasizeDescription
        icon={<Icon name="warning" size={22} weight="bold" />}
        onClose={() => setIsReportModalOpen(false)}
        open={isReportModalOpen}
        primaryAction={{
          label: "신고하기",
          onClick: () => {
            setIsReportModalOpen(false);
            setToastMessage("신고가 접수되었어요.");
          },
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsReportModalOpen(false),
        }}
        title={`${name}님을 신고할까요?`}
      />
      <S.Composer onSubmit={event => {
        event.preventDefault();
        if (sending.current || !isAuthenticated || !draft.trim() || !room.data || room.isError || messages.isPending || messages.isError) return;
        sending.current = true;
        send.mutate(draft);
      }}>
        <S.MessageInput aria-label="메시지" placeholder="메시지를 입력하세요" value={draft} maxLength={2000}
          disabled={!isAuthenticated || !room.data || room.isError || send.isPending}
          onChange={event => setDraft(event.target.value)} />
        <S.SendButton aria-label={send.isPending ? "메시지 전송 중" : "메시지 전송"} type="submit"
          disabled={!isAuthenticated || !room.data || room.isError || messages.isError || messages.isPending || !draft.trim() || send.isPending}>
          <Icon name="paper-plane" size={19} weight="fill" />
        </S.SendButton>
      </S.Composer>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
