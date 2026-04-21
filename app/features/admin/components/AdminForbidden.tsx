import { Result } from "antd";

/** Placeholder when the user lacks RBAC permission for a page or action. */
export function AdminForbidden() {
  return <Result status="403" title="403" subTitle="You do not have permission to access this." />;
}
