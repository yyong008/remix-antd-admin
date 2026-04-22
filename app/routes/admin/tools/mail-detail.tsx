import { href } from "react-router";
import { Route as MailDetailImpl } from "~/features/admin/modules/tools/mail-detail/route";
export { meta } from "~/features/admin/modules/tools/mail-detail/index";

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
        label: "工具",
      },
      {
        href: href("/:locale?/admin/tools/mail", { locale: params?.locale }),
        label: "邮件详情",
      },
    ],
  };
};

export default function Page() {
  return <MailDetailImpl />;
}
