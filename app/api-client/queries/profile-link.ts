import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/api-client/parse-rsj";

export type ProfileLinkListParams = {
  page?: number;
  pageSize?: number;
  /** 不传则返回当前用户下全部链接 */
  category?: string;
};

/** `rsj` payload for GET `/admin/profile/link` */
export type ProfileLinkListData = {
  list: Array<{
    id: string;
    name: string;
    url: string;
    description?: string | null;
    categoryId: string;
    userId?: string;
    createdAt?: Date | string | number | null;
    updatedAt?: Date | string | number | null;
  }>;
  total: number;
};

export const profileLinkKeys = {
  list: (params: ProfileLinkListParams) => ["profile-link", "list", params] as const,
};

export function useProfileLinkList(params: ProfileLinkListParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: profileLinkKeys.list(params),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.profile.link.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          ...(params.category ? { category: params.category } : {}),
        },
      });
      return parseRsj<ProfileLinkListData>(res);
    },
    ...options,
  });
}

export function useCreateProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.profile.link.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
    },
  });
}

export function useUpdateProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.profile.link.$put({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
    },
  });
}

export function useDeleteProfileLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await (getApiClient() as any).api.admin.profile.link.$delete({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-link"] });
      queryClient.invalidateQueries({ queryKey: ["profile-link-category"] });
    },
  });
}
