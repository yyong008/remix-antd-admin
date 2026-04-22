import { href } from "react-router";
import { Route as ResultImpl } from "~/features/admin/modules/blog/result/route";
export { meta } from "~/features/admin/modules/blog/result/index";

interface HandleParams {
  locale?: string;
}
export const handle = ({ params }: { params: HandleParams }) => {
  return {
    breadcrumb: [
      {
        href: href("/:locale?/admin/dashboard", { locale: params?.locale }),
        label: "Dashboard",
      },
      {
        label: "博客",
      },
      {
        label: "博客结果",
      },
    ],
  };
};

export default function Page() {
  return <ResultImpl />;
}
