import type { PrimaryRoleCode, PublicProfileGrade, PublicProfileSelectionFilters } from "../../api/giutHub";

export type Position = "기획" | "디자인" | "개발" | "마케팅";
export type Category = "전체" | Position;
export type TeamStatus = "전체" | "팀 찾는 중" | "제안 검토 중";
export type Grade = 1 | 2 | 3 | 4;

export type HubFilterSelection = {
  selectedPositions: Position[];
  selectedTeamStatus: TeamStatus;
  selectedDepartments: string[];
  selectedGrades: Grade[];
};

export function readHubFilterSelection(params: URLSearchParams): HubFilterSelection {
  const positions: Position[] = ["기획", "디자인", "개발", "마케팅"];
  const status = params.get("status");
  return {
    selectedPositions: [...new Set(params.getAll("position").filter((value): value is Position => positions.includes(value as Position)))],
    selectedTeamStatus: status === "팀 찾는 중" || status === "제안 검토 중" ? status : "전체",
    selectedDepartments: [...new Set(params.getAll("department").map(value => value.trim().slice(0, 80)).filter(Boolean))],
    selectedGrades: [...new Set(params.getAll("grade").map(Number).filter((value): value is Grade => [1, 2, 3, 4].includes(value)))],
  };
}

export function writeHubFilterSelection(params: URLSearchParams, selection: HubFilterSelection): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const key of ["position", "department", "grade", "status"]) next.delete(key);
  selection.selectedPositions.forEach(value => next.append("position", value));
  selection.selectedDepartments.forEach(value => next.append("department", value));
  selection.selectedGrades.forEach(value => next.append("grade", String(value)));
  if (selection.selectedTeamStatus !== "전체") next.set("status", selection.selectedTeamStatus);
  return next;
}

export function hubListReturnTo(value: unknown): string {
  return typeof value === "string" && (value === "/giut-hub" || value.startsWith("/giut-hub?")) ? value : "/giut-hub";
}

const codeByCategory: Record<Position, PrimaryRoleCode> = {
  기획: "PLANNING",
  디자인: "DESIGN",
  개발: "DEVELOPMENT",
  마케팅: "MARKETING",
};

export function buildPublicProfileFilters({
  activeCategory,
  selectedPositions,
  selectedTeamStatus,
  selectedDepartments,
  selectedGrades,
}: {
  activeCategory: Category;
  selectedPositions: readonly Position[];
  selectedTeamStatus: TeamStatus;
  selectedDepartments: readonly string[];
  selectedGrades: readonly Grade[];
}): PublicProfileSelectionFilters {
  const primaryRoles = activeCategory === "전체"
    ? selectedPositions.map((position) => codeByCategory[position])
    : [codeByCategory[activeCategory]];
  const grades = selectedGrades.flatMap<PublicProfileGrade>((grade) => grade === 4 ? [4, 5] : [grade]);

  return {
    primaryRoles: [...new Set(primaryRoles)].sort(),
    departments: [...new Set(selectedDepartments)].sort(),
    grades: [...new Set(grades)].sort((a, b) => a - b),
    ...(selectedTeamStatus === "전체" ? {} : {
      activityStatus: selectedTeamStatus === "팀 찾는 중" ? "LOOKING_FOR_TEAM" : "OPEN_TO_OFFERS",
    }),
  };
}
