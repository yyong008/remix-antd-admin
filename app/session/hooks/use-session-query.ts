import { authClient } from "~/libs/auth/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const SESSION_QUERY_KEY = ["session"] as const;

export type SessionUserContextType = {
  session: Awaited<ReturnType<typeof authClient.getSession>>["data"]["session"];
  user: Awaited<ReturnType<typeof authClient.getSession>>["data"]["user"];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  cleanSession: () => void;
};

export function useSessionQuery(): SessionUserContextType {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const result = await authClient.getSession();
      return result.data;
    },
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
  };

  const cleanSession = () => {
    queryClient.setQueryData(SESSION_QUERY_KEY, null);
  };

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
    isLoading,
    error: error || null,
    refresh,
    cleanSession,
  };
}
