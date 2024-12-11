import { PageContainer, ProTable } from "@ant-design/pro-components";

import { createColumns } from "./components/login-log-pro-table/create-columns";
import { useReadMonitorLoginlogListQuery } from "@/apis-client/admin/system/monitor/login-log";
import { useState } from "react";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadMonitorLoginlogListQuery(page);

  return (
    <PageContainer>
      <ProTable
        bordered
        size="small"
        search={false}
        headerTitle="登录记录"
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
