import { Route as CategoryImpl } from "~/features/admin/modules/profile/link/category/route";
export { meta } from "~/features/admin/modules/profile/link/category/index";

export const handle = { breadcrumb: "友链分类" };

export default function Page() {
  return <CategoryImpl />;
}
