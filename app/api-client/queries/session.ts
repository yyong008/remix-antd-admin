import type { QueryClient } from "@tanstack/react-query";

import { authClient } from "~/libs/auth/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_SESSION_QUERY_KEY = ["user", "session"] as const;

/** better-auth `/list-sessions` row shape (serialized dates may be strings). */
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

function unwrapListSessionsPayload(result: unknown): AuthSessionRow[] {
  if (result && typeof result === "object" && "error" in result) {
    const err = (result as { error?: { message?: string } | null }).error;
    if (err) throw new Error(err.message ?? "Failed to list sessions");
  }
  const raw =
    result && typeof result === "object" && "data" in result
      ? (result as { data: unknown }).data
      : result;
  if (Array.isArray(raw)) return raw as AuthSessionRow[];
  return [];
}

/**
 * All active sessions for the current user (better-auth `listSessions`).
 * @see https://www.better-auth.com/docs/concepts/session-management
 */
export function useAuthSessionsList() {
  return useQuery({
    queryKey: AUTH_SESSIONS_LIST_KEY,
    queryFn: async (): Promise<AuthSessionRow[]> => {
      const listSessions = (authClient as { listSessions?: () => Promise<unknown> }).listSessions;
      if (typeof listSessions !== "function") return [];
      const result = await listSessions();
      return unwrapListSessionsPayload(result);
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

function unwrapListAccountsPayload(result: unknown): AuthLinkedAccountRow[] {
  if (result && typeof result === "object" && "error" in result) {
    const err = (result as { error?: { message?: string } | null }).error;
    if (err) throw new Error(err.message ?? "Failed to list accounts");
  }
  const raw =
    result && typeof result === "object" && "data" in result
      ? (result as { data: unknown }).data
      : result;
  if (Array.isArray(raw)) return raw as AuthLinkedAccountRow[];
  return [];
}

/**
 * OAuth / credential accounts linked to the current user (`listAccounts`).
 */
export function useAuthAccountsList() {
  return useQuery({
    queryKey: AUTH_ACCOUNTS_LIST_KEY,
    queryFn: async (): Promise<AuthLinkedAccountRow[]> => {
      const listAccounts = (authClient as { listAccounts?: () => Promise<unknown> }).listAccounts;
      if (typeof listAccounts !== "function") return [];
      const result = await listAccounts();
      return unwrapListAccountsPayload(result);
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook for fetching the current user session
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
 */
export function useUserSessionQuery() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: USER_SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await authClient.getSession();

      if (error) {
        queryClient.setQueryData(USER_SESSION_QUERY_KEY, null);
        console.error(error, "Failed to fetch session");
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - balance between freshness and performance
    refetchOnWindowFocus: true,
    retry: false,
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

export async function refreshUserSession(queryClient: QueryClient) {
  const { data, error } = await authClient.getSession();

  if (error) {
    console.error(error, "Failed to fetch user session");
  }

  queryClient.setQueryData(USER_SESSION_QUERY_KEY, () => data);
}

export function useRefreshUserSession() {
  const queryClient = useQueryClient();

  return () => refreshUserSession(queryClient);
}

export function useClearUserSession() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
}

export function useRevokeSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await authClient.revokeSession({
        token,
      });

      if (response.error) {
        throw new Error(response.error.message ?? "Failed to revoke session");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: AUTH_SESSIONS_LIST_KEY });
    },
  });
}
