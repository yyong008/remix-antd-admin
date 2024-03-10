// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Dict" },
    { name: "System-Dict", content: "System-Dict" },
  ];
};

export default function SystemDictRoute() {
  const { dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "name",
              title: "字典名称",
            },
            {
              dataIndex: "type",
              title: "字典类型",
            },
            {
              dataIndex: "note",
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
