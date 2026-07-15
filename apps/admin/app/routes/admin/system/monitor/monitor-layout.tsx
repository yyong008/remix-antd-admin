import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_monitor() }],
});

export default function MonitorLayout() {
  return <Outlet />;
}
