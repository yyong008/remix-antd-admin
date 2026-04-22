import { Route as IndexImpl } from "~/features/admin/modules/blog/index/route";
export { meta } from "~/features/admin/modules/blog/index/index";

export const handle = { breadcrumb: "博客列表" };

export default function Page() {
  return <IndexImpl />;
}
