import type { MetaFunction } from "react-router";
import { m } from "~/paraglide/messages";
import { Dashboard as Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: m.dashboard_title() }];
};

export default function Page() {
  return <Route />;
}
