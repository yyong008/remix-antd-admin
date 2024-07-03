import { PageContainer, ProTable } from "@ant-design/pro-components";
import {
  blogCategoryColumnsCreate,
  createBlogCategoryToolBarRender,
} from "./components";

import { useParams } from "@remix-run/react";
import { useReadBlogCategoryListQuery } from "@/apis-client/admin/blog/category";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadBlogCategoryListQuery(
    page,
  ) as any;
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || ([] as any[])}
        toolBarRender={() => createBlogCategoryToolBarRender(refetch)}
        columns={blogCategoryColumnsCreate(lang!, refetch)}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: 10,
          onChange(page, pageSize) {
            setPage({
              page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
