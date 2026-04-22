import { Route as MailDetailImpl } from "~/features/admin/modules/tools/mail-detail/route";
export { meta } from "~/features/admin/modules/tools/mail-detail/index";

export const handle = { breadcrumb: "邮件详情" };

export default function Page() {
  return <MailDetailImpl />;
}
