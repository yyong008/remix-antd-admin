import type { MetaFunction } from "react-router";
import { Route } from "./route";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.error_404_title() }, { name: "404", content: m.error_404_message() }];
};

export default function Page() {
  return <Route />;
}
