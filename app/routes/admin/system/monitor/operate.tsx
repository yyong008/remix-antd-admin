import { href } from "react-router";
import { Route as OperateImpl } from "~/features/admin/modules/system/monitor/operate/route";
export { meta } from "~/features/admin/modules/system/monitor/operate/index";

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
        label: "操作日志",
      },
    ],
  };
};

export default function Page() {
  return <OperateImpl />;
}
