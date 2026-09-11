import {
  AppleLogo,
  Bell,
  BookmarkSimple,
  CaretLeft,
  CaretRight,
  ChatCircleDots,
  Eye,
  EyeSlash,
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
  | "apple"
  | "arrow-left"
  | "bell"
  | "bookmark"
  | "caret-right"
  | "chat"
  | "eye"
  | "eye-slash"
  | "home"
  | "lock"
  | "search"
  | "user"
  | "user-plus"
  | "users";

type IconComponentProps = PhosphorIconProps & { name: IconName };

const iconMap: Record<IconName, ComponentType<PhosphorIconProps>> = {
  apple: AppleLogo,
  "arrow-left": CaretLeft,
  bell: Bell,
  bookmark: BookmarkSimple,
  "caret-right": CaretRight,
  chat: ChatCircleDots,
  eye: Eye,
  "eye-slash": EyeSlash,
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
