// components:vendors
import { Row, Col } from "antd";

// components
import CardTotalSales from "../CardTotalSales";
import CardVisitsCount from "../CardVisitsCount";
import CardNumberPayments from "../CardNumberPayments";
import CardActivityEffectiveness from "../CardActivityEffectiveness"

// col
import { colProps } from "../col";

export default function RowOne() {
  return (
    <Row gutter={[8, 8]}>
      <Col {...colProps}>
        <CardTotalSales />
      </Col>
      <Col {...colProps}>
        <CardVisitsCount />
      </Col>
      <Col {...colProps}>
        <CardNumberPayments />
      </Col>
      <Col {...colProps}>
        <CardActivityEffectiveness />
      </Col>
    </Row>
  );
}
