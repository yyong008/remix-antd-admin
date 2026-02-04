import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const monitorServeKeys = {
	info: ["system-monitor-serve", "info"] as const,
};

export function useMonitorServeInfo() {
	return useQuery({
		queryKey: monitorServeKeys.info,
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.monitor.serve.$get();
			return res.json();
		},
	});
}
