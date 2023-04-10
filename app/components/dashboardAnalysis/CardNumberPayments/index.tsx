// core
import { Space } from "antd";

// comoponents
import HomeCard from "../HomeCard";
import BarChart from "../../echarts/BarChart";

export default function CardNumberPayments() {
  return (
    <>
      <HomeCard
        title="支付笔数"
        tip="指标说明"
        unit=""
        coreNum={"960"}
        content={
          <div className="content">
            <BarChart />
          </div>
        }
        footer={
          <Space>
            <Space>
              <span>转化率</span>
              <span>60%</span>
            </Space>
          </Space>
        }
      />
    </>
  );
}
