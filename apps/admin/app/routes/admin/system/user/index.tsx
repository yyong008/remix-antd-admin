import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";
import { useState } from "react";
import { useUserList } from "~/api-client/queries/system/system-user";
import { useQueryClient } from "@tanstack/react-query";
import { useDeptList } from "~/api-client/queries/system/system-dept";
import { useRoleList } from "~/api-client/queries/system/system-role";
import { CreateUserModal } from "./components/create-user-modal";
import { ToolbarDeleteButton } from "./components/toolbar-delete-button";
import { createUserTableColumns } from "./components/create-columns";

export const handle = () => ({
  breadcrumb: [{ label: m.system_user_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.system_user_title() }];
};

function HeaderTitle({ title }: { title: string }) {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>{title}</div>;
}

export default function Route() {
  const [page, setPage] = useState({ page: 1, pageSize: 10, name: "" });
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, isLoading } = useUserList(page);
  const result = (data as any)?.data ?? { list: [], total: 0 };
  const queryClient = useQueryClient();
  const reload = () => {
    queryClient.invalidateQueries({ queryKey: ["system-user"] });
  };

  const { data: deptsData } = useDeptList({ page: 1, pageSize: 1000 });
  const { data: rolesData } = useRoleList({ page: 1, pageSize: 1000 });
  const depts = deptsData?.data?.list || [];
  const roles = rolesData?.data?.list || [];

  return (
    <PageContainer>
      <AdminTable
        bordered
        size="small"
        headerTitle={<HeaderTitle title={m.system_user_header_title()} />}
        scroll={{ x: 1300 }}
        rowKey="id"
        loading={isLoading}
        showSorterTooltip
        rowSelection={{
          selectedRowKeys: selectedRow,
          onChange: (selectedRowKeys) => {
            setSelectedRow(selectedRowKeys as any);
          },
        }}
        toolBarRender={() => [
          <CreateUserModal key="create" depts={depts} roles={roles} reload={reload} />,
          <ToolbarDeleteButton
            key="delete"
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            reload={reload}
          />,
        ]}
        dataSource={result.list || []}
        columns={createUserTableColumns({ depts, roles, reload }) as any}
        options={{ reload }}
        pagination={{
          total: result.total,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(pageNumber, pageSize) {
            setPage((p) => ({ ...p, page: pageNumber, pageSize }));
          },
        }}
      />
    </PageContainer>
  );
}
