import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_blog() }],
});

export default function BlogLayout() {
  return <Outlet />;
}
