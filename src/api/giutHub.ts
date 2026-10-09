import axios from "axios";
import { API_BASE_URL } from "./client";

const giutHubApi = axios.create({
  baseURL: import.meta.env.VITE_GIUTHUB_API_BASE_URL ?? API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
  withCredentials: true,
});

giutHubApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export type PublicProfile = {
  userId: number;
  nickname: string;
  universityVerified: boolean;
  profileImageUrl: string | null;
  activityStatus: "LOOKING_FOR_TEAM" | "OPEN_TO_OFFERS" | "RESTING";
  activityStatusName: string;
  primaryRoles: { code: string; name: string }[];
  departmentName: string;
  grade: number;
  bio: string;
  skills?: { id: number; type: "SKILL" | "INTEREST" | "EXPERIENCE"; name: string }[];
};

export type PublicProfileList = {
  profiles: PublicProfile[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type PublicProfilePortfolio = {
  id: number;
  imageUrl: string | null;
  title: string;
  caption: string;
  projectStartDate: string | null;
  projectEndDate: string | null;
  teamSize: number | null;
  roles: { code: string; name: string }[];
  markdownContent: string | null;
  skillTags: PublicProfile["skills"];
  showcaseOrder: number | null;
  representative: boolean;
};

export type PublicProfileDetail = {
  nickname: string;
  universityVerified: boolean;
  profile: PublicProfile & {
    searchable: boolean;
    roles: { code: string; name: string }[];
    tags: PublicProfile["skills"];
    portfolioItems: PublicProfilePortfolio[];
    activityHistories: {
      id: number;
      category: string;
      categoryName: string;
      title: string;
      organization: string;
      startMonth: string;
      endMonth: string;
    }[];
  };
};

export type PrimaryRoleCode = "PLANNING" | "DESIGN" | "DEVELOPMENT" | "MARKETING";
export type PublicProfileGrade = 1 | 2 | 3 | 4 | 5;

export type PublicProfileFilters = {
  primaryRole?: PrimaryRoleCode;
  role?: string;
  activityStatus?: PublicProfile["activityStatus"];
  department?: string;
  grade?: PublicProfileGrade;
  skillTagId?: number;
};

export type PublicProfileSelectionFilters = Omit<PublicProfileFilters, "primaryRole" | "department" | "grade"> & {
  primaryRoles: readonly PrimaryRoleCode[];
  departments: readonly string[];
  grades: readonly PublicProfileGrade[];
};

export async function getPublicProfiles(
  filters: PublicProfileFilters = {},
  signal?: AbortSignal,
): Promise<PublicProfile[]> {
  const firstPage = await giutHubApi.get<PublicProfileList>("/api/profile", {
    params: { page: 0, ...filters },
    signal,
  });
  const result = [...firstPage.data.profiles];

  for (let page = 1; page < firstPage.data.totalPages; page += 1) {
    signal?.throwIfAborted();
    const { data } = await giutHubApi.get<PublicProfileList>("/api/profile", {
      params: { page, ...filters },
      signal,
    });
    result.push(...data.profiles);
  }

  return result;
}

export async function getPublicProfilesForFilters(
  { primaryRoles, departments, grades, ...sharedFilters }: PublicProfileSelectionFilters,
  signal?: AbortSignal,
): Promise<PublicProfile[]> {
  const uniqueRoles = [...new Set(primaryRoles)];
  const uniqueDepartments = [...new Set(departments)];
  const uniqueGrades = [...new Set(grades)];
  const requests: PublicProfileFilters[] = [];
  for (const primaryRole of uniqueRoles.length ? uniqueRoles : [undefined]) {
    for (const department of uniqueDepartments.length ? uniqueDepartments : [undefined]) {
      for (const grade of uniqueGrades.length ? uniqueGrades : [undefined]) {
        requests.push({
          ...sharedFilters,
          ...(primaryRole ? { primaryRole } : {}),
          ...(department ? { department } : {}),
          ...(grade ? { grade } : {}),
        });
      }
    }
  }

  const results: PublicProfile[][] = new Array(requests.length);
  let nextIndex = 0;
  let failed = false;
  const worker = async () => {
    while (!failed && nextIndex < requests.length) {
      signal?.throwIfAborted();
      const index = nextIndex++;
      try {
        results[index] = await getPublicProfiles(requests[index], signal);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  // 단일 값만 받는 API에 선택값 조합을 보내되 동시 HTTP 요청은 최대 4개로 제한한다.
  await Promise.all(Array.from({ length: Math.min(4, requests.length) }, worker));
  return [...new Map(results.flat().map((profile) => [profile.userId, profile])).values()]
    .sort((a, b) => b.userId - a.userId);
}

export async function getPublicProfile(userId: number): Promise<PublicProfileDetail> {
  const response = await giutHubApi.get<PublicProfileDetail>(`/api/profile/${userId}`);
  return response.data;
}
