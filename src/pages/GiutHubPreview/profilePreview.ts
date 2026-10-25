import type { PublicProfile, PublicProfileDetail, PublicProfileSelectionFilters, PrimaryRoleCode } from "../../api/giutHub";

export const PREVIEW_PATH = "/giut-hub-preview";
export const positionOptions: { value: PrimaryRoleCode; label: string }[] = [
  { value: "PLANNING", label: "기획" }, { value: "DESIGN", label: "디자인" },
  { value: "DEVELOPMENT", label: "개발" }, { value: "MARKETING", label: "마케팅" },
];
export const statusOptions: { value: PublicProfile["activityStatus"]; label: string }[] = [
  { value: "LOOKING_FOR_TEAM", label: "팀 찾는 중" },
  { value: "OPEN_TO_OFFERS", label: "합류 가능" },
  { value: "RESTING", label: "둘러보는 중" },
];
export type PreviewFilters = { position: string; department: string; grade: string; status: string; search: string };

// 주소에 조건을 보존해 상세에서 돌아오거나 새로고침해도 같은 목록을 보여준다.
export function readPreviewFilters(params: URLSearchParams): PreviewFilters {
  const position = params.get("position") ?? "";
  const grade = params.get("grade") ?? "";
  const status = params.get("status") ?? "";
  return {
    position: positionOptions.some(option => option.value === position) ? position : "",
    grade: ["1", "2", "3", "4"].includes(grade) ? grade : "",
    status: statusOptions.some(option => option.value === status) ? status : "",
    department: (params.get("department") ?? "").trim().slice(0, 80),
    search: (params.get("search") ?? "").trim().slice(0, 100),
  };
}

export function toPreviewRequest(filters: PreviewFilters): PublicProfileSelectionFilters {
  return {
    primaryRoles: positionOptions.filter(option => option.value === filters.position).map(option => option.value),
    departments: filters.department ? [filters.department] : [],
    grades: filters.grade === "4" ? [4, 5] : [1, 2, 3].filter(grade => String(grade) === filters.grade) as (1 | 2 | 3)[],
    ...(statusOptions.some(option => option.value === filters.status)
      ? { activityStatus: filters.status as PublicProfile["activityStatus"] } : {}),
  };
}

export function profileFacts(profile: Pick<PublicProfile, "primaryRoles" | "departmentName" | "grade">): string {
  return [profile.primaryRoles.map(role => role.name).filter(Boolean).join(" · "), profile.departmentName,
    profile.grade ? `${profile.grade}학년` : ""].filter(Boolean).join(" · ");
}

export function skillNames(skills: PublicProfile["skills"]): string[] {
  return [...new Set((skills ?? []).filter(tag => tag.type === "SKILL" && tag.name.trim()).map(tag => tag.name.trim()))];
}

export function matchesProfileSearch(profile: PublicProfile, search: string): boolean {
  const query = search.trim().toLocaleLowerCase();
  return !query || [profile.nickname, profile.bio, profileFacts(profile), ...skillNames(profile.skills)]
    .join(" ").toLocaleLowerCase().includes(query);
}

export function detailStatus(name: string): PublicProfile["activityStatus"] {
  if (["합류 가능", "프로필 쓰는 중"].includes(name)) return "OPEN_TO_OFFERS";
  if (["둘러보는 중", "지금은 쉬는 중"].includes(name)) return "RESTING";
  return "LOOKING_FOR_TEAM";
}

export function orderedPortfolios(items: PublicProfileDetail["profile"]["portfolioItems"]) {
  return [...items].sort((a, b) => Number(b.representative) - Number(a.representative)
    || (a.showcaseOrder ?? Number.MAX_SAFE_INTEGER) - (b.showcaseOrder ?? Number.MAX_SAFE_INTEGER));
}
