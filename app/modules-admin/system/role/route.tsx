import { PageContainer, ProTable } from "@ant-design/pro-components";

import { AntdIcon } from "~/components/common";
import { CreateRoleModal } from "./components/create-role-modal";
import { Space } from "antd";
import { createColumns } from "./components/role-pro-table/create-columns";
import { useFetcherChange } from "@/hooks";
import { useParams } from "@remix-run/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function Route() {
  const { dataSource = [], menuRoles = [], flatMenu = [] } = {};
  const { lang } = useParams();

  const actionRef = useRef();
  const { t } = useTranslation();
  const fetcher = useFetcherChange();
  const menus = genMenuTreeForRole(flatMenu, t, null);
  return (
    <PageContainer>
      <ProTable
        size="small"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        loading={!dataSource}
        dataSource={dataSource}
        columns={createColumns({ lang, menus, menuRoles }) as any}
        toolBarRender={() => [
          <CreateRoleModal
            key="create-role-modal"
            record={{}}
            menu={menus}
            menuRoles={menuRoles}
            fetcher={fetcher}
          />,
        ]}
      />
    </PageContainer>
  );
}

function genMenuTreeForRole(
  items: any[],
  t: (v: string) => string,
  parentId?: number | null,
): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId)
    .map((item) => ({
      id: item.id,
      orderNo: item.orderNo,
      key: item.id,
      value: item.id,
      title: item.icon ? (
        <Space>
          <AntdIcon name={item.icon} />
          {t(item.name)}
        </Space>
      ) : (
        t(item.name)
      ),
      children: genMenuTreeForRole(items, t, item.id), // 递归构建子树
    }))
    .sort((a, b) => a.orderNo - b.orderNo);
}
