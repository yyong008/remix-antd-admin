// types
import type {
  ActionFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// react
import { useState } from "react";

// remix
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import * as _icon from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Form, Image, Popconfirm, Space, Tag } from "antd";
import CreateUserModal from "~/components/system/user/CreateUserModel";
import StatusType from "~/components/common/StatusType";

// services
import {
  createUser,
  deleteUserByIds,
  getUserList,
  updateUserById,
  getUserCount,
} from "~/services/system/user";
import { getRoleList } from "~/services/system/role";
import { getDeptListTree } from "~/services/system/dept";

// utils
import { formatDate } from "~/utils/utils";

import {
  userSchema,
  deleteUserSchema,
  userUpdateSchema,
} from "~/schema/user.schema";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";

// icons
const { DeleteOutlined, EditOutlined } = _icon;

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-User" },
    { name: "System-User", content: "System-User" },
  ];
};

// remix:action
export const action: ActionFunction = async ({ request }) => {
  const method = request.method;
  if (method === "POST") {
    const userData = await request.json();
    try {
      const validatedUser = userSchema.parse(userData);

      const user = await createUser(validatedUser);

      if (user) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: "fail" });
      }
    } catch (error) {
      // 如果验证失败，捕获并处理错误
      console.error("Validation error:", error.errors);
      return json({ code: 1, data: {}, message: error?.errors });
    }
  } else if (method === "DELETE") {
    const userData = await request.json();

    try {
      const validateUserData = deleteUserSchema.parse(userData);
      const data: any = await deleteUserByIds(validateUserData.ids);
      if (data) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: data });
      }
    } catch (error) {
      console.error("Validation error:", error.errors);
      return json({ code: 1, data: {}, message: error?.errors });
    }
  } else if (method === "PUT") {
    const userData = await request.json();
    try {
      const validateUserData = userUpdateSchema.parse(userData);
      const data = await updateUserById(userData.id, validateUserData);
      if (data) {
        return json({ code: 0, data: {}, message: "success" });
      } else {
        return json({ code: 1, data: {}, message: data });
      }
    } catch (error) {
      console.error("Validation error:", error?.errors);
      return json({ code: 1, data: {}, message: error?.errors });
    }
  }
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let { searchParams } = new URL(request.url);
  let page = Number(searchParams.get("page") ?? 1);
  let pageSize = Number(searchParams.get("pageSize") ?? 10);
  let name = searchParams.get("name") ?? "";

  return json({
    count: await getUserCount(),
    dataSource: await getUserList({ page, pageSize, name }),
    roles: await getRoleList(),
    depts: await getDeptListTree(),
  });
};

export default function SystemUserRoute() {
  const { dataSource, depts, roles, count } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  const navigate = useNavigate();
  const { lang } = useParams();
  const [selectedRow, setSelectedRow] = useState([]);

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
          onChange: (_, selectedRows: any) => {
            setSelectedRow(selectedRows);
          },
        }}
        toolBarRender={() => [
          <CreateUserModal
            key="create"
            fetcher={fetcher}
            depts={depts}
            roles={roles}
            record={{}}
            trigger={
              <Button type="primary" icon={<EditOutlined />}>
                新建
              </Button>
            }
          />,
          <DeleteIt
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
              return (
                <div className="w-[20px] h-[20px] rounded-[20px] overflow-hidden">
                  {
                    <Image
                      src={record.avatar ? record.avatar : "/images/user.jpg"}
                    />
                  }
                </div>
              );
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
              return (
                <div>
                  {record.roles.map((_role: any, index: number) => {
                    return <Tag key={index}>{_role.role.name}</Tag>;
                  })}
                </div>
              );
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
                <>{record.createdAt ? formatDate(record.createdAt) : "-"}</>
              );
            },
          },
          {
            dataIndex: "updatedAt",
            title: "更新时间",
            ellipsis: true,
            align: "center",
            render(_, record) {
              return (
                <div>
                  {record.updatedAt ? formatDate(record.updatedAt) : "-"}
                </div>
              );
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
                    key="user-modal"
                    trigger={<Button type="link" icon={<EditOutlined />} />}
                  />
                  <Form>
                    <Popconfirm
                      title="确定要删除此用户吗?"
                      onConfirm={() => {
                        fetcher.submit(
                          { ids: [record.id] },
                          { method: "DELETE", encType: "application/json" },
                        );
                      }}
                    >
                      <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Form>
                </Space>
              );
            },
          },
        ]}
        pagination={{
          total: count,
          pageSize: 10,
          onChange(page, pageSize) {
            navigate(`/${lang}/system/user?page=${page}&pageSize=${pageSize}`);
          },
        }}
      />
    </PageContainer>
  );
}

function DeleteIt({ selectedRow, fetcher, setSelectedRow }: any) {
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
