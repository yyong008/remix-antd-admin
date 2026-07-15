import { formatDate } from "~/utils/client";
import { m } from "~/paraglide/messages";

export const createColumns = () => [
  {
    dataIndex: "name",
    title: m.system_monitor_login_log_column_name(),
    ellipsis: true,
  },
  {
    dataIndex: "ip",
    title: m.system_monitor_login_log_column_ip(),
    ellipsis: true,
  },
  {
    dataIndex: "address",
    title: m.system_monitor_login_log_column_address(),
    ellipsis: true,
  },
  {
    dataIndex: "system",
    title: m.system_monitor_login_log_column_system(),
    ellipsis: true,
  },
  {
    dataIndex: "browser",
    title: m.system_monitor_login_log_column_browser(),
    ellipsis: true,
  },
  {
    dataIndex: "loginAt",
    title: m.system_monitor_login_log_column_login_at(),
    ellipsis: true,
    render(_: any, record: any) {
      return <div>{record.loginAt ? formatDate(record.loginAt) : "-"}</div>;
    },
  },
];
