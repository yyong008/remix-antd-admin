import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";
import { parseRsj } from "~/utils/parse-rsj";

export const profileAccountKeys = {
  info: ["profile-account", "info"] as const,
};

export function useProfileAccount() {
  return useQuery({
    queryKey: profileAccountKeys.info,
    queryFn: async () => {
      const res = await (getApiClient() as any).api.admin.profile.account.$get();
      return parseRsj(res);
    },
  });
}

export function useUpdateProfileAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { avatar?: string }) => {
      const res = await (getApiClient() as any).api.admin.profile.account.$put({
        json: data,
      });
      /** PUT /api/admin/profile/account returns rsj-wrapped user object */
      return parseRsj<{ id: string; avatar: string }>(res);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileAccountKeys.info });
      void queryClient.invalidateQueries({ queryKey: ["system-user", "info"] });
    },
  });
}
