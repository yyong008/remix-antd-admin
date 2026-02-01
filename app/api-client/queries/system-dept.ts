import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type DeptListParams = {
	page?: number;
	pageSize?: number;
};

export const deptKeys = {
	list: (params: DeptListParams) => ["system-dept", "list", params] as const,
};

export function useDeptList(params: DeptListParams) {
	return useQuery({
		queryKey: deptKeys.list(params),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system.dept.$get({
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useCreateDept() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.dept.$post({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dept"] });
		},
	});
}

export function useUpdateDept() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: any) => {
			const res = await getApiClient().api.admin.system.dept.$put({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dept"] });
		},
	});
}

export function useDeleteDept() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: { ids: number[] }) => {
			const res = await getApiClient().api.admin.system.dept.$delete({
				json: data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dept"] });
		},
	});
}
