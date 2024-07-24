import AreaChart from "../../common/area";
import HomeCard from "../../common/home-card";
import { Space } from "antd";

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
