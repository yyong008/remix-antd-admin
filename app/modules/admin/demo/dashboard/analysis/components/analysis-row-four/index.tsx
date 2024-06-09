import { Card, Col } from "antd";

import BigDataArea from "./big-data-area";

export default function RowFour(props: any) {
  return (
    <Card>
      <Col span={24}>
        <BigDataArea {...props} />
      </Col>
    </Card>
  );
}
