import {
  AppleLogo,
  ArrowRight,
  ArrowsDownUp,
  Bell,
  BookmarkSimple,
  CaretLeft,
  CaretRight,
  Check,
  ChatCircleDots,
  Code,
  DotsThree,
  Eye,
  EyeSlash,
  FolderSimple,
  Heart,
  Lightning,
  House,
  LockKey,
  Megaphone,
  MagnifyingGlass,
  Minus,
  Palette,
  Plus,
  NotePencil,
  RocketLaunch,
  ShieldCheck,
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
  | "arrow-right"
  | "arrow-left"
  | "arrows-down-up"
  | "bell"
  | "bookmark"
  | "caret-right"
  | "check"
  | "chat"
  | "code"
  | "more"
  | "megaphone"
  | "eye"
  | "eye-slash"
  | "folder"
  | "home"
  | "heart"
  | "lightning"
  | "lock"
  | "minus"
  | "palette"
  | "plus"
  | "edit"
  | "search"
  | "share"
  | "trash"
  | "shield-check"
  | "rocket"
  | "user"
  | "user-plus"
  | "users"
  | "warning"
  | "x";

type IconComponentProps = PhosphorIconProps & { name: IconName };

const iconMap: Record<IconName, ComponentType<PhosphorIconProps>> = {
  apple: AppleLogo,
  "arrow-right": ArrowRight,
  "arrow-left": CaretLeft,
  "arrows-down-up": ArrowsDownUp,
  bell: Bell,
  bookmark: BookmarkSimple,
  "caret-right": CaretRight,
  check: Check,
  chat: ChatCircleDots,
  code: Code,
  more: DotsThree,
  megaphone: Megaphone,
  eye: Eye,
  "eye-slash": EyeSlash,
  folder: FolderSimple,
  home: House,
  heart: Heart,
  lightning: Lightning,
  lock: LockKey,
  minus: Minus,
  palette: Palette,
  plus: Plus,
  edit: NotePencil,
  search: MagnifyingGlass,
  share: ShareNetwork,
  trash: Trash,
  "shield-check": ShieldCheck,
  rocket: RocketLaunch,
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
