import type { MetaFunction } from "react-router";
import { Route } from "./route";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.news_detail_page_title() }];
};

export default function Page() {
  return <Route />;
}
