import * as ic from "@ant-design/icons";

/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Space, Table, theme } from "antd";

const { EllipsisOutlined } = ic;

const ALink = ({ children }: any) => {
  const { token } = theme.useToken();

  return (
    <a href="#" style={{ color: token.colorPrimary }}>
      {children}
    </a>
  );
};

export default function ReturnItemsList({ dataSource = [] }: any) {
  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_: any) => <ALink>{_}</ALink>,
    },
    {
      title: "商品数量",
      dataIndex: "containers",
      key: "containers",
      align: "center",
      sorter: false,
    },
    {
      title: "创建者",
      dataIndex: "creator",
      key: "creator",
      valueType: "select",
      align: "center",
      valueEnum: {
        all: { text: "全部" },
        a: { text: "name_a" },
        b: { text: "name_b" },
        c: { text: "name_c" },
        d: { text: "name_d" },
        e: { text: "name_e" },
      },
    },
    {
      title: "操作",
      key: "option",
      width: 400,
      valueType: "option",
      align: "center",
      render: () => [
        <Space>
          <ALink key="link">编辑</ALink>
          <ALink key="warn">删除</ALink>
          <ALink key="more">
            <EllipsisOutlined />
          </ALink>
        </Space>,
      ],
    },
  ];

  return (
    <div>
      <div>退货商品</div>
      <Table
        style={{ padding: 0 }}
        columns={columns as any}
        dataSource={dataSource}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}
