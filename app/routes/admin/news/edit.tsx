import { href } from "react-router";
import { Route as EditImpl } from "~/features/admin/modules/news/edit/route";
export { meta } from "~/features/admin/modules/news/edit/index";

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
        label: "编辑新闻",
      },
    ],
  };
};

export default function Page() {
  return <EditImpl />;
}
