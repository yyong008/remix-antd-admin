import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";

export type BlogListParams = {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  tagId?: string;
};

export const blogKeys = {
  list: (params: BlogListParams) => ["blog", "list", params] as const,
  detail: (id?: string) => ["blog", "detail", id] as const,
};

export type BlogListData = {
  total: number;
  list: Record<string, unknown>[];
};

export function useBlogList(params: BlogListParams) {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.blog.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          categoryId: (params.categoryId ?? 0).toString(),
          tagId: (params.tagId ?? 0).toString(),
        },
      });
      return parseRsj<BlogListData>(res);
    },
  });
}

export function useBlogById(id?: string) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.blog[":id"].$get({
        param: { id: id! },
      });
      return res.json();
    },
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.blog.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.blog[":id"].$put({
        param: { id: String(data.id) },
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await (getApiClient() as any).api.admin.blog.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}
