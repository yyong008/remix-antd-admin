import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type BlogCategoryListParams = {
  page?: number;
  pageSize?: number;
};

export const blogCategoryKeys = {
  list: (params: BlogCategoryListParams) =>
    ["blog-category", "list", params] as const,
  detail: (id?: number) => ["blog-category", "detail", id] as const,
};

export function useBlogCategoryList(params: BlogCategoryListParams) {
  return useQuery({
    queryKey: blogCategoryKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.blog.category.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useBlogCategoryById(id?: number) {
  return useQuery({
    queryKey: blogCategoryKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.admin.blog.category[":id"].$get({
        param: { id: String(id) },
      });
      return res.json();
    },
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.blog.category.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-category"] });
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.blog.category[":id"].$put({
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
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.blog.category.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-category"] });
    },
  });
}
