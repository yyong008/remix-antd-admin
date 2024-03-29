// types
import type { MetaFunction } from "@remix-run/node";

// react
import React, { useMemo } from "react";

// components
import * as Icons from "@ant-design/icons";
import { Alert, Card, Row, Space } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "lib-icons" }];
};

const gridStyle: React.CSSProperties = {
  width: "10%",
  textAlign: "center",
};

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
          const IconComponent = Icons[iconName];
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

export default function RenderAllAntdIcons() {
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
