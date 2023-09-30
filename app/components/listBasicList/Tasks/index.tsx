import { Row, Col, Card } from "antd";

const Tasks = () => {
  return (
    <Row gutter={[0, 0]}>
      <Col span={8}>
        <Card bordered={false}>
          <div>
            <div>我的待办</div>
            <h2>8个任务</h2>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <div>
            <div>本周任务平均处理时间</div>
            <h2>32分钟</h2>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <div>
            <div>本周完成任务数</div>
            <h2>24个任务</h2>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Tasks;
