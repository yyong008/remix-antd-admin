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

// services
import { getObesityData$ } from "~/services/health/obesity";

// config
import { antdGrid } from "~/config/antd-grid";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "disease-obesity" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getObesityData$());
  return json(data);
};

export default function HealthObesityRoute() {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="obesity">
      <Space direction="vertical">
        <Alert
          description="作为程序员，长时间进行电脑工作和缺乏身体活动可能增加患肥胖症的风险。以下是一些与肥胖相关的常见问题："
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
          description="为了预防和管理肥胖问题，程序员可以采取以下措施："
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
