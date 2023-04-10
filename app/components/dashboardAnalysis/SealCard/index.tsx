// cores
import { useState } from "react";
import styled from "styled-components";

// components
import { Col, Row, Space, Tabs, theme } from "antd";
import { ProCard, ProFormDateRangePicker } from "@ant-design/pro-components";

// components:vendor
import Bar from "../Bar";
import List from "./List";

const PA = styled.a`
  color: ${(props: { active: any; color: string }) =>
    props.active ? props.color : "#000"};
  align-items: center;
`;

export default function SealCard() {
  const [tab, setTab] = useState("tab1");
  const [idx, setIdx] = useState(0);
  const { token } = theme.useToken();
  return (
    <ProCard>
      <Tabs
        tabPosition="top"
        activeKey={tab}
        items={[
          {
            label: `销售额`,
            key: "tab1",
            children: (
              <Row gutter={[8, 8]}>
                <Col sm={24} md={24} lg={18} xl={18}>
                  <Bar />
                </Col>
                <Col sm={24} md={24} lg={6} xl={6}>
                  <List />
                </Col>
              </Row>
            ),
          },
          {
            label: `访问量`,
            key: "tab2",
            children: (
              <Row gutter={[10, 10]}>
                <Col span={18}>
                  <Bar />
                </Col>
                <Col span={6}>
                  <List />
                </Col>
              </Row>
            ),
          },
        ]}
        onChange={(key) => {
          setTab(key);
        }}
        tabBarExtraContent={
          <Space size="large">
            <Space>
              {["今日", "本周", "本月", "本年"].map((it, index) => {
                return (
                  <PA
                    active={index === idx}
                    color={token.colorPrimary}
                    key={index}
                    onClick={() => {
                      setIdx(index);
                    }}
                  >
                    {it}
                  </PA>
                );
              })}
            </Space>
            <ProFormDateRangePicker name="dateRange" label="日期区间" noStyle />
          </Space>
        }
      />
    </ProCard>
  );
}
