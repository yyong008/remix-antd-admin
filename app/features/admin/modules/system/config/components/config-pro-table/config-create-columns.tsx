export const createConfigTableColumns = () => [
  {
    dataIndex: "name",
    title: "参数名称",
  },
  {
    dataIndex: "key",
    title: "参数名字",
  },
  {
    dataIndex: "value",
    title: "参数键值",
  },
  {
    dataIndex: "description",
    title: "描述",
  },
  {
    dataIndex: "remark",
    title: "备注",
  },
  {
    dataIndex: "createdAt",
    title: "创建时间",
  },
  {
    dataIndex: "updateAt",
    title: "创建时间",
  },
  {
    dataIndex: "op",
    title: "操作",
    render(_: any, record: any) {
      return <div>record</div>;
    },
  },
];
