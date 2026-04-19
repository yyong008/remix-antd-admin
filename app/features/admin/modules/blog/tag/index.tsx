import type { MetaFunction } from "react-router";
import { Route } from "~/features/admin/modules/blog/tag/route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Tag" }];
};

export default function Page() {
  return <Route />;
}
