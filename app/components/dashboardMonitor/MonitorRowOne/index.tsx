import { useRef } from "react";

import { Row, Col, Card, Space } from "antd";

// components
import ChinaMap from "./Map";
import DChart from "./DynamicData";
import MainGauge from "./Gauge";

// cols
import { colProps, colPropsSS } from "../col";

export default function RowOne() {
  const CardRef = useRef<any>();
  return (
    <Row gutter={[10, 10]}>
      <Col {...colProps}>
        <Card
          title="中国地图省级行政单位"
          ref={CardRef}
          style={{ height: "810px" }}
        >
          <ChinaMap />
        </Card>
      </Col>
      <Col {...colPropsSS}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card title="活动情况预测">
            <DChart />
          </Card>
          <Card title="券核效率">
            <MainGauge />
          </Card>
        </Space>
      </Col>
    </Row>
  );
}
