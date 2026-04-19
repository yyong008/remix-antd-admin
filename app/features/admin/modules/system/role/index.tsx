import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Monitor-Role" }];
};

export default function Page() {
  return <Route />;
}
