import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const SESSION_QUERY_KEY = ["session"] as const;

type SessionData = {
  session: {
    id: string;
    token: string;
    expiresAt: number;
    ipAddress?: string;
    userAgent?: string;
  } | null;
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image?: string;
    nickname?: string;
    avatar?: string;
    locale?: string;
    theme?: string;
    phone?: string;
    remark?: string;
    departmentId?: string;
    status?: number;
  } | null;
};

export type SessionUserContextType = {
  session: SessionData["session"];
  user: SessionData["user"];
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  cleanSession: () => void;
  /** @deprecated Use `refresh` instead. */
  refreshUserSession: () => Promise<void>;
};

export function useSessionQuery(): SessionUserContextType {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const res = await (getApiClient() as any).api.auth.session.$get();
      const result = await parseRsj<SessionData>(res);
      return result;
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
    refreshUserSession: refresh,
  };
}
