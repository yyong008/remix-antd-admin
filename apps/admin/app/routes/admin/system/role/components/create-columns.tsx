import { Button, Form, Popconfirm, Space, Tag, Tooltip, Typography, message } from "antd";
import {
  DeleteOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { StatusType } from "~/components/common";
import { UpdateRoleModal } from "./update-role-modal";
import { useDeleteRole } from "~/api-client/queries/system/system-role";
import { auth } from "~/utils/client/auth";
import { m } from "~/paraglide/messages";

type CreateColumnsParams = {
  locale?: any;
  menus: any;
  refetch: any;
};

function DeleteAction({ record, refetch }: any) {
  const deleteRoles = useDeleteRole();
  return (
    <Form>
      <Popconfirm
        title={m.system_role_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];
          await deleteRoles.mutateAsync({ ids });
          refetch?.();
          message.success(m.system_delete_success());
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteRoles.isPending} />
      </Popconfirm>
    </Form>
  );
}

function RoleNameCell({ record }: { record: any }) {
  const name = record?.name ?? "—";
  if (auth.isSuperAdmin(record)) {
    return (
      <Space align="center" size={8}>
        <Tag icon={<CrownOutlined />} color="red" style={{ margin: 0, border: 0 }}>
          {name}
        </Tag>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {m.system_role_super_admin()}
        </Typography.Text>
      </Space>
    );
  }
  if (auth.isAdmin(record)) {
    return (
      <Space align="center" size={8}>
        <Tag icon={<SafetyCertificateOutlined />} color="blue" style={{ margin: 0, border: 0 }}>
          {name}
        </Tag>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {m.system_role_admin()}
        </Typography.Text>
      </Space>
    );
  }
  return (
    <Space align="center" size={8}>
      <UserOutlined style={{ color: "var(--ant-color-text-tertiary)" }} />
      <Typography.Text strong style={{ color: "var(--ant-color-text)" }}>
        {name}
      </Typography.Text>
    </Space>
  );
}

export const createColumns = (params: CreateColumnsParams) => {
  const { menus, refetch } = params;
  return [
    {
      title: m.system_role_column_name(),
      dataIndex: "name",
      width: 220,
      fixed: "left" as const,
      render(_: unknown, record: any) {
        return <RoleNameCell record={record} />;
      },
    },
    {
      title: m.system_role_column_value(),
      dataIndex: "value",
      width: 140,
      ellipsis: true,
      render(v: string) {
        return (
          <Typography.Text code copyable={{ text: v }} style={{ fontSize: 12 }}>
            {v || "—"}
          </Typography.Text>
        );
      },
    },
    {
      title: m.system_role_column_description(),
      dataIndex: "description",
      ellipsis: true,
      render(text: string) {
        const t = text?.trim() || "—";
        return (
          <Tooltip title={t === "—" ? undefined : t}>
            <Typography.Text
              ellipsis
              style={{ maxWidth: Math.min(320, window.innerWidth), color: "var(--ant-color-text)" }}
            >
              {t}
            </Typography.Text>
          </Tooltip>
        );
      },
    },
    {
      dataIndex: "status",
      title: m.system_role_column_status(),
      width: 96,
      align: "center" as const,
      render(_: unknown, record: any) {
        return <StatusType status={record.status} />;
      },
    },
    {
      title: m.system_action(),
      key: "actions",
      width: 120,
      align: "center" as const,
      fixed: "right" as const,
      render(_: unknown, record: any) {
        return (
          <Space size="small">
            <UpdateRoleModal record={record} menu={menus} refetch={refetch} />
            <DeleteAction record={record} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
};
