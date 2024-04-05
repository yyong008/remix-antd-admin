import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// react
import { useRef } from "react";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import CreateRoleModal from "~/components/roles/CreateRoleModel";
import DeleteIt from "~/components/common/DeleteIt";
import StatusType from "~/components/common/StatusType";
import FormatTime from "~/components/common/FormatTime";

// services
import {
  getRoleList,
  handlePostAction,
  handlePutAction,
  handleDeleteAction,
  getUserRolesById,
  getMenuRoles,
} from "~/services/system/role";
import { getFlatMenu } from "~/services/system/menu-role";
import { useFetcherChange } from "~/hooks/useFetcherChange";
import AntdIcon from "~/components/common/AntdIcon";
import { useTranslation } from "react-i18next";
import { getUserId } from "~/services/common/auth.server";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-Role" }];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { method } = request;
  if (method === "POST") {
    const roleInfo = await request.json();

    return handlePostAction(roleInfo);
  } else if (method === "PUT") {
    const roleInfo = await request.json();
    return handlePutAction(roleInfo);
  } else if (method === "DELETE") {
    const { ids } = await request.json();
    return handleDeleteAction(ids);
  }
  return json({ code: 1, message: "fail", data: {} });
};

function buildMenuTreeFunctional(
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
      children: buildMenuTreeFunctional(items, t, item.id), // 递归构建子树
    }));
}

// remix:loader
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  return json({
    dataSource: await getRoleList(),
    flatMenu: await getFlatMenu(),
    roles: await getUserRolesById(userId!),
    menuRoles: await getMenuRoles(),
  });
};

export default function SystemRole() {
  const fetcher = useFetcherChange();
  const actionRef = useRef();
  const { dataSource, menuRoles, flatMenu } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const menus = buildMenuTreeFunctional(flatMenu, t, null);

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
