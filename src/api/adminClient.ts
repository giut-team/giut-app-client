import axios from "axios";
import { API_BASE_URL } from "./client";

export const ADMIN_ACCESS_TOKEN_KEY = "adminAccessToken";
export const ADMIN_REFRESH_TOKEN_KEY = "adminRefreshToken";
export const ADMIN_TOKEN_TYPE_KEY = "adminTokenType";
export const ADMIN_USER_KEY = "adminUser";

export type AdminSessionUser = {
  id: number;
  email: string;
  nickname: string;
};

export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ADMIN_ACCESS_TOKEN_KEY);
  const tokenType = localStorage.getItem(ADMIN_TOKEN_TYPE_KEY) || "Bearer";

  if (accessToken) {
    config.headers.Authorization = `${tokenType} ${accessToken}`;
  }

  return config;
});

export function saveAdminSession({
  id,
  email,
  nickname,
  accessToken,
  refreshToken,
  tokenType,
}: {
  id: number;
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}) {
  localStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(ADMIN_REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(ADMIN_TOKEN_TYPE_KEY, tokenType || "Bearer");
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify({ id, email, nickname }));
}

export function getAdminSessionUser(): AdminSessionUser | null {
  const value = localStorage.getItem(ADMIN_USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as AdminSessionUser;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY);
  localStorage.removeItem(ADMIN_REFRESH_TOKEN_KEY);
  localStorage.removeItem(ADMIN_TOKEN_TYPE_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}
