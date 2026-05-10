import { AdminTable } from "~/components/admin-table";

import { PageContainer } from "~/components/page-container";
import { useMemo, useState } from "react";

import { ButtonLink } from "~/components/common";
import { createColumns } from "./components/createColumns";
import { href, useParams } from "react-router";
import { useToolsMailList } from "~/api-client/queries/tools/tools-mail";

export function Route() {
  const { locale } = useParams();
  const [page, setPage] = useState({
    page: 1,
    pageSize: 110,
  });
  const { data, isLoading, refetch } = useToolsMailList(page);

  const columns = useMemo(() => {
    return createColumns({ locale, refetch });
  }, [locale, refetch]);

  return (
    <PageContainer>
      <AdminTable
        loading={isLoading}
        size="small"
        search={false}
        headerTitle="登录记录"
        rowKey="id"
        showSorterTooltip
        dataSource={data?.data?.list || []}
        toolBarRender={() => [
          <ButtonLink
            key="create-mail"
            to={href(`/:locale?/admin/tools/mail`, { locale })}
            type={"new"}
            content="去新建"
          />,
        ]}
        columns={columns as any}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total,
          current: page.page,
          pageSize: page.pageSize,
          onChange(p, pageSize) {
            setPage({
              page: p,
              pageSize: pageSize ?? page.pageSize,
            });
          },
        }}
      />
    </PageContainer>
  );
}
