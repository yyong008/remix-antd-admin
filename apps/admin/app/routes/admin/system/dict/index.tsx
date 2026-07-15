import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { CreateDictModal } from "./components/create-dict-modal";
import { createColumns } from "./components/create-columns";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { useState } from "react";
import { useDictList } from "~/api-client/queries/system/system-dict";

export const handle = () => ({
  breadcrumb: [{ label: m.system_dict_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.system_dict_title() }];
};

function HeaderTitle({ title }: { title: string }) {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>{title}</div>;
}

export default function Route() {
  const { locale } = useParams();
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const { data, isLoading, refetch } = useDictList(page);
  return (
    <PageContainer>
      <AdminTable
        bordered
        rowKey="id"
        size="small"
        search={false}
        headerTitle={<HeaderTitle title={m.system_dict_header_title()} />}
        loading={isLoading}
        toolBarRender={() => [<CreateDictModal refetch={refetch} />]}
        dataSource={data?.data?.list || []}
        columns={createColumns({ locale, refetch })}
        options={{ reload: refetch }}
        pagination={{
          total: data?.data?.total || 0,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(pageNumber, pageSize) {
            setPage({ page: pageNumber, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}
