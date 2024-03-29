// cores
import { useState } from "react";

// components
import { Col, Row, Tabs } from "antd";
import { ProCard } from "@ant-design/pro-components";

// components:vendor
import Bar from "./Bar";
import List from "./List";
import { TabBarExtra } from "./TabBarExtra";

export default function SealCard({ monthSales, monthVisit }: any) {
  const [tab, setTab] = useState("tab1");
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
                  <Bar optionsData={monthSales} />
                </Col>
                <Col sm={24} md={24} lg={6} xl={6}>
                  <List list={monthSales.part} />
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
                  <Bar optionsData={monthVisit} />
                </Col>
                <Col span={6}>
                  <List list={monthVisit.part} />
                </Col>
              </Row>
            ),
          },
        ]}
        onChange={(key) => {
          setTab(key);
        }}
        tabBarExtraContent={<TabBarExtra />}
      />
    </ProCard>
  );
}
