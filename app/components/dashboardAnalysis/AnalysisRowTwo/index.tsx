// components:vendor
import { Row, Col } from "antd";

// components
import SealCard from "../SealCard";

export default function RowTwo() {
  return (
    <Row>
      <Col span={24}>
        <SealCard />
      </Col>
    </Row>
  );
}
