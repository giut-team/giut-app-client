import axios from "axios";
import { API_BASE_URL } from "./client";
import { saveAdminSession } from "./adminClient";

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  id: number;
  email: string;
  nickname: string;
  role: "STUDENT" | "ADMIN";
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export async function loginAdmin(
  credentials: AdminLoginRequest,
): Promise<AdminLoginResponse> {
  const { data } = await axios.post<AdminLoginResponse>(
    `${API_BASE_URL}/api/admin/auth/login`,
    credentials,
    {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000,
      withCredentials: true,
    },
  );

  if (data.role !== "ADMIN") {
    throw new Error("관리자 권한이 없는 계정입니다.");
  }

  saveAdminSession(data);

  return data;
}
