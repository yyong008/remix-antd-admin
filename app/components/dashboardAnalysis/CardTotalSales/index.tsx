// core
import { useState } from "react";
import styled from "styled-components";

// components:vendors
import { Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

// comoponents
import HomeCard from "../HomeCard";

// styled
const Div46 = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
`;

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

export default function CardTotalSales() {
  const [data] = useState([
    { name: "周同比", num: "12%", status: "up" },
    { name: "日同比", num: "11%", status: "down" },
  ]);
  return (
    <>
      <HomeCard
        title="总销售额"
        tip="指标说明"
        unit="￥"
        coreNum={"126,560"}
        content={
          <Div46>
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
          </Div46>
        }
        footer={
          <Space>
            <span>日销售额</span>
            <span>￥12,423</span>
          </Space>
        }
      />
    </>
  );
}
