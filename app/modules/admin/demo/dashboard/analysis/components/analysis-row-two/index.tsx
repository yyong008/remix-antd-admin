// components:vendor
import { Col, Row } from "antd";

// components
import SealCard from "./seal-card";

export default function RowTwo({
  monthSales,
  monthVisit,
  monthPartSaleData,
}: any) {
  return (
    <Row>
      <Col span={24}>
        <SealCard
          monthSales={monthSales}
          monthVisit={monthVisit}
          monthPartSaleData={monthPartSaleData}
        />
      </Col>
    </Row>
  );
}
