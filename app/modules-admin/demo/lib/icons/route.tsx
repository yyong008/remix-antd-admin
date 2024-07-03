import * as Icons from "@ant-design/icons";

import { Alert, Card, Row, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import React, { useMemo } from "react";

const gridStyle: React.CSSProperties = {
  width: "10%",
  textAlign: "center",
};

export function Route() {
  const iconNames = useMemo(() => {
    return Object.keys(Icons).filter((icon) => /^[A-Z]/.test(icon[0]));
  }, []);
  const iconslist = useMemo(() => {
    const alphabetArray = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i),
    );
    const iconslist = alphabetArray
      .map((letter, index) => {
        return iconNames.filter((icon) =>
          icon.startsWith(letter.toUpperCase()),
        );
      }, [])
      .filter((icon) => icon.length > 0);
    return iconslist;
  }, [iconNames]);

  return (
    <PageContainer
      header={{ title: `antd icons（total: ${iconNames.length}）` }}
    >
      <ProCard>
        <Space direction="vertical">
          {iconslist.map((iconNames, index) => {
            return (
              <Card key={index}>
                <AlphaList iconNames={iconNames} />
              </Card>
            );
          })}
        </Space>
      </ProCard>
    </PageContainer>
  );
}

function AlphaList(props: any) {
  return (
    <div>
      <Alert
        message={`Alpha：${props.iconNames[0][0]}`}
        type="success"
        style={{ margin: "10px 0px" }}
      />
      <Row>
        {props.iconNames.map((iconName: any, index: number) => {
          const IconComponent = (Icons as any)[iconName];
          return (
            <Card.Grid key={index} style={gridStyle}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px",
                }}
              >
                <IconComponent style={{ margin: "10px", fontSize: "20px" }} />
                <div
                  style={{
                    margin: "10px",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  {iconName}
                </div>
              </div>
            </Card.Grid>
          );
        })}
      </Row>
    </div>
  );
}
