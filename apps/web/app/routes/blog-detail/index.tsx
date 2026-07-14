import type { MetaFunction } from "react-router";
import { Route } from "./route";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.blog_detail_page_title() }];
};

export default function Page() {
  return <Route />;
}
