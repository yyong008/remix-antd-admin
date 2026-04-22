import { href } from "react-router";
import { Route as EditDetailImpl } from "~/features/admin/modules/news/edit-detail/route";
export { meta } from "~/features/admin/modules/news/edit-detail/index";

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
        label: "新闻详情",
      },
    ],
  };
};

export default function Page() {
  return <EditDetailImpl />;
}
