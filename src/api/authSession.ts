import axios from "axios";
import { api } from "./client";

export type AuthProfile = {
  departmentName: string;
  grade: number;
  nickname: string;
  profileImageUrl: string | null;
  userId: number;
};
export type AuthSession = {
  profile: AuthProfile | null;
  profileCompleted: boolean;
  universityVerified: boolean;
};

export async function getAuthSession(): Promise<AuthSession> {
  try {
    return (await api.get<AuthSession>("/api/userprofile/me/profile")).data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 403) throw error;
    // 학교 미인증으로 프로필 조회가 막혀도 유효한 로그인 세션과 구분한다.
    const { data } = await api.get<{ universityVerified: boolean }>("/api/members/university-email/status");
    if (typeof data.universityVerified !== "boolean") throw error;
    return { profile: null, profileCompleted: false, universityVerified: data.universityVerified };
  }
}
