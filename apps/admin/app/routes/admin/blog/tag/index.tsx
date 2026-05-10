import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Blog Tags" }];
};

export default function Page() {
  return <Route />;
}