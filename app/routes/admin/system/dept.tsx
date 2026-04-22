import { href } from "react-router";
import { Route as DeptImpl } from "~/features/admin/modules/system/dept/route";
export { meta } from "~/features/admin/modules/system/dept/index";

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
        label: "部门管理",
      },
    ],
  };
};

export default function Page() {
  return <DeptImpl />;
}
