// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  AnalysisRowOne,
  AnalysisRowTwo,
  AnalysisRowThree,
  AnalysisRowFour,
} from "~/components/dashboard/dashboardAnalysis";

// styles
import "~/styles/dashboard/analysis.css";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getAnalysisData$ } from "~/__mock__/dashboard/analysis";
import {
  destroySession,
  getSession,
  getUserId,
} from "~/services/common/auth.server";
import { ADMIN_ROUTE_PREFIX } from "~/constants";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "dashboard-analysis" }];
};

// remix:loader
export const loader: LoaderFunction = async ({ request, params }) => {
  const { lang } = params;
  const userId = await getUserId(request);
  if (!userId) {
    console.error("No userID dashboard/analysis", userId);
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/" + lang + "/" + ADMIN_ROUTE_PREFIX + "/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
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
