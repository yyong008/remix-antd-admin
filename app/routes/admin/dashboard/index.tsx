import { Route as DashboardImpl } from "~/features/admin/modules/dashboard/route";
export { meta } from "~/features/admin/modules/dashboard/index";

export const handle = { breadcrumb: "首页" };

export default function Page() {
  return <DashboardImpl />;
}
