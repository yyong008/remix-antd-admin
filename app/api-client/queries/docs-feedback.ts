import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type FeedbackListParams = {
  page?: number;
  pageSize?: number;
};

export const feedbackKeys = {
  list: (params: FeedbackListParams) =>
    ["docs-feedback", "list", params] as const,
  detail: (id?: number) => ["docs-feedback", "detail", id] as const,
};

export function useFeedbackList(params: FeedbackListParams) {
  return useQuery({
    queryKey: feedbackKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.feedback.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useFeedbackById(id?: number) {
  return useQuery({
    queryKey: feedbackKeys.detail(id),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await getApiClient().api.admin.feedback[":id"].$get({
        param: { id: String(id) },
      });
      return res.json();
    },
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.feedback.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs-feedback"] });
    },
  });
}

export function useUpdateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.feedback[":id"].$put({
        param: { id: String(data.id) },
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs-feedback"] });
    },
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.feedback.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs-feedback"] });
    },
  });
}
