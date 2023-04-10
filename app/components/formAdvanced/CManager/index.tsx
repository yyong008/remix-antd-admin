import {
  ProFormText,
  ProFormSelect,
  ProFormDateRangePicker,
} from "@ant-design/pro-components";
import { Card, Row, Col } from "antd";

export default function CManager() {
  return (
    <>
      <Card title="仓库管理">
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <ProFormText label="仓库名" fieldProps={{}} />
          </Col>
          <Col span={6} offset={2}>
            <ProFormText
              label="仓库域名"
              fieldProps={{
                addonAfter: ".com",
                addonBefore: "http://",
              }}
            />
          </Col>
          <Col span={6} offset={2}>
            <ProFormSelect
              label="仓库管理员"
              options={[
                { label: "张三", value: "1" },
                { label: "李四", value: "2" },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <ProFormText label="审批人" />
          </Col>
          <Col span={6} offset={2}>
            <ProFormDateRangePicker label="生效日期" />
          </Col>
          <Col span={6} offset={2}>
            <ProFormSelect
              label="仓库类型"
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
}
