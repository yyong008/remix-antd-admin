import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDeptModal } from "./components/create-dept-modal";
import { createColumns } from "./components/dept-pro-table/create-columns";
import { useReadsystemDeptListQuery } from "@/apis-client/admin/system/dept";
import { useState } from "react";

export function Route() {
  const [page] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadsystemDeptListQuery({
    ...page,
  });
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="部门管理"
        search={false}
        pagination={false}
        loading={isLoading}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [<CreateDeptModal record={{}} key="dept-modal" />]}
        dataSource={data?.data?.list || []}
        columns={createColumns()}
      />
    </PageContainer>
  );
}
