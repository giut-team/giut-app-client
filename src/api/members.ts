import { api } from "./client";

export type UniversityEmailSendRequest = {
  universityEmail: string;
};

export type UniversityEmailSendResponse = {
  universityEmail: string;
  expiresAt: string;
};

export type UniversityEmailVerifyRequest = {
  universityEmail: string;
  code: string;
};

export type UniversityEmailVerifyResponse = {
  userId: number;
  universityEmail: string;
  universityVerifiedAt: string;
};

export const sendUniversityEmailCode = async (
  request: UniversityEmailSendRequest,
): Promise<UniversityEmailSendResponse> => {
  const { data } = await api.post<UniversityEmailSendResponse>(
    "/api/members/university-email/send",
    request,
  );

  return data;
};

export const verifyUniversityEmailCode = async (
  request: UniversityEmailVerifyRequest,
): Promise<UniversityEmailVerifyResponse> => {
  const { data } = await api.post<UniversityEmailVerifyResponse>(
    "/api/members/university-email/verify",
    request,
  );

  return data;
};
