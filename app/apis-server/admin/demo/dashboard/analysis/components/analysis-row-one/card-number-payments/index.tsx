import BarChart from "./bar-chart";
// comoponents
import HomeCard from "../../common/home-card";
// core
import { Space } from "antd";

export default function CardNumberPayments(props: any) {
  return (
    <>
      <HomeCard
        title={props.title}
        tip="指标说明"
        unit=""
        coreNum={props.coreNum}
        content={
          <div className="content">
            <BarChart {...props.barChartData} />
          </div>
        }
        footer={
          <Space>
            <Space>
              <span>{props.footer.title}</span>
              <span>{props.footer.precent}</span>
            </Space>
          </Space>
        }
      />
    </>
  );
}
