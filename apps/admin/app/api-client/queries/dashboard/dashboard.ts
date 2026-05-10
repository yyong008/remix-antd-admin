import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";

export type AdminDashboardStats = {
  userCount?: number;
  roleCount?: number;
  deptCount?: number;
  menuCount?: number;
  newsCount?: number;
  newsCategoryCount?: number;
  blogCount?: number;
  loginLogCount?: number;
  operateLogCount?: number;
  changelogCount?: number;
  feedbackCount?: number;
};

export type DashboardPayload = {
  isLogin: boolean;
  latestLoginLog: Record<string, unknown> | null;
  stats?: AdminDashboardStats | null;
};

export const dashboardKeys = {
  info: ["dashboard", "info"] as const,
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.info,
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.dashboard.$get();
      return parseRsj<DashboardPayload>(res);
    },
  });
}

export function useUserSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await (getApiClient() as any).api.admin.system.user.signin.$post();
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.info });
    },
  });
}
