// types
import type {
  LoaderFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// components
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

// css
import css from "~/styles/dashboard.analysis.css";

import { lastValueFrom } from "rxjs";
import { useLoaderData } from "@remix-run/react";

// db
import { getAnalysisData } from "~/db/dashboard/analysis";

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

export const loader: LoaderFunction = async () => {
  const analysisData = await lastValueFrom(getAnalysisData());
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
    <PageContainer>
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
