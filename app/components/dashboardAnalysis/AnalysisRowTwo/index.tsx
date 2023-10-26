// components:vendor
import { Row, Col } from "antd";

// components
import SealCard from "./SealCard";

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
