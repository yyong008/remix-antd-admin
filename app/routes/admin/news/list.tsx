import { Route as ListImpl } from "~/features/admin/modules/news/list/route";
export { meta } from "~/features/admin/modules/news/list/index";

export const handle = { breadcrumb: "新闻列表" };

export default function Page() {
  return <ListImpl />;
}
