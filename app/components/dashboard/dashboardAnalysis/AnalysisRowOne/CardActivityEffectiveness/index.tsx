// core
import { useState } from "react";

// components: vendor
import { Space } from "antd";
import { UpDown } from "../../common/UpDown";

// components
import HomeCard from "../../common/HomeCard";
import BulletChart from "./Bullet";

export default function CardActivityEffectiveness(props: any) {
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
    <>
      <HomeCard
        title={props.title}
        tip="指标说明"
        unit={null}
        coreNum={props.coreNum}
        content={
          <div className="content">
            <BulletChart data={props.bullet} />
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
