import { href } from "react-router";
import { Route as MailListImpl } from "~/features/admin/modules/tools/mail-list/route";
export { meta } from "~/features/admin/modules/tools/mail-list/index";

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
        label: "邮件列表",
      },
    ],
  };
};

export default function Page() {
  return <MailListImpl />;
}
