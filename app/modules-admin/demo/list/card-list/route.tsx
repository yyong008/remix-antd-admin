import { Button, Card, Row } from "antd";
import {
  ColCardList,
  PageContainerContent,
} from "~/modules-admin/demo/list/card-list/listCardList";

import { PageContainer } from "@ant-design/pro-components";

export function Route() {
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
