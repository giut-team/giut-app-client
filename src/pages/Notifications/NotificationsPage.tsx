import { useState } from "react";
import { useNavigate } from "react-router-dom";
import alarmIcon from "../../assets/notifications/alarm.svg";
import checkIcon from "../../assets/notifications/check.svg";
import confettiIcon from "../../assets/notifications/confetti.svg";
import envelopeIcon from "../../assets/notifications/envelope.svg";
import newspaperIcon from "../../assets/notifications/newspaper.svg";
import { PageHeader } from "../../components/PageHeader";
import { S } from "./NotificationsPage.styles";

type NotificationTone = "blue" | "yellow" | "red" | "green" | "sky";

type NotificationItem = {
  id: string;
  icon: string;
  tone: NotificationTone;
  title: string;
  description: string;
  receivedAt: string;
};

const notifications: NotificationItem[] = [
  {
    id: "application-accepted",
    icon: confettiIcon,
    tone: "blue",
    title: "이서연님이 팀 지원을 수락했어요",
    description: "서울 데이터 공모전 팀채팅방이 열렸습니다",
    receivedAt: "5분 전",
  },
  {
    id: "application-viewed",
    icon: envelopeIcon,
    tone: "yellow",
    title: "최유진님이 팀 제안을 보냈어요",
    description: "마이페이지에서 제안 내용 · 작업 포지션",
    receivedAt: "1시간 전",
  },
  {
    id: "contest-deadline",
    icon: alarmIcon,
    tone: "red",
    title: "스크랩한 공모전이 3일 뒤 마감돼요",
    description: "대학생 환경 아이디어 챌린지 · D-3",
    receivedAt: "오늘 09:00",
  },
  {
    id: "verification-complete",
    icon: checkIcon,
    tone: "green",
    title: "제보한 공모전에 인증마크가 붙었어요",
    description: "제 12회 핀테크 해커톤 · 관리자 검증 완료",
    receivedAt: "어제",
  },
  {
    id: "contest-update",
    icon: newspaperIcon,
    tone: "sky",
    title: "교내 공지에서 새 공모전 4건을 가져왔어요",
    description: "서울시립대 공지사항 RSS · 자동 수집",
    receivedAt: "2일 전",
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [unreadIds, setUnreadIds] = useState<string[]>([
    "application-accepted",
    "application-viewed",
  ]);

  const markAsRead = (notificationId: string) => {
    setUnreadIds((ids) => ids.filter((id) => id !== notificationId));
  };

  return (
    <S.Page>
      <PageHeader
        onBack={() => navigate(-1)}
        rightContent={
          <S.MarkAllReadButton
            disabled={unreadIds.length === 0}
            onClick={() => setUnreadIds([])}
            type="button"
          >
            모두 읽음
          </S.MarkAllReadButton>
        }
        title="알림"
      />

      <S.List aria-label="알림 목록">
        {notifications.map((notification) => {
          const isUnread = unreadIds.includes(notification.id);

          return (
            <S.NotificationCard
              $unread={isUnread}
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              type="button"
            >
              <S.NotificationIcon $tone={notification.tone}>
                <S.NotificationAsset alt="" src={notification.icon} />
              </S.NotificationIcon>
              <S.NotificationContent>
                <S.NotificationTitle>{notification.title}</S.NotificationTitle>
                <S.NotificationDescription>
                  {notification.description}
                </S.NotificationDescription>
                <S.ReceivedAt>{notification.receivedAt}</S.ReceivedAt>
              </S.NotificationContent>
              {isUnread && <S.UnreadDot aria-label="읽지 않음" />}
            </S.NotificationCard>
          );
        })}
      </S.List>
    </S.Page>
  );
}
