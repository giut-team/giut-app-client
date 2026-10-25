import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthSession, type AuthProfile } from "../api/authSession";
import { createAuthQueryScope } from "./authQueryScope";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: AuthProfile | null;
  profileCompleted: boolean;
  queryScope: string;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState(createAuthQueryScope);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["auth", "my-profile"],
    queryFn: getAuthSession,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const refreshAuth = async () => {
    setScope(createAuthQueryScope());
    await refetch();
  };
  let credential: string | null = null;
  try { credential = localStorage.getItem("accessToken"); } catch { /* 저장소 차단이 화면 렌더링을 중단시키지 않도록 한다. */ }
  const queryScope = scope.resolve(credential, isError ? undefined : data?.profile?.userId);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !isError && data !== undefined,
        isLoading: isPending,
        profile: data?.profile ?? null,
        profileCompleted: data?.profileCompleted ?? false,
        queryScope,
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
