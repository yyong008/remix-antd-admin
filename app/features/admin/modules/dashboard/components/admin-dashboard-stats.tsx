import {
  ApartmentOutlined,
  BookOutlined,
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LoginOutlined,
  MenuOutlined,
  ReadOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import type { AdminDashboardStats as AdminDashboardStatsModel } from "~/types/admin-dashboard-stats";

const STAT_ORDER: {
  key: keyof AdminDashboardStatsModel;
  title: string;
  icon: React.ReactNode;
}[] = [
  { key: "userCount", title: "系统用户", icon: <TeamOutlined /> },
  { key: "roleCount", title: "角色", icon: <UserSwitchOutlined /> },
  { key: "deptCount", title: "部门", icon: <ApartmentOutlined /> },
  { key: "menuCount", title: "菜单项", icon: <MenuOutlined /> },
  { key: "newsCount", title: "资讯", icon: <ReadOutlined /> },
  { key: "newsCategoryCount", title: "资讯分类", icon: <UnorderedListOutlined /> },
  { key: "blogCount", title: "博客文章", icon: <FileTextOutlined /> },
  { key: "loginLogCount", title: "登录日志条数", icon: <LoginOutlined /> },
  { key: "operateLogCount", title: "操作日志条数", icon: <ToolOutlined /> },
  { key: "changelogCount", title: "变更记录", icon: <BookOutlined /> },
  { key: "feedbackCount", title: "用户反馈", icon: <CommentOutlined /> },
];

export function AdminDashboardStats({ stats }: { stats: AdminDashboardStatsModel }) {
  const items = STAT_ORDER.filter(
    (row) => typeof stats[row.key] === "number" && stats[row.key]! >= 0,
  );
  if (!items.length) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          marginBottom: 12,
          fontSize: 16,
          fontWeight: 500,
          color: "var(--ant-color-text-heading)",
        }}
      >
        <DashboardOutlined style={{ marginRight: 8 }} />
        管理数据概览
      </div>
      <Row gutter={[16, 16]}>
        {items.map((row) => (
          <Col key={row.key} xs={24} sm={12} lg={8} xl={6}>
            <Card size="small" styles={{ body: { paddingTop: 16, paddingBottom: 16 } }}>
              <Statistic
                title={row.title}
                value={stats[row.key] as number}
                prefix={
                  <span style={{ marginRight: 8, color: "var(--ant-color-primary)" }}>
                    {row.icon}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
