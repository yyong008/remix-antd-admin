import {
  MonitorRowOne,
  MonitorRowThree,
  MonitorRowTwo,
} from "~/components/dashboard/dashboardMonitor";

import { PageContainer } from "@ant-design/pro-components";
import { Space } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { geoJson, activeMonitorData, gaugeData } =
    useLoaderData<typeof loader>();
  return (
    <PageContainer breadcrumb={{}}>
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
