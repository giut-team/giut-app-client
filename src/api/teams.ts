import { api } from "./client";

export type TeamActivityMode = "ONLINE" | "OFFLINE" | "HYBRID";
export type TeamMeetingPlace = "CAMPUS" | "SEOUL" | "METROPOLITAN_AREA" | "ANYWHERE";

export type CreateTeamRecruitment = {
  roleCode: string;
  requiredCount: number;
};

export type CreateTeamApplicationQuestion = {
  question: string;
  required: boolean;
};

export type CreateTeamRequest = {
  competitionId: number;
  name: string;
  description: string;
  activityMode: TeamActivityMode;
  maxMemberCount: number;
  weeklyMeetingCount: number;
  meetingPlace: TeamMeetingPlace;
  recruitments: CreateTeamRecruitment[];
  applicationQuestions: CreateTeamApplicationQuestion[];
};

export type CreateTeamResponse = {
  teamId: number;
};

export type RecruitingTeam = {
  teamId: number;
  competitionId: number;
  leaderUserId: number;
  name: string;
  activityMode: TeamActivityMode;
  maxMemberCount: number;
  currentMemberCount: number;
  status: "RECRUITING" | "CLOSED" | "ARCHIVED";
  createdAt: string;
};

export type RecruitingTeamsResponse = {
  teams: RecruitingTeam[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type TeamDetail = RecruitingTeam & {
  description: string;
  weeklyMeetingCount: number;
  meetingPlace: TeamMeetingPlace;
  recruitments?: TeamRecruitment[];
};

export type TeamRecruitment = {
  recruitmentId: number;
  roleCode: string;
  requiredCount: number;
  filledCount: number;
};

export type TeamMember = {
  teamMemberId: number;
  userId: number;
  nickname: string;
  role: "LEADER" | "MEMBER";
  roleCode: string;
  status: "ACTIVE" | "LEFT" | "KICKED";
  joinedAt: string;
};

type TeamMemberListResponse = {
  teamId: number;
  members: TeamMember[];
};

export const createTeam = async (request: CreateTeamRequest): Promise<CreateTeamResponse> => {
  const { data } = await api.post<CreateTeamResponse>("/api/teams", request);

  return data;
};

/** 공모전별 모집 중인 팀을 최신순으로 조회합니다. */
export const fetchRecruitingTeams = async (
  competitionId: number,
  page = 0,
  size = 10,
): Promise<RecruitingTeamsResponse> => {
  const { data } = await api.get<RecruitingTeamsResponse>("/api/teams", {
    params: { competitionId, page, size },
  });

  return data;
};

/** 팀 소개를 포함한 팀 상세 정보를 조회합니다. */
export const fetchTeamDetail = async (teamId: number): Promise<TeamDetail> => {
  const { data } = await api.get<TeamDetail>(`/api/teams/${teamId}`);

  return data;
};

/** 팀 상세 화면에 표시할 현재 팀원 목록을 조회합니다. */
export const fetchTeamMembers = async (teamId: number): Promise<TeamMember[]> => {
  const { data } = await api.get<TeamMemberListResponse | TeamMember[]>(
    `/api/teams/${teamId}/members`,
  );

  return Array.isArray(data) ? data : data.members ?? [];
};
