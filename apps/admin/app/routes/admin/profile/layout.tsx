import { Outlet } from "react-router";
import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_profile() }],
});

export default function ProfileLayout() {
  return <Outlet />;
}
