import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useState } from "react";

import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createToolBarRender } from "./components/create-toolbar-render";
import { createUserTableColumns } from "./components/createColumns";
import { useUserList } from "~/api-client/queries/system-user";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useQueryClient } from "@tanstack/react-query";

export function Route() {
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    name: "",
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const { colorPrimary } = useColorPrimary();
  const { data, isLoading } = useUserList(page);
  const result = (data as any)?.data ?? { list: [], total: 0 };
  const queryClient = useQueryClient();

  const reload = () => {
    queryClient.invalidateQueries({ queryKey: ["system-user"] });
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
            reload,
          })
        }
        dataSource={result.list || []}
        columns={
          createUserTableColumns({
            depts,
            roles,
            colorPrimary,
            reload,
          }) as any
        }
        options={{
          reload,
        }}
        pagination={{
          total: result.total,
          pageSize: page.pageSize || 10,
          onChange(pageNumber, pageSize) {
            setPage((p) => ({ ...p, page: pageNumber, pageSize }));
          },
        }}
      />
    </PageContainer>
  );
}
