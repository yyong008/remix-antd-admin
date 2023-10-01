// types
import type { LoaderFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// components:vendor
import { Row, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { ToolSelect } from "~/components/listSearch";
import { ListHeaderSearch } from "~/components/common";
import AppCardList from "~/components/listSearchApplications/AppCardList";

// hooks
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "搜索列表（应用）",
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  const _data = (await import('~/data/listSearchApplications')).default
  return json(_data);
};

export default function ListSearchApplication() {
  const data: any = useLoaderData();
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
