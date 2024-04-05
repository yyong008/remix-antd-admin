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
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag } from "antd";
import CreateUserModal from "~/components/system/user/CreateUserModel";
import StatusType from "~/components/common/StatusType";
import UserAvatar from "~/components/common/UserAvatar";
import DeleteIt from "~/components/common/DeleteIt";

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
import { auth } from "~/services/common/auth.server";

// utils
import { formatDate } from "~/utils/utils";
import { getPaginationByRequest } from "~/utils/pagination.util";
import { respSuccessJson } from "~/utils/response.json";

// schema
import {
  userSchema,
  deleteUserSchema,
  userUpdateSchema,
} from "~/schema/user.schema";

// hooks
import { useFetcherChange } from "~/hooks/useFetcherChange";
import { useUserNav } from "~/hooks/router/user.route";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-User" }];
};

// remix:action
export const action: ActionFunction = async ({ request, params }) => {
  const [userId, redirectToLogin] = await auth({
    request,
    params,
  } as LoaderFunctionArgs);

  if (!userId) {
    return redirectToLogin();
  }
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
  params,
}: LoaderFunctionArgs) => {
  const [userId, redirectToLogin] = await auth({
    request,
    params,
  } as LoaderFunctionArgs);

  if (!userId) {
    return redirectToLogin();
  }
  const { page, pageSize, name } = await getPaginationByRequest(request);
  return respSuccessJson({
    total: await getUserCount(),
    dataSource: await getUserList({ page, pageSize, name }),
    roles: await getRoleList(),
    depts: await getDeptListTree(),
  });
};

export default function SystemUserRoute() {
  const [navUser] = useUserNav();
  const fetcher = useFetcherChange();
  const [selectedRow, setSelectedRow] = useState([]);
  const {
    data: { dataSource, depts, roles, total },
  } = useLoaderData<typeof loader>();

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
          onChange: (selectedRowKeys, selectedRows: any) => {
            setSelectedRow(selectedRowKeys);
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
              return (
                <div>
                  {record.UserRole.map((_role: any, index: number) => {
                    return <Tag key={index}>{_role.roles.name}</Tag>;
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
