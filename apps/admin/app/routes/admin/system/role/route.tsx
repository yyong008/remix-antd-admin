import { AdminTable } from "~/components/admin-table";

import { PageContainer } from "~/components/page-container";
import { useMemo } from "react";

import { CreateRoleModal } from "./components/CreateRoleModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { genMenuTreeForRole } from "./utils";
import { usePage } from "~/hooks/usePagination";
import { useParams } from "react-router";
import { useMenuList } from "~/api-client/queries/system/system-menu";
import { useRoleList } from "~/api-client/queries/system/system-role";

export function Route() {
  const [page, setPage] = usePage();
  const { locale } = useParams();
  const { data: flatMenu } = useMenuList({ page: 1, pageSize: 1000 });
  const { data, isLoading, refetch } = useRoleList(page);

  const menuAll = flatMenu?.data?.list || [];

  const menus = useMemo(() => {
    if (flatMenu) {
      return genMenuTreeForRole(menuAll, null);
    }
  }, [flatMenu, menuAll]);

  return (
    <PageContainer>
      <AdminTable
        size="small"
        bordered={false}
        headerTitle={<ProTableHeaderTitle title="角色管理" />}
        rowKey="id"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || []}
        columns={createColumns({ locale, menus, refetch }) as any}
        options={{
          reload: refetch,
        }}
        pagination={{
          total: data?.data?.total || 0,
          current: page.page,
          pageSize: page.pageSize || 10,
          onChange(pageNumber, pageSize) {
            setPage({ page: pageNumber, pageSize });
          },
        }}
        toolBarRender={() => [
          <CreateRoleModal refetch={refetch} key="create-role-modal" menu={menus as any} />,
        ]}
      />
    </PageContainer>
  );
}
