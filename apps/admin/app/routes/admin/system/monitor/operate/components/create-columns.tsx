import { Tag } from "antd";
import { formatDate } from "~/utils/client";
import { m } from "~/paraglide/messages";

export const createColumns = () => [
  {
    dataIndex: "userId",
    title: m.system_monitor_operate_column_user_id(),
    ellipsis: true,
    render(_: any, record: any) {
      if (record.userId === 0) {
        return <div>{m.system_monitor_operate_column_user_not_logged_in()}</div>;
      }
      return <div>{record.userId}</div>;
    },
  },
  {
    dataIndex: "username",
    title: m.system_monitor_operate_column_username(),
    ellipsis: true,
  },
  {
    dataIndex: "ipAddress",
    title: m.system_monitor_operate_column_ip(),
    ellipsis: true,
  },
  {
    dataIndex: "path",
    title: m.system_monitor_operate_column_path(),
    ellipsis: true,
  },
  {
    dataIndex: "url",
    title: m.system_monitor_operate_column_url(),
    ellipsis: true,
  },
  {
    dataIndex: "statusCode",
    title: m.system_monitor_operate_column_status_code(),
    ellipsis: true,
    render(_: any, record: any) {
      if (record.statusCode >= 200 && record.statusCode < 300) {
        return <Tag color="green">{record.statusCode}</Tag>;
      }

      if (record.statusCode > 300 && record.statusCode < 400) {
        return <Tag color="blue">{record.statusCode}</Tag>;
      }
      return <Tag color="red">{record.statusCode || "-"}</Tag>;
    },
  },
  {
    dataIndex: "createdAt",
    title: m.system_created_at(),
    ellipsis: true,
    render(_: any, record: any) {
      return <div>{record.createdAt ? formatDate(record.createdAt) : "-"}</div>;
    },
  },
  {
    dataIndex: "updatedAt",
    title: m.system_updated_at(),
    ellipsis: true,
    render(_: any, record: any) {
      return <div>{record.updatedAt ? formatDate(record.updatedAt) : "-"}</div>;
    },
  },
];
