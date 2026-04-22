import { href } from "react-router";
import { Route as MailImpl } from "~/features/admin/modules/tools/mail/route";
export { meta } from "~/features/admin/modules/tools/mail/index";

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
        label: "邮件工具",
      },
    ],
  };
};

export default function Page() {
  return <MailImpl />;
}
