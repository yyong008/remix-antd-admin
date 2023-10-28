import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemConfigRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
