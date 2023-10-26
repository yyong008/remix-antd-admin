// core
import { useState } from "react";

// components:vendors
import { Space } from "antd";

// components
import { UpDown } from "../../common/UpDown";
import HomeCard from "../../common/HomeCard";

export default function CardTotalSales(props: any) {
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
      title={props.title}
      tip={props.tip}
      unit={props.unit}
      coreNum={props.coreNum}
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
          <span>{props.footer?.title}</span>
          <span>
            {props.footer?.unit} {props.footer?.price}
          </span>
        </Space>
      }
    />
  );
}
