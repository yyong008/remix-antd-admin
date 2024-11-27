import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useMemo, useRef } from "react";

import { CreateRoleModal } from "./components/create-role-modal";

import { createColumns } from "./components/role-pro-table/create-columns";
import { useFetcherChange, usePage } from "@/hooks";
import { useParams } from "@remix-run/react";
import { useReadRoleListQuery } from "@/apis-client/admin/system/role/role";
import { useTranslation } from "react-i18next";
import { useReadMenuListRawQuery } from "@/apis-client/admin/system/menu";
import { genMenuTreeForRole } from "./utils.tsx";

export function Route() {
  const [page] = usePage();
  const { data, isLoading, refetch } = useReadRoleListQuery(page);
  const { data: flatMenu } = useReadMenuListRawQuery({});
  const { menuRoles = [] } = {};
  const { lang } = useParams();

  const actionRef = useRef();
  const { t } = useTranslation();
  const fetcher = useFetcherChange();
  const menus = useMemo(() => {
    if (flatMenu) {
      const menu = flatMenu.data.list || [];
      return genMenuTreeForRole(menu || [], t, null);
    }
  }, [flatMenu, t]);

  return (
    <PageContainer>
      <ProTable
        size="small"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        loading={isLoading}
        dataSource={data?.data?.list || []}
        columns={createColumns({ lang, menus, menuRoles }) as any}
        options={{
          reload: refetch,
        }}
        toolBarRender={() => [
          <CreateRoleModal
            key="create-role-modal"
            record={{}}
            menu={menus as any}
            menuRoles={menuRoles}
            fetcher={fetcher}
          />,
        ]}
      />
    </PageContainer>
  );
}
