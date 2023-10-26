// components:vendors
import { Row, Col } from "antd";

// components
import CardTotalSales from "./CardTotalSales";
import CardVisitsCount from "./CardVisitsCount";
import CardNumberPayments from "./CardNumberPayments";
import CardActivityEffectiveness from "./CardActivityEffectiveness";

// col
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
