import { PageContainer, ProTable } from "@ant-design/pro-components";

import { DictModal } from "./components/dict/create-dict-modal";
import { createColumns } from "./components/dict-pro-table/create-columns";
import { useParamsLang } from "@/hooks/user-params-lang";
import { useReadSystemDictListQuery } from "@/apis-client/admin/system/dict";
import { useState } from "react";

export function Route() {
  const { lang } = useParamsLang();
  const [page] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = useReadSystemDictListQuery({
    ...page,
  });
  return (
    <PageContainer>
      <ProTable
        bordered
        rowKey="id"
        size="small"
        search={false}
        headerTitle="字典项目"
        loading={isLoading}
        toolBarRender={() => [
          <DictModal record={{}} key="create-dict-modal" />,
        ]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ lang })}
        options={{
          reload: refetch,
        }}
      />
    </PageContainer>
  );
}
