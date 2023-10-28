import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemConfigRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
