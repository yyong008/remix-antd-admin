// types
import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Row, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { ToolSelect } from "~/components/listSearch";
import { ListHeaderSearch } from "~/components/common";
import AppCardList from "~/components/listSearchApplications/AppCardList";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "list-search-applications" }];
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const _data = (await import("~/data/listSearchApplications")).default;
  return json({ data: _data });
};

export default function ListSearchApplication() {
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
