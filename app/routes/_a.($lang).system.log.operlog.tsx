import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemLogOperLogRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          columns={[
            {
              dataIndex: "num",
              title: "日志编号",
            },
            {
              dataIndex: "module",
              title: "系统模块",
            },
            {
              dataIndex: "type",
              title: "操作类型",
            },
            {
              dataIndex: "oper",
              title: "操作人员",
            },
            {
              dataIndex: "op_state",
              title: "操作状态",
            },
            {
              dataIndex: "host",
              title: "主机",
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
