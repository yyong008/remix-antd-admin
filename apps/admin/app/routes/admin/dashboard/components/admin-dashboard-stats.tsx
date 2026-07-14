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
import { m } from "~/paraglide/messages";
import type { AdminDashboardStats as AdminDashboardStatsModel } from "~/api-client/queries/dashboard/dashboard";

const STAT_ORDER: {
  key: keyof AdminDashboardStatsModel;
  title: () => string;
  icon: React.ReactNode;
}[] = [
  { key: "userCount", title: () => m.dashboard_stat_users(), icon: <TeamOutlined /> },
  { key: "roleCount", title: () => m.dashboard_stat_roles(), icon: <UserSwitchOutlined /> },
  { key: "deptCount", title: () => m.dashboard_stat_depts(), icon: <ApartmentOutlined /> },
  { key: "menuCount", title: () => m.dashboard_stat_menus(), icon: <MenuOutlined /> },
  { key: "newsCount", title: () => m.dashboard_stat_news(), icon: <ReadOutlined /> },
  {
    key: "newsCategoryCount",
    title: () => m.dashboard_stat_news_categories(),
    icon: <UnorderedListOutlined />,
  },
  { key: "blogCount", title: () => m.dashboard_stat_blog_posts(), icon: <FileTextOutlined /> },
  { key: "loginLogCount", title: () => m.dashboard_stat_login_logs(), icon: <LoginOutlined /> },
  {
    key: "operateLogCount",
    title: () => m.dashboard_stat_operation_logs(),
    icon: <ToolOutlined />,
  },
  { key: "changelogCount", title: () => m.dashboard_stat_changelogs(), icon: <BookOutlined /> },
  { key: "feedbackCount", title: () => m.dashboard_stat_feedback(), icon: <CommentOutlined /> },
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
        {m.dashboard_overview()}
      </div>
      <Row gutter={[16, 16]}>
        {items.map((row) => (
          <Col key={row.key} xs={24} sm={12} lg={8} xl={6}>
            <Card size="small" styles={{ body: { paddingTop: 16, paddingBottom: 16 } }}>
              <Statistic
                title={row.title()}
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
