import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type ToolsStorageListParams = {
  page?: number;
  pageSize?: number;
};

export const toolsStorageKeys = {
  list: (params: ToolsStorageListParams) =>
    ["tools-storage", "list", params] as const,
  detail: (id?: number) => ["tools-storage", "detail", id] as const,
};

export function useToolsStorageList(params: ToolsStorageListParams) {
  return useQuery({
    queryKey: toolsStorageKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.tools.storage.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useToolsStorageById(id?: number) {
  return useQuery({
    queryKey: toolsStorageKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.admin.tools.storage[":id"].$get({
        param: { id: String(id) },
      });
      return res.json();
    },
  });
}

export function useCreateToolsStorage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.tools.storage.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools-storage"] });
    },
  });
}

export function useUpdateToolsStorage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.tools.storage.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools-storage"] });
    },
  });
}

export function useDeleteToolsStorage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.tools.storage.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools-storage"] });
    },
  });
}
