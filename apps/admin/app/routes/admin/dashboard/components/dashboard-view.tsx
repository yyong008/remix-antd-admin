import {
  type AdminDashboardStats,
  type DashboardPayload,
  type LatestLoginLog,
} from "~/api-client/queries/dashboard/dashboard";
import type { AdminSysUserInfo } from "~/api-client/queries/system/system-user";

import {
  LoginOutlined,
  MenuOutlined,
  ReadOutlined,
  SmileOutlined,
  TeamOutlined,
  ToolOutlined,
  BookOutlined,
  CheckCircleFilled,
  CommentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { useCallback } from "react";
import confetti from "canvas-confetti";
import { m } from "~/paraglide/messages";
import { FormatTime, MarkupText } from "~/components/common";
import { useUserSignIn } from "~/api-client/queries/dashboard/dashboard";

import { Button, Card, Col, Descriptions, Flex, Grid, message, Row, Statistic } from "antd";

type StatItem = {
  key: keyof AdminDashboardStats;
  title: string;
  icon: React.ReactNode;
};

const STAT_ITEMS: StatItem[] = [
  { key: "userCount", title: m.dashboard_stat_users(), icon: <TeamOutlined /> },
  { key: "roleCount", title: m.dashboard_stat_roles(), icon: <UserSwitchOutlined /> },
  { key: "deptCount", title: m.dashboard_stat_depts(), icon: <ApartmentOutlined /> },
  { key: "menuCount", title: m.dashboard_stat_menus(), icon: <MenuOutlined /> },
  { key: "newsCount", title: m.dashboard_stat_news(), icon: <ReadOutlined /> },
  {
    key: "newsCategoryCount",
    title: m.dashboard_stat_news_categories(),
    icon: <UnorderedListOutlined />,
  },
  { key: "blogCount", title: m.dashboard_stat_blog_posts(), icon: <FileTextOutlined /> },
  { key: "loginLogCount", title: m.dashboard_stat_login_logs(), icon: <LoginOutlined /> },
  {
    key: "operateLogCount",
    title: m.dashboard_stat_operation_logs(),
    icon: <ToolOutlined />,
  },
  { key: "changelogCount", title: m.dashboard_stat_changelogs(), icon: <BookOutlined /> },
  { key: "feedbackCount", title: m.dashboard_stat_feedback(), icon: <CommentOutlined /> },
];

function StatsGrid({ stats }: { stats: AdminDashboardStats }) {
  const items = STAT_ITEMS.filter(
    (row) => typeof stats[row.key] === "number" && (stats[row.key] as number) >= 0,
  );
  if (items.length === 0) return null;

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

function UserGreeting({
  displayName,
  departmentName,
  loginLog,
}: {
  displayName: string;
  departmentName?: string;
  loginLog: LatestLoginLog | null | undefined;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 20, paddingBottom: 10 }}>
        <SmileOutlined style={{ marginRight: 10 }} />
        <MarkupText
          parts={m.dashboard_greeting.parts({ name: displayName })}
          renderers={{
            name: ({ children }) => <span style={{ color: "#84cc16" }}>{children}</span>,
          }}
        />
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label={m.dashboard_department()}>
          {departmentName ?? "—"}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_time()}>
          <FormatTime timeStr={loginLog?.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_ip()}>{loginLog?.ip ?? "—"}</Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_system()}>
          {loginLog?.system ?? "—"}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_device()}>
          {loginLog?.browser ?? "—"}
        </Descriptions.Item>
        <Descriptions.Item label={m.dashboard_login_address()}>
          {loginLog?.address ?? "—"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

function SignInButton({ signed }: { signed: boolean }) {
  const signInMutation = useUserSignIn();

  const handleClick = useCallback(async () => {
    try {
      const result = await signInMutation.mutateAsync();
      if (result.alreadySigned) {
        message.info(m.dashboard_signin_already());
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.dashboard_signin_request_failed());
    }
  }, [signInMutation]);

  if (signed) {
    return (
      <Button
        type="primary"
        icon={<CheckCircleFilled />}
        onClick={() => message.success(m.dashboard_signin_done_toast())}
      >
        {m.dashboard_signin_done()}
      </Button>
    );
  }

  return (
    <Button onClick={handleClick} loading={signInMutation.isPending}>
      {m.dashboard_signin()}
    </Button>
  );
}

function pickDisplayName(userInfo: AdminSysUserInfo | null): string {
  if (!userInfo) return "—";
  return userInfo.nickname?.trim() || userInfo.name?.trim() || userInfo.email || "—";
}

export function DashboardView({
  data,
  userInfo,
}: {
  data: DashboardPayload | undefined;
  userInfo: AdminSysUserInfo | null;
}) {
  const screens = Grid.useBreakpoint();
  const md = !!screens.md;
  const stats = data?.stats ?? null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Card>
        <Flex
          vertical={!md}
          gap={24}
          justify={md ? "space-between" : undefined}
          align={md ? "flex-start" : undefined}
          style={{ width: "100%" }}
        >
          <UserGreeting
            displayName={pickDisplayName(userInfo)}
            departmentName={userInfo?.department?.name}
            loginLog={data?.latestLoginLog}
          />
          <SignInButton signed={data?.isLogin != null} />
        </Flex>
      </Card>
      {stats ? <StatsGrid stats={stats} /> : null}
    </div>
  );
}
