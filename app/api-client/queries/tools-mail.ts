import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type ToolsMailListParams = {
	page?: number;
	pageSize?: number;
};

export const toolsMailKeys = {
	list: (params: ToolsMailListParams) =>
		["tools-mail", "list", params] as const,
	detail: (id?: number) => ["tools-mail", "detail", id] as const,
};

export function useToolsMailList(params: ToolsMailListParams) {
	return useQuery({
		queryKey: toolsMailKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.tools.mail.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useToolsMailById(id?: number) {
	return useQuery({
		queryKey: toolsMailKeys.detail(id),
		enabled: Boolean(id),
		queryFn: async () => {
			const res = await getApiClient().api.admin.tools.mail[":id"].$get({
				param: { id: String(id) },
			});
			return res.json();
		},
	});
}

export function useCreateToolsMail() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.tools.mail.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tools-mail"] });
		},
	});
}

export function useUpdateToolsMail() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.tools.mail.$put({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tools-mail"] });
		},
	});
}

export function useDeleteToolsMail() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.tools.mail.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tools-mail"] });
		},
	});
}

export function useSendToolsMail() {
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.tools.mail.send.$post({
				json: data,
			});
			return res.json();
		},
	});
}
