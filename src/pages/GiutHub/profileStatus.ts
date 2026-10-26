import type { PublicProfile } from "../../api/giutHub";

const profileStatusColors = {
  OPEN_TO_OFFERS: "#148582",
  RESTING: "#5C4400",
  LOOKING_FOR_TEAM: "#4B5463",
} as const satisfies Record<PublicProfile["activityStatus"], string>;

export function getProfileStatusColor(status?: PublicProfile["activityStatus"]): string {
  return profileStatusColors[status ?? "LOOKING_FOR_TEAM"] ?? profileStatusColors.LOOKING_FOR_TEAM;
}

export function getProfileHeadingStatusColor(status: PublicProfile["activityStatus"] = "LOOKING_FOR_TEAM"): string {
  return status === "LOOKING_FOR_TEAM" ? profileStatusColors.OPEN_TO_OFFERS : getProfileStatusColor(status);
}
