import * as clientUtils from "~/utils/client";

import { Button, Popconfirm, Space, Tag } from "antd";
import {
  DeleteIt,
  FormatTime,
  StatusType,
  UserAvatar,
} from "~/components/common";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useFetcherChange, useUserNav } from "~/hooks";

import CreateUserModal from "~/modules/admin/system/user/user/CreateUserModel";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export function Route() {
  const [navUser] = useUserNav();
  const fetcher = useFetcherChange();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data } = useLoaderData<typeof loader>() as any;
  const { dataSource, depts, roles, total } = data;

  return (
    <PageContainer>
      <ProTable
        size="small"
        search={false}
        headerTitle="用户表"
        scroll={{ x: 1300 }}
        rowKey="id"
        showSorterTooltip
        rowSelection={{
          onChange: (selectedRowKeys) => {
            setSelectedRow(selectedRowKeys as any);
          },
        }}
        toolBarRender={() => [
          <CreateUserModal
            key="create"
            fetcher={fetcher}
            depts={depts}
            roles={roles}
            record={{}}
          />,
          <DeleteItWithSelect
            key="delete"
            selectedRow={selectedRow}
            fetcher={fetcher}
            setSelectedRow={setSelectedRow}
          />,
        ]}
        dataSource={dataSource as any[]}
        columns={[
          {
            dataIndex: "avatar",
            title: "头像",
            width: 100,
            render(_, record) {
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
            render(_: any, record) {
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
            render(_: any, record) {
              return <StatusType status={record.status} />;
            },
          },
          {
            dataIndex: "remark",
            title: "备注",
            ellipsis: true,
            render(_: any, record) {
              return <div>{record.remark}</div>;
            },
          },
          {
            dataIndex: "createdAt",
            title: "创建时间",
            ellipsis: true,
            render(_, record) {
              return (
                <>
                  {record.createdAt
                    ? clientUtils.formatDate(record.createdAt)
                    : "-"}
                </>
              );
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            ellipsis: true,
            align: "center",
            render(_, record) {
              return <FormatTime timeStr={record.updatedAt} />;
            },
          },
          {
            dataIndex: "op",
            title: "操作",
            fixed: "right",
            ellipsis: true,
            render(_, record) {
              return (
                <Space>
                  <CreateUserModal
                    fetcher={fetcher}
                    depts={depts}
                    roles={roles}
                    record={record}
                    key="mod-user-modal"
                  />
                  <DeleteIt fetcher={fetcher} record={record} title={"用户"} />
                </Space>
              );
            },
          },
        ]}
        pagination={{
          total: total,
          pageSize: 10,
          onChange(page, pageSize) {
            navUser({ page, pageSize });
          },
        }}
      />
    </PageContainer>
  );
}

function DeleteItWithSelect({ selectedRow, fetcher, setSelectedRow }: any) {
  return selectedRow.length > 0 ? (
    <Popconfirm
      key="del"
      title="确定要删除吗？"
      onConfirm={() => {
        fetcher.submit(
          {
            ids: selectedRow.map((row: any) => row.id),
          },
          {
            method: "DELETE",
            encType: "application/json",
          },
        );
        setSelectedRow([]);
      }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  ) : (
    <></>
  );
}

function UserRoleList({ list }: any) {
  return (
    <div>
      {list.map((_role: any, index: number) => {
        return <Tag key={index}>{_role.roles.name}</Tag>;
      })}
    </div>
  );
}
