import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateUserModal } from "./components/create-user-model";
import { DeleteItWithSelect } from "./components/deleteIt-with-select";
import { createUserTableColumns } from "./components/user-pro-table/columns";
import { useReadUserListQuery } from "@/apis-client/admin/system/user";
import { useState } from "react";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading, refetch } = useReadUserListQuery({
    ...page,
  });
  const fetcher = () => {};
  const [selectedRow, setSelectedRow] = useState([]);
  const { depts = [], roles = [] } = {};

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="用户表"
        scroll={{ x: 1300 }}
        rowKey="id"
        loading={isLoading}
        showSorterTooltip
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRow(selectedRowKeys as any);
          },
        }}
        toolBarRender={() => [
          <CreateUserModal
            key="create"
            fetcher={fetcher}
            depts={depts}
            roles={roles}
            record={{}}
          />,
          <DeleteItWithSelect
            key="delete"
            selectedRow={selectedRow}
            fetcher={fetcher}
            setSelectedRow={setSelectedRow}
          />,
        ]}
        dataSource={data?.data?.list || []}
        columns={createUserTableColumns({ depts, roles }) as any}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: page.pageSize || 10,
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
