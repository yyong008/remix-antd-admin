import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [
    {
      title: "用户登录",
    },
  ];
};

export default function Page() {
  return <Route />;
}
