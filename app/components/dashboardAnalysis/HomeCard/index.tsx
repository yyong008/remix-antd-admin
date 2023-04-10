// core
import styled from "styled-components";

// components:vendor
import { Tooltip } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { InfoCircleOutlined } from "@ant-design/icons";

const TitleDiv = styled.div`
  color: rgba(0, 0, 0, 0.45);
`;

const HeaderWrapDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HHeader = (props: any) => {
  return (
    <HeaderWrapDiv>
      <TitleDiv>{props.title}</TitleDiv>
      <Tooltip title={props.tip}>
        <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
      </Tooltip>
    </HeaderWrapDiv>
  );
};

const HCoreData = (props: any) => {
  return (
    <div className="coreName">
      {props.unit ? <span className="unit">{props.unit}</span> : null}
      <span>{props.coreNum}</span>
    </div>
  );
};

const HFooter = (props: { children: any }) => {
  return <div className="home-card-footer">{props.children}</div>;
};

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
      <HHeader {...props} />
      <HCoreData {...props} />
      {props.content}
      <HFooter>{props.footer}</HFooter>
    </ProCard>
  );
}
