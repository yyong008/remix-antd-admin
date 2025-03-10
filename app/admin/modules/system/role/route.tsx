import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useMemo, useRef } from "react";

import { CreateRoleModal } from "./components/CreateRoleModal";
import { ProTableHeaderTitle } from "./components/ProTableHeaderTitle";
import { createColumns } from "./components/create-columns";
import { genMenuTreeForRole } from "./utils";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export function Route() {
  const { lang } = useParams();
  const actionRef = useRef();
  const { t } = useTranslation();
  const { data: flatMenu } = { data: { data: { list: [] } } };
  const { data, isLoading, refetch } = {
    data: { data: { list: [] } },
    isLoading: false,
    refetch: () => {},
  };
  const { data: menuRoleData } = { data: { data: { list: [] } } };
  const menuRoles = menuRoleData?.data || [];
   
  const menuAll = flatMenu?.data?.list || [];

  const menus = useMemo(() => {
    if (flatMenu) {
      return genMenuTreeForRole(menuAll, t, null);
    }
  }, [flatMenu, menuAll, t]);

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
            menuRoles={menuRoles as any}
          />,
        ]}
      />
    </PageContainer>
  );
}
