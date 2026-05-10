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
// import { authClient } from "~/libs/auth/client";
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
      title: "设备 / 浏览器",
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
      title: "IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 140,
      render: (v: string | null | undefined) => v?.trim() || "—",
    },
    {
      title: "登录时间",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (v) => formatTs(v),
    },
    {
      title: "过期时间",
      dataIndex: "expiresAt",
      key: "expiresAt",
      width: 160,
      render: (v) => formatTs(v),
    },
    {
      title: "状态",
      key: "current",
      width: 100,
      render: (_, row) =>
        row.id === currentSessionId ? <Tag color="blue">当前设备</Tag> : <Tag>其他设备</Tag>,
    },
    {
      title: "操作",
      key: "actions",
      width: 120,
      render: (_, row) => {
        const isCurrent = row.id === currentSessionId;
        return (
          <Popconfirm
            title={isCurrent ? "将退出当前账号并跳转登录页" : "注销该设备的登录状态？"}
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              try {
                if (isCurrent) {
                  // await authClient.signOut({});
                  await queryClient.invalidateQueries({ queryKey: USER_SESSION_QUERY_KEY });
                  await queryClient.invalidateQueries({ queryKey: AUTH_SESSIONS_LIST_KEY });
                  message.success("已退出");
                  navigate(href("/:locale?/auth/login", { locale }), { replace: true });
                  return;
                }
                await revokeMutation.mutateAsync({ token: row.token });
                message.success("已注销该设备");
              } catch (e) {
                message.error(e instanceof Error ? e.message : "操作失败");
              }
            }}
          >
            <Button type="link" size="small" danger loading={revokeMutation.isPending}>
              注销
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12, fontSize: 14 }}>
        以下为通过 Better Auth 记录的活跃会话。令牌仅在服务端保存完整内容，此处不展示。
      </Typography.Paragraph>
      {isError ? (
        <Typography.Text type="danger">
          {(error as Error)?.message ?? "无法加载会话列表"}
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
