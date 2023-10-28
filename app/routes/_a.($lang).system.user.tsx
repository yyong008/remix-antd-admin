import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemUserRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          columns={[
            {
              dataIndex: "name",
              title: "用户名",
            },
            {
              dataIndex: "nickname",
              title: "昵称",
            },
            {
              dataIndex: "dept",
              title: "部门",
            },
            {
              dataIndex: "phone",
              title: "手机号码",
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
