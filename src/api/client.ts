import axios from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
export const API_BASE_URL = "https://api.dev.giut.store";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
