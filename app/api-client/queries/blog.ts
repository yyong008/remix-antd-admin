import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type BlogListParams = {
	page?: number;
	pageSize?: number;
	categoryId?: number;
	tagId?: number;
};

export const blogKeys = {
	list: (params: BlogListParams) => ["blog", "list", params] as const,
	detail: (id?: number) => ["blog", "detail", id] as const,
};

export function useBlogList(params: BlogListParams) {
	return useQuery({
		queryKey: blogKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.blog.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
					categoryId: (params.categoryId ?? 0).toString(),
					tagId: (params.tagId ?? 0).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useBlogById(id?: number) {
	return useQuery({
		queryKey: blogKeys.detail(id),
		enabled: Boolean(id),
		queryFn: async () => {
			const res = await getApiClient().api.admin.blog[":id"].$get({
				param: { id: String(id) },
			});
			return res.json();
		},
	});
}

export function useCreateBlog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.blog.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog"] });
		},
	});
}

export function useUpdateBlog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.blog[":id"].$put({
				param: { id: String(data.id) },
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog"] });
		},
	});
}

export function useDeleteBlog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.blog.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog"] });
		},
	});
}
