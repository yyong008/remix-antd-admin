// components:vendor
import { Card, Row, Space } from "antd";

// cores
export default function Team({ data }: any) {
  return (
    <Row>
      {data.teams.map((item: any, index: number) => {
        return (
          <Card.Grid style={{ width: "50%" }} key={index}>
            <Space direction="vertical">
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={item.url}
                  alt=""
                />
              </div>
              <div>{item.title}</div>
            </Space>
          </Card.Grid>
        );
      })}
    </Row>
  );
}
