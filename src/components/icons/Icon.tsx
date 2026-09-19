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
  ImageSquare,
  Lightning,
  Link,
  House,
  LockKey,
  Megaphone,
  MagnifyingGlass,
  Minus,
  Palette,
  Plus,
  PaperPlaneTilt,
  NotePencil,
  RocketLaunch,
  ShieldCheck,
  ShareNetwork,
  Trash,
  UserCircle,
  UserPlus,
  UsersThree,
  Star,
  DotsThree,
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
  | "image"
  | "lightning"
  | "link"
  | "lock"
  | "minus"
  | "palette"
  | "plus"
  | "paper-plane"
  | "edit"
  | "search"
  | "share"
  | "trash"
  | "shield-check"
  | "rocket"
  | "user"
  | "user-plus"
  | "users"
  | "star"
  | "more"
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
  image: ImageSquare,
  lightning: Lightning,
  link: Link,
  lock: LockKey,
  minus: Minus,
  palette: Palette,
  plus: Plus,
  "paper-plane": PaperPlaneTilt,
  edit: NotePencil,
  search: MagnifyingGlass,
  share: ShareNetwork,
  trash: Trash,
  "shield-check": ShieldCheck,
  rocket: RocketLaunch,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
  star: Star,
  more: DotsThree,
  warning: Warning,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
