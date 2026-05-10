import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "About" }];
};

export function loader() {
  return null;
}

export default function Page() {
  return <Route />;
}
