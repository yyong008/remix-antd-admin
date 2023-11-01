// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components:vendors
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import {
  MonitorRowOne,
  MonitorRowTwo,
  MonitorRowThree,
} from "~/components/dashboardMonitor";
import { getMonitorData } from "~/db/monitor";
import { lastValueFrom } from "rxjs";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "监控页",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const monitorData = await lastValueFrom(getMonitorData());
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
