import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";
import type { MenuFlatRow, MenuTreeNode } from "~/utils/menu-tree";

export type UserListParams = {
  page?: number;
  pageSize?: number;
  name?: string;
};

/** Row from `GET /api/admin/system/user/info` → `data.userInfo` (system user + profile). */
export type AdminSysUserInfo = {
  id: string;
  avatar: string | null;
  email: string;
  name: string;
  nickname: string | null;
  locale: string | null;
  theme: string;
  phone: string | null;
  remark: string | null;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  department: { id: string; name: string } | null;
};

/** `data` payload of `GET /api/admin/system/user/info` (after `rsj` unwrap). */
export type AdminUserInfoPayload = {
  menu: MenuFlatRow[];
  menuTree: MenuTreeNode[];
  permissions: string[];
  roles: { id: string; name: string; value: string }[];
  userInfo: AdminSysUserInfo | null;
};

export const userKeys = {
  list: (params: UserListParams) => ["system-user", "list", params] as const,
  info: ["system-user", "info"] as const,
};

export function useUserList(params: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.system.user.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
          name: params.name ?? "",
        },
      });
      return res.json();
    },
  });
}

export function useUserInfo() {
  return useQuery({
    queryKey: userKeys.info,
    queryFn: async () => {
      const res = await getApiClient().api.admin.system.user.info.$get();
      return parseRsj<AdminUserInfoPayload>(res);
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.system.user.$post({
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-user"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await (getApiClient() as any).api.admin.system.user[":id"].$put({
        param: { id: String(data.id) },
        json: data,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-user"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await (getApiClient() as any).api.admin.system.user.$delete({
        json: { ids: data.ids.map((id) => String(id)) },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-user"] });
    },
  });
}
