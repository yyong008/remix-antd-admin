import { PageContainer, ProTable } from "@ant-design/pro-components";

import { StorageModal } from "./components/StorageModal/StorageModal";
import { createColumns } from "./components/createColumns";
import { useReadToolsStorageListQuery } from "~/apis-client/admin/tools/storage";
import { useState } from "react";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadToolsStorageListQuery({
    ...page,
  });
  return (
    <PageContainer>
      <ProTable
        loading={isLoading}
        size="small"
        search={false}
        headerTitle="文件上传"
        rowKey="id"
        showSorterTooltip
        dataSource={data?.data?.list || []}
        toolBarRender={() => [<StorageModal key="storage" refetch={refetch} />]}
        columns={createColumns({ refetch }) as any}
        options={{
          reload: refetch,
        }}
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
