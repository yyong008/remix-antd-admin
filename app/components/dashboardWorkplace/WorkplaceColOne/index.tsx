import { Link } from "@remix-run/react";
import { Col, Space, Card, Row } from "antd";
import DynamicList from "../DynamicList";
import WProject from "../WProject";
import { colProps } from "../col";
import styled from "styled-components";

const CardGrid = styled(Card.Grid)`
  @media screen and (max-width: 768px) {
    width: 50% !important;
  }
  @media screen and (max-width: 480px) {
    width: 100% !important;
  }
`;


export default function WorkplaceColOne({data}: any) {
  return <Col {...colProps}>
          <Space direction="vertical">
            <Card
              title="进行中的项目"
              extra={<Link to={"/dashboard/analysis"}>全部项目</Link>}
              bodyStyle={{ padding: 0 }}
            >
              <Row>
                {data.wProjects.map((p: any, index: number) => (
                  <CardGrid key={index}>
                    <WProject p={p} />
                  </CardGrid>
                ))}
              </Row>
            </Card>
            <Card title="动态">
              <DynamicList data={data} />
            </Card>
          </Space>
        </Col>
}