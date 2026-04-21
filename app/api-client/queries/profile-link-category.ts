import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export type ProfileLinkCategoryListParams = {
  page?: number;
  pageSize?: number;
};

/** `rsj` payload for GET `/admin/profile/link/category` */
export type ProfileLinkCategoryListData = {
  list: Array<{
    id: string;
    name: string;
    description?: string | null;
    userId?: string;
    linkCount?: number;
  }>;
  total: number;
};

export const profileLinkCategoryKeys = {
  list: (params: ProfileLinkCategoryListParams) =>
    ["profile-link-category", "list", params] as const,
};

export function useProfileLinkCategoryList(params: ProfileLinkCategoryListParams) {
  return useQuery({
    queryKey: profileLinkCategoryKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.profile.link.category.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return parseRsj<ProfileLinkCategoryListData>(res);
    },
  });
}

export function useCreateProfileLinkCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.profile.link.category.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
    },
  });
}

export function useUpdateProfileLinkCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.admin.profile.link.category.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
    },
  });
}

export function useDeleteProfileLinkCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await getApiClient().api.admin.profile.link.category.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
    },
  });
}
