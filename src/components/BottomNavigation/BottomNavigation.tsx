import { Icon, type IconName } from "../icons";
import { useAuth } from "../../contexts/AuthContext";
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
  const { isAuthenticated, universityVerified } = useAuth();
  const isUniversityUnverified = isAuthenticated && !universityVerified;

  return (
    <S.Nav aria-label="주요 메뉴">
      <S.Inner>
        {items.map((item) => {
          const active = item.key === activeKey;
          const locked =
            isUniversityUnverified && (item.key === "hub" || item.key === "chat");

          return (
            <S.Item
              $active={active}
              aria-current={active ? "page" : undefined}
              aria-label={locked ? `${item.label}, 학교 인증 필요` : item.label}
              disabled={locked}
              key={item.key}
              onClick={() => onChange(item.key)}
              type="button"
            >
              <Icon name={item.icon} size={21} weight={active ? "fill" : "regular"} />
              {locked ? (
                <S.Lock aria-hidden="true">
                  <Icon name="lock" size={8} weight="fill" />
                </S.Lock>
              ) : (
                item.badge !== undefined && <S.Badge>{item.badge}</S.Badge>
              )}
              <span>{item.label}</span>
            </S.Item>
          );
        })}
      </S.Inner>
    </S.Nav>
  );
}
