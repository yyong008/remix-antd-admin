import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { data: dataSource } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <ProTable
          rowKey="id"
          search={false}
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
