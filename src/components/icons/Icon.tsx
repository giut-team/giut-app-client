import {
  AppleLogo,
  ArrowsDownUp,
  Bell,
  BookmarkSimple,
  CaretLeft,
  CaretRight,
  Check,
  ChatCircleDots,
  Eye,
  EyeSlash,
  Heart,
  House,
  LockKey,
  MagnifyingGlass,
  Plus,
  UserCircle,
  UserPlus,
  UsersThree,
  X,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type IconName =
  | "apple"
  | "arrow-left"
  | "arrows-down-up"
  | "bell"
  | "bookmark"
  | "caret-right"
  | "check"
  | "chat"
  | "eye"
  | "eye-slash"
  | "home"
  | "heart"
  | "lock"
  | "plus"
  | "search"
  | "user"
  | "user-plus"
  | "users"
  | "x";

type IconComponentProps = PhosphorIconProps & { name: IconName };

const iconMap: Record<IconName, ComponentType<PhosphorIconProps>> = {
  apple: AppleLogo,
  "arrow-left": CaretLeft,
  "arrows-down-up": ArrowsDownUp,
  bell: Bell,
  bookmark: BookmarkSimple,
  "caret-right": CaretRight,
  check: Check,
  chat: ChatCircleDots,
  eye: Eye,
  "eye-slash": EyeSlash,
  home: House,
  heart: Heart,
  lock: LockKey,
  plus: Plus,
  search: MagnifyingGlass,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
