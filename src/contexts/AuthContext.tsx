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
  universityVerified: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState(createAuthQueryScope);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["auth", "my-profile"],
    queryFn: getAuthSession,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
  });

  const refreshAuth = async () => {
    setScope(createAuthQueryScope());
    await refetch();
  };

  let credential: string | null = null;
  try {
    credential = localStorage.getItem("accessToken");
  } catch {
    // 저장소 접근이 차단되어도 인증 화면은 계속 렌더링한다.
  }
  const queryScope = scope.resolve(
    credential,
    isError ? undefined : data?.profile?.userId,
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !isError && data !== undefined,
        isLoading: isPending,
        profile: data?.profile ?? null,
        profileCompleted: data?.profileCompleted ?? false,
        queryScope,
        universityVerified: data?.universityVerified ?? false,
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
