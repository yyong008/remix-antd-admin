//components:vendor
import { Space } from "antd";

// components
import AreaChart from "../../echarts/Area";
import HomeCard from "../HomeCard";

export default function CardVisitsCount() {
  return (
    <>
      <HomeCard
        title="访问量"
        tip="指标说明"
        unit={null}
        coreNum={"6,560"}
        content={<AreaChart />}
        footer={
          <Space>
            <span>日访问量</span>
            <span>1,234</span>
          </Space>
        }
      />
    </>
  );
}
