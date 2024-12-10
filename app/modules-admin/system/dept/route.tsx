import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDeptModal } from "./components/CreateModal";
import { createColumns } from "./components/create-columns";
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

  function listToTree(list: any) {
    // eslint-disable-next-line array-callback-return
    return list?.map((item: any) => {
      if (item.children) {
        return {
          id: item.id,
          label: item?.name,
          value: item?.id,
          children: listToTree(item.children),
        };
      }
    });
  }
  const treeOptions = listToTree(data?.data?.list ?? []);

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
        toolBarRender={() => [
          <CreateDeptModal
            record={{}}
            key="dept-modal"
            treeOptions={treeOptions}
          />,
        ]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ treeOptions })}
      />
    </PageContainer>
  );
}
