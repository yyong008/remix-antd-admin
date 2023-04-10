// components:vendor
import { Row, Col } from "antd";

// components:vendors
import SealPercent from "../SealPercent";
import OnlineSearch from "../OnlineSearch";

// cols
import { colPropsSS, colPropsSSS } from "../col";

export default function RowThree() {
  return (
    <Row gutter={[8, 8]}>
      <Col {...colPropsSS}>
        <OnlineSearch />
      </Col>
      <Col {...colPropsSSS}>
        <SealPercent />
      </Col>
    </Row>
  );
}
