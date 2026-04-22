import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export const publicNewsKeys = {
  list: (params: { page?: number; pageSize?: number; category?: string }) =>
    ["public-news", "list", params] as const,
  detail: (id?: string) => ["public-news", "detail", id] as const,
};

export type PublicNewsRow = {
  id: string;
  title: string;
  content: string;
  author?: string | null;
  source?: string | null;
  viewCount: number;
  publishedAt: string;
  newsId: string;
  status: number;
  categoryName?: string;
};

export type PublicNewsListData = {
  total: number;
  list: PublicNewsRow[];
};

export function usePublicNewsList(params: { page?: number; pageSize?: number; category?: string }) {
  return useQuery({
    queryKey: publicNewsKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.news.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          ...(params.category ? { category: params.category } : {}),
        },
      });
      return parseRsj<PublicNewsListData>(res);
    },
  });
}

export function usePublicNewsById(id?: string) {
  return useQuery({
    queryKey: publicNewsKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.news[":id"].$get({
        param: { id: id! },
      });
      return parseRsj<PublicNewsRow>(res);
    },
  });
}
