import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_docs() }],
});

export default function DocsLayout() {
  return <Outlet />;
}
