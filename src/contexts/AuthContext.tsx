import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthSession, type AuthProfile } from "../api/authSession";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: AuthProfile | null;
  profileCompleted: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["auth", "my-profile"],
    queryFn: getAuthSession,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const refreshAuth = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !isError && data !== undefined,
        isLoading: isPending,
        profile: data?.profile ?? null,
        profileCompleted: data?.profileCompleted ?? false,
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
