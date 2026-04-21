import { PRODUCT_NAME } from "~/config/product";
import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [{ title: PRODUCT_NAME }];
};

export default function Page() {
  return <Route />;
}
