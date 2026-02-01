import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type ChangelogListParams = {
	page?: number;
	pageSize?: number;
};

export const changelogKeys = {
	list: (params: ChangelogListParams) =>
		["docs-changelog", "list", params] as const,
	detail: (id?: number) => ["docs-changelog", "detail", id] as const,
};

export function useChangelogList(params: ChangelogListParams) {
	return useQuery({
		queryKey: changelogKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.docs.changelog.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useChangelogById(id?: number) {
	return useQuery({
		queryKey: changelogKeys.detail(id),
		enabled: Boolean(id),
		queryFn: async () => {
			const res = await getApiClient().api.admin.docs.changelog[":id"].$get({
				param: { id: String(id) },
			});
			return res.json();
		},
	});
}

export function useCreateChangelog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.docs.changelog.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["docs-changelog"] });
		},
	});
}

export function useUpdateChangelog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.docs.changelog[":id"].$put({
				param: { id: String(data.id) },
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["docs-changelog"] });
		},
	});
}

export function useDeleteChangelog() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.docs.changelog.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["docs-changelog"] });
		},
	});
}
