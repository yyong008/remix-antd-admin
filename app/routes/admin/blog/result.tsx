import { Route as ResultImpl } from "~/features/admin/modules/blog/result/route";
export { meta } from "~/features/admin/modules/blog/result/index";

export const handle = { breadcrumb: "博客结果" };

export default function Page() {
  return <ResultImpl />;
}
