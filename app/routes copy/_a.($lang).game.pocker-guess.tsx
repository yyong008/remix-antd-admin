import type { LinksFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

// css
import css from "../styles/pocker-card.css";
import amcss from 'animate.css'

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

export default function () {
  const navigate = useNavigate()
  const handleJump = (k: string) => {
    navigate('/pockercontent/' + k)
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
