import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemOSSRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
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
