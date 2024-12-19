import { Card, Table, theme } from "antd";

import { MoreOutlined } from "@ant-design/icons";
import { SearchHotLine } from "./search-hot-line";

export default function OnlineSearch(props: any) {
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
      key: "count",
    },
    {
      title: "周涨幅",
      dataIndex: "weeklyGains",
      key: "weeklyGains",
    },
  ];
  return (
    <Card
      title="线上热门搜索"
      extra={<MoreOutlined />}
      style={{
        height: "550px",
      }}
      bodyStyle={{
        padding: "0px 24px",
      }}
    >
      <SearchHotLine {...props} />
      <Table
        rowKey="id"
        bordered={false}
        dataSource={props.dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        size="small"
      />
    </Card>
  );
}
