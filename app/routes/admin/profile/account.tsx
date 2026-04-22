import { href } from "react-router";
import { Route as AccountImpl } from "~/features/admin/modules/profile/account/route";
export { meta } from "~/features/admin/modules/profile/account/index";

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
        label: "个人信息",
      },
    ],
  };
};

export default function Page() {
  return <AccountImpl />;
}
