// core
import { useState } from "react";

// components:vendors
import { Space } from "antd";

// components
import { UpDown } from "../../common/UpDown";
import HomeCard from "../../common/HomeCard";

export default function CardTotalSales() {
  const [data] = useState([
    { name: "周同比", num: "12%", status: "up" },
    { name: "日同比", num: "11%", status: "down" },
  ]);
  return (
    <HomeCard
      title="总销售额"
      tip="指标说明"
      unit="￥"
      coreNum={"126,560"}
      content={
        <div>
          <Space size="large">
            {data.map((item) => {
              return (
                <Space key={item.name}>
                  <Space>
                    <span>{item.name}</span>
                    <span>{item.num}</span>
                  </Space>
                  <UpDown item={item} />
                </Space>
              );
            })}
          </Space>
        </div>
      }
      footer={
        <Space>
          <span>日销售额</span>
          <span>￥12,423</span>
        </Space>
      }
    />
  );
}
