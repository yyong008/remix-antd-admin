import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// react
import { useRef } from "react";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import DeleteIt from "~/components/common/DeleteIt";
import AntdIcon from "~/components/common/AntdIcon";
import StatusType from "~/components/common/StatusType";
import FormatTime from "~/components/common/FormatTime";
import CreateRoleModal from "~/components/roles/CreateRoleModel";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";
import { useFetcherChange } from "~/hooks/useFetcherChange";

// controller
import { AdminSystemRoleController } from "~/server/controllers/admin.system.role";

// remix
// remix:meta(client)
export const meta: MetaFunction = () => {
  return [{ title: `system-role` }];
};
export const action: ActionFunction = AdminSystemRoleController.action;
export const loader: LoaderFunction = AdminSystemRoleController.loader;

export default function AdminSystemRole() {
  const { dataSource, menuRoles, flatMenu } = useLoaderData<typeof loader>();

  const actionRef = useRef();
  const { t } = useTranslation();
  const fetcher = useFetcherChange();
  const menus = genMenuTree(flatMenu, t, null);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "角色名",
      dataIndex: "name",
    },
    {
      title: "角色值",
      dataIndex: "value",
    },
    {
      title: "角色描述",
      dataIndex: "description",
    },
    {
      dataIndex: "status",
      title: "状态",
      width: 100,
      ellipsis: true,
      render(_: any, record: any) {
        return <StatusType status={record.status} />;
      },
    },
    {
      dataIndex: "createdAt",
      title: "创建时间",
      ellipsis: true,
      render(_: any, record: any) {
        return <FormatTime timeStr={record.createdAt} />;
      },
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      ellipsis: true,
      render(_: any, record: any) {
        return <FormatTime timeStr={record.updatedAt} />;
      },
    },
    {
      title: "操作",
      render(_: any, record: any) {
        return (
          <Space>
            <CreateRoleModal
              fetcher={fetcher}
              record={record}
              key="create-role-modal"
              menu={menus}
              menuRoles={menuRoles}
            />
            <DeleteIt
              title="确定要删除次角色吗？"
              fetcher={fetcher}
              record={record}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        size="small"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        loading={!dataSource}
        dataSource={dataSource}
        columns={columns}
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

function genMenuTree(
  items: any[],
  t: (v: string) => string,
  parentId?: number | null,
): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId)
    .map((item) => ({
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
      children: genMenuTree(items, t, item.id), // 递归构建子树
    }));
}
