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
    { title: "System-Post" },
    { name: "System-Post", content: "System-Post" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemPostRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="system/post">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "code",
              title: "岗位编码",
            },
            {
              dataIndex: "name",
              title: "岗位名称",
            },
            {
              dataIndex: "sort",
              title: "排序",
            },
            {
              dataIndex: "state",
              title: "状态",
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
