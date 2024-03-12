// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  AnalysisRowOne,
  AnalysisRowTwo,
  AnalysisRowThree,
  AnalysisRowFour,
} from "~/components/dashboardAnalysis";

// styles
import "~/styles/dashboard/analysis.css";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getAnalysisData$ } from "~/services/dashboard/analysis";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "dashboard-analysis" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const analysisData = await lastValueFrom(getAnalysisData$());
  return json(analysisData);
};

export default function DashboardAnalysisPage() {
  const {
    one: { salesData, activeData, visitCountData, paymentData },
    two: { monthSales, monthVisit, monthPartSaleData },
    three: { searchCountData, searchAvageCountData, dataSource, pies },
    four,
  } = useLoaderData<typeof loader>();

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
