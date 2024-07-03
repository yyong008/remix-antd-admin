import { Alert, Card, List, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { antdGrid } from "~/config/antd-grid";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { data, op_data } = useLoaderData<typeof loader>();
  return (
    <PageContainer>
      <ProCard>
        <Space direction="vertical">
          <Alert
            description="作为程序员，长时间使用键盘和鼠标进行电脑工作可能导致手部和手腕的问题。以下是一些与手部和手腕相关的常见问题："
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
            description="为了缓解和预防手部和手腕问题，程序员可以采取以下措施："
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
      </ProCard>
    </PageContainer>
  );
}
