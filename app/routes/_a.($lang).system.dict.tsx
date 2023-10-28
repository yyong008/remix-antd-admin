import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemDictRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
