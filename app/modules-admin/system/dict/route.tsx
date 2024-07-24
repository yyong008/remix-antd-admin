import { PageContainer, ProTable } from "@ant-design/pro-components";

import { DictModal } from "./components/dict/create-dict-modal";
import { createColumns } from "./components/dict-pro-table/create-columns";
import { useParamsLang } from "@/hooks/user-params-lang";

export function Route() {
  const { lang } = useParamsLang();
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        headerTitle="字典项目"
        toolBarRender={() => [
          <DictModal record={{}} key="create-dict-modal" />,
        ]}
        dataSource={[]}
        columns={createColumns({ lang })}
      />
    </PageContainer>
  );
}
