import { Route as AboutImpl } from "~/features/admin/modules/about/route";
export { meta } from "~/features/admin/modules/about/index";

export const handle = { breadcrumb: "关于我们" };

export default function Page() {
  return <AboutImpl />;
}
