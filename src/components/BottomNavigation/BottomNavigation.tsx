import { useQuery } from "@tanstack/react-query";
import { fetchTotalUnreadMessageCount } from "../../api/chats";
import { Icon, type IconName } from "../icons";
import { S } from "./BottomNavigation.styles";

export type BottomNavigationItem = {
  key: string;
  label: string;
  icon: IconName;
  badge?: number;
};

type BottomNavigationProps = {
  items: BottomNavigationItem[];
  activeKey: string;
  onChange: (key: string) => void;
};

export function BottomNavigation({ items, activeKey, onChange }: BottomNavigationProps) {
  const unreadQuery = useQuery({
    queryKey: ["chat-unread-total"],
    queryFn: fetchTotalUnreadMessageCount,
    refetchInterval: 30_000,
    retry: false,
  });

  return (
    <S.Nav aria-label="주요 메뉴">
      <S.Inner>
        {items.map((item) => {
          const active = item.key === activeKey;
          const badge =
            item.key === "chat" ? unreadQuery.data ?? 0 : item.badge ?? 0;
          return (
            <S.Item
              $active={active}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
              key={item.key}
              onClick={() => onChange(item.key)}
              type="button"
            >
              <Icon name={item.icon} size={21} weight={active ? "fill" : "regular"} />
              {badge > 0 && <S.Badge>{badge > 99 ? "99+" : badge}</S.Badge>}
              <span>{item.label}</span>
            </S.Item>
          );
        })}
      </S.Inner>
    </S.Nav>
  );
}
