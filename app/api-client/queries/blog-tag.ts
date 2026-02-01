import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type BlogTagListParams = {
	page?: number;
	pageSize?: number;
};

export const blogTagKeys = {
	list: (params: BlogTagListParams) => ["blog-tag", "list", params] as const,
	detail: (id?: number) => ["blog-tag", "detail", id] as const,
};

export function useBlogTagList(params: BlogTagListParams) {
	return useQuery({
		queryKey: blogTagKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.blog.tag.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useBlogTagById(id?: number) {
	return useQuery({
		queryKey: blogTagKeys.detail(id),
		enabled: Boolean(id),
		queryFn: async () => {
			const res = await getApiClient().api.admin.blog.tag[":id"].$get({
				param: { id: String(id) },
			});
			return res.json();
		},
	});
}

export function useCreateBlogTag() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.blog.tag.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
		},
	});
}

export function useUpdateBlogTag() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.blog.tag[":id"].$put({
				param: { id: String(data.id) },
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
		},
	});
}

export function useDeleteBlogTag() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.blog.tag.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
		},
	});
}

export function useDeleteBlogTagById() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await getApiClient().api.admin.blog.tag[":id"].$delete({
				param: { id: String(id) },
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
		},
	});
}
