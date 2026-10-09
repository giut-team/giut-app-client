import axios from "axios";
import { api, API_BASE_URL } from "./client";
import type { PublicProfile } from "./giutHub";

export type ProfileShareLink = {
  id: number;
  token: string;
  createdAt: string;
  expiresAt: string;
};

// 비회원 응답에는 userId, 포트폴리오, 활동 이력이 포함되지 않는다.
export type SharedProfile = Omit<PublicProfile, "userId">;

const sharedProfileApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  withCredentials: false,
});

export async function createProfileShareLink(): Promise<ProfileShareLink> {
  const { data } = await api.post<ProfileShareLink>("/api/users/me/profile-share-links");
  if (!data.token?.trim() || !Number.isFinite(Date.parse(data.expiresAt))) {
    throw new Error("공유 링크 발급 응답을 확인할 수 없어요.");
  }
  return data;
}

export async function getSharedProfile(token: string, signal?: AbortSignal): Promise<SharedProfile> {
  const { data } = await sharedProfileApi.get<SharedProfile>(
    `/api/profile/shares/${encodeURIComponent(token)}`,
    { signal },
  );
  return data;
}

export function getSharedProfileErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && [404, 410].includes(error.response?.status ?? 0)) {
    return "공유 링크가 만료되었거나 사용할 수 없어요. 프로필 소유자에게 새 링크를 요청해 주세요.";
  }
  return "공유 프로필을 불러오지 못했어요. 네트워크를 확인하고 다시 시도해 주세요.";
}
