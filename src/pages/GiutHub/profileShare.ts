import type { ProfileShareLink } from "../../api/profileShares";

export function buildProfileShareUrl(token: string, origin: string): string {
  return new URL(`/api/profile/shares/${encodeURIComponent(token)}`, origin).href;
}

export function canIssueProfileShare(profileUserId: number, currentUserId?: number): boolean {
  return currentUserId !== undefined && profileUserId === currentUserId;
}

export function isProfileShareExpired(link: ProfileShareLink, now = Date.now()): boolean {
  return !Number.isFinite(Date.parse(link.expiresAt)) || now >= Date.parse(link.expiresAt);
}

export async function copyProfileShareUrl(url: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error("이 브라우저에서는 자동 복사를 지원하지 않아요. 표시된 링크를 직접 복사해 주세요.");
  }
  await navigator.clipboard.writeText(url);
}

export async function shareProfileUrl(profileName: string, url: string): Promise<"shared" | "copied" | "cancelled"> {
  if (!navigator.share) {
    await copyProfileShareUrl(url);
    return "copied";
  }
  try {
    await navigator.share({
      title: `${profileName}님의 프로필`,
      text: `${profileName}님의 기웃허브 프로필을 확인해 보세요.`,
      url,
    });
    return "shared";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return "cancelled";
    throw error;
  }
}
