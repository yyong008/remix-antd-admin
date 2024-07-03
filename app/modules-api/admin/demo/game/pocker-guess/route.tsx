import "./styles/pocker-card.css";
import "animate.css";

import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@remix-run/react";

const PockerCard = (props: { content: string; addr: string }) => {
  const navigate = useNavigate();
  const { lang } = useParams();

  const handleJump = (k: string) => {
    navigate(`/${lang}/game/pockercontent/${k}`);
  };
  return (
    <div
      className="card"
      onClick={() => {
        handleJump(props.addr);
      }}
    >
      {props.content}
    </div>
  );
};

export function Route() {
  return (
    <PageContainer>
      <ProCard>
        <div className="card-container bg-orange-400">
          <PockerCard content="♠" addr="hei" />
          <PockerCard content="♥" addr="hong" />
          <PockerCard content="♣" addr="mei" />
          <PockerCard content="♦" addr="zhuan" />
        </div>
      </ProCard>
    </PageContainer>
  );
}
