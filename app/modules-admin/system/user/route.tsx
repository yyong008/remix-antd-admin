import { PageContainer, ProTable } from "@ant-design/pro-components";

import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createToolBarRender } from "./components/create-toolbar-render";
import { createUserTableColumns } from "./components/createColumns";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useReadRoleListQuery } from "@/apis-client/admin/system/role/role";
import { useReadUserListQuery } from "@/apis-client/admin/system/user";
import { useReadsystemDeptListQuery } from "@/apis-client/admin/system/dept";
import { useState } from "react";

export function Route() {
  const longPage = { page: 1, pageSize: 10000 };
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    name: "",
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const { colorPrimary } = useColorPrimary();
  const { data, isLoading, refetch } = useReadUserListQuery(page);
  const { data: deptsData } = useReadsystemDeptListQuery(longPage);
  const { data: rolesData } = useReadRoleListQuery(longPage);
  const depts = deptsData?.data?.list || [];
  const roles = rolesData?.data?.list || [];

  return (
    <PageContainer>
      <ProTable
        bordered
        size="small"
        headerTitle={<ProTableHeaderTitle title="用户管理" />}
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
        onSubmit={(values) => {
          setPage({
            ...page,
            name: values.name ?? "",
          });
        }}
        toolBarRender={() =>
          createToolBarRender({
            selectedRow,
            setSelectedRow,
            depts,
            roles,
            reload: refetch,
          })
        }
        dataSource={data?.data?.list || []}
        columns={
          createUserTableColumns({
            depts,
            roles,
            colorPrimary,
            reload: refetch,
          }) as any
        }
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          pageSize: page.pageSize || 10,
          onChange(page, pageSize) {
            setPage((p) => ({ ...p, page, pageSize }));
          },
        }}
      />
    </PageContainer>
  );
}
