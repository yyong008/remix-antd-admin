import type { MetaFunction } from "react-router";
import { Route } from "~/modules-admin/dashboard/route";

export const meta: MetaFunction = () => {
  return [
    {
      title: "dashboard",
    },
  ];
};

export default function Page() {
  return <Route />;
}
