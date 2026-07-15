import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_tools() }],
});

export default function ToolsLayout() {
  return <Outlet />;
}
