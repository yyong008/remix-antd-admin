import type { MetaFunction } from "react-router";
import { Route } from "~/admin/modules/blog/edit/route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Edit" }];
};

export default function Page() {
  return <Route />;
}
