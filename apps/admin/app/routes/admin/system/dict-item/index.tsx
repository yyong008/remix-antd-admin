import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { Button } from "antd";
import { CreateDictItemModal } from "./components/create-dict-item-modal";
import { createColumns } from "./components/create-columns";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useDictItemList } from "~/api-client/queries/system/system-dict-item";

export const meta: MetaFunction = () => {
  return [{ title: m.system_dict_item_title() }];
};

function HeaderTitle({ title }: { title: string }) {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>{title}</div>;
}

export default function Route() {
  const nav = useNavigate();
  const { id } = useParams();
  const dictionaryId = id!;
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = useDictItemList({
    dictionaryId,
    page: page.page,
    pageSize: page.pageSize,
  });
  return (
    <PageContainer>
      <AdminTable
        bordered
        rowKey="id"
        size="small"
        search={false}
        headerTitle={<HeaderTitle title={m.system_dict_item_header_title()} />}
        loading={isLoading}
        options={{ reload: refetch }}
        toolBarRender={() => [
          <CreateDictItemModal refetch={refetch} />,
          <Button key="back" type="primary" onClick={() => nav(-1)}>
            {m.system_back()}
          </Button>,
        ]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ refetch })}
        pagination={{
          total: data?.data?.total,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(_page, pageSize) {
            setPage({ ...page, page: _page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
