// core
import { useState } from "react";

// components:vendors
import { Space } from "antd";

// components
import { UpDown } from "../../common/UpDown";
import HomeCard from "../../common/HomeCard";

const data = {
  title: "总销售额",
  tip: "指标说明",
  unit: "￥",
  coreNum: "126,560",
  week: {
    num: "12%",
    status: "up",
  },
  day: {
    num: "11%",
    status: "down",
  },
  footer: {
    title: "日销售额",
    unit: "￥",
    price: "12,423",
  },
};

export default function CardTotalSales(props = data) {
  const [data] = useState([
    {
      name: "周同比",
      num: props?.week?.num || "0%",
      status: props?.week?.status || "up",
    },
    {
      name: "日同比",
      num: props?.day?.num || "0%",
      status: props?.day?.status || "down",
    },
  ]);

  return (
    <HomeCard
      title={props.title || "总销售额"}
      tip={props.tip || "指标说明"}
      unit={props.unit || "￥"}
      coreNum={props.coreNum || "126,560"}
      content={
        <div className="content">
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
          <span>{props.footer?.price || "日销售额"}</span>
          <span>{props.footer?.unit || "￥12,423"}</span>
        </Space>
      }
    />
  );
}
