// components:vendor
import { Col } from "antd";

// cores
export default function Team({ data }: any) {
  return (
    <>
      {data.teams.map((item: any, index: number) => {
        return (
          <Col span={12} key={index}>
            <div>
              <div style={{ width: "24px",  height: "24px", borderRadius: '50%', overflow: 'hidden' }}>
                <img style={{ width: "100%",  height: "100%" }} src={item.url} alt="" />
              </div>
              <div>{item.title}</div>
            </div>
          </Col>
        );
      })}
    </>
  );
}
