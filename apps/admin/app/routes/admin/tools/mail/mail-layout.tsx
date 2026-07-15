import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_mail() }],
});

export default function MailLayout() {
  return <Outlet />;
}
