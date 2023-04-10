import { Col, Space, Card, Row } from "antd";
import { FiveDimensionalChart } from "~/components/echarts";
import NavList from "../NavList";
import Team from "../Team";
import { colPropsSS } from "../col";

export default function WorkplaceTwo({ data }: any) {
  return (
    <Col {...colPropsSS}>
      <Space direction="vertical">
        <Card title="快速开始 / 便捷导航">
          <Row gutter={[10, 10]}>
            <NavList data={data} />
          </Row>
        </Card>
        <Card title="XX 指数">
          <FiveDimensionalChart />
        </Card>
        <Card title="团队">
          <Row gutter={[10, 10]}>
            <Team data={data} />
          </Row>
        </Card>
      </Space>
    </Col>
  );
}
