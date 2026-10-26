import { useQuery } from "@tanstack/react-query";
import { profileDetailOptions } from "../GiutHub/profileQueries";
import { useAuth } from "../../contexts/AuthContext";

export function usePreviewProfile(userId: number) {
  const auth = useAuth();
  const options = profileDetailOptions(userId, auth.queryScope);
  const query = useQuery({
    ...options,
    enabled: options.enabled && !auth.isLoading && auth.isAuthenticated,
  });
  return { ...query, authLoading: auth.isLoading, isAuthenticated: auth.isAuthenticated, viewerId: auth.profile?.userId, queryScope: auth.queryScope };
}
