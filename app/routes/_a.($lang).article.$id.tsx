import type { V2_MetaFunction } from "@remix-run/node";

// components:vendor
import { Space } from "antd";

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
