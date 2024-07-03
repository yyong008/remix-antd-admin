// components:vendor
import { Col, Row, Space } from "antd";

import AreaChart from "../../../common/area";
import HomeCard from "../../../common/home-card";

export function SearchHotLine(props: any) {
  return (
    <Row>
      <Col span={12}>
        <HomeCard
          title={props.searchAvageCountData.title}
          tip="指标说明"
          unit={null}
          coreNum={props.coreNum}
          content={<AreaChart {...props.searchAvageCountData.areaChartData} />}
          footer={
            <Space>
              <span>{props?.searchAvageCountData?.footer?.title}</span>
              <span>{props?.searchAvageCountData?.footer?.count}</span>
            </Space>
          }
        />
      </Col>
      <Col span={12}>
        <HomeCard
          title={props.searchCountData.title}
          tip="指标说明"
          unit={null}
          coreNum={props.coreNum}
          content={<AreaChart {...props.searchCountData.areaChartData} />}
          footer={
            <Space>
              <span>{props?.searchCountData?.footer?.title}</span>
              <span>{props?.searchCountData?.footer?.count}</span>
            </Space>
          }
        />
      </Col>
    </Row>
  );
}
