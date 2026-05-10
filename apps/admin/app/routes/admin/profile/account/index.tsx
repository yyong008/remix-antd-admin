import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "账户" }];
};

export default function Page() {
  return <Route />;
}
