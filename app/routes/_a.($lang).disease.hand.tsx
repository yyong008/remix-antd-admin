import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Alert, Card, List, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

import { lastValueFrom } from "rxjs";
import { gethandData } from "~/db/health-disease/hand";

export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(gethandData());
  return json(data);
};

const HealthHandRoute: React.FC = () => {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="hand">
      <Space direction="vertical">
        <Alert
          description="作为程序员，长时间使用键盘和鼠标进行电脑工作可能导致手部和手腕的问题。以下是一些与手部和手腕相关的常见问题："
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
          description="为了缓解和预防手部和手腕问题，程序员可以采取以下措施："
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

export default HealthHandRoute;
