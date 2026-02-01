import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export const blogTagKeys = {
  list: (params: { page?: number; pageSize?: number }) =>
    ["blog-tag", "list", params] as const,
};

export function useBlogTagList(params: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: blogTagKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.blog.tag.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useCreateBlogTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.blog.tag.$post({ json: data });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
    },
  });
}

export function useUpdateBlogTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.blog.tag[":id"].$put({
        param: { id: String(data.id) },
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
    },
  });
}

export function useDeleteBlogTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: number[]) => {
      const res = await getApiClient().api.admin.blog.tag.$delete({
        json: { ids },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-tag"] });
    },
  });
}
