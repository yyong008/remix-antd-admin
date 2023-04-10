// components:vendor
import { Card, Table, theme } from "antd";
import { MoreOutlined } from "@ant-design/icons";

// components
import { SearchHotLine } from "../SearchHotLine";

const dataSource: any[] = [];

for (let i = 0; i < 50; i++) {
  dataSource.unshift({
    id: i,
    rank: `${i + 1}`,
    desc: `搜索关键字 - ${i}`,
    count: 123,
    weeklyGains: `${1 + i}%`,
  });
}

export default function OnlineSearch() {
  const { token } = theme.useToken();
  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "搜索关键",
      dataIndex: "desc",
      key: "desc",
      render(_: any, r: any) {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href="#"
            style={{
              color: token.colorPrimary,
            }}
          >
            {r.desc}
          </a>
        );
      },
    },
    {
      title: "用户数量",
      dataIndex: "count",
    },
    {
      title: "周涨幅",
      dataIndex: "weeklyGains",
    },
  ];
  return (
    <Card
      title="线上热门搜索"
      extra={<MoreOutlined />}
      bodyStyle={{
        padding: "0px 24px",
      }}
    >
      <SearchHotLine />
      <Table
        bordered={false}
        rowKey="name"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        size="small"
        key="id"
      />
    </Card>
  );
}
