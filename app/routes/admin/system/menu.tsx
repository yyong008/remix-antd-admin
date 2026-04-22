import { href } from "react-router";
import { Route as MenuImpl } from "~/features/admin/modules/system/menu/route";
export { meta } from "~/features/admin/modules/system/menu/index";

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
        label: "系统",
      },
      {
        label: "菜单管理",
      },
    ],
  };
};

export default function Page() {
  return <MenuImpl />;
}
