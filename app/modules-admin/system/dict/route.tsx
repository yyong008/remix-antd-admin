import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDictModal } from "./components/CreateDictModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { useParamsLang } from "~/hooks/userParamsLang";
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
