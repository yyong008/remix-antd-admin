// core
import { useState } from "react";

// components:vendor
import { MoreOutlined } from "@ant-design/icons";
import { Card, Dropdown, Radio, Space } from "antd";

// components
import MainPie from "../Pie";

export default function SealPercent() {
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
        height: "502px",
      }}
    >
      {size === "all" && <MainPie />}
      {size === "online" && <MainPie />}
      {size === "store" && <MainPie />}
    </Card>
  );
}
