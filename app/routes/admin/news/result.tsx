import { href } from "react-router";
import { Route as ResultImpl } from "~/features/admin/modules/news/result/route";
export { meta } from "~/features/admin/modules/news/result/index";

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
        label: "新闻",
      },
      {
        label: "新闻结果",
      },
    ],
  };
};

export default function Page() {
  return <ResultImpl />;
}
