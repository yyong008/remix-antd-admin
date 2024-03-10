/* eslint-disable react/jsx-key */
//types
import type { MetaFunction } from "@remix-run/node";

// components
import { Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { ListHeaderSearch } from "~/components/common";
import { SearchList, ToolSelect } from "~/components/listSearch";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "list-search-articles" }];
};

export default function ListSearchArticlesRoute() {
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
}
