import { PageContainer } from "~/components/page-container";
import { AdminTable } from "~/components/admin-table/AdminTable";

import { CreateBlogCategoryModal } from "./components/CreateBlogCategoryModal";
import { createColumns } from "./components/createColumns";
import { useParams } from "react-router";
import { useState } from "react";

export function Route() {
  const { locale } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };
  return (
    <PageContainer>
      <AdminTable
        rowKey="id"
        size="small"
        loading={isLoading}
        dataSource={data?.data?.list || ([] as any[])}
        toolBarRender={() => [<CreateBlogCategoryModal key="create" refetch={refetch} />]}
        columns={createColumns({ locale, refetch })}
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
