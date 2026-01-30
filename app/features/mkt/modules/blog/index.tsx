import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog" }];
};

export { loader } from "./loader";

export default function Page() {
  return <Route />;
}
