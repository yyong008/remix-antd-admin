import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const USER_SESSION_QUERY_KEY = ["user", "session"] as const;

export type AuthSessionRow = {
  id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  expiresAt: Date | string;
  userId: string;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export const AUTH_SESSIONS_LIST_KEY = ["auth", "sessions", "list"] as const;

export function useAuthSessionsList() {
  return useQuery({
    queryKey: AUTH_SESSIONS_LIST_KEY,
    queryFn: async (): Promise<AuthSessionRow[]> => {
      const res = await (getApiClient() as any).api.auth["list-sessions"].$get();
      const body = await res.json();
      if (body.code !== 0) throw new Error(body.message || "Failed to list sessions");
      return (body.data ?? []) as AuthSessionRow[];
    },
    staleTime: 1000 * 60,
  });
}

export type AuthLinkedAccountRow = {
  id: string;
  providerId: string;
  accountId: string;
  userId: string;
  createdAt?: Date | string;
};

export const AUTH_ACCOUNTS_LIST_KEY = ["auth", "accounts", "list"] as const;

export function useAuthAccountsList() {
  return useQuery({
    queryKey: AUTH_ACCOUNTS_LIST_KEY,
    queryFn: async (): Promise<AuthLinkedAccountRow[]> => {
      return [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUserSessionQuery() {
  const _queryClient = useQueryClient();

  return useQuery({
    queryKey: USER_SESSION_QUERY_KEY,
    queryFn: async () => {
      return null;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: false,
    gcTime: 1000 * 60 * 10,
  });
}

export function useClearUserSession() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
}

export function useRevokeSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const res = await (getApiClient() as any).api.auth["revoke-session"].$post({
        json: { token },
      });
      const body = await res.json();
      if (body.code !== 0) throw new Error(body.message || "Failed to revoke session");
      return body.data as { success: boolean };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: AUTH_SESSIONS_LIST_KEY });
    },
  });
}
