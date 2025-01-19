import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Result" }];
};

export default function Page() {
  return <Route />;
}
