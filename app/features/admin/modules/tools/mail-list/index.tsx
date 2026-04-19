import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "Tools-Mail-List" }];
};

export default function Page() {
  return <Route />;
}
