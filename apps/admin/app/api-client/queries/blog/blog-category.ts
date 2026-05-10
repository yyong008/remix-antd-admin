import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";

export type BlogCategoryListParams = {
  page?: number;
  pageSize?: number;
};

export const blogCategoryKeys = {
  list: (params: BlogCategoryListParams) => ["blog-category", "list", params] as const,
  detail: (id?: string) => ["blog-category", "detail", id] as const,
};

export type BlogCategoryRow = {
  id: string;
  name: string;
  description?: string | null;
  showOnClient?: boolean;
};

export type BlogCategoryListData = {
  total: number;
  list: BlogCategoryRow[];
};

export function useBlogCategoryList(params: BlogCategoryListParams) {
  return useQuery({
    queryKey: blogCategoryKeys.list(params),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.blog.category.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return parseRsj<BlogCategoryListData>(res);
    },
  });
}

export function useBlogCategoryById(id?: string) {
  return useQuery({
    queryKey: blogCategoryKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.blog.category[":id"].$get({
        param: { id: id! },
      });
      return res.json();
    },
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await (getApiClient() as any).api.admin.blog.category.$post({
        json: data,
      });
      return parseRsj(res);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["blog-category"] });
      void queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.blog.category[":id"].$put({
        param: { id: String(data.id) },
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-category"] });
    },
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await (getApiClient() as any).api.admin.blog.category.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-category"] });
    },
  });
}
