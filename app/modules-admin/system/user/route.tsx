import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useFetcherChange, useUserNav } from "~/hooks";

import { CreateUserModal } from "./components/create-user-model";
import { DeleteItWithSelect } from "./components/deleteIt-with-select";
import { createUserTableColumns } from "./components/user-pro-table/columns";
import { useState } from "react";

export function Route() {
  const [navUser] = useUserNav();
  const fetcher = useFetcherChange();
  const [selectedRow, setSelectedRow] = useState([]);
  const { dataSource = [], depts = [], roles = [], total = 0 } = {};

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="用户表"
        scroll={{ x: 1300 }}
        rowKey="id"
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
        dataSource={dataSource as any[]}
        columns={createUserTableColumns({ depts, roles }) as any}
        pagination={{
          total: total,
          pageSize: 10,
          onChange(page, pageSize) {
            navUser({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
