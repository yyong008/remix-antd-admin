import { Row, Space } from "antd";

import AppCardList from "~/modules-admin/demo/list/search/applications/listSearchApplications/AppCardList";
import { ListHeaderSearch } from "~/components/common";
import { PageContainer } from "@ant-design/pro-components";
import { ToolSelect } from "~/modules-admin/demo/list/search/listSearch";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <PageContainer
      fixedHeader
      title={false}
      content={<ListHeaderSearch title="搜索列表（应用）" key="id" />}
    >
      <Space direction="vertical">
        <Row gutter={[10, 10]}>
          <ToolSelect showOwner={false} />
        </Row>
        <Row
          gutter={[10, 10]}
          style={{ marginLeft: "-8px", marginRight: "-8px" }}
        >
          <AppCardList cardList={data?.cardList} />
        </Row>
      </Space>
    </PageContainer>
  );
}
