import type { MetaFunction } from "react-router";
import { Route } from "@/modules-admin/blog/create/route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Create" }];
};

export default function Page() {
  return <Route />;
}
