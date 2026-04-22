import { href } from "react-router";
import { Route as LoginLogImpl } from "~/features/admin/modules/system/monitor/login-log/route";
export { meta } from "~/features/admin/modules/system/monitor/login-log/index";

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
        label: "登录日志",
      },
    ],
  };
};

export default function Page() {
  return <LoginLogImpl />;
}
