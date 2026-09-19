import {
  AppleLogo,
  ArrowRight,
  ArrowsDownUp,
  Bell,
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Check,
  ChatCircleDots,
  Code,
  DotsThree,
  Eye,
  EyeSlash,
  FolderSimple,
  FunnelSimple,
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
  User,
  UserCircle,
  UserPlus,
  UsersThree,
  Star,
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
  | "calendar"
  | "caret-right"
  | "check"
  | "chat"
  | "code"
  | "more"
  | "megaphone"
  | "eye"
  | "eye-slash"
  | "folder"
  | "filter"
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
  | "person"
  | "user-plus"
  | "users"
  | "star"
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
  calendar: CalendarBlank,
  "caret-right": CaretRight,
  check: Check,
  chat: ChatCircleDots,
  code: Code,
  more: DotsThree,
  megaphone: Megaphone,
  eye: Eye,
  "eye-slash": EyeSlash,
  folder: FolderSimple,
  filter: FunnelSimple,
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
  person: User,
  "user-plus": UserPlus,
  users: UsersThree,
  star: Star,
  warning: Warning,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
