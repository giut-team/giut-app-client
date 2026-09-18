import {
  AppleLogo,
  ArrowsDownUp,
  Bell,
  BookmarkSimple,
  CaretLeft,
  CaretRight,
  Check,
  ChatCircleDots,
  DotsThree,
  Eye,
  EyeSlash,
  Heart,
  House,
  LockKey,
  MagnifyingGlass,
  Minus,
  Plus,
  NotePencil,
  ShareNetwork,
  Trash,
  UserCircle,
  UserPlus,
  UsersThree,
  Warning,
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
  | "more"
  | "eye"
  | "eye-slash"
  | "home"
  | "heart"
  | "lock"
  | "minus"
  | "plus"
  | "edit"
  | "search"
  | "share"
  | "trash"
  | "user"
  | "user-plus"
  | "users"
  | "warning"
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
  more: DotsThree,
  eye: Eye,
  "eye-slash": EyeSlash,
  home: House,
  heart: Heart,
  lock: LockKey,
  minus: Minus,
  plus: Plus,
  edit: NotePencil,
  search: MagnifyingGlass,
  share: ShareNetwork,
  trash: Trash,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
  warning: Warning,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
