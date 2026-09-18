import {
  AppleLogo,
  ArrowsDownUp,
  Bell,
  BookmarkSimple,
  CaretLeft,
  CaretRight,
  Check,
  Code,
  ChatCircleDots,
  DotsThree,
  Eye,
  EyeSlash,
  Heart,
  House,
  LockKey,
  Megaphone,
  MagnifyingGlass,
  Minus,
  Plus,
  NotePencil,
  Palette,
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
  | "code"
  | "chat"
  | "more"
  | "megaphone"
  | "eye"
  | "eye-slash"
  | "home"
  | "heart"
  | "lock"
  | "minus"
  | "plus"
  | "palette"
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
  code: Code,
  chat: ChatCircleDots,
  more: DotsThree,
  megaphone: Megaphone,
  eye: Eye,
  "eye-slash": EyeSlash,
  home: House,
  heart: Heart,
  lock: LockKey,
  minus: Minus,
  plus: Plus,
  palette: Palette,
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
