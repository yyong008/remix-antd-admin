import { href } from "react-router";
import { Route as ListImpl } from "~/features/admin/modules/news/list/route";
export { meta } from "~/features/admin/modules/news/list/index";

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
        label: "新闻列表",
      },
    ],
  };
};

export default function Page() {
  return <ListImpl />;
}
