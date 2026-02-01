import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const menuRoleKeys = {
	list: ["system-menu-role", "list"] as const,
};

export function useMenuRoleList() {
	return useQuery({
		queryKey: menuRoleKeys.list,
		queryFn: async () => {
			const res = await getApiClient().api.admin.system["menu-role"].$get();
			return res.json();
		},
	});
}
