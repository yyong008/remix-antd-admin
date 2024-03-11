/* eslint-disable jsx-a11y/anchor-is-valid */
// types
import type { ProColumns } from "@ant-design/pro-components";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import * as _icons from "@ant-design/icons";
import { Button, Form, Space, theme } from "antd";
import { ProTable, ModalForm, ProFormText } from "@ant-design/pro-components";

// libs
import { lastValueFrom } from "rxjs";

// service
import { getTableListDataSource$ } from "~/services/profile/profile.server";

// icons
const { PlusOutlined } = _icons;

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "list-table-list" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const { tableListDataSource } = await lastValueFrom(
    getTableListDataSource$(),
  );
  return json(tableListDataSource);
};

export type TableListItem = {
  key: number;
  name: string;
  desc: string;
  callcount: string;
  status: string;
  beforeCallTime: string;
};

function AddButtonModal() {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建规则"
      trigger={
        <Button type="primary" key="primary">
          <PlusOutlined /> 新建
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      submitTimeout={2000}
    >
      <ProFormText name="id" label="规则名称" />
      <ProFormText name="project" label="规则描述" />
    </ModalForm>
  );
}

export default function ListTableListPage() {
  const { token } = theme.useToken();
  const data = useLoaderData<typeof loader>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "规则名称",
      tooltip: "规则名称是唯一的 key",
      width: 120,
      dataIndex: "name",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (_) => (
        <a href="#" style={{ color: token.colorPrimary }}>
          {_}
        </a>
      ),
    },
    {
      title: "描述",
      dataIndex: "desc",
      width: 200,
    },
    {
      title: "服务器调用次数",
      width: 120,
      dataIndex: "callcount",
    },
    {
      title: "状态",
      width: 100,
      dataIndex: "status",
      initialValue: "all",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        close: { text: "关闭", status: "Default" },
        running: { text: "运行中", status: "Processing" },
        online: { text: "已上线", status: "Success" },
        error: { text: "异常", status: "Error" },
      },
    },
    {
      title: "上次调度时间",
      width: 80,
      dataIndex: "beforeCallTime",
    },
    {
      title: "操作",
      width: 180,
      key: "option",
      valueType: "option",
      render: () => [
        <Space key="op">
          <a key="link" style={{ color: token.colorPrimary }}>
            配置
          </a>
          <a key="link2" style={{ color: token.colorPrimary }}>
            订阅删除
          </a>
        </Space>,
      ],
    },
  ];

  return (
    <ProTable<TableListItem>
      dataSource={data}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      dateFormatter="string"
      headerTitle="查询表格"
      toolBarRender={() => [<AddButtonModal key="id" />]}
    />
  );
}
