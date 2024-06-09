// components:vendor
import { Card, Col } from "antd";

// components
import BigDataArea from "./big-data-area";

export default function RowFour(props) {
  return (
    <Card>
      <Col span={24}>
        <BigDataArea {...props} />
      </Col>
    </Card>
  );
}
