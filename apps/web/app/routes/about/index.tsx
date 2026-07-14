import type { MetaFunction } from "react-router";
import { Route } from "./route";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.about_page_title() }];
};

export function loader() {
  return null;
}

export default function Page() {
  return <Route />;
}
