import * as clientUtils from "@/utils/client";

import {
  DeleteIt,
  FormatTime,
  StatusType,
  UserAvatar,
} from "@/components/common";
import { Space, Tag } from "antd";

import { CreateUserModal } from "../create-user-model";

export const createUserTableColumns = ({ depts, roles }: any) => [
  {
    dataIndex: "avatar",
    title: "头像",
    width: 100,
    render(_: any, record: any) {
      return <UserAvatar avatar={record.avatar} />;
    },
  },
  {
    dataIndex: "name",
    title: "用户名",
    ellipsis: true,
  },
  {
    dataIndex: "nickname",
    title: "昵称",
    ellipsis: true,
  },
  {
    dataIndex: "roles",
    title: "角色",
    ellipsis: true,
    render(_: any, record: any) {
      return <UserRoleList list={record.UserRole} />;
    },
  },
  {
    dataIndex: "email",
    title: "邮箱",
    ellipsis: true,
  },
  {
    dataIndex: "lang",
    title: "语言",
    ellipsis: true,
  },
  {
    dataIndex: "theme",
    title: "主题",
    ellipsis: true,
  },
  {
    dataIndex: "department",
    title: "部门",
    ellipsis: true,
    render(_: any, record: any) {
      return <Tag>{record.department?.name}</Tag>;
    },
  },
  {
    dataIndex: "phone",
    title: "手机号码",
    ellipsis: true,
  },
  {
    dataIndex: "status",
    title: "状态",
    ellipsis: true,
    render(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "remark",
    title: "备注",
    ellipsis: true,
    render(_: any, record: any) {
      return <div>{record.remark}</div>;
    },
  },
  {
    dataIndex: "createdAt",
    title: "创建时间",
    ellipsis: true,
    render(_: any, record: any) {
      return (
        <>{record.createdAt ? clientUtils.formatDate(record.createdAt) : "-"}</>
      );
    },
  },
  {
    dataIndex: "updatedAt",
    title: "更新时间",
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
    render(_: any, record: any) {
      return (
        <Space>
          <CreateUserModal
            fetcher={() => []}
            depts={depts}
            roles={roles}
            record={record}
            key="mod-user-modal"
          />
          <DeleteIt fetcher={() => {}} record={record} title={"用户"} />
        </Space>
      );
    },
  },
];

function UserRoleList({ list }: any) {
  return (
    <div>
      {list.map((_role: any, index: number) => {
        return <Tag key={index}>{_role.roles.name}</Tag>;
      })}
    </div>
  );
}
