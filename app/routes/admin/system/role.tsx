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
import * as _icon from "@ant-design/icons";
import { Button, Space } from "antd";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import CreateRoleModal from "~/components/roles/CreateRoleModel";
import DeleteIt from "~/components/common/DeleteIt";
import StatusType from "~/components/common/StatusType";
import FormatTime from "~/components/common/FormatTime";

// i18n
import i18n from "~/i18n/i18next.server";

// services
import {
  getRoleList,
  handlePostAction,
  handlePutAction,
  handleDeleteAction,
} from "~/services/system/role";
import { getMenuRaw } from "~/services/system/menu-role";
import { useFetcherChange } from "~/hooks/useFetcherChange";

// icons
const { EditOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Role" },
    { name: "System-Role", content: "System-Role" },
  ];
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

// remix:loader
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  const roles = await getRoleList();
  let t = await i18n.getFixedT(lang!);
  return json({
    dataSource: roles,
    menuRaw: await getMenuRaw(t),
  });
};

export default function SystemRole() {
  const fetcher = useFetcherChange();
  const actionRef = useRef();
  const { dataSource, menuRaw } = useLoaderData<typeof loader>();

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
              menu={menuRaw}
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
            menu={menuRaw}
            fetcher={fetcher}
            trigger={
              <Button type="primary" icon={<EditOutlined />}>
                新建
              </Button>
            }
          />,
        ]}
      />
    </PageContainer>
  );
}
