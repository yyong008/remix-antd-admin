import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Profile-Link-List" }];
};

export default function Page() {
  return <Route />;
}
