// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// controller
import { AdminSystemConfigController } from "~/server/controllers/admin.system.config.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-Config" }];
};

// remix:loader
export const loader: LoaderFunction = AdminSystemConfigController.loader;

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "name",
              title: "参数名称",
            },
            {
              dataIndex: "key",
              title: "参数名字",
            },
            {
              dataIndex: "value",
              title: "参数键值",
            },
            {
              dataIndex: "description",
              title: "描述",
            },
            {
              dataIndex: "remark",
              title: "备注",
            },
            {
              dataIndex: "createdAt",
              title: "创建时间",
            },
            {
              dataIndex: "updateAt",
              title: "创建时间",
            },
            {
              dataIndex: "op",
              title: "操作",
              render(_, record) {
                return <div>record</div>;
              },
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}
