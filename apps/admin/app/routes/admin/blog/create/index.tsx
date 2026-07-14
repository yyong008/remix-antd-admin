import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Create Blog" }];
};

export default function Page() {
  return <Route />;
}
