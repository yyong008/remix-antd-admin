// types
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";
import { PageContainer } from "@ant-design/pro-components";

// components:vendor
import { Space } from "antd";

// components
import {
  AnalysisRowOne,
  AnalysisRowTwo,
  AnalysisRowThree,
  AnalysisRowFour,
} from "~/components/dashboardAnalysis";

import css from '~/styles/dashboard.analysis.css';

// utils

export const meta: MetaFunction = () => {
  return [{ title: "分析页" }];
};

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  return json({});
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: css,
    },
  ];
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
