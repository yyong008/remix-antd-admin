import { href } from "react-router";
import { Route as EditImpl } from "~/features/admin/modules/blog/edit/route";
export { meta } from "~/features/admin/modules/blog/edit/index";

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
        label: "编辑博客",
      },
    ],
  };
};

export default function Page() {
  return <EditImpl />;
}
