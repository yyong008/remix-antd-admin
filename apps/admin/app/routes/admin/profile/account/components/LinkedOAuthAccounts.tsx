import { Card, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";

import { type AuthLinkedAccountRow, useAuthAccountsList } from "~/api-client/queries/session";

/** better-auth `credential` 为邮箱密码，不属于 OAuth 展示区块 */
export const OAUTH_PROVIDER_IDS = new Set(["github", "google"]);

function formatTs(value: Date | string | undefined) {
  if (value == null) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm") : "—";
}

const providerLabel: Record<string, string> = {
  github: "GitHub",
  google: "Google",
};

const columns: ColumnsType<AuthLinkedAccountRow> = [
  {
    title: "方式",
    dataIndex: "providerId",
    key: "providerId",
    width: 120,
    render: (v: string) => providerLabel[v] ?? v,
  },
  {
    title: "外部账号 ID",
    dataIndex: "accountId",
    key: "accountId",
    ellipsis: true,
  },
  {
    title: "绑定时间",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 170,
    render: (v) => formatTs(v),
  },
];

function OAuthAccountsTable({
  dataSource,
  loading,
}: {
  dataSource: AuthLinkedAccountRow[];
  loading?: boolean;
}) {
  return (
    <Table<AuthLinkedAccountRow>
      rowKey="id"
      size="small"
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
}

/**
 * 仅在已绑定 GitHub / Google 等 OAuth 时展示；纯邮箱密码登录不显示此卡片。
 */
export function OAuthAccountsSection() {
  const { data: accounts = [], isLoading, isError, error } = useAuthAccountsList();

  const oauthOnly = useMemo(
    () => accounts.filter((a) => OAUTH_PROVIDER_IDS.has(a.providerId)),
    [accounts],
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <Card title="第三方账号" variant="outlined">
        <Typography.Text type="danger" style={{ fontSize: 14 }}>
          {(error as Error)?.message ?? "无法加载已绑定账号"}
        </Typography.Text>
      </Card>
    );
  }

  if (oauthOnly.length === 0) {
    return null;
  }

  return (
    <Card title="第三方账号" variant="outlined" styles={{ header: { marginBottom: 0 } }}>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        已绑定的 Google / GitHub 登录方式（邮箱密码登录不会出现在此列表）。
      </Typography.Paragraph>
      <OAuthAccountsTable dataSource={oauthOnly} />
    </Card>
  );
}
