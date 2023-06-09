// types
import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components:vendors
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { MonitorRowOne, MonitorRowTwo, MonitorRowThree } from "~/components/dashboardMonitor";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "监控页",
    },
  ];
};

export const loader = ({ request, params }: LoaderArgs) => {
  return json({});
};

export default function () {
  return (
    <PageContainer title={false}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <MonitorRowOne />
        <MonitorRowTwo />
        <MonitorRowThree />
      </Space>
    </PageContainer>
  );
}
