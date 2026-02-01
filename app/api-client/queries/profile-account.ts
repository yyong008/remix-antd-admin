import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const profileAccountKeys = {
	info: ["profile-account", "info"] as const,
};

export function useProfileAccount() {
	return useQuery({
		queryKey: profileAccountKeys.info,
		queryFn: async () => {
			const res = await getApiClient().api.admin.profile.account.$get();
			return res.json();
		},
	});
}
