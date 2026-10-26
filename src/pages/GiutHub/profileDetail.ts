import type { PublicProfile, PublicProfileDetail } from "../../api/giutHub";
import type { ProfileRecommendation } from "../../api/profileActions";

// 상세 DTO는 목록과 달리 상태 이름과 최상위 학교 인증 값을 제공한다.
export function toDetailProfileSummary(detail: PublicProfileDetail): PublicProfile & {
  roles: PublicProfileDetail["profile"]["roles"];
} {
  const statusByName: Record<string, PublicProfile["activityStatus"]> = {
    "팀 찾는 중": "LOOKING_FOR_TEAM",
    "프로필 쓰는 중": "OPEN_TO_OFFERS",
    "지금은 쉬는 중": "RESTING",
  };
  return {
    ...detail.profile,
    nickname: detail.nickname,
    universityVerified: detail.universityVerified,
    activityStatus: statusByName[detail.profile.activityStatusName] ?? "LOOKING_FOR_TEAM",
    skills: detail.profile.tags,
  };
}

export function updateDetailRecommendation(
  detail: PublicProfileDetail | undefined,
  recommendation: ProfileRecommendation,
): PublicProfileDetail | undefined {
  if (!detail || detail.profile.userId !== recommendation.userId) return detail;
  return { ...detail, recommended: recommendation.recommended, recommendationCount: recommendation.recommendationCount };
}
