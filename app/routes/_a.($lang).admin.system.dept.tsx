// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useFetcher, useLoaderData } from "@remix-run/react";

// component
import { Button, Space } from "antd";
import * as _icons from "@ant-design/icons";
import { DeleteIt } from "~/components/common";
import DeptModal from "~/components/system/dept/CreateDeptModel";
import { PageContainer, ProTable } from "@ant-design/pro-components";

// utils
import * as clientUtils from "~/utils";

// controller
import { AdminAdminSystemDeptController } from "~/server/controllers/system/admin.system.dept.controller";

// icons
const { EditOutlined } = _icons;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-Dept" }];
};

// remix:loader
export const loader: LoaderFunction = AdminAdminSystemDeptController.loader;

export default function SystemDeptRoute() {
  const { data: dataSource } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <PageContainer>
      <ProTable
        size="small"
        rowKey="name"
        headerTitle="部门管理"
        search={false}
        pagination={false}
        toolBarRender={() => [<DeptModal record={{}} key="dept-modal" />]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "name",
            title: "用户名",
          },
          {
            dataIndex: "description",
            title: "描述",
          },
          {
            dataIndex: "parent_department_id",
            title: "父 ID",
          },
          {
            dataIndex: "sorter",
            title: "序号",
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            render(_, record) {
              return (
                <div>
                  {record.createdAt
                    ? clientUtils.formatDate(record.createdAt)
                    : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            render(_, record) {
              return (
                <div>
                  {record.updatedAt
                    ? clientUtils.formatDate(record.updatedAt)
                    : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            render(_, record) {
              return (
                <Space>
                  <DeptModal
                    record={record}
                    key="dept-modal"
                    trigger={<Button type="link" icon={<EditOutlined />} />}
                  />
                  <DeleteIt
                    title="确定要删除此部门吗?"
                    fetcher={fetcher}
                    record={record}
                  />
                </Space>
              );
            },
          },
        ]}
      />
    </PageContainer>
  );
}
