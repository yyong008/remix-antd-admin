import { PageContainer, ProTable } from "@ant-design/pro-components";

import { CreateDeptModal } from "./components/create-dept-modal";
import { createColumns } from "./components/dept-pro-table/create-columns";

export function Route() {
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        headerTitle="部门管理"
        search={false}
        pagination={false}
        toolBarRender={() => [<CreateDeptModal record={{}} key="dept-modal" />]}
        dataSource={[]}
        columns={createColumns()}
      />
    </PageContainer>
  );
}
