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
  Eye,
  EyeSlash,
  FolderSimple,
  Heart,
  ImageSquare,
  Lightning,
  House,
  LockKey,
  MagnifyingGlass,
  Megaphone,
  Minus,
  Palette,
  Plus,
  PaperPlaneTilt,
  NotePencil,
  RocketLaunch,
  ShieldCheck,
  ShareNetwork,
  UserCircle,
  UserPlus,
  UsersThree,
  Star,
  DotsThree,
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
  | "eye"
  | "eye-slash"
  | "folder"
  | "home"
  | "heart"
  | "image"
  | "lightning"
  | "lock"
  | "minus"
  | "megaphone"
  | "palette"
  | "plus"
  | "paper-plane"
  | "edit"
  | "search"
  | "share"
  | "shield-check"
  | "rocket"
  | "user"
  | "user-plus"
  | "users"
  | "star"
  | "more"
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
  eye: Eye,
  "eye-slash": EyeSlash,
  folder: FolderSimple,
  home: House,
  heart: Heart,
  image: ImageSquare,
  lightning: Lightning,
  lock: LockKey,
  minus: Minus,
  megaphone: Megaphone,
  palette: Palette,
  plus: Plus,
  "paper-plane": PaperPlaneTilt,
  edit: NotePencil,
  search: MagnifyingGlass,
  share: ShareNetwork,
  "shield-check": ShieldCheck,
  rocket: RocketLaunch,
  user: UserCircle,
  "user-plus": UserPlus,
  users: UsersThree,
  star: Star,
  more: DotsThree,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
