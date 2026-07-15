import { AdminTable } from "~/components/admin-table";
import { PageContainer } from "~/components/page-container";
import { CreateRoleModal } from "./components/create-role-modal";
import { createColumns } from "./components/create-columns";
import { genMenuTreeForRole } from "./utils";
import { usePage } from "~/hooks/usePagination";
import { useMenuList } from "~/api-client/queries/system/system-menu";
import { useRoleList } from "~/api-client/queries/system/system-role";
import { Typography } from "antd";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";
import { useMemo } from "react";
import { useParams } from "react-router";

export const handle = () => ({
  breadcrumb: [{ label: m.system_role_title() }],
});

export const meta: MetaFunction = () => {
  return [{ title: m.system_role_title() }];
};

function HeaderTitle() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography.Text strong style={{ fontSize: 16, color: "var(--ant-color-text-heading)" }}>
        {m.system_role_header_title()}
      </Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
        {m.system_role_header_desc()}
      </Typography.Text>
    </div>
  );
}

export default function Route() {
  const [page, setPage] = usePage();
  const { locale } = useParams();
  const { data: flatMenu } = useMenuList({ page: 1, pageSize: 1000 });
  const { data, isLoading, refetch } = useRoleList(page);

  const menuAll = flatMenu?.data?.list || [];
  const menus = useMemo(() => {
    if (flatMenu) return genMenuTreeForRole(menuAll, null);
  }, [flatMenu, menuAll]);

  return (
    <PageContainer>
      <AdminTable
        size="small"
        bordered={false}
        headerTitle={<HeaderTitle />}
        rowKey="id"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || []}
        columns={createColumns({ locale, menus, refetch }) as any}
        options={{ reload: refetch }}
        pagination={{
          total: data?.data?.total || 0,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(pageNumber, pageSize) {
            setPage({ page: pageNumber, pageSize });
          },
        }}
        toolBarRender={() => [<CreateRoleModal refetch={refetch} menu={menus as any} />]}
      />
    </PageContainer>
  );
}
