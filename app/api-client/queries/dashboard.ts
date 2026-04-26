import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";
import type { DashboardPayload } from "~/types/admin-dashboard-stats";

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
