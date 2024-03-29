// core
import { useState } from "react";

// components:vendor
import { Card, Dropdown, Radio, Space } from "antd";
import * as _icons from "@ant-design/icons";

// components
import MainPie from "../../common/Pie";

const { MoreOutlined } = _icons;

export default function SealPercent(props: any) {
  const [size, setSize] = useState("all");
  return (
    <Card
      title="销售额类别占比"
      extra={
        <Space>
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value="all">全部渠道</Radio.Button>
            <Radio.Button value="online">线上</Radio.Button>
            <Radio.Button value="store">门店</Radio.Button>
          </Radio.Group>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  label: <a href="#">操作1</a>,
                },
                {
                  key: "2",
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  label: <a href="#">操作2</a>,
                },
              ],
            }}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      }
      style={{
        height: "550px",
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
      }}
    >
      {size === "all" && <MainPie datas={props.all} />}
      {size === "online" && <MainPie datas={props.online} />}
      {size === "store" && <MainPie datas={props.store} />}
    </Card>
  );
}
