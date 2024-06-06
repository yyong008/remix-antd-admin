import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "404" }, { name: "404", content: "Not Found" }];
};
