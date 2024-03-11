// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  MonitorRowOne,
  MonitorRowTwo,
  MonitorRowThree,
} from "~/components/dashboardMonitor";

// db
import { getMonitorData$ } from "~/services/dashboard/monitor";

// libs
import { lastValueFrom } from "rxjs";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "dashboard-monitor",
    },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const monitorData = await lastValueFrom(getMonitorData$());
  return json({ ...monitorData });
};

export default function MonitorRoute() {
  const { geoJson, activeMonitorData, gaugeData } =
    useLoaderData<typeof loader>();
  return (
    <PageContainer title={false}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <MonitorRowOne
          geoJson={geoJson}
          activeMonitorData={activeMonitorData}
          gaugeData={gaugeData}
        />
        <MonitorRowTwo />
        <MonitorRowThree />
      </Space>
    </PageContainer>
  );
}
