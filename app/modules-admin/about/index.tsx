import type { MetaFunction } from "react-router";
import { Route } from "~/modules-admin/about/route";

export const meta: MetaFunction = () => {
  return [{ title: "About" }];
};

export default function Page() {
  return <Route />;
}
