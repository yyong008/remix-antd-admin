import { href } from "react-router";
import { Route as ServeImpl } from "~/features/admin/modules/system/monitor/serve/route";
export { meta } from "~/features/admin/modules/system/monitor/serve/index";

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
        label: "服务监控",
      },
    ],
  };
};

export default function Page() {
  return <ServeImpl />;
}
