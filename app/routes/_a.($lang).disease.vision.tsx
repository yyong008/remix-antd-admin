import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Alert, Card, List, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

import { lastValueFrom } from "rxjs";
import { getVisionData } from "~/db/health-disease/vision";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getVisionData());
  return json(data);
};

const HealthVisionRoute: React.FC = () => {
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
          description="为了保护视力和预防视力问题，程序员可以采取以下措施："
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

export default HealthVisionRoute;
