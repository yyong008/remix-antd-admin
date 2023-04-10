// components:vendor
import { Col, Button } from "antd";

export default function NavList({ data }: any) {
  return (
    <>
      {data.navs.map((item: string, index: number) => {
        return (
          <Col span={6} key={index}>
            {item}
          </Col>
        );
      })}
      <Button type="primary" ghost size="small">
        + 添加
      </Button>
    </>
  );
}
