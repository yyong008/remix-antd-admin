import { Row, Col, Card } from "antd";
import { TastBox } from "../styled";

const Tasks = () => {
  return (
    <Row gutter={[0, 0]}>
      <Col span={8}>
        <Card bordered={false}>
          <TastBox>
            <div>我的待办</div>
            <h2>8个任务</h2>
          </TastBox>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <TastBox>
            <div>本周任务平均处理时间</div>
            <h2>32分钟</h2>
          </TastBox>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <TastBox>
            <div>本周完成任务数</div>
            <h2>24个任务</h2>
          </TastBox>
        </Card>
      </Col>
    </Row>
  );
};

export default Tasks;
