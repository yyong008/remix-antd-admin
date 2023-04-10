export type TableListItem = {
  key: number;
  name: string;
  desc: string;
  callcount: string;
  status: string;
  beforeCallTime: string;
};

const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.unshift({
    key: i,
    name: `TradeCode ${i}`,
    desc: "这是一段描述",
    callcount: `${300 + 1}万`,
    status: "running",
    beforeCallTime: `${new Date().toLocaleString()}`,
  });
}

export { tableListDataSource };
