import type { LoaderFunctionArgs } from "@remix-run/node";

// core
import { useRef } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import { Button, Space } from "antd";
import RoleModal from "~/components/roles/RoleModel";
import CreateRoleModal from "~/components/roles/CreateRoleModel";
import { PageContainer, ProTable } from "@ant-design/pro-components";

import { lastValueFrom } from "rxjs";
import i18n from "~/i18n/i18next.server";

// db
import { createRoute } from "~/db";
import { getRoles } from "~/db/role";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  const roles = await lastValueFrom(getRoles());
  let t = await i18n.getFixedT(lang!);

  const menu = () => {
    const _menu = createRoute(lang!, t).route.routes;

    function genMenu(menu: any[]) {
      menu.forEach((m, i) => {
        m.title = m.path;
        if (m.children) {
          genMenu(m.children);
        }
      });
      return menu;
    }
    return genMenu(_menu);
  };
  return json({ dataSource: roles, menu: menu() });
};

export default function UserRoute() {
  const actionRef = useRef();
  const { dataSource, menu } = useLoaderData<typeof loader>();

  const columns = [
    {
      title: "role Key",
      dataIndex: "key",
    },
    {
      title: "role name",
      dataIndex: "name",
    },
    {
      title: "role description",
      dataIndex: "description",
    },
    {
      title: "operation",
      render(record: any) {
        console.log("args");
        return (
          <Space>
            <RoleModal
              menu={menu}
              record={record}
              trigger={<Button type="primary">Edit</Button>}
            />
            <Button danger>Del</Button>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={false}
        loading={!dataSource}
        dataSource={dataSource}
        columns={columns}
        toolBarRender={() => [
          <CreateRoleModal
            key="create-role-modal"
            menu={menu}
            trigger={<Button type="primary">New</Button>}
          />,
        ]}
      />
    </PageContainer>
  );
}
