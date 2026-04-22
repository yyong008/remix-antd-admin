import { Route as EditImpl } from "~/features/admin/modules/news/edit/route";
export { meta } from "~/features/admin/modules/news/edit/index";

export const handle = { breadcrumb: "编辑新闻" };

export default function Page() {
  return <EditImpl />;
}
