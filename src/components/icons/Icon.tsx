import {
  Bell,
  ChatCircleDots,
  House,
  LockKey,
  MagnifyingGlass,
  UserCircle,
  UserPlus,
  UsersThree,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type IconName =
  | "bell"
  | "chat"
  | "home"
  | "lock"
  | "search"
  | "user"
  | "user-plus"
  | "users";

type IconComponentProps = PhosphorIconProps & { name: IconName };

const iconMap: Record<IconName, ComponentType<PhosphorIconProps>> = {
  bell: Bell,
  chat: ChatCircleDots,
  home: House,
  lock: LockKey,
  search: MagnifyingGlass,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
