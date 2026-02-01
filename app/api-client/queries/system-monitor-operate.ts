import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type MonitorOperateParams = {
	page?: number;
	pageSize?: number;
};

export const operateKeys = {
	list: (params: MonitorOperateParams) =>
		["system-operate", "list", params] as const,
};

export function useMonitorOperateList(params: MonitorOperateParams) {
	return useQuery({
		queryKey: operateKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.monitor.operate.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}
