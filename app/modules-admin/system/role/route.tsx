import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useMemo, useRef } from "react";

import { CreateRoleModal } from "./components/CreateRoleModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { genMenuTreeForRole } from "./utils";
import { systemMenuRoleApi } from "@/apis-client/admin/system/role/menu-role";
import { usePage } from "@/hooks/use-pagination";
import { useParams } from "@remix-run/react";
import { useReadMenuListRawQuery } from "@/apis-client/admin/system/menu";
import { useReadRoleListQuery } from "@/apis-client/admin/system/role/role";
import { useTranslation } from "react-i18next";

export function Route() {
  const [page] = usePage();
  const { lang } = useParams();
  const actionRef = useRef();
  const { t } = useTranslation();
  const { data: flatMenu } = useReadMenuListRawQuery({
    lang,
    page: 1,
    pageSize: 10000,
  });
  const { data, isLoading, refetch } = useReadRoleListQuery(page);
  const { data: menuRoleData } = systemMenuRoleApi.useReadRoleAllQuery({});
  const menuRoles = menuRoleData?.data || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuAll = flatMenu?.data?.list || [];

  const menus = useMemo(() => {
    if (flatMenu) {
      return genMenuTreeForRole(menuAll, t, null);
    }
  }, [flatMenu, menuAll, t]);
  console.log(menuRoles);

  return (
    <PageContainer>
      <ProTable
        size="small"
        bordered
        headerTitle={<ProTableHeaderTitle title="角色管理" />}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || []}
        columns={createColumns({ lang, menus, menuRoles, refetch }) as any}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [
          <CreateRoleModal
            refetch={refetch}
            key="create-role-modal"
            menu={menus as any}
            menuRoles={menuRoles}
          />,
        ]}
      />
    </PageContainer>
  );
}
