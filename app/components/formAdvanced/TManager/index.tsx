import { ProFormText, ProFormSelect, ProFormDateTimePicker } from "@ant-design/pro-components";
import { Card, Row, Col } from "antd";

const TManager = function () {
  return (
    <>
      <Card title="任务管理">
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <ProFormText label="任务名" fieldProps={{}} />
          </Col>
          <Col span={6} offset={2}>
            <ProFormText label="任务描述" />
          </Col>
          <Col span={6} offset={2}>
            <ProFormSelect
              label="执行人"
              options={[
                { label: "张三", value: "1" },
                { label: "李四", value: "2" },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <ProFormText label="责任人" />
          </Col>
          <Col span={6} offset={2}>
            <ProFormDateTimePicker label="生效日期" />
          </Col>
          <Col span={6} offset={2}>
            <ProFormSelect
              label="任务类型"
              options={[
                { label: "公开", value: "open" },
                { label: "私密", value: "close" },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default TManager