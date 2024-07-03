import { pockerEmojis } from "~/__mock__/db/game/pocker";

type IList = {
  hs: "hei" | "hong" | "mei" | "zhuan";
  handleChoice: (index: number) => void;
};

export default function PockerList({ hs, handleChoice }: IList) {
  const handle = (index: number) => {
    handleChoice(index);
  };
  return (
    <div>
      <div className="pockerlist">
        {pockerEmojis[hs].slice(0, 13).map((unicode, index) => {
          return (
            <div
              key={index}
              className="pocker-list-item"
              onClick={() => handle(index + 1)}
            >
              {unicode}
            </div>
          );
        })}
      </div>
      <div className="pockerlist">
        {pockerEmojis[hs].slice(13).map((unicode, index) => {
          return (
            <div
              key={index}
              className="jockers"
              onClick={() => {
                handle(index + 14);
              }}
            >
              {unicode}
            </div>
          );
        })}
      </div>
    </div>
  );
}
