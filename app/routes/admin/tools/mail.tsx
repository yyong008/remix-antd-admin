import { Route as MailImpl } from "~/features/admin/modules/tools/mail/route";
export { meta } from "~/features/admin/modules/tools/mail/index";

export const handle = { breadcrumb: "邮件工具" };

export default function Page() {
  return <MailImpl />;
}
