import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type UserListParams = {
	page?: number;
	pageSize?: number;
	name?: string;
};

export const userKeys = {
	list: (params: UserListParams) => ["system-user", "list", params] as const,
	info: ["system-user", "info"] as const,
};

export function useUserList(params: UserListParams) {
	return useQuery({
		queryKey: userKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.user.$get({
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

export function useUserInfo() {
	return useQuery({
		queryKey: userKeys.info,
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.user.info.$get();
			return res.json();
		},
	});
}

export function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.user.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-user"] });
		},
	});
}

export function useUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.user[":id"].$put({
				param: { id: String(data.id) },
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-user"] });
		},
	});
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.system.user.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-user"] });
		},
	});
}
