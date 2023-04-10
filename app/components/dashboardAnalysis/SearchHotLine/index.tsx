// components:vendor
import {
  CaretDownOutlined,
  CaretUpOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space, Tooltip } from "antd";

// components
import AreaChart from "../../echarts/Area";

// core
import styled from "styled-components";

const SearchUserCount = styled.div`
  display: inline-block;
  height: 32px;
  margin-right: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  line-height: 32px;
`;

const SearchPercent = styled.span`
  margin-right: 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  vertical-align: top;
`;

const SearchText = styled.span`
  height: 22px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export function SearchHotLine() {
  return (
    <Row>
      <Col span={12}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Space direction="vertical">
            <Space>
              <SearchText>搜索用户数</SearchText>
              <Tooltip title="指标说明">
                <ExclamationCircleOutlined
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            </Space>
            <Space>
              <SearchUserCount>12,321</SearchUserCount>
              <SearchPercent>17.1 </SearchPercent>
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
              <SearchText>人均搜索次数</SearchText>
              <Tooltip title="指标说明">
                <ExclamationCircleOutlined
                  style={{ color: "rgba(0,0,0,.45)" }}
                />
              </Tooltip>
            </Space>
            <Space>
              <SearchUserCount>3.7</SearchUserCount>
              <SearchPercent>17.1 </SearchPercent>
              <CaretDownOutlined style={{ color: "green" }} />
            </Space>
          </Space>
          <AreaChart />
        </Card>
      </Col>
    </Row>
  );
}
