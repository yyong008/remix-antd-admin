/* eslint-disable jsx-a11y/anchor-is-valid */
// types
import type { MetaFunction } from "@remix-run/node";

// components
import { Button, Card, Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  ColCardList,
  PageContainerContent,
} from "~/components/list/listCardList";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "list-card-list" }];
};

export default function ListCardList() {
  return (
    <PageContainer title={false} content={<PageContainerContent />}>
      <Card title="卡片列表" extra={<Button type="primary">添加卡片</Button>}>
        <Row gutter={[20, 20]}>
          <ColCardList />
        </Row>
      </Card>
    </PageContainer>
  );
}
