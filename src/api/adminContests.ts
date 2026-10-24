import { adminApi } from "./adminClient";

export type AdminCompetitionCategory =
  | "PLANNING_IDEA"
  | "ADVERTISING_MARKETING"
  | "PAPER_REPORT"
  | "VIDEO_UCC_PHOTO"
  | "DESIGN_CHARACTER_WEBTOON"
  | "WEB_MOBILE_IT"
  | "GAME_SOFTWARE"
  | "SCIENCE_ENGINEERING"
  | "LITERATURE_WRITING_SCENARIO"
  | "ARCHITECTURE_CONSTRUCTION_INTERIOR"
  | "NAMING_SLOGAN"
  | "ENTERTAINMENT_ART_MUSIC"
  | "ETC";

export type AdminCompetitionPublicationStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

export type AdminCompetitionVerificationStatus =
  | "AUTO_VERIFIED"
  | "UNVERIFIED"
  | "MANUAL_REVIEW_PENDING"
  | "MANUALLY_VERIFIED"
  | "REJECTED";

export type CompetitionUrlRequest = {
  type: "RECRUITMENT" | "OFFICIAL" | "SOURCE_ORIGINAL";
  url: string;
  primary: boolean;
};

export type CompetitionUrlResponse = CompetitionUrlRequest & {
  id: number;
};

export type UpsertAdminCompetitionRequest = {
  title: string;
  category: AdminCompetitionCategory;
  hostOrganization?: string;
  targetParticipants?: string;
  summary: string;
  applicationStartAt?: string;
  applicationEndAt?: string;
  publicationStatus: AdminCompetitionPublicationStatus;
  urls: CompetitionUrlRequest[];
};

export type AdminCompetitionResponse = {
  id: number;
  title: string;
  category: AdminCompetitionCategory;
  hostOrganization: string;
  targetParticipants: string;
  summary: string;
  applicationStartAt: string;
  applicationEndAt: string;
  publicationStatus: AdminCompetitionPublicationStatus;
  verificationStatus: AdminCompetitionVerificationStatus;
  verifiedAt: string | null;
  urls: CompetitionUrlResponse[];
};

export type AdminCompetitionListItem = {
  id: number;
  title: string;
  category: AdminCompetitionCategory;
  categoryName: string;
  hostOrganization: string;
  summary: string;
  applicationStartAt: string;
  applicationEndAt: string;
  publicationStatus: AdminCompetitionPublicationStatus;
  verificationStatus?: AdminCompetitionVerificationStatus;
  verifiedAt?: string | null;
  targetParticipants?: string;
  primaryUrl?: string;
};

type PublicCompetitionListResponse = {
  competitions: Array<{
    id: number;
    title: string;
    category: AdminCompetitionCategory;
    categoryName: string;
    hostOrganization: string;
    summary: string;
    applicationStartAt: string;
    applicationEndAt: string;
    primaryUrl: string;
    publicationStatus?: AdminCompetitionPublicationStatus;
    verificationStatus?: AdminCompetitionVerificationStatus;
    verifiedAt?: string | null;
    targetParticipants?: string;
  }>;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export async function fetchAdminCompetitions(): Promise<AdminCompetitionListItem[]> {
  const { data } = await adminApi.get<PublicCompetitionListResponse>(
    "/api/competitions",
    { params: { page: 0, size: 20 } },
  );

  return data.competitions.map((competition) => ({
    ...competition,
    publicationStatus: competition.publicationStatus ?? "PUBLISHED",
  }));
}

export async function createAdminCompetition(
  request: UpsertAdminCompetitionRequest,
): Promise<AdminCompetitionResponse> {
  const { data } = await adminApi.post<AdminCompetitionResponse>(
    "/api/admin/competitions",
    request,
  );
  return data;
}

export async function updateAdminCompetition({
  competitionId,
  request,
}: {
  competitionId: number;
  request: UpsertAdminCompetitionRequest;
}): Promise<AdminCompetitionResponse> {
  const { data } = await adminApi.put<AdminCompetitionResponse>(
    `/api/admin/competitions/${competitionId}`,
    request,
  );
  return data;
}

export async function publishAdminCompetition(
  competitionId: number,
): Promise<AdminCompetitionResponse> {
  const { data } = await adminApi.patch<AdminCompetitionResponse>(
    `/api/admin/competitions/${competitionId}/publish`,
  );
  return data;
}
