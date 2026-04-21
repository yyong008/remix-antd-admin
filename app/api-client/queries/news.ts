import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export type NewsListParams = {
  page?: number;
  pageSize?: number;
  /** News category id (`news_category.id`); omit or empty = all. */
  category?: string;
};

export const newsKeys = {
  list: (params: NewsListParams) => ["news", "list", params] as const,
  detail: (id?: string) => ["news", "detail", id] as const,
};

export type NewsRow = {
  id: string;
  title: string;
  content: string;
  author?: string | null;
  source?: string | null;
  viewCount: number;
  publishedAt: string;
  newsId: string;
  status: number;
};

export type NewsListData = {
  total: number;
  list: NewsRow[];
};

export function useNewsList(params: NewsListParams) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.news.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          ...(params.category ? { category: params.category } : {}),
        },
      });
      return parseRsj<NewsListData>(res);
    },
  });
}

export function useNewsById(id?: string) {
  return useQuery({
    queryKey: newsKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.admin.news[":id"].$get({
        param: { id: id! },
      });
      return parseRsj<NewsRow>(res);
    },
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.news.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.news.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await getApiClient().api.admin.news.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useToggleNewsStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await getApiClient().api.admin.news["toggle-status"].$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useIncrementNewsViewCount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await getApiClient().api.admin.news[":id"].view.$put({
        param: { id },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}
