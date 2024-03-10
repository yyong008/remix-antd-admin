// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// components
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Notice" },
    { name: "System-Notice", content: "System-Notice" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemNoticeRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "title",
              title: "公告标题",
            },
            {
              dataIndex: "type",
              title: "公告类型",
            },
            {
              dataIndex: "state",
              title: "状态",
            },
            {
              dataIndex: "creater",
              title: "创作者",
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
