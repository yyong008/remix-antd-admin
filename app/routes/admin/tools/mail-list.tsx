import { Route as MailListImpl } from "~/features/admin/modules/tools/mail-list/route";
export { meta } from "~/features/admin/modules/tools/mail-list/index";

export const handle = { breadcrumb: "邮件列表" };

export default function Page() {
  return <MailListImpl />;
}
