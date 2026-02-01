import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: "News" }];
};


export default function Page() {
  return <Route />;
}
