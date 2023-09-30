// components:vendor
import * as _icons from '@ant-design/icons';

const { CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } = _icons

import { Card, Col, Row, Space, Tooltip } from "antd";

// components
import AreaChart from "../Area";

export function SearchHotLine() {
  return (
    <Row>
      <Col span={12}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Space direction="vertical">
            <Space>
              <span>搜索用户数</span>
              <Tooltip title="指标说明">
                <ExclamationCircleOutlined
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            </Space>
            <Space>
              <div>12,321</div>
              <div>17.1 </div>
              <CaretUpOutlined style={{ color: "red" }} />
            </Space>
          </Space>
          <AreaChart />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Space direction="vertical">
            <Space>
              <span>人均搜索次数</span>
              <Tooltip title="指标说明">
                <ExclamationCircleOutlined
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            </Space>
            <Space>
              <div>3.7</div>
              <div>17.1 </div>
              <CaretDownOutlined style={{ color: "green" }} />
            </Space>
          </Space>
          <AreaChart />
        </Card>
      </Col>
    </Row>
  );
}
