// types
import type { LoaderFunction } from "@remix-run/node";

// components
import { PageContainer, ProCard } from "@ant-design/pro-components";

// controller
import { AdminDashboardController } from "~/server/controllers/admin.dashboard.controller";

export const loader: LoaderFunction = AdminDashboardController.loader;

export default function Dashboard() {
  return (
    <PageContainer>
      <ProCard title="数据统计">
        <ProCard title="博客数据"></ProCard>
      </ProCard>
      <ProCard title="个人资料">
        <ProCard title="个人中心"></ProCard>
      </ProCard>
      <ProCard title="工作空间">
        <ProCard title="博客数据"></ProCard>
        <ProCard title="链接数据"></ProCard>
        <ProCard title="新闻"></ProCard>
      </ProCard>
      <ProCard title="demo">
        <ProCard title="链接数据"></ProCard>
      </ProCard>
      <ProCard title="工具中心">
        <ProCard title="mail"></ProCard>
        <ProCard title="storage"></ProCard>
      </ProCard>
    </PageContainer>
  );
}
