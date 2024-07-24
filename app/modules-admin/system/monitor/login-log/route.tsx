import { PageContainer, ProTable } from "@ant-design/pro-components";

import { createColumns } from "./components/login-log-pro-table/create-columns";
import { useLoginLogNav } from "@/hooks";

export function Route() {
  const [navLoginLog] = useLoginLogNav();
  const { dataSource = [], total = 0 } = {};

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="登录记录"
        rowKey="id"
        showSorterTooltip
        dataSource={dataSource as any[]}
        columns={createColumns()}
        pagination={{
          total,
          pageSize: 10,
          onChange(page, pageSize) {
            navLoginLog({
              page,
              pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
