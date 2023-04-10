const tableListDataSource: any = [];

const creators = ["付小小", "五月天", "林东东", "陈帅帅", "兼某某"];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: "商品名称" + i,
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const loggers = {
  card1: [
    {
      op: "订购关系生效",
      name: "张三",
      result: "-",
      date: new Date().toLocaleDateString(),
      note: "备注",
    },
    {
      op: "财务复审",
      name: "李四",
      result: "-",
      date: new Date().toLocaleDateString(),
      note: "不通过原因",
    },
    {
      op: "部门初审",
      name: "Tom",
      result: "",
      date: new Date().toLocaleDateString(),
      note: "很棒",
    },
    {
      op: "提交订单",
      name: "Jerry",
      result: "",
      date: new Date().toLocaleDateString(),
      note: "优秀",
    },
    {
      op: "创建订单",
      name: "Hank",
      result: "",
      date: new Date().toLocaleDateString(),
      note: "初一",
    },
  ],
  card2: [
    {
      op: "提交订单",
      name: "Jerry",
      result: "-",
      date: new Date().toLocaleDateString(),
      note: "优秀",
    },
  ],
  card3: [],
};

export { tableListDataSource, loggers };
