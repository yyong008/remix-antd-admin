import { href } from "react-router";
import { Route as RoleImpl } from "~/features/admin/modules/system/role/route";
export { meta } from "~/features/admin/modules/system/role/index";

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
        label: "角色管理",
      },
    ],
  };
};

export default function Page() {
  return <RoleImpl />;
}
