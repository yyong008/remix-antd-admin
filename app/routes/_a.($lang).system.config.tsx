// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Config" },
    { name: "System-Config", content: "System-Config" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemConfigRoute() {
  const { dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer title="system/config">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "name",
              title: "参数名称",
            },
            {
              dataIndex: "name",
              title: "参数名字",
            },
            {
              dataIndex: "value",
              title: "参数键值",
            },
            {
              dataIndex: "isBuildIn",
              title: "是否为系统内置",
            },
            {
              dataIndex: "notes",
              title: "备注",
            },
            {
              dataIndex: "createdAt",
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
