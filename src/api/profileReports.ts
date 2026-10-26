import axios from "axios";
import { api } from "./client";
import { getProfileActionError } from "./profileActions";

export const profileReportReasons = [
  { code: "SPAM_ADVERTISING", label: "스팸 · 광고성 프로필" },
  { code: "FALSE_INFORMATION_IMPERSONATION", label: "허위 경력 · 정보 도용" },
  { code: "INAPPROPRIATE_BEHAVIOR", label: "부적절한 언행 · 괴롭힘" },
  { code: "OTHER", label: "기타" },
] as const;

export type ProfileReportReason = (typeof profileReportReasons)[number]["code"];
export type ProfileReport = {
  id: number;
  status: "PENDING" | "ACTIONED" | "DISMISSED";
  createdAt: string;
};

export async function createProfileReport(userId: number, reason: ProfileReportReason, description?: string): Promise<ProfileReport> {
  if (!Number.isSafeInteger(userId) || userId <= 0 || !profileReportReasons.some(item => item.code === reason)) {
    throw new Error("신고할 프로필과 사유를 확인해 주세요.");
  }
  const detail = description?.trim();
  if (detail && detail.length > 1000) throw new Error("추가 설명은 1,000자 이내로 작성해 주세요.");
  const { data } = await api.post<ProfileReport>(`/api/profile/${userId}/reports`, {
    reason,
    ...(detail ? { description: detail } : {}),
  });
  if (!Number.isSafeInteger(data.id) || data.id <= 0
    || !["PENDING", "ACTIONED", "DISMISSED"].includes(data.status)
    || !Number.isFinite(Date.parse(data.createdAt))) {
    throw new Error("신고 접수 응답을 확인할 수 없어요.");
  }
  return data;
}

export function getProfileReportError(error: unknown): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 409) return "이미 검토 중인 신고가 있어요. 처리 결과를 기다려 주세요.";
  if (status === 404) return "신고할 프로필을 찾을 수 없어요. 공개 상태가 변경되었을 수 있어요.";
  if (status === 400) return "신고할 프로필과 사유를 확인해 주세요. 본인 프로필은 신고할 수 없어요.";
  return getProfileActionError(error, "신고 접수 결과를 확인하지 못했어요. 다시 시도해 주세요.");
}
