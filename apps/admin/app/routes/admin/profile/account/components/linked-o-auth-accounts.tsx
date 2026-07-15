import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import { useMemo } from "react";
import { m } from "~/paraglide/messages";
import { Card, Table, Typography } from "antd";
import { type AuthLinkedAccountRow, useAuthAccountsList } from "~/api-client/queries/session";

/** better-auth `credential` is email/password — excluded from OAuth display. */
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

// TODO: useAuthAccountsList currently returns a mock. Replace with better-auth
// `listAccounts` once the auth wiring is ready.

const columns: ColumnsType<AuthLinkedAccountRow> = [
  {
    title: m.profile_account_oauth_column_provider(),
    dataIndex: "providerId",
    key: "providerId",
    width: 120,
    render: (v: string) => providerLabel[v] ?? v,
  },
  {
    title: m.profile_account_oauth_column_account(),
    dataIndex: "accountId",
    key: "accountId",
    ellipsis: true,
  },
  {
    title: m.profile_account_oauth_column_created(),
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
 * Only shown when at least one OAuth account is linked.
 * Email/password sign-in does not appear in this list.
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
      <Card title={m.profile_account_oauth()} variant="outlined">
        <Typography.Text type="danger" style={{ fontSize: 14 }}>
          {(error as Error)?.message ?? m.profile_account_oauth_loading_error()}
        </Typography.Text>
      </Card>
    );
  }

  if (oauthOnly.length === 0) {
    return null;
  }

  return (
    <Card
      title={m.profile_account_oauth()}
      variant="outlined"
      styles={{ header: { marginBottom: 0 } }}
    >
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        {m.profile_account_oauth_description()}
      </Typography.Paragraph>
      <OAuthAccountsTable dataSource={oauthOnly} />
    </Card>
  );
}
