import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type MenuListParams = {
  page?: number;
  pageSize?: number;
};

export const menuKeys = {
  list: (params: MenuListParams) => ["system-menu", "list", params] as const,
  flat: ["system-menu", "flat"] as const,
};

export function useMenuList(params: MenuListParams) {
  return useQuery({
    queryKey: menuKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.system.menu.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useMenuFlatList() {
  return useQuery({
    queryKey: menuKeys.flat,
    queryFn: async () => {
      const res = await getApiClient().api.admin.system["menu-list"].$get();
      return res.json();
    },
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.system.menu.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-menu"] });
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.system.menu.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-menu"] });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.system.menu.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-menu"] });
    },
  });
}
