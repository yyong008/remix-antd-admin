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
    { title: "System-OSS" },
    { name: "System-OSS", content: "System-OSS" },
  ];
};

// remix:loader
export const loader: LoaderFunction = () => {
  return json({
    dataSource: [],
  });
};

export default function SystemOSSRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          dataSource={dataSource as any[]}
          columns={[
            {
              dataIndex: "filename",
              title: "文件名",
            },
            {
              dataIndex: "origin_name",
              title: "原名",
            },
            {
              dataIndex: "prefix",
              title: "文件后缀",
            },
            {
              dataIndex: "url",
              title: "文件展示",
            },

            {
              dataIndex: "createdAt",
              title: "创建时间",
            },
            {
              dataIndex: "up",
              title: "上传人",
            },
            {
              dataIndex: "store",
              title: "服务商",
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
