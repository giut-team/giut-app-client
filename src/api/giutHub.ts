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

export type PublicProfileFilters = {
  primaryRole?: PrimaryRoleCode;
  activityStatus?: PublicProfile["activityStatus"];
  department?: string;
};

export async function getPublicProfiles(
  filters: PublicProfileFilters = {},
): Promise<PublicProfile[]> {
  const firstPage = await giutHubApi.get<PublicProfileList>("/api/profile", {
    params: { page: 0, ...filters },
  });
  const result = [...firstPage.data.profiles];

  if (firstPage.data.totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.data.totalPages - 1 }, (_, index) =>
        giutHubApi.get<PublicProfileList>("/api/profile", {
          params: { page: index + 1, ...filters },
        }),
      ),
    );
    remainingPages.forEach(({ data }) => result.push(...data.profiles));
  }

  return result;
}

export async function getPublicProfilesForRoles(
  primaryRoles: readonly PrimaryRoleCode[],
): Promise<PublicProfile[]> {
  if (primaryRoles.length === 0) return getPublicProfiles();

  const results = await Promise.all(
    [...new Set(primaryRoles)].map((primaryRole) => getPublicProfiles({ primaryRole })),
  );
  return [...new Map(results.flat().map((profile) => [profile.userId, profile])).values()];
}

export async function getPublicProfile(userId: number): Promise<PublicProfileDetail> {
  const response = await giutHubApi.get<PublicProfileDetail>(`/api/profile/${userId}`);
  return response.data;
}
