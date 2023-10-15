import type { LinksFunction } from "@remix-run/node";

// core
import { useNavigate, useParams } from "@remix-run/react";

// css
import css from "../styles/pocker-card.css";
import amcss from "animate.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: css,
    },
    {
      rel: "stylesheet",
      href: amcss,
    },
  ];
};

export default function GamePockerGuess() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const handleJump = (k: string) => {
    navigate("/game/" + lang + "/pockercontent/" + k);
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
