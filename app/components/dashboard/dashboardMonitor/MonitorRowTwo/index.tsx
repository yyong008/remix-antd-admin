import { Row, Col, Card } from "antd";

import PieChart from "./Pie";
import LiquidFill from "./LiquidFill";
// import SimpleWordcloud from "./WordCloud";

import { colPropsSSS, colPropsSSSS } from "../col";

export default function RowTwo() {
  return (
    <Row gutter={[10, 10]}>
      <Col {...colPropsSSS}>
        <Card title="各品类占比">
          <Row>
            <Col span={8}>
              <PieChart />
            </Col>
            <Col span={8}>
              <PieChart />
            </Col>
            <Col span={8}>
              <PieChart />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col {...colPropsSSSS}>
        <Card title="热门搜索">
          <LiquidFill />
        </Card>
      </Col>
      <Col {...colPropsSSSS}>
        <Card title="资源剩余">
          <LiquidFill />
        </Card>
      </Col>
    </Row>
  );
}
