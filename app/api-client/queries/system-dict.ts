import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type DictListParams = {
	page?: number;
	pageSize?: number;
};

export const dictKeys = {
	list: (params: DictListParams) => ["system-dict", "list", params] as const,
};

export function useDictList(params: DictListParams) {
	return useQuery({
		queryKey: dictKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.dict.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useCreateDict() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.dict.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict"] });
		},
	});
}

export function useUpdateDict() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.dict.$put({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict"] });
		},
	});
}

export function useDeleteDict() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.system.dict.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict"] });
		},
	});
}
