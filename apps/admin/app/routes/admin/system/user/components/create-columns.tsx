import { FormatTime, StatusType, UserAvatar } from "~/components/common";
import { ColumnsOp } from "./columns-op";
import { Tag } from "antd";
import { m } from "~/paraglide/messages";

export const createUserTableColumns = ({ depts, roles, reload }: any) => [
  {
    dataIndex: "avatar",
    title: m.system_user_column_avatar(),
    width: 50,
    align: "center",
    render(_: any, record: any) {
      return <UserAvatar avatar={record.avatar} name={record?.name} />;
    },
    hideInSearch: true,
  },
  {
    dataIndex: "name",
    title: m.system_user_column_name(),
    align: "center",
    ellipsis: true,
    render(_: any, record: any) {
      return <span style={{ fontWeight: 700, fontSize: "inherit" }}>{record.name}</span>;
    },
  },
  {
    dataIndex: "roles",
    title: m.system_user_column_roles(),
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <UserRoleList list={record.UserRole} />;
    },
    hideInSearch: true,
  },
  {
    dataIndex: "email",
    title: m.system_user_column_email(),
    align: "center",
    ellipsis: true,
    hideInSearch: true,
  },
  {
    dataIndex: "lang",
    title: m.system_user_column_lang(),
    align: "center",
    ellipsis: true,
    hideInSearch: true,
  },
  {
    dataIndex: "theme",
    title: m.system_user_column_theme(),
    align: "center",
    ellipsis: true,
    hideInSearch: true,
    render(_: any, record: any) {
      if (record.theme === "dark") {
        return <Tag>{m.theme_dark()}</Tag>;
      }
      if (record.theme === "light") {
        return <Tag color="cyan">{m.theme_light()}</Tag>;
      }
      return <Tag color="cyan">{record.theme}</Tag>;
    },
  },
  {
    dataIndex: "department",
    title: m.system_user_column_department(),
    ellipsis: true,
    hideInSearch: true,
    align: "center",
    render(_: any, record: any) {
      return <Tag>{record.department?.name}</Tag>;
    },
  },
  {
    dataIndex: "phone",
    title: m.system_user_column_phone(),
    align: "center",
    hideInSearch: true,
    ellipsis: true,
  },
  {
    dataIndex: "status",
    title: m.system_user_column_status(),
    align: "center",
    hideInSearch: true,
    ellipsis: true,
    render(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "remark",
    title: m.system_user_column_remark(),
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <div>{record.remark}</div>;
    },
  },
  {
    dataIndex: "createdAt",
    title: m.system_created_at(),
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <>{record.createdAt ? formatDate(record.createdAt) : "-"}</>;
    },
  },
  {
    dataIndex: "updatedAt",
    title: m.system_updated_at(),
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <FormatTime timeStr={record.updatedAt} />;
    },
  },
  {
    dataIndex: "op",
    title: m.system_action(),
    fixed: "right",
    ellipsis: true,
    hideInSearch: true,
    render(_: any, record: any) {
      return <ColumnsOp depts={depts} roles={roles} record={record} reload={reload} />;
    },
  },
];

function UserRoleList({ list }: any) {
  if (!list?.length) return "-";
  return (
    <div>
      {list.map((_role: any, index: number) => (
        <Tag key={index}>{_role.roles.name}</Tag>
      ))}
    </div>
  );
}

function formatDate(v: any) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleDateString();
  } catch {
    return "-";
  }
}
