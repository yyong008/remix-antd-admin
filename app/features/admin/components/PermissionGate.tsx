import type { ReactNode } from "react";

import { useHasAdminPermission } from "../hooks/useAdminPermissions";

type PermissionGateProps = {
  /** User needs at least one of these permission codes. */
  anyOf: string[];
  children: ReactNode;
  fallback?: ReactNode;
};

export function PermissionGate(props: PermissionGateProps) {
  const ok = useHasAdminPermission(...props.anyOf);
  if (ok) return props.children;
  return props.fallback ?? null;
}
