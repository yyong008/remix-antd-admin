//components:vendor
import { Space } from "antd";

// components
import AreaChart from "../../common/Area";
import HomeCard from "../../common/HomeCard";

export default function CardVisitsCount(props: any) {
  return (
    <>
      <HomeCard
        title={props.title}
        tip="指标说明"
        unit={null}
        coreNum={props.coreNum}
        content={<AreaChart {...props.areaChartData} />}
        footer={
          <Space>
            <span>{props?.footer?.title}</span>
            <span>{props?.footer?.count}</span>
          </Space>
        }
      />
    </>
  );
}
