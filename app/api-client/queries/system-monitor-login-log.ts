import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type MonitorLoginLogParams = {
  page?: number;
  pageSize?: number;
  name?: string;
};

export const loginLogKeys = {
  list: (params: MonitorLoginLogParams) =>
    ["system-loginlog", "list", params] as const,
};

export function useMonitorLoginLogList(params: MonitorLoginLogParams) {
  return useQuery({
    queryKey: loginLogKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.system.monitor.loginlog.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          name: params.name ?? "",
        },
      });
      return res.json();
    },
  });
}
