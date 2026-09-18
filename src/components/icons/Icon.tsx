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
  Eye,
  EyeSlash,
  FolderSimple,
  Heart,
  Lightning,
  House,
  LockKey,
  MagnifyingGlass,
  Minus,
  Plus,
  NotePencil,
  ShieldCheck,
  ShareNetwork,
  UserCircle,
  UserPlus,
  UsersThree,
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
  | "eye"
  | "eye-slash"
  | "folder"
  | "home"
  | "heart"
  | "lightning"
  | "lock"
  | "minus"
  | "plus"
  | "edit"
  | "search"
  | "share"
  | "shield-check"
  | "user"
  | "user-plus"
  | "users"
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
  eye: Eye,
  "eye-slash": EyeSlash,
  folder: FolderSimple,
  home: House,
  heart: Heart,
  lightning: Lightning,
  lock: LockKey,
  minus: Minus,
  plus: Plus,
  edit: NotePencil,
  search: MagnifyingGlass,
  share: ShareNetwork,
  "shield-check": ShieldCheck,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
