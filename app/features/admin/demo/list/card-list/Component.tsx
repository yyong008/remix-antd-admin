import { Button, Card, Row } from "antd";
import {
  ColCardList,
  PageContainerContent,
} from "~/components/list/listCardList";

import { PageContainer } from "@ant-design/pro-components";

export function Component() {
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
