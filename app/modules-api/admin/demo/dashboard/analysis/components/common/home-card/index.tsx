// core

import * as ic from "@ant-design/icons";

// components:vendor
import { Space, Tooltip } from "antd";

import { ProCard } from "@ant-design/pro-components";

const { InfoCircleOutlined } = ic;

type HomeCardProps = {
  title: string;
  tip: string;
  coreNum: string;
  content: JSX.Element;
  unit: string | null;
  footer: JSX.Element;
  style?: React.CSSProperties;
};

export default function HomeCard(props: HomeCardProps) {
  return (
    <ProCard className="home-card" style={props.style}>
      <div className="cardContent">
        <Space>
          <div>{props.title}</div>
          <Tooltip title={props.tip}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      </div>
      <div className="coreName">
        {props.unit ? <span className="unit">{props.unit}</span> : null}
        <span>{props.coreNum}</span>
      </div>
      {props.content}
      <div className="home-card-footer">{props.footer}</div>
    </ProCard>
  );
}
