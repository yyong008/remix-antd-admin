import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Alert, Card, List, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

import { lastValueFrom } from "rxjs";

import { getCervicalData } from "~/db/health-disease/cervical-vertebra";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getCervicalData());
  return json(data);
};

const HealthRoute: React.FC = () => {
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
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
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
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
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
};

export default HealthRoute;
