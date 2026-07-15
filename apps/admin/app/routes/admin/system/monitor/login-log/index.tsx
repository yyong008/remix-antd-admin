import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { createColumns } from "./components/create-columns";
import { useMonitorLoginLogList } from "~/api-client/queries/system/system-monitor-login-log";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";
import { useState } from "react";

export const handle = () => ({
  breadcrumb: [{ label: m.system_monitor_login_log_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.system_monitor_login_log_title() }];
};

export default function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useMonitorLoginLogList(page);

  return (
    <PageContainer>
      <AdminTable
        bordered
        size="small"
        search={false}
        headerTitle={m.system_monitor_login_log_header_title()}
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
