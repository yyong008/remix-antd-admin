// types
import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";

// core
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

import css from "~/styles/dashboard.analysis.css";

// utils
export const meta: MetaFunction = () => {
  return [{ title: "analysis" }];
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
        background: "transparent",
      }}
    >
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <AnalysisRowOne />
        <AnalysisRowTwo />
        <AnalysisRowThree />
        <AnalysisRowFour />
      </Space>
    </PageContainer>
  );
}
