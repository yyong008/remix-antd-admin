import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "docs-feedback" }];
};

export default function Page() {
  return <Route />;
}
