import { Route as CreateImpl } from "~/features/admin/modules/blog/create/route";
export { meta } from "~/features/admin/modules/blog/create/index";

export const handle = { breadcrumb: "创建博客" };

export default function Page() {
  return <CreateImpl />;
}
