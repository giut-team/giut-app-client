import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getChatRoom, getChatMessages, sendChatMessage, type ChatMessage } from "../../api/chat";
import { getPublicProfile } from "../../api/giutHub";
import { getProfileActionError } from "../../api/profileActions";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons";
import { S } from "./PersonalChatRoomPage.styles";

export function PersonalChatRoomPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const roomId = Number(chatId);
  const { isAuthenticated, isLoading: authLoading, profile: me } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
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
  const visibleMessages = messages.isError ? [] : messages.data ?? [];
  const lastMessageId = visibleMessages.at(-1)?.messageId;
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [lastMessageId]);
  const name = target.data?.nickname ?? "대화 상대";

  return (
    <S.Page>
      <S.Header>
        <S.BackButton aria-label="채팅 목록으로" onClick={() => navigate("/chat")} type="button"><Icon name="arrow-left" size={23} /></S.BackButton>
        <S.Avatar $tone="mint">{name.slice(0, 1)}</S.Avatar>
        <S.Profile><S.Name>{name}</S.Name><S.Subtitle>기웃허브에서 시작한 대화</S.Subtitle></S.Profile>
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
    </S.Page>
  );
}
