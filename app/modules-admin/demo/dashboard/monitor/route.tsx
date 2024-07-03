import { MonitorRowOne, MonitorRowThree, MonitorRowTwo } from "./components";
import { useEffect, useState } from "react";

import { PageContainer } from "@ant-design/pro-components";
import { Space } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const [gData, setGData] = useState<any>();
  const { activeMonitorData, gaugeData } = useLoaderData<typeof loader>().data;

  useEffect(() => {
    fetch("/api/geojson").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setGData(data);
        });
      }
    });
  }, []);
  return (
    <PageContainer breadcrumb={{}}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <MonitorRowOne
          geoJson={gData}
          activeMonitorData={activeMonitorData}
          gaugeData={gaugeData}
        />
        <MonitorRowTwo />
        <MonitorRowThree />
      </Space>
    </PageContainer>
  );
}
