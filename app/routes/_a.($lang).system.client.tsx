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
    { title: "System-Client" },
    { name: "System-Client", content: "System-Client" },
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
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "id",
              title: "id",
            },
            {
              dataIndex: "cid",
              title: "客户端 id",
            },
            {
              dataIndex: "ckey",
              title: "客户端 key",
            },
            {
              dataIndex: "c_secret",
              title: "客户端 secret",
            },
            {
              dataIndex: "auth_type",
              title: "授权类型",
            },
            {
              dataIndex: "status",
              title: "状态",
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
