/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, theme } from "antd";

const ALink = ({ children }: any) => {
  const { token } = theme.useToken();

  return (
    <a href="#" style={{ color: token.colorPrimary }}>
      {children}
    </a>
  );
};

export default function CardLoggerTable({ dataSource = [] }: any) {
  const columns = [
    {
      title: "操作类型",
      dataIndex: "op",
      valueType: "select",
      align: "center",
      valueEnum: {
        a: { text: "订购关系生效" },
        b: { text: "财务复审" },
        c: { text: "部门初审" },
        d: { text: "部门初审" },
        e: { text: "创建订单" },
      },
    },
    {
      title: "操作人",
      dataIndex: "name",
      align: "center",
      render: (_: any) => <ALink>{_}</ALink>,
    },
    {
      title: "执行结果",
      dataIndex: "result",
      align: "center",
      sorter: false,
    },
    {
      title: "日期",
      dataIndex: "date",
      align: "center",
      sorter: false,
    },
    {
      title: "备注",
      key: "note",
      dataIndex: "note",
      width: 400,
      align: "center",
    },
  ];

  return (
    <Table
      style={{ padding: 0 }}
      columns={columns as any}
      dataSource={dataSource}
      rowKey="key"
      pagination={false}
    />
  );
}
