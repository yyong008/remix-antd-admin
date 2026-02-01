import type { QueryClient } from "@tanstack/react-query";

import { authClient } from "~/libs/auth/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_SESSION_QUERY_KEY = ["user", "session"] as const;

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
        console.error(response, "Failed to revoke session");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
    },
  });
}
