// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Alert, Card, List, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getVisionData$ } from "~/db/health-disease/vision";

// config
import { antdGrid } from "~/config/antd-grid";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "disease vision",
    },
  ];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getVisionData$());
  return json(data);
};

export default function HealthVisionRoute() {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="vision">
      <Space direction="vertical">
        <Alert
          description="作为程序员，长时间注视计算机屏幕可能会对视力造成一定的压力和影响。以下是一些与视力相关的常见问题："
          type="warning"
          showIcon
        />
        <List
          grid={antdGrid}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <Card title={item.title} style={{ minHeight: "200px" }}>
                {item.content}
              </Card>
            </List.Item>
          )}
        />
        <Alert
          description="为了保护视力和预防视力问题，程序员可以采取以下措施："
          type="warning"
          showIcon
        />
        <List
          grid={antdGrid}
          dataSource={op_data}
          renderItem={(item: any) => (
            <List.Item>
              <Card title={false} style={{ minHeight: "130px" }}>
                {item.content}
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </PageContainer>
  );
}
