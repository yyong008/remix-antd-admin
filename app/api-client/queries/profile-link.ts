import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type ProfileLinkListParams = {
  page?: number;
  pageSize?: number;
  category?: number;
};

export const profileLinkKeys = {
  list: (params: ProfileLinkListParams) =>
    ["profile-link", "list", params] as const,
};

export function useProfileLinkList(params: ProfileLinkListParams) {
  return useQuery({
    queryKey: profileLinkKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.profile.link.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          category: (params.category ?? 0).toString(),
        },
      });
      return res.json();
    },
  });
}

export function useCreateProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.profile.link.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
    },
  });
}

export function useUpdateProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.profile.link.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
    },
  });
}

export function useDeleteProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: number[] }) => {
      const res = await getApiClient().api.admin.profile.link.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
    },
  });
}
