import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";

export default function SystemLogLogininforRoute() {
  return (
    <PageContainer title="system user">
      <ProCard>
        <ProTable
          columns={[
            {
              dataIndex: "num",
              title: "访问编号",
            },
            {
              dataIndex: "username",
              title: "用户名称",
            },
            {
              dataIndex: "ip",
              title: "地址",
            },
            {
              dataIndex: "address",
              title: "登录地点",
            },
            {
              dataIndex: "system",
              title: "操作系统",
            },
            {
              dataIndex: "browser",
              title: "浏览器",
            },
            {
              dataIndex: "login_state",
              title: "登录状态",
            },
            {
              dataIndex: "desc",
              title: "登录状态",
            },
            {
              dataIndex: "createdAt",
              title: "反问时间",
            },
          ]}
        />
      </ProCard>
    </PageContainer>
  );
}
