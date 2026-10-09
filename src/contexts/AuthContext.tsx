import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../api/client";

type AuthProfile = {
  departmentName: string;
  grade: number;
  nickname: string;
  profileImageUrl: string | null;
  universityVerified?: boolean;
  userId: number;
};

type MyProfileResponse = {
  profile: AuthProfile | null;
  profileCompleted: boolean;
  universityVerified?: boolean;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: AuthProfile | null;
  profileCompleted: boolean;
  universityVerified: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const fetchMyProfile = () => api.get<MyProfileResponse>("/api/userprofile/me/profile");

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["auth", "my-profile"],
    queryFn: async () => (await fetchMyProfile()).data,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
  });
  const responseStatus = axios.isAxiosError(error)
    ? error.response?.status
    : undefined;
  const isUnverifiedProfileForbidden = responseStatus === 403;

  const refreshAuth = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: data !== undefined || isUnverifiedProfileForbidden,
        isLoading: isPending,
        profile: data?.profile ?? null,
        profileCompleted: data?.profileCompleted ?? false,
        universityVerified:
          !isUnverifiedProfileForbidden &&
          (data?.universityVerified ??
            data?.profile?.universityVerified ??
            false),
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
