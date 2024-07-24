import { PageContainer, ProTable } from "@ant-design/pro-components";

import { Button } from "antd";
import { DictItemModal } from "~/modules-admin/system/dict/components/dict/create-dict-item-modal";
import { createColumns } from "./components/dict-item-pro-table/create-columns";
import { useNavigate } from "@remix-run/react";

export function Route() {
  const nav = useNavigate();
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        headerTitle="字典项目"
        toolBarRender={() => [
          <DictItemModal key="create-dict-modal" record={{}} />,
          <Button
            key="2"
            onClick={() => {
              nav(-1);
            }}
          >
            返回
          </Button>,
        ]}
        dataSource={[]}
        columns={createColumns()}
      />
    </PageContainer>
  );
}
