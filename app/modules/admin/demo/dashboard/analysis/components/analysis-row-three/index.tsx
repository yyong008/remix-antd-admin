// components:vendor
import { Col, Row } from "antd";
// cols
import { colPropsSS, colPropsSSS } from "../col";

import OnlineSearch from "./online-search";
// components:vendors
import SealPercent from "./seal-percent";

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
