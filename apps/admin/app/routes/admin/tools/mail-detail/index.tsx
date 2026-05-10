import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Mail Detail" }];
};

export default function Page() {
  return <Route />;
}
