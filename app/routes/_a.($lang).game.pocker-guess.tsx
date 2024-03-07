// core
import { useNavigate, useParams } from "@remix-run/react";

// css
import "../styles/pocker-card.css";
import "animate.css";

export default function GamePockerGuess() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const handleJump = (k: string) => {
    navigate("/" + lang + "/game/pockercontent/" + k);
  };
  return (
    <div className="card-container">
      <div
        className="card"
        onClick={() => {
          handleJump("hei");
        }}
      >
        ♠
      </div>
      <div
        className="card"
        onClick={() => {
          handleJump("hong");
        }}
      >
        ♥
      </div>
      <div
        className="card"
        onClick={() => {
          handleJump("mei");
        }}
      >
        ♣
      </div>
      <div
        className="card"
        onClick={() => {
          handleJump("zhuan");
        }}
      >
        ♦
      </div>
    </div>
  );
}
