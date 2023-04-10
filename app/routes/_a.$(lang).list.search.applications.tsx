// types
import type { V2_MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// components:vendor
import { Row, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { ToolSelect } from "~/components/listSearch";
import { ListHeaderSearch } from "~/components/common";
import AppCardList from "~/components/listSearchApplications/AppCardList";

// data
import data from "~/data/listSearchApplications";

// hooks
import { useLoaderData } from "@remix-run/react";


export const loader = () => {
  return json(data);
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "搜索列表（应用）",
    },
  ];
};

export default function ListSearchApplication() {
  const data = useLoaderData();
  return (
    <PageContainer
      title={false}
      content={[<ListHeaderSearch title="搜索列表（应用）" key="id" />]}
    >
      <Space direction="vertical">
        <Row gutter={[10, 10]}>
          <ToolSelect showOwner={false} />
        </Row>
        <Row
          gutter={[10, 10]}
          style={{ marginLeft: "-8px", marginRight: "-8px" }}
        >
          <AppCardList cardList={data.cardList} />
        </Row>
      </Space>
    </PageContainer>
  );
}
