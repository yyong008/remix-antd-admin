import { Outlet, useParams } from "@remix-run/react";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateNewsCategoryModal } from "./components/CreateNewsCategoryModal";
import { createColumns } from "./components/createColumns";
import { useReadNewsCategoryListQuery } from "@/apis-client/admin/news/category";
import { useState } from "react";

export function Route() {
  const { lang } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadNewsCategoryListQuery(page);

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="新闻分类"
        search={false}
        loading={isLoading}
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
        toolBarRender={() => [
          <CreateNewsCategoryModal
            key="news-category-modal-create"
            refetch={refetch}
          />,
        ]}
        dataSource={data?.data?.list}
        columns={createColumns({ lang, refetch }) as any}
      />
      <Outlet />
    </PageContainer>
  );
}
