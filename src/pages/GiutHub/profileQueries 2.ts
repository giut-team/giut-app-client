import { queryOptions } from "@tanstack/react-query";
import { getPublicProfile, getPublicProfilesForFilters, type PublicProfileSelectionFilters } from "../../api/giutHub";

export const PROFILE_STALE_TIME = 5 * 60 * 1000;
export const PROFILE_GC_TIME = 30 * 60 * 1000;
export type ProfileQueryScope = number | string;

function canonicalFilters(filters: PublicProfileSelectionFilters): PublicProfileSelectionFilters {
  return {
    ...filters,
    primaryRoles: [...new Set(filters.primaryRoles)].sort(),
    departments: [...new Set(filters.departments)].sort(),
    grades: [...new Set(filters.grades)].sort((a, b) => a - b),
  };
}

export const profileKeys = {
  list: (filters: PublicProfileSelectionFilters, viewerId?: ProfileQueryScope) =>
    ["giut-hub", "profiles", viewerId, canonicalFilters(filters)] as const,
  detail: (userId: number, viewerId?: ProfileQueryScope) => ["giut-hub", "profile", userId, viewerId] as const,
};

function cachePolicy(viewerId?: ProfileQueryScope) {
  return {
    // 호출 화면은 AuthProvider의 세션 scope를 전달한다. 프로필 ID가 없어도
    // 같은 세션에서는 보관하고, scope조차 없는 호출만 장기 재사용을 피한다.
    staleTime: viewerId === undefined ? 0 : PROFILE_STALE_TIME,
    gcTime: viewerId === undefined ? 0 : PROFILE_GC_TIME,
    refetchOnWindowFocus: false,
    retry: false,
  } as const;
}

export function profileListOptions(filters: PublicProfileSelectionFilters, viewerId?: ProfileQueryScope) {
  const selection = canonicalFilters(filters);
  return queryOptions({
    queryKey: profileKeys.list(selection, viewerId),
    queryFn: ({ signal }) => getPublicProfilesForFilters(selection, signal),
    ...cachePolicy(viewerId),
  });
}

export function profileDetailOptions(userId: number, viewerId?: ProfileQueryScope) {
  return queryOptions({
    queryKey: profileKeys.detail(userId, viewerId),
    queryFn: ({ signal }) => getPublicProfile(userId, signal),
    enabled: Number.isSafeInteger(userId) && userId > 0,
    ...cachePolicy(viewerId),
  });
}
