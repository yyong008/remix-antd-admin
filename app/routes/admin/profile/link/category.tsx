import { href } from "react-router";
import { Route as CategoryImpl } from "~/features/admin/modules/profile/link/category/route";
export { meta } from "~/features/admin/modules/profile/link/category/index";

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
        label: "个人中心",
      },
      {
        label: "友链分类",
      },
    ],
  };
};

export default function Page() {
  return <CategoryImpl />;
}
