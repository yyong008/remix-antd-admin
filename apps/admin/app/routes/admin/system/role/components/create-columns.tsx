import { DeleteAction } from "./DeleteAction";
import { Space, Tag, Tooltip, Typography } from "antd";
import { StatusType } from "~/components/common";
import { UpdateRoleModal } from "./UpdateRoleModal";
import { CrownOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { auth } from "~/utils/client/auth";

type CreateColumnsParams = {
  locale?: any;
  menus: any;
  refetch: any;
};

function RoleNameCell({ record }: { record: any }) {
  const name = record?.name ?? "—";
  if (auth.isSuperAdmin(record)) {
    return (
      <Space align="center" size={8}>
        <Tag icon={<CrownOutlined />} color="red" style={{ margin: 0, border: 0 }}>
          {name}
        </Tag>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          超管
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
          管理员
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
      title: "角色",
      dataIndex: "name",
      width: 220,
      fixed: "left" as const,
      render(_: unknown, record: any) {
        return <RoleNameCell record={record} />;
      },
    },
    {
      title: "标识",
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
      title: "描述",
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
      title: "状态",
      width: 96,
      align: "center" as const,
      render(_: unknown, record: any) {
        return <StatusType status={record.status} />;
      },
    },
    {
      title: "操作",
      key: "actions",
      width: 120,
      align: "center" as const,
      fixed: "right" as const,
      render(_: unknown, record: any) {
        return (
          <Space size="small">
            <UpdateRoleModal
              record={record}
              key={`edit-${record.id}`}
              menu={menus}
              refetch={refetch}
            />
            <DeleteAction title="确定要删除此角色吗？" record={record} refetch={refetch} />
          </Space>
        );
      },
    },
  ];
};
