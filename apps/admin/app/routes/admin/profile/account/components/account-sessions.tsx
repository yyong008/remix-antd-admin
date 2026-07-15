import { Button, message, Popconfirm, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { href, useNavigate, useParams } from "react-router";

import { useQueryClient } from "@tanstack/react-query";

import {
  AUTH_SESSIONS_LIST_KEY,
  type AuthSessionRow,
  USER_SESSION_QUERY_KEY,
  useAuthSessionsList,
  useRevokeSessionMutation,
} from "~/api-client/queries/session";
import { m } from "~/paraglide/messages";
import { useSession } from "~/session/provider";

function formatTs(value: Date | string | undefined) {
  if (value == null) return "—";
  const d = dayjs(value);
  return d.isValid() ? d.format("YYYY-MM-DD HH:mm") : "—";
}

function shortenUa(ua: string | null | undefined) {
  if (!ua?.trim()) return "—";
  return ua.length > 96 ? `${ua.slice(0, 96)}…` : ua;
}

// TODO: useAuthSessionsList / useRevokeSessionMutation currently return mocks.
// Replace with better-auth `listSessions` + `revokeSession` once auth wiring is ready.

export function AccountSessions() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const queryClient = useQueryClient();
  const sessionCtx = useSession();
  const currentSessionId = sessionCtx?.session?.id ?? null;

  const { data: sessions = [], isLoading, isError, error } = useAuthSessionsList();
  const revokeMutation = useRevokeSessionMutation();

  const columns: ColumnsType<AuthSessionRow> = [
    {
      title: m.profile_account_sessions_column_ua(),
      dataIndex: "userAgent",
      key: "userAgent",
      ellipsis: true,
      render: (_, row) => (
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          {shortenUa(row.userAgent)}
        </Typography.Text>
      ),
    },
    {
      title: m.profile_account_sessions_column_ip(),
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 140,
      render: (v: string | null | undefined) => v?.trim() || "—",
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
                  // TODO: await authClient.signOut({}) once better-auth is wired.
                  await queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
                  await queryClient.invalidateQueries({ queryKey: AUTH_SESSIONS_LIST_KEY });
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
