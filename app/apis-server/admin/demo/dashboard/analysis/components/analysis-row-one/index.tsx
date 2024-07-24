import { Col, Row } from "antd";

import CardActivityEffectiveness from "./card-activity-effectiveness";
import CardNumberPayments from "./card-number-payments";
import CardTotalSales from "./card-total-sales";
import CardVisitsCount from "./card-visits-count";
import { colProps } from "../col";

export default function RowOne(props: any) {
  return (
    <Row gutter={[8, 8]}>
      <Col {...colProps}>
        <CardTotalSales {...props.salesData} />
      </Col>
      <Col {...colProps}>
        <CardVisitsCount {...props.visitCountData} />
      </Col>
      <Col {...colProps}>
        <CardNumberPayments {...props.paymentData} />
      </Col>
      <Col {...colProps}>
        <CardActivityEffectiveness {...props.activeData} />
      </Col>
    </Row>
  );
}
