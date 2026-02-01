import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const dashboardKeys = {
	info: ["dashboard", "info"] as const,
};

export function useDashboard() {
	return useQuery({
		queryKey: dashboardKeys.info,
		queryFn: async () => {
			const res = await getApiClient().api.admin.dashboard.$get();
			return res.json();
		},
	});
}

export function useUserSignIn() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			const res = await getApiClient().api.admin.system.user.signin.$post();
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: dashboardKeys.info });
		},
	});
}
