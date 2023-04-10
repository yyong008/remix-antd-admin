import type { V2_MetaFunction } from "@remix-run/node";

// components:vendor
import { Space } from "antd";

// components
import {
  AnalysisRowOne,
  AnalysisRowTwo,
  AnalysisRowThree,
  AnalysisRowFour,
} from "~/components/dashboardAnalysis";

export const meta: V2_MetaFunction = () => {
  return [{ title: "分析页" }];
};

export default function DashboardAnalysisPage() {
  return (
    <Space direction="vertical">
      <AnalysisRowOne />
      <AnalysisRowTwo />
      <AnalysisRowThree />
      <AnalysisRowFour />
    </Space>
  );
}
