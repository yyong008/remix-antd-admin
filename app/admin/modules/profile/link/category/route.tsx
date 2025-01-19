import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateLinkCategoryModal } from "./components/CreateLinkCategoryModal";
import { createColumns } from "./components/createColumns";
import { useParams } from "react-router";
import { useState } from "react";

export function Route() {
  const { id } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    category: id,
  });
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="链接分类管理"
        search={false}
        loading={isLoading}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [
          <CreateLinkCategoryModal
            refetch={refetch}
            key="link-category-modal-create"
          />,
        ]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ refetch })}
        pagination={{
          total: data?.data?.total,
          pageSize: 10,
          onChange(_page, pageSize) {
            setPage({
              ...page,
              page: _page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
