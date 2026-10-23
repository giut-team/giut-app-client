import type { PrimaryRoleCode, PublicProfileGrade, PublicProfileSelectionFilters } from "../../api/giutHub";

export type Position = "기획" | "디자인" | "개발" | "마케팅";
export type Category = "전체" | Position;
export type TeamStatus = "전체" | "팀 찾는 중" | "제안 검토 중";
export type Grade = 1 | 2 | 3 | 4;

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
