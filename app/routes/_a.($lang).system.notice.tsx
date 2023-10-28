import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemNoticeRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
