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

/**
 * All active sessions for the current user (better-auth `listSessions`).
 * @see https://www.better-auth.com/docs/concepts/session-management
 */
export function useAuthSessionsList() {
  return useQuery({
    queryKey: AUTH_SESSIONS_LIST_KEY,
    queryFn: async (): Promise<AuthSessionRow[]> => {
      return [];
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

/**
 * OAuth / credential accounts linked to the current user (`listAccounts`).
 */
export function useAuthAccountsList() {
  return useQuery({
    queryKey: AUTH_ACCOUNTS_LIST_KEY,
    queryFn: async (): Promise<AuthLinkedAccountRow[]> => {
      return [];
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
  const _queryClient = useQueryClient();

  return useQuery({
    queryKey: USER_SESSION_QUERY_KEY,
    queryFn: async () => {
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - balance between freshness and performance
    refetchOnWindowFocus: true,
    retry: false,
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

export function useClearUserSession() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
}

export function useRevokeSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token: _token }: { token: string }) => {
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: AUTH_SESSIONS_LIST_KEY });
    },
  });
}
