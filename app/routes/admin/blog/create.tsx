import { href } from "react-router";
import { Route as CreateImpl } from "~/features/admin/modules/blog/create/route";
export { meta } from "~/features/admin/modules/blog/create/index";

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
        label: "创建博客",
      },
    ],
  };
};

export default function Page() {
  return <CreateImpl />;
}
