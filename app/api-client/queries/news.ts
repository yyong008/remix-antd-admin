import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type NewsListParams = {
	page?: number;
	pageSize?: number;
	category?: number;
};

export const newsKeys = {
	list: (params: NewsListParams) => ["news", "list", params] as const,
	detail: (id?: number) => ["news", "detail", id] as const,
};

export function useNewsList(params: NewsListParams) {
	return useQuery({
		queryKey: newsKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.news.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
					category: (params.category ?? 0).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useNewsById(id?: number) {
	return useQuery({
		queryKey: newsKeys.detail(id),
		enabled: Boolean(id),
		queryFn: async () => {
			const res = await getApiClient().api.admin.news[":id"].$get({
				param: { id: String(id) },
			});
			return res.json();
		},
	});
}

export function useCreateNews() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.news.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
		},
	});
}

export function useUpdateNews() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.news.$put({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
		},
	});
}

export function useDeleteNews() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.news.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
		},
	});
}
