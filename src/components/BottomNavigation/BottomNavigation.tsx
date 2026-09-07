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
  return (
    <S.Nav aria-label="주요 메뉴">
      <S.Inner>
        {items.map((item) => {
          const active = item.key === activeKey;
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
              {item.badge !== undefined && <S.Badge>{item.badge}</S.Badge>}
              <span>{item.label}</span>
            </S.Item>
          );
        })}
      </S.Inner>
    </S.Nav>
  );
}
