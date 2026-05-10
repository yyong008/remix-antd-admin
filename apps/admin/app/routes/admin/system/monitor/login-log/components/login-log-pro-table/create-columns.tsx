import { formatDate } from "~/utils/client";

export const createColumns = () => [
  {
    dataIndex: "name",
    title: "用户名",
    ellipsis: true,
  },
  {
    dataIndex: "ip",
    title: "ip",
    ellipsis: true,
  },
  {
    dataIndex: "address",
    title: "地址",
    ellipsis: true,
  },
  {
    dataIndex: "system",
    title: "系统",
    ellipsis: true,
  },
  {
    dataIndex: "browser",
    title: "浏览器",
    ellipsis: true,
  },
  {
    dataIndex: "loginAt",
    title: "登录时间",
    ellipsis: true,
    render(_: any, record: any) {
      return <div>{record.loginAt ? formatDate(record.loginAt) : "-"}</div>;
    },
  },
];
