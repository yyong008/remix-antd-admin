import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Alert, Card, List, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// libs
import { lastValueFrom } from "rxjs";

// mock db
import { getDiseaseData } from "~/db/health-disease/anxiety-depression";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getDiseaseData());
  return json(data);
};

const HealthRoute: React.FC = () => {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="anxiety depression">
      <Space direction="vertical">
        <Alert
          description="作为程序员，长时间进行电脑工作和工作压力可能导致一些与焦虑和抑郁相关的常见问题。以下是一些常见的与焦虑和抑郁相关的问题："
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
          description="为了应对焦虑和抑郁相关的问题，程序员可以尝试以下策略："
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
