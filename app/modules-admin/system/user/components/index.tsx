import { ProTable } from "@ant-design/pro-components";
import { createToolBarRender } from "./create-toolbar-render";
import { createUserTableColumns } from "./createColumns";
import { useColorPrimary } from "@/hooks/use-color-primary";
import { useState } from "react";

export function UserProTable(props: any) {
  const { data, isLoading, refetch, page, setPage, roles, depts } = props;
  const [selectedRow, setSelectedRow] = useState([]);
  const { colorPrimary } = useColorPrimary();

  return (
    <>
      <ProTable
        bordered
        size="small"
        headerTitle="用户表"
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
            setPage({ page, pageSize });
          },
        }}
      />
    </>
  );
}
