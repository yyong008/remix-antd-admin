/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { EllipsisOutlined } from "@ant-design/icons";
import { Space, Table, theme } from "antd";

import { TDiv } from "../index";

const ALink = ({ children }: any) => {
  const { token } = theme.useToken();

  return (
    <a href="#" style={{ color: token.colorPrimary }}>
      {children}
    </a>
  );
};

export default function ReturnProgress({ dataSource = [] }) {
  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      align: "center",
      render: (_: any) => <ALink>{_}</ALink>,
    },
    {
      title: "商品数量",
      dataIndex: "containers",
      align: "center",
      sorter: false,
    },
    {
      title: "创建者",
      dataIndex: "creator",
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
      title: "日期",
      dataIndex: "date",
      align: "center",
      sorter: false,
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
      <TDiv>退货进度</TDiv>
      <Table
        columns={columns as any}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
      />
    </div>
  );
}
