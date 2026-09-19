import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { Toast } from "../../components/Toast/Toast";
import { S } from "./ChatRoomPage.styles";

type AvatarTone = "mint" | "peach" | "purple";
type Message = {
  id: string;
  content: string;
  time: string;
  sender: "me" | "other";
};

type ChatRoom = {
  name: string;
  initial: string;
  avatarTone: AvatarTone;
  subtitle: string;
  contextLabel: string;
  contextTitle: string;
  primaryAction: string;
  secondaryAction: string;
  primaryPath: string;
  secondaryPath: string;
  messages: Message[];
};

type ConfirmationAction = "report" | "leave" | null;

const chatRooms: Record<string, ChatRoom> = {
  "seoul-data": {
    name: "이서연",
    initial: "서",
    avatarTone: "mint",
    subtitle: "경영학부 3학년 · 기획",
    contextLabel: "공모전 팀 상세에서 시작된 대화",
    contextTitle: "2026 서울시 데이터 활용 공모전 · 데이터로 서울을 팀",
    primaryAction: "팀 보기",
    secondaryAction: "공모전 보기",
    primaryPath: "/contests/seoul-data/teams/my-data-seoul",
    secondaryPath: "/contests/seoul-data",
    messages: [
      {
        id: "seoul-1",
        sender: "me",
        time: "14:32",
        content:
          "안녕하세요! 공모전 공고 보고 연락드려요. 백엔드 지원 전에 회의 방식이 궁금해요.",
      },
      {
        id: "seoul-2",
        sender: "other",
        time: "14:38",
        content: "주 1회 온라인이고, 마감 전 한번 오프라인으로 모여요 😊",
      },
      {
        id: "seoul-3",
        sender: "me",
        time: "14:40",
        content: "좋아요, 지원서 준비해서 넣을게요!",
      },
    ],
  },
  "startup-package": {
    name: "최유진",
    initial: "우",
    avatarTone: "purple",
    subtitle: "경영학부 4학년 · 디자인",
    contextLabel: "기웃허브에서 받은 제안",
    contextTitle: "예비창업패키지 청년 트랙 · 백엔드 개발자 제안",
    primaryAction: "팀 보기",
    secondaryAction: "프로필 보기",
    primaryPath: "/contests/seoul-data/teams/syrup-data-lab",
    secondaryPath: "/giut-hub/9",
    messages: [
      {
        id: "startup-1",
        sender: "other",
        time: "11:20",
        content:
          "기웃허브에서 포트폴리오 잘 봤어요! 저희 팀 백엔드로 함께해 주실 수 있을까요?",
      },
      {
        id: "startup-2",
        sender: "me",
        time: "11:32",
        content: "관심 있어요! 팀 구성이나 일정 좀 더 알 수 있을까요?",
      },
      {
        id: "startup-3",
        sender: "other",
        time: "11:35",
        content:
          "기획 2명 · 디자인 1명이고 주 1회 온라인이에요. 팀 상세에 정리해 뒀어요 😊",
      },
    ],
  },
  "esg-campaign": {
    name: "장하늘",
    initial: "하",
    avatarTone: "peach",
    subtitle: "시각디자인과 3학년 · 디자인",
    contextLabel: "공모전 팀 상세에서 시작된 대화",
    contextTitle: "ESG 임팩트 캠페인 · 디자인 포지션 제안",
    primaryAction: "팀 보기",
    secondaryAction: "공모전 보기",
    primaryPath: "/contests/seoul-data/teams/syrup-data-lab",
    secondaryPath: "/contests/seoul-data",
    messages: [
      {
        id: "esg-1",
        sender: "other",
        time: "어제",
        content: "디자인 포지션 아직 열려 있어요. 포트폴리오도 잘 봤습니다!",
      },
    ],
  },
};

