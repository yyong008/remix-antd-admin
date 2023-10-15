import { Link } from "@remix-run/react";
import { Col, Space, Card, Row } from "antd";

import WProject from "./WProject";
import DynamicList from "./DynamicList";

import { colProps } from "../col";

export default function WorkplaceColOne({ data }: any) {
  return (
    <Col {...colProps}>
      <Space direction="vertical">
        <Card
          title="进行中的项目"
          extra={<Link to={"/dashboard/analysis"}>全部项目</Link>}
          bodyStyle={{ padding: 0 }}
        >
          <Row>
            {data.wProjects.map((p: any, index: number) => (
              <Card.Grid key={index}>
                <WProject p={p} />
              </Card.Grid>
            ))}
          </Row>
        </Card>
        <Card title="动态">
          <DynamicList data={data} />
        </Card>
      </Space>
    </Col>
  );
}
