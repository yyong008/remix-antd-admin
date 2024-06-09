import { Card, Col, Row } from "antd";

// components
import Storke from "./stroke";
// cols
import { colPropsSSS } from "../col";

export default function RowThree() {
  return (
    <Row gutter={[10, 10]}>
      <Col {...colPropsSSS}>
        <Card title="绘制 stoke">
          <Storke text="Remix" />
        </Card>
      </Col>
      <Col {...colPropsSSS}>
        <Card title="绘制 stoke">
          <Storke text="Admin" duration={3000} />
        </Card>
      </Col>
    </Row>
  );
}
