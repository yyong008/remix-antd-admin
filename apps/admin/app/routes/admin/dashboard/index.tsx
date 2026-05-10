import type { MetaFunction } from "react-router";
import { Dashboard as Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard" }];
};

export default function Page() {
  return <Route />;
}