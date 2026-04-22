import { Route as EditImpl } from "~/features/admin/modules/blog/edit/route";
export { meta } from "~/features/admin/modules/blog/edit/index";

export const handle = { breadcrumb: "编辑博客" };

export default function Page() {
  return <EditImpl />;
}
