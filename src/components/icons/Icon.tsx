import {
  AppleLogo,
  ArrowRight,
  ArrowsDownUp,
  Bell,
  BellSlash,
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Check,
  ChatCircleDots,
  Code,
  DotsThree,
  DownloadSimple,
  Eye,
  EyeSlash,
  FolderSimple,
  FunnelSimple,
  GearSix,
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
  SignOut,
  UploadSimple,
  Trash,
  User,
  UserCircle,
  UserPlus,
  UsersThree,
  Star,
  TagSimple,
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
  | "bell-slash"
  | "bookmark"
  | "calendar"
  | "caret-right"
  | "check"
  | "chat"
  | "code"
  | "more"
  | "download"
  | "megaphone"
  | "eye"
  | "eye-slash"
  | "folder"
  | "filter"
  | "settings"
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
  | "share-export"
  | "sign-out"
  | "trash"
  | "shield-check"
  | "rocket"
  | "user"
  | "person"
  | "user-plus"
  | "users"
  | "star"
  | "tag"
  | "warning"
  | "x";

type IconComponentProps = PhosphorIconProps & { name: IconName };

const iconMap: Record<IconName, ComponentType<PhosphorIconProps>> = {
  apple: AppleLogo,
  "arrow-right": ArrowRight,
  "arrow-left": CaretLeft,
  "arrows-down-up": ArrowsDownUp,
  bell: Bell,
  "bell-slash": BellSlash,
  bookmark: BookmarkSimple,
  calendar: CalendarBlank,
  "caret-right": CaretRight,
  check: Check,
  chat: ChatCircleDots,
  code: Code,
  more: DotsThree,
  download: DownloadSimple,
  megaphone: Megaphone,
  eye: Eye,
  "eye-slash": EyeSlash,
  folder: FolderSimple,
  filter: FunnelSimple,
  settings: GearSix,
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
  "share-export": UploadSimple,
  "sign-out": SignOut,
  trash: Trash,
  "shield-check": ShieldCheck,
  rocket: RocketLaunch,
  user: UserCircle,
  person: User,
  "user-plus": UserPlus,
  users: UsersThree,
  star: Star,
  tag: TagSimple,
  warning: Warning,
  x: X,
};

export function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = iconMap[name];
  return <IconComponent aria-hidden="true" {...props} />;
}
