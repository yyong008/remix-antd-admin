import { PageContainer, ProTable } from "@ant-design/pro-components";

import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createToolBarRender } from "./components/create-toolbar-render";
import { createUserTableColumns } from "./components/createColumns";
import { useColorPrimary } from "~/hooks/useColorPrimary";
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
  const { data, isLoading, refetch } = {
    data: { data: { list: [], total: 0 } },
    isLoading: false,
    refetch: () => {},
  };
  const { data: deptsData } = { data: { data: { list: [] } } };
  const { data: rolesData } = { data: { data: { list: [] } } };
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
