import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Detail" }];
};

export { loader } from "./loader";

export default function Page() {
  return <Route />;
}
