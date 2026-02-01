import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type SystemConfigListParams = {
	page?: number;
	pageSize?: number;
};

export const systemConfigKeys = {
	list: (params: SystemConfigListParams) =>
		["system-config", "list", params] as const,
};

export function useSystemConfigList(params: SystemConfigListParams) {
	return useQuery({
		queryKey: systemConfigKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.config.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}
