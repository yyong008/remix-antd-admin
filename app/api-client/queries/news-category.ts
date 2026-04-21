import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export type NewsCategoryListParams = {
  page?: number;
  pageSize?: number;
};

/** 单条分类（列表/表单用） */
export type NewsCategoryRow = {
  id: string;
  name: string;
  description?: string | null;
  visible?: unknown;
  newsCount?: number;
};

export type NewsCategoryListData = {
  total: number;
  list: NewsCategoryRow[];
};

export const newsCategoryKeys = {
  list: (params: NewsCategoryListParams) => ["news-category", "list", params] as const,
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
      /** 统一解析 rsj，避免组件里把 `data` 包一层又解一层弄混 */
      return parseRsj<NewsCategoryListData>(res);
    },
  });
}

export function useCreateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await getApiClient().api.admin.news.category.$post({
        json: data,
      });
      return parseRsj<NewsCategoryRow>(res);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["news-category"] });
      void queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useUpdateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await getApiClient().api.admin.news.category.$put({
        json: data,
      });
      return parseRsj<NewsCategoryRow>(res);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["news-category"] });
      void queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useDeleteNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await getApiClient().api.admin.news.category.$delete({
        json: data,
      });
      return parseRsj<unknown>(res);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["news-category"] });
      void queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}
