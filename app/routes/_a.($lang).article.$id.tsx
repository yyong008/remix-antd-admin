import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

// components:vendor
import { Space } from "antd";
import { json } from "@remix-run/node";

// utils
import { routeAuthFailure } from "~/utils/auth.server";

export const loader = ({ request, params }: LoaderArgs) => {
  routeAuthFailure({ request, params }, json)
  return json({});
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "文章页" }];
};

export default function DashboardAnalysisPage() {
  return (
    <Space direction="vertical">
      <div>desc 1</div>
      <div>desc 2</div>
    </Space>
  );
}
