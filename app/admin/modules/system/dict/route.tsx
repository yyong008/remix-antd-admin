import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDictModal } from "./components/CreateDictModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { useParamsLang } from "~/hooks/userParamsLang";
import { useState } from "react";

export function Route() {
  const { lang } = useParamsLang();
  const [] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = {
    data: { data: { list: [] } },
    isLoading: false,
    refetch: () => {},
  };
  return (
    <PageContainer>
      <ProTable
        bordered
        rowKey="id"
        size="small"
        search={false}
        headerTitle={<ProTableHeaderTitle title="字典项目" />}
        loading={isLoading}
        toolBarRender={() => [
          <CreateDictModal refetch={refetch} key="create-dict-modal" />,
        ]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ lang, refetch })}
        options={{
          reload: refetch,
        }}
      />
    </PageContainer>
  );
}
