import { api } from "./client";

export type ProfilePrimaryRole =
  | "DEVELOPMENT"
  | "DESIGN"
  | "PLANNING"
  | "MARKETING";

export type ProfileRole = {
  code: string;
  name: string;
};

const profileRoleNames: Record<string, string> = {
  BACKEND_DEVELOPER: "백엔드 개발자",
  FRONTEND_DEVELOPER: "프론트엔드 개발자",
  FULLSTACK_DEVELOPER: "풀스택 개발자",
  IOS_DEVELOPER: "iOS 개발자",
  ANDROID_DEVELOPER: "Android 개발자",
  QA_DEVELOPER: "QA 개발자",
  DEVOPS_ENGINEER: "DevOps 엔지니어",
  AI_DEVELOPER: "AI 개발자",
  DATA_ENGINEER: "데이터 엔지니어",
  DATA_ANALYST: "데이터 분석",
  UI_DESIGNER: "UI 디자이너",
  UX_DESIGNER: "UX 디자이너",
  UI_UX_DESIGNER: "UI/UX 디자이너",
  GRAPHIC_DESIGNER: "그래픽 디자이너",
  BRAND_DESIGNER: "브랜드 디자이너",
  MOTION_DESIGNER: "모션 디자이너",
  SERVICE_PLANNER: "서비스 기획",
  PROJECT_MANAGER: "프로젝트 매니저",
  DATA_PLANNER: "데이터 기획",
  CONTENT_MARKETER: "콘텐츠 마케팅",
  PERFORMANCE_MARKETER: "퍼포먼스 마케팅",
  BRAND_MARKETER: "브랜드 마케팅",
};

/** 프로필 역할 코드를 화면용 한글 역할명으로 변환합니다. */
export const getProfileRoleName = (roleCode: string | null | undefined) =>
  roleCode ? profileRoleNames[roleCode] ?? roleCode.replaceAll("_", " ") : "역할 미정";

type ProfileRoleListResponse = {
  primaryRole: ProfilePrimaryRole;
  primaryRoleName: string;
  roles: ProfileRole[];
};

/** 대표 역할에 속한 선택 가능한 세부 역할을 조회합니다. */
export const fetchProfileRoles = async (
  primaryRole: ProfilePrimaryRole,
): Promise<ProfileRole[]> => {
  const { data } = await api.get<ProfileRoleListResponse>("/api/profile/roles", {
    params: { primaryRole },
  });

  return data.roles;
};
