import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type DictItemListParams = {
	dictionaryId: number;
	page?: number;
	pageSize?: number;
};

export const dictItemKeys = {
	list: (params: DictItemListParams) =>
		["system-dict-item", "list", params] as const,
};

export function useDictItemList(params: DictItemListParams) {
	return useQuery({
		queryKey: dictItemKeys.list(params),
		enabled: Boolean(params.dictionaryId),
		queryFn: async () => {
			const res = await getApiClient().api.admin.system["dict-item"][
				":dictionaryId"
			].$get({
				param: { dictionaryId: String(params.dictionaryId) },
				query: {
					page: (params.page ?? 1).toString(),
					pageSize: (params.pageSize ?? 10).toString(),
				},
			});
			return res.json();
		},
	});
}

export function useCreateDictItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { dictionaryId: number; data: any }) => {
			const res = await getApiClient().api.admin.system["dict-item"][
				":dictionaryId"
			].$post({
				param: { dictionaryId: String(payload.dictionaryId) },
				json: payload.data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict-item"] });
		},
	});
}

export function useUpdateDictItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { dictionaryId: number; data: any }) => {
			const res = await getApiClient().api.admin.system["dict-item"][
				":dictionaryId"
			].$put({
				param: { dictionaryId: String(payload.dictionaryId) },
				json: payload.data,
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict-item"] });
		},
	});
}

export function useDeleteDictItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { dictionaryId: number; ids: number[] }) => {
			const res = await getApiClient().api.admin.system["dict-item"][
				":dictionaryId"
			].$delete({
				param: { dictionaryId: String(payload.dictionaryId) },
				json: { ids: payload.ids },
			});
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["system-dict-item"] });
		},
	});
}
