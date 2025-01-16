import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateBlogCategoryModal } from "./components/CreateBlogCategoryModal";
import { blogCategory } from "@/apis-client/admin/blog/category";
import { createColumns } from "./components/createColumns";
import { useParams } from "react-router";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } =
    blogCategory.useReadBlogCategoryListQuery(page) as any;
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || ([] as any[])}
        toolBarRender={() => [
          <CreateBlogCategoryModal key="create" refetch={refetch} />,
        ]}
        columns={createColumns({ lang, refetch })}
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
