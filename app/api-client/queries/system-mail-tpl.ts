import { useQuery } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export type SystemMailTplListParams = {
  page?: number;
  pageSize?: number;
};

export const systemMailTplKeys = {
  list: (params: SystemMailTplListParams) =>
    ["system-mail-tpl", "list", params] as const,
};

export function useSystemMailTplList(params: SystemMailTplListParams) {
  return useQuery({
    queryKey: systemMailTplKeys.list(params),
    queryFn: async () => {
      const res = await getApiClient().api.admin.system.mail.tpl.$get({
        query: {
          page: (params.page ?? 1).toString(),
          pageSize: (params.pageSize ?? 10).toString(),
        },
      });
      return res.json();
    },
  });
}
