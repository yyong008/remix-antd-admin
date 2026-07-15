import type { MetaFunction } from "react-router";
import { PageContainer } from "~/components/page-container";
import { m } from "~/paraglide/messages";

export const meta: MetaFunction = () => {
  return [{ title: m.system_monitor_serve_title() }];
};

export default function Route() {
  return <PageContainer loading={false}>{m.system_monitor_serve_view_platform()}</PageContainer>;
}
