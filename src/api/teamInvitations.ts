import axios from "axios";
import { api } from "./client";

export type InvitationTeam = {
  teamId: number;
  name: string;
  myRole: "LEADER" | "MEMBER";
  status: "RECRUITING" | "CLOSED" | "ARCHIVED";
  currentMemberCount: number;
  maxMemberCount: number;
};
export type InvitationRecruitment = {
  recruitmentId: number;
  roleCode: string;
  requiredCount: number;
  filledCount: number;
};
export type TeamInvitation = {
  applicationId: number;
  teamId: number;
  userId: number;
  roleCode: string;
  status: "PENDING";
};

const validId = (value: number) => Number.isSafeInteger(value) && value > 0;
const validCount = (value: number) => Number.isSafeInteger(value) && value >= 0;
const hasText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

export function canInviteToTeam(team: InvitationTeam): boolean {
  return team.myRole === "LEADER" && team.status === "RECRUITING" && team.currentMemberCount < team.maxMemberCount;
}

export async function getMyInvitationTeams(signal?: AbortSignal): Promise<InvitationTeam[]> {
  const { data } = await api.get<{ teams: InvitationTeam[] }>("/api/teams/me", { signal });
  if (!Array.isArray(data?.teams) || data.teams.some(team => !team || !validId(team.teamId) || !hasText(team.name)
    || !["LEADER", "MEMBER"].includes(team.myRole) || !["RECRUITING", "CLOSED", "ARCHIVED"].includes(team.status)
    || !validCount(team.currentMemberCount) || !validId(team.maxMemberCount))) {
    throw new Error("팀 목록 응답을 확인할 수 없어요.");
  }
  return data.teams;
}

export async function getInvitationRecruitments(teamId: number, signal?: AbortSignal): Promise<InvitationRecruitment[]> {
  if (!validId(teamId)) throw new Error("제안할 팀을 확인해 주세요.");
  const { data } = await api.get<{ teamId: number; recruitments: InvitationRecruitment[] }>(`/api/teams/${teamId}/recruitments`, { signal });
  if (data?.teamId !== teamId || !Array.isArray(data.recruitments) || data.recruitments.some(item => !item
    || !validId(item.recruitmentId) || !hasText(item.roleCode) || !validCount(item.requiredCount) || !validCount(item.filledCount))) {
    throw new Error("모집 분야 응답을 확인할 수 없어요.");
  }
  return data.recruitments;
}

export async function getInvitationRoleNames(signal?: AbortSignal): Promise<Record<string, string>> {
  const groups = await Promise.all(["DEVELOPMENT", "DESIGN", "PLANNING", "MARKETING"].map(async primaryRole => {
    const { data } = await api.get<{ roles: { code: string; name: string }[] }>("/api/profile/roles", { params: { primaryRole }, signal });
    if (!Array.isArray(data?.roles) || data.roles.some(role => !role || !hasText(role.code) || !hasText(role.name))) {
      throw new Error("포지션 이름을 확인할 수 없어요.");
    }
    return data.roles;
  }));
  return Object.fromEntries(groups.flat().map(role => [role.code, role.name]));
}

export async function sendTeamInvitation(teamId: number, input: { inviteeUserId: number; roleCode: string; message?: string }): Promise<TeamInvitation> {
  const message = input.message?.trim();
  if (!validId(teamId) || !validId(input.inviteeUserId) || !hasText(input.roleCode)) throw new Error("팀과 포지션, 제안받을 사람을 확인해 주세요.");
  if (message && message.length > 500) throw new Error("제안 메시지는 500자 이내로 작성해 주세요.");
  const { data } = await api.post<TeamInvitation>(`/api/teams/${teamId}/invitations`, {
    inviteeUserId: input.inviteeUserId,
    roleCode: input.roleCode,
    ...(message ? { message } : {}),
  });
  if (!data || !validId(data.applicationId) || data.teamId !== teamId || data.userId !== input.inviteeUserId
    || data.roleCode !== input.roleCode || data.status !== "PENDING") {
    throw new Error("제안 전송 결과를 확인할 수 없어요. 잠시 후 다시 확인해 주세요.");
  }
  return data;
}

export function getTeamInvitationError(error: unknown, action: "load" | "send"): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 401) return "로그인이 만료되었어요. 다시 로그인해 주세요.";
  if (status === 403) return "팀장 권한이나 학교 인증 상태를 확인해 주세요.";
  if (status === 404) return "팀이나 제안받을 프로필을 찾을 수 없어요. 현재 상태를 다시 확인해 주세요.";
  if (status === 409) {
    const message = axios.isAxiosError<{ message?: string }>(error) ? error.response?.data?.message : undefined;
    if (message === "이미 대기 중인 요청이 있습니다.") return "이미 응답을 기다리는 요청이 있어요.";
    if (message === "이미 팀원인 사용자입니다.") return "이미 이 팀에 참여 중인 팀원이에요.";
    return "모집 상태가 바뀌었거나 이미 보낸 제안이 있어요. 팀과 포지션을 다시 확인해 주세요.";
  }
  if (status === 400) return "제안할 팀과 포지션을 다시 확인해 주세요. 본인에게는 제안할 수 없어요.";
  if (error instanceof Error && !axios.isAxiosError(error)) return error.message;
  return action === "load" ? "팀 정보를 불러오지 못했어요. 연결 상태를 확인하고 다시 시도해 주세요."
    : "제안 전송 결과를 확인하지 못했어요. 연결 상태와 보낸 제안을 확인한 뒤 다시 시도해 주세요.";
}
