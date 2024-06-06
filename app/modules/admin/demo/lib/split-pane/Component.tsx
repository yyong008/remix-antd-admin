import "allotment/dist/style.css";

import { Button, Col, Row } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Allotment } from "allotment";
import React from "react";

type Panel = {
  label: string;
  id: string;
};

export function Component() {
  const [panels, setPanels] = React.useState<Panel[]>([]);

  const closePane = (pid: string) => {
    const newPanels = panels.filter((_p) => _p.id !== pid);
    if (newPanels.length === 0) {
      setPanels([]);
    } else {
      setPanels(newPanels);
    }
  };
  return (
    <PageContainer>
      <ProCard className="bg-yellow-400">
        <Row gutter={16}>
          <Col span={12}>
            <ProCard className="bg-green-300" style={{ height: "600px" }}>
              <Allotment vertical>
                <Allotment.Pane minSize={100}>竖向</Allotment.Pane>
                <Allotment.Pane minSize={100}>
                  <Allotment snap>
                    {panels.map((p) => (
                      <Allotment.Pane key={p.id} minSize={100} snap={false}>
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: "#ccc",
                            padding: "8px",
                          }}
                        >
                          {p.label}{" "}
                          <Button onClick={(e) => closePane(p.id)}>X</Button>
                        </div>
                      </Allotment.Pane>
                    ))}
                  </Allotment>
                </Allotment.Pane>
              </Allotment>
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard className="bg-blue-300" style={{ height: "600px" }}>
              <Allotment>
                <Allotment.Pane minSize={100}>横向</Allotment.Pane>
                <Allotment.Pane minSize={100}>
                  <Allotment snap>
                    {panels.map((p) => (
                      <Allotment.Pane key={p.id} minSize={100} snap={false}>
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: "#ccc",
                            padding: "8px",
                          }}
                        >
                          {p.label}{" "}
                          <Button onClick={(e) => closePane(p.id)}>X</Button>
                        </div>
                      </Allotment.Pane>
                    ))}
                  </Allotment>
                </Allotment.Pane>
              </Allotment>
            </ProCard>
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
}
