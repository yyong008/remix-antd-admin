import { AdminTable } from "~/components/admin-table";

import { CreateConfigModal } from "../CreateConfigModal";
import { ProTableHeaderTitle } from "../ProTableHeaderTitle";
import { createConfigTableColumns } from "./config-create-columns";
import { useState } from "react";
import { useSystemConfigList } from "@/api-client/queries/system-config";

export function ConfigProTable() {
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = useSystemConfigList(page);

  return (
    <AdminTable
      bordered
      rowKey="id"
      size="small"
      search={false}
      headerTitle={<ProTableHeaderTitle title="系统配置" />}
      loading={isLoading}
      toolBarRender={() => [<CreateConfigModal key="create-config-modal" refetch={refetch} />]}
      dataSource={data?.data?.list || []}
      columns={createConfigTableColumns({ refetch })}
      options={{
        reload: refetch,
      }}
      pagination={{
        total: data?.data?.total || 0,
        current: page.page,
        pageSize: page.pageSize || 10,
        onChange(pageNumber, pageSize) {
          setPage({ page: pageNumber, pageSize });
        },
      }}
    />
  );
}
