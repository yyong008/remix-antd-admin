import type { MetaFunction } from "@remix-run/react";

// remix
import { useNavigate, useParams } from "@remix-run/react";

// styles
import "../styles/pocker-card.css";
import "animate.css";

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
    <div className="card-container">
      <PockerCard content="♠" addr="hei" />
      <PockerCard content="♥" addr="hong" />
      <PockerCard content="♣" addr="mei" />
      <PockerCard content="♦" addr="zhuan" />
    </div>
  );
}
