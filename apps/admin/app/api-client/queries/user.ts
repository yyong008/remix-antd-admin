import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type UserListParams = {
  page?: number;
  pageSize?: number;
  name?: string;
};

export const userKeys = {
  list: (params: UserListParams) => ["user", "list", params] as const,
};

export async function fetchUserList(params: UserListParams) {
  const client = getApiClient() as any;
  const res = await client.api.admin.system.user.$get({
    query: {
      page: params.page?.toString(),
      pageSize: params.pageSize?.toString(),
      name: params.name ?? "",
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export function useUserList(params: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUserList(params),
  });
}
