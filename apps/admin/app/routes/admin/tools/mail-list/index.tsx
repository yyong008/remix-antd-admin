import { useMemo, useState } from "react";
import { href, useParams } from "react-router";
import type { MetaFunction } from "react-router";
import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { ButtonLink } from "~/components/common";
import { m } from "~/paraglide/messages";
import { useToolsMailList } from "~/api-client/queries/tools/tools-mail";
import { createColumns } from "./components/create-columns";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_list() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.tools_mail_list_title() }];
};

export default function Route() {
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
        headerTitle={m.tools_mail_list_title()}
        rowKey="id"
        showSorterTooltip
        dataSource={data?.data?.list || []}
        toolBarRender={() => [
          <ButtonLink
            key="create-mail"
            to={href(`/:locale?/admin/tools/mail`, { locale })}
            type={"new"}
            content={m.tools_mail_list_create_new()}
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
