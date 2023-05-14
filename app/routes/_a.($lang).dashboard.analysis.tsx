// types
import { PageContainer } from "@ant-design/pro-components";
import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components:vendor
import { Space } from "antd";

// components
import {
  AnalysisRowOne,
  AnalysisRowTwo,
  AnalysisRowThree,
  AnalysisRowFour,
} from "~/components/dashboardAnalysis";

// utils

export const meta: V2_MetaFunction = () => {
  return [{ title: "分析页" }];
};

export const loader = ({ request, params }: LoaderArgs) => {
  return json({});
};

export default function DashboardAnalysisPage() {
  return (
    <PageContainer
      title={null}
      style={{
        background: "transparent"
      }}
    >
      <Space direction="vertical" style={{
        width: '100%',
      }}>
        <AnalysisRowOne />
        <AnalysisRowTwo />
        <AnalysisRowThree />
        <AnalysisRowFour />
      </Space>
    </PageContainer>
  );
}