export function ChatRoomPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const room = chatRooms[chatId ?? ""];
  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction>(null);
  const [toastMessage, setToastMessage] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(
    () => [...(room?.messages ?? []), ...sentMessages],
    [room?.messages, sentMessages],
  );

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => setToastMessage(""), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeWhenClickedOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", closeWhenClickedOutside);
    return () => window.removeEventListener("pointerdown", closeWhenClickedOutside);
  }, [isMenuOpen]);

  if (!room) {
    return <Navigate replace to="/chat" />;
  }

  const sendMessage = () => {
    const content = draft.trim();
    if (!content) return;

    setSentMessages((current) => [
      ...current,
      {
        id: `sent-${Date.now()}`,
        content,
        sender: "me",
        time: new Intl.DateTimeFormat("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      },
    ]);
    setDraft("");
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setIsMenuOpen(false);
    setToastMessage(
      nextMuted ? "채팅방 알림을 껐어요." : "채팅방 알림을 켰어요.",
    );
  };

  const completeConfirmation = () => {
    if (confirmationAction === "leave") {
      navigate("/chat", {
        replace: true,
        state: { toastMessage: "채팅방을 나갔어요." },
      });
      return;
    }

    setConfirmationAction(null);
    setToastMessage("신고가 접수되었어요.");
  };

  return (
    <S.Page>
      <S.Header>
        <S.BackButton
          aria-label="채팅 목록으로"
          onClick={() => navigate("/chat")}
          type="button"
        >
          <Icon name="arrow-left" size={23} weight="bold" />
        </S.BackButton>
        <S.Avatar $tone={room.avatarTone}>{room.initial}</S.Avatar>
        <S.Profile>
          <S.Name>{room.name}</S.Name>
          <S.Subtitle>{room.subtitle}</S.Subtitle>
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
        <S.ContextCard>
          <S.ContextLabel>{room.contextLabel}</S.ContextLabel>
          <S.ContextTitle>{room.contextTitle}</S.ContextTitle>
          <S.ContextActions>
            <S.ContextButton onClick={() => navigate(room.primaryPath)} type="button">
              {room.primaryAction}
            </S.ContextButton>
            <S.ContextButton onClick={() => navigate(room.secondaryPath)} type="button">
              {room.secondaryAction}
            </S.ContextButton>
          </S.ContextActions>
        </S.ContextCard>

        <S.DateDivider>오늘</S.DateDivider>

        <S.Messages aria-label={`${room.name}님과의 대화`}>
          {messages.map((message) => (
            <S.MessageRow $sender={message.sender} key={message.id}>
              {message.sender === "me" && (
                <S.MessageTime>{message.time}</S.MessageTime>
              )}
              <S.Bubble $sender={message.sender}>{message.content}</S.Bubble>
              {message.sender === "other" && (
                <S.MessageTime>{message.time}</S.MessageTime>
              )}
            </S.MessageRow>
          ))}
        </S.Messages>
      </S.Thread>

      <Modal
        description={
          confirmationAction === "leave"
            ? "나가면 이 채팅방의 메시지를 더 이상 확인할 수 없어요."
            : "신고 내용은 운영팀이 검토해요. 허위 신고는 서비스 이용에 제한이 있을 수 있어요."
        }
        emphasizeDescription
        icon={
          <Icon
            name={confirmationAction === "leave" ? "x" : "warning"}
            size={22}
            weight="bold"
          />
        }
        onClose={() => setConfirmationAction(null)}
        open={confirmationAction !== null}
        primaryAction={{
          label: confirmationAction === "leave" ? "나가기" : "신고하기",
          onClick: completeConfirmation,
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setConfirmationAction(null),
        }}
        title={
          confirmationAction === "leave"
            ? "채팅방을 나갈까요?"
            : `${room.name}님을 신고할까요?`
        }
      />

      <S.Composer
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <S.PlusButton aria-label="첨부하기" type="button">
          <Icon name="plus" size={18} weight="bold" />
        </S.PlusButton>
        <S.MessageInput
          aria-label="메시지"
          onChange={(event) => setDraft(event.target.value)}
          placeholder="메시지를 입력하세요"
          value={draft}
        />
        <S.SendButton
          aria-label="메시지 전송"
          disabled={!draft.trim()}
          type="submit"
        >
          <Icon name="paper-plane" size={19} weight="fill" />
        </S.SendButton>
      </S.Composer>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
