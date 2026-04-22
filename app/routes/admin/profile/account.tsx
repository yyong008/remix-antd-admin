import { Route as AccountImpl } from "~/features/admin/modules/profile/account/route";
export { meta } from "~/features/admin/modules/profile/account/index";

export const handle = { breadcrumb: "账户设置" };

export default function Page() {
  return <AccountImpl />;
}
