import { href } from "react-router";
import { Route as UserImpl } from "~/features/admin/modules/system/user/route";
export { meta } from "~/features/admin/modules/system/user/index";

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
        label: "用户管理",
      },
    ],
  };
};

export default function Page() {
  return <UserImpl />;
}
