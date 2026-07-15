import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_news() }],
});

export default function NewsLayout() {
  return <Outlet />;
}
