// components:vendor
import { Row, Col } from "antd";

// components:vendors
import SealPercent from "./SealPercent";
import OnlineSearch from "./OnlineSearch";

// cols
import { colPropsSS, colPropsSSS } from "../col";

export default function RowThree(props: any) {
  return (
    <Row gutter={[8, 8]}>
      <Col {...colPropsSS}>
        <OnlineSearch
          searchCountData={props.searchCountData}
          searchAvageCountData={props.searchAvageCountData}
          {...props.search}
          dataSource={props.dataSource}
        />
      </Col>
      <Col {...colPropsSSS}>
        <SealPercent {...props.pies} />
      </Col>
    </Row>
  );
}
