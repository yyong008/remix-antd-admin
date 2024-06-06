import "~/styles/dashboard/analysis.css";

import {
  AnalysisRowFour,
  AnalysisRowOne,
  AnalysisRowThree,
  AnalysisRowTwo,
} from "~/components/dashboard/dashboardAnalysis";

import { PageContainer } from "@ant-design/pro-components";
import { Space } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const data = useLoaderData<typeof loader>();
  const {
    one: { salesData, activeData, visitCountData, paymentData },
    two: { monthSales, monthVisit, monthPartSaleData },
    three: { searchCountData, searchAvageCountData, dataSource, pies },
    four,
  } = data;

  return (
    <PageContainer breadcrumb={{}}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <AnalysisRowOne
          salesData={salesData}
          visitCountData={visitCountData}
          paymentData={paymentData}
          activeData={activeData}
        />
        <AnalysisRowTwo
          monthSales={monthSales}
          monthVisit={monthVisit}
          monthPartSaleData={monthPartSaleData}
        />
        <AnalysisRowThree
          searchCountData={searchCountData}
          searchAvageCountData={searchAvageCountData}
          search={visitCountData}
          searchAvage={visitCountData}
          dataSource={dataSource}
          pies={pies}
        />
        <AnalysisRowFour {...four} />
      </Space>
    </PageContainer>
  );
}
