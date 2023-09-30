// core

// components:vendor
import { Tooltip } from "antd";
import { ProCard } from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";

const { InfoCircleOutlined } = _icons;

type HomeCardProps = {
  title: string;
  tip: string;
  coreNum: string;
  content: JSX.Element;
  unit: string | null;
  footer: JSX.Element;
};

export default function HomeCard(props: HomeCardProps) {
  return (
    <ProCard className="home-card">
      <div className="cardContent">
        <div>{props.title}</div>
        <Tooltip title={props.tip}>
          <InfoCircleOutlined />
        </Tooltip>
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
