import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_system() }],
});

export default function SystemLayout() {
  return <Outlet />;
}
