import { useMemo } from "react";

import { useUserInfo } from "~/api-client/queries/system-user";

export type AdminRoleSummary = { id: string; name: string; value: string };

/** Permission codes from `sys_menu.permission` for the current user (via GET `/api/admin/system/user/info`). */
export function useAdminPermissions(): string[] {
  const { data } = useUserInfo();
  return useMemo(() => data?.permissions ?? [], [data]);
}

export function useAdminRoles(): AdminRoleSummary[] {
  const { data } = useUserInfo();
  return useMemo(() => (data?.roles ?? []) as AdminRoleSummary[], [data]);
}

export function useHasAdminPermission(...codes: string[]): boolean {
  const permissions = useAdminPermissions();
  return codes.some((c) => permissions.includes(c));
}
