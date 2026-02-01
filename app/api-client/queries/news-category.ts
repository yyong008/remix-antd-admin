import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type NewsCategoryListParams = {
  page?: number;
  pageSize?: number;
};

export const newsCategoryKeys = {
  list: (params: NewsCategoryListParams) =>
    ["news-category", "list", params] as const,
};

export function useNewsCategoryList(params: NewsCategoryListParams) {
  return useQuery({
    queryKey: newsCategoryKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.news.category.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useCreateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.news.category.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-category"] });
    },
  });
}

export function useUpdateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.news.category.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-category"] });
    },
  });
}

export function useDeleteNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.news.category.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-category"] });
    },
  });
}
