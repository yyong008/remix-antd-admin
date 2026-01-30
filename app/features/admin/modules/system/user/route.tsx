import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createToolBarRender } from "./components/create-toolbar-render";
import { createUserTableColumns } from "./components/createColumns";
import { getUserList } from "~/admin/apis/admin/system/user";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function Route() {
  const longPage = { page: 1, pageSize: 10000 };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ list: [], total: 0 });
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    name: "",
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const { colorPrimary } = useColorPrimary();
  const { data: deptsData } = { data: { data: { list: [] } } };
  const { data: rolesData } = { data: { data: { list: [] } } };
  const depts = deptsData?.data?.list || [];
  const roles = rolesData?.data?.list || [];
  const getData = async () => {
    setIsLoading(true);
    const res: any = await getUserList(page);
    setIsLoading(false);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, [page]);
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
            reload: getData,
          })
        }
        dataSource={data?.list || []}
        columns={
          createUserTableColumns({
            depts,
            roles,
            colorPrimary,
            reload: getData,
          }) as any
        }
        options={{
          reload: getData,
        }}
        pagination={{
          total: data?.total,
          pageSize: page.pageSize || 10,
          onChange(page, pageSize) {
            debugger;
            setPage((p) => ({ ...p, page, pageSize }));
          },
        }}
      />
    </PageContainer>
  );
}
