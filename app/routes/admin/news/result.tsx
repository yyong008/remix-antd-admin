import { Route as ResultImpl } from "~/features/admin/modules/news/result/route";
export { meta } from "~/features/admin/modules/news/result/index";

export const handle = { breadcrumb: "新闻结果" };

export default function Page() {
  return <ResultImpl />;
}
