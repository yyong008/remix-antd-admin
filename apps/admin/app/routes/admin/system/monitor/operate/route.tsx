import { AdminTable } from "~/components/admin-table";

import { PageContainer } from "~/components/page-container";

import { createColumns } from "./components/createColumns";
import { useState } from "react";
import { useMonitorOperateList } from "~/api-client/queries/system/system-monitor-operate";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useMonitorOperateList(page);
  return (
    <PageContainer>
      <AdminTable
        bordered
        size="small"
        search={false}
        headerTitle="操作记录"
        rowKey="id"
        showSorterTooltip
        dataSource={data?.data?.list || []}
        columns={createColumns()}
        loading={isLoading}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total || 0,
          current: page.page,
          pageSize: page.pageSize,
          onChange(p, pageSize) {
            setPage({
              page: p,
              pageSize: pageSize ?? page.pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
