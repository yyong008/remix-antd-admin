import * as clientUtils from "@/utils/client";

import { FormatTime, StatusType, UserAvatar } from "@/components/common";

import { ColumnsOp } from "./columns-op";
import { Tag } from "antd";

export const createUserTableColumns = ({
  depts,
  roles,
  colorPrimary,
  reload,
}: any) => [
  {
    dataIndex: "avatar",
    title: "头像",
    width: 50,
    align: "center",
    render(_: any, record: any) {
      return <UserAvatar avatar={record.avatar} name={record?.name} />;
    },
    hideInSearch: true,
  },
  {
    dataIndex: "name",
    title: "用户名",
    align: "center",
    ellipsis: true,
    render(_: any, record: any) {
      return (
        <h1 style={{ color: colorPrimary }} className="font-bold">
          {record.name}
        </h1>
      );
    },
  },
  {
    dataIndex: "roles",
    title: "角色",
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <UserRoleList list={record.UserRole} />;
    },
    hideInSearch: true,
  },
  {
    dataIndex: "email",
    title: "邮箱",
    align: "center",
    ellipsis: true,
    hideInSearch: true,
  },
  {
    dataIndex: "lang",
    title: "语言",
    align: "center",
    ellipsis: true,
    hideInSearch: true,
  },
  {
    dataIndex: "theme",
    title: "主题",
    align: "center",
    ellipsis: true,
    hideInSearch: true,
    render(_: any, record: any) {
      if (record.theme === "dark") {
        return <Tag>亮色</Tag>;
      }
      return <Tag color="cyan">{record.theme}</Tag>;
    },
  },
  {
    dataIndex: "department",
    title: "部门",
    ellipsis: true,
    hideInSearch: true,
    align: "center",
    render(_: any, record: any) {
      return <Tag>{record.department?.name}</Tag>;
    },
  },
  {
    dataIndex: "phone",
    title: "手机号码",
    align: "center",
    hideInSearch: true,
    ellipsis: true,
  },
  {
    dataIndex: "status",
    title: "状态",
    align: "center",
    hideInSearch: true,
    ellipsis: true,
    render(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "remark",
    title: "备注",
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <div>{record.remark}</div>;
    },
  },
  {
    dataIndex: "createdAt",
    title: "创建时间",
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return (
        <>{record.createdAt ? clientUtils.formatDate(record.createdAt) : "-"}</>
      );
    },
  },
  {
    dataIndex: "updatedAt",
    title: "更新时间",
    hideInSearch: true,
    ellipsis: true,
    align: "center",
    render(_: any, record: any) {
      return <FormatTime timeStr={record.updatedAt} />;
    },
  },
  {
    dataIndex: "op",
    title: "操作",
    fixed: "right",
    ellipsis: true,
    hideInSearch: true,
    render(_: any, record: any) {
      return (
        <ColumnsOp
          depts={depts}
          roles={roles}
          record={record}
          reload={reload}
        />
      );
    },
  },
];

function UserRoleList({ list }: any) {
  if (list.length === 0) {
    return "-";
  }
  return (
    <div>
      {list.map((_role: any, index: number) => {
        return <Tag key={index}>{_role.roles.name}</Tag>;
      })}
    </div>
  );
}
