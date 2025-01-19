import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "News" }];
};

export { loader } from "./loader";

export default function Page() {
  return <Route />;
}
