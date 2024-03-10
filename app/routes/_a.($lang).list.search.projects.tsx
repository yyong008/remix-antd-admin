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
import ProjectsList from "~/components/listSearchProjects";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "list-search-projects" }];
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = (await import("~/data/listSearchProjects")).default;
  return json(data);
};

export default function ListSearchProjects() {
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
