// types
import { LoaderFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// hooks
import { useLoaderData } from "@remix-run/react";

// components:vender
import { Row, Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { ToolSelect } from "~/components/listSearch";
import { ListHeaderSearch } from "~/components/common";
import ProjectsList from "~/components/listSearchProjects";

// data
import data from "~/data/listSearchProjects";

// utils


export const meta: MetaFunction = () => {
  return [
    {
      title: "搜索列表（项目）",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderFunctionArgs) => {
  
  return json(data);
};

export default function ListSearchProjects() {
  const data = useLoaderData();
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
