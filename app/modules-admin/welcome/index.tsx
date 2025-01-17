import type { MetaFunction } from "react-router";
import { Route } from "./route";

export const meta: MetaFunction = () => {
  return [
    {
      title: "欢迎~",
    },
  ];
};

export default function Page() {
  return <Route />;
}
