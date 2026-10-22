import axios from "axios";
import { api } from "./client";

export type ProfileRecommendation = {
  userId: number;
  recommended: boolean;
  recommendationCount: number;
};

export async function getProfileRecommendation(userId: number, signal?: AbortSignal): Promise<ProfileRecommendation> {
  return (await api.get<ProfileRecommendation>(`/api/profile/${userId}/recommendations`, { signal })).data;
}

export async function setProfileRecommendation(userId: number, recommended: boolean): Promise<ProfileRecommendation> {
  const path = `/api/profile/${userId}/recommendations`;
  return (await (recommended ? api.post<ProfileRecommendation>(path) : api.delete<ProfileRecommendation>(path))).data;
}

export function getProfileActionError(error: unknown, fallback: string): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 401) return "로그인이 만료되었어요. 다시 로그인해 주세요.";
  if (status === 403) return "학교 인증 또는 계정 이용 권한을 확인해 주세요.";
  return fallback;
}
