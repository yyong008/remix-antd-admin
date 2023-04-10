// core
import { useState } from "react";

// components: vendor
import { Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

// components
import HomeCard from "../HomeCard";
import BulletChart from "../../echarts/Bullet";

const UpDown = ({ item }: any) => {
  return (
    <>
      {item.status === "up" ? (
        <CaretUpOutlined style={{ color: "green" }} />
      ) : item.status === "down" ? (
        <CaretDownOutlined style={{ color: "red" }} />
      ) : null}
    </>
  );
};

export default function CardActivityEffectiveness() {
  const [data] = useState([
    { name: "周同比", num: "12%", status: "up" },
    { name: "日同比", num: "11%", status: "down" },
  ]);
  return (
    <>
      <HomeCard
        title="运营活动效果"
        tip="指标说明"
        unit={null}
        coreNum={"78%"}
        content={
          <div className="content">
            <BulletChart />
          </div>
        }
        footer={
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
        }
      />
    </>
  );
}
