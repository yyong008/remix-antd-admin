import type { MetaFunction } from "react-router";
import { Route } from "~/modules-admin/blog/index/route";

export const meta: MetaFunction = () => {
  return [{ title: "Admin blog" }];
};

export default function Page() {
  return <Route />;
}
