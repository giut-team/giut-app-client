import { adminApi } from "./adminClient";

export type ProfileReportStatus = "PENDING" | "ACTIONED" | "DISMISSED";
export type ProfileReportReason =
  | "SPAM_ADVERTISING"
  | "FALSE_INFORMATION_IMPERSONATION"
  | "INAPPROPRIATE_BEHAVIOR"
  | "OTHER";

export type AdminProfileReportSummary = {
  id: number;
  reporterUserId: number;
  reportedProfileUserId: number;
  reason: ProfileReportReason;
  status: ProfileReportStatus;
  createdAt: string;
};

export type AdminProfileReportDetail = AdminProfileReportSummary & {
  description: string;
  snapshotNickname: string;
  snapshotBio: string;
  snapshotProfileImageUrl: string | null;
  reviewedByUserId: number | null;
  reviewedAt: string | null;
  reviewNote: string | null;
};

export type ProfileReportPage = {
  reports: AdminProfileReportSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export async function fetchAdminProfileReports({
  status,
  page,
  size = 20,
}: {
  status?: ProfileReportStatus;
  page: number;
  size?: number;
}): Promise<ProfileReportPage> {
  const { data } = await adminApi.get<ProfileReportPage>(
    "/api/admin/profile-reports",
    { params: { status: status || undefined, page, size } },
  );
  return data;
}

export async function fetchAdminProfileReport(
  reportId: number,
): Promise<AdminProfileReportDetail> {
  const { data } = await adminApi.get<AdminProfileReportDetail>(
    `/api/admin/profile-reports/${reportId}`,
  );
  return data;
}

export async function reviewAdminProfileReport({
  reportId,
  status,
  reviewNote,
}: {
  reportId: number;
  status: Exclude<ProfileReportStatus, "PENDING">;
  reviewNote: string;
}): Promise<AdminProfileReportDetail> {
  const { data } = await adminApi.patch<AdminProfileReportDetail>(
    `/api/admin/profile-reports/${reportId}/review`,
    { status, reviewNote },
  );
  return data;
}
