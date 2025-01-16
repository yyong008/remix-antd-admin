import { Row, Space } from "antd";

import { ListHeaderSearch } from "~/components/common";
import { PageContainer } from "@ant-design/pro-components";
import ProjectsList from "~/modules-admin/demo/list/search/projects/listSearchProjects";
import { ToolSelect } from "~/modules-admin/demo/list/search/listSearch";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
  const data = useLoaderData<typeof loader>();
  return (
    <PageContainer
      title={false}
      content={[<ListHeaderSearch title="搜索列表（项目）" key="id" />]}
    >
      <Space direction="vertical">
        <Row gutter={[10, 10]}>
          <ToolSelect />
        </Row>
        <Row
          gutter={[10, 10]}
          style={{ marginLeft: "-8px", marginRight: "-8px" }}
        >
          <ProjectsList cardList={data.cardList} />
        </Row>
      </Space>
    </PageContainer>
  );
}
