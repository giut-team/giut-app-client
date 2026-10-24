import axios from "axios";
import { API_BASE_URL } from "./client";

export const ADMIN_ACCESS_TOKEN_KEY = "adminAccessToken";
export const ADMIN_REFRESH_TOKEN_KEY = "adminRefreshToken";
export const ADMIN_TOKEN_TYPE_KEY = "adminTokenType";

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
  accessToken,
  refreshToken,
  tokenType,
}: {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}) {
  localStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(ADMIN_REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(ADMIN_TOKEN_TYPE_KEY, tokenType || "Bearer");
}
