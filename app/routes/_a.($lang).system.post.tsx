import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemPostRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
