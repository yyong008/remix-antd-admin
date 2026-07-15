import type { ColumnsType } from "antd/es/table";

import {
  type AuthSessionRow,
  useAuthSessionsList,
  useRevokeSessionMutation,
} from "~/api-client/queries/session";

import dayjs from "dayjs";
import { m } from "~/paraglide/messages";
import { useSession } from "~/session/provider";
import { href, useNavigate, useParams } from "react-router";
import { Button, message, Popconfirm, Table, Tag, Typography } from "antd";

function formatTs(value: Date | string | undefined) {
  if (value == null) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm") : "—";
}

// TODO: useAuthSessionsList / useRevokeSessionMutation currently return mocks.
// Replace with better-auth `listSessions` + `revokeSession` once auth wiring is ready.

export function AccountSessions() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const sessionCtx = useSession();
  const currentSessionId = sessionCtx?.session?.id ?? null;

  const { data: sessions = [], isLoading, isError, error } = useAuthSessionsList();
  const revokeMutation = useRevokeSessionMutation();

  const columns: ColumnsType<AuthSessionRow> = [
    {
      title: m.profile_account_sessions_column_ua(),
      dataIndex: "userAgent",
      key: "userAgent",
      width: 220,
      ellipsis: true,
      render: (_, row) => (
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          {row.userAgent || "—"}
        </Typography.Text>
      ),
    },
    {
      title: m.profile_account_sessions_column_ip(),
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 140,
      render: (v: string | null | undefined) =>
        v?.trim() && v !== "0000" ? v : m.common_unknown(),
    },
    {
      title: m.profile_account_sessions_column_created(),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (v) => formatTs(v),
    },
    {
      title: m.profile_account_sessions_column_expires(),
      dataIndex: "expiresAt",
      key: "expiresAt",
      width: 160,
      render: (v) => formatTs(v),
    },
    {
      title: m.profile_account_sessions_column_status(),
      key: "current",
      width: 100,
      render: (_, row) =>
        row.id === currentSessionId ? (
          <Tag color="blue">{m.profile_account_sessions_current()}</Tag>
        ) : (
          <Tag>{m.profile_account_sessions_other()}</Tag>
        ),
    },
    {
      title: m.profile_account_sessions_column_action(),
      key: "actions",
      width: 120,
      render: (_, row) => {
        const isCurrent = row.id === currentSessionId;
        return (
          <Popconfirm
            title={
              isCurrent
                ? m.profile_account_sessions_revoke_current()
                : m.profile_account_sessions_revoke_other()
            }
            okText={m.profile_account_sessions_revoke_ok()}
            cancelText={m.blog_edit_cancel_button()}
            onConfirm={async () => {
              try {
                if (isCurrent) {
                  await revokeMutation.mutateAsync({ token: row.token });
                  message.success(m.profile_account_sessions_signed_out());
                  navigate(href("/:locale?/login", { locale }), { replace: true });
                  return;
                }
                await revokeMutation.mutateAsync({ token: row.token });
                message.success(m.profile_account_sessions_revoked());
              } catch (e) {
                message.error(
                  e instanceof Error ? e.message : m.profile_account_sessions_action_failed(),
                );
              }
            }}
          >
            <Button type="link" size="small" danger loading={revokeMutation.isPending}>
              {m.profile_account_sessions_revoke_ok()}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        {m.profile_account_sessions_description()}
      </Typography.Paragraph>
      {isError ? (
        <Typography.Text type="danger">
          {(error as Error)?.message ?? m.profile_account_sessions_loading_error()}
        </Typography.Text>
      ) : (
        <Table<AuthSessionRow>
          rowKey="id"
          size="small"
          loading={isLoading}
          columns={columns}
          dataSource={sessions}
          pagination={sessions.length > 8 ? { pageSize: 8 } : false}
        />
      )}
    </div>
  );
}
