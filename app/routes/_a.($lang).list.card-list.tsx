/* eslint-disable jsx-a11y/anchor-is-valid */
// types
import type { MetaFunction } from "@remix-run/node";

// components:vendor
import { Button, Card, Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { ColCardList, PageContainerContent } from "~/components/listCardList";

// server

export const meta: MetaFunction = () => {
  return [
    {
      title: "搜索表格",
    },
  ];
};

export default () => {
  return (
    <PageContainer title={false} content={<PageContainerContent />}>
      <Card title="卡片列表" extra={<Button type="primary">添加卡片</Button>}>
        <Row gutter={[20, 20]}>
          <ColCardList />
        </Row>
      </Card>
    </PageContainer>
  );
};
