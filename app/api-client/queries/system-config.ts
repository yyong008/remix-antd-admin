import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type SystemConfigListParams = {
  page?: number;
  pageSize?: number;
};

export const systemConfigKeys = {
  list: (params: SystemConfigListParams) => ["system-config", "list", params] as const,
};

export function useSystemConfigList(params: SystemConfigListParams) {
  return useQuery({
    queryKey: systemConfigKeys.list(params),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.system.config.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useCreateConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.system.config.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-config"] });
    },
  });
}

export function useUpdateConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.system.config.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-config"] });
    },
  });
}

export function useDeleteConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: (string | number)[] }) => {
      const res = await (getApiClient() as any).api.admin.system.config.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-config"] });
    },
  });
}
