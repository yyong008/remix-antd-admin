import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@remix-run/react";

import { Button } from "antd";
import { DictItemModal } from "@/modules-admin/system/dict/components/dict/create-dict-item-modal";
import { createColumns } from "./components/dict-item-pro-table/create-columns";
import { useReadSystemDictItemListQuery } from "@/apis-client/admin/system/dict-item";
import { useState } from "react";

export function Route() {
  const nav = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    id,
  });
  const { data, isLoading, refetch } = useReadSystemDictItemListQuery(page);
  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        headerTitle="字典项目"
        loading={isLoading}
        options={{
          reload: refetch,
        }}
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
        dataSource={data?.data?.list || []}
        columns={createColumns()}
        pagination={{
          total: data?.data?.total,
          pageSize: page.pageSize || 10,
          onChange(_page, pageSize) {
            setPage({ ...page, page: _page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
