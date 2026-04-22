import { href } from "react-router";
import { Route as ConfigImpl } from "~/features/admin/modules/system/config/route";
export { meta } from "~/features/admin/modules/system/config/index";

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
        label: "配置",
      },
    ],
  };
};

export default function Page() {
  return <ConfigImpl />;
}
