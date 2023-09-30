/* eslint-disable react/jsx-key */
//types
import { LoaderFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components:vendor
import { Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { ListHeaderSearch } from "~/components/common";
import { SearchList, ToolSelect } from "~/components/listSearch";

// utils


export const meta: MetaFunction = () => {
  return [
    {
      title: "搜索列表（文章）",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderFunctionArgs) => {
  
  return json({});
};

export default () => {
  return (
    <PageContainer
      title={false}
      content={[<ListHeaderSearch title="搜索列表（文章）" key="id" />]}
    >
      <Row gutter={[10, 10]}>
        <ToolSelect />
        <SearchList />
      </Row>
    </PageContainer>
  );
};
