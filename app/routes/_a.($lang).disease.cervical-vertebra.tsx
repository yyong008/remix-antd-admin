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
import { getCervicalData$ } from "~/db/health-disease/cervical-vertebra";

// config
import { antdGrid } from "~/config/antd-grid";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "disease-cervical-vertebra" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getCervicalData$());
  return json(data);
};

export function HealthRoute() {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="cervical vertebra">
      <Space direction="vertical">
        <Alert
          description="作为程序员，长时间坐在电脑前工作和专注于屏幕可能对颈椎和脊椎产生一定的压力和负担，导致一系列问题。以下是一些常见的与颈椎和脊椎相关的问题："
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
          description="为了缓解和预防颈椎和脊椎问题，程序员可以采取以下措施："
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
