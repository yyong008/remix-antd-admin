import type { MetaFunction } from "@remix-run/react";

// remix
import { useNavigate, useParams } from "@remix-run/react";

// styles
import "~/styles/game/pocker-card.css";
import "animate.css";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "game-pocker-guess" }];
};

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
export default function GamePockerGuess() {
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
