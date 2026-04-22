import { Route as EditDetailImpl } from "~/features/admin/modules/news/edit-detail/route";
export { meta } from "~/features/admin/modules/news/edit-detail/index";

export const handle = { breadcrumb: "新闻详情" };

export default function Page() {
  return <EditDetailImpl />;
}
