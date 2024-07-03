// 主要在世界上使用的四种扑克牌套组：方块（◆），梅花（♣），红心（♥）和黑桃（♠），每张纸牌都有对应的Unicode字符。
// 提示💡：除前5个表情符号外，其余均为Unicode字符，而不是emoji。

import { useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { pockerEmojis } from "~/__mock__/db/game/pocker";

type IITem = {
  guess: number;
  num: number;
  hs: "hei" | "hong" | "mei" | "zhuan";
  showResult?: boolean;
  status: "idle" | "success" | "failure";
};

export default function PockerItem({ num, hs, guess, status }: IITem) {
  const [showResult, setShowResult] = useState(false);

  const styles = useCallback(() => {
    let s: any = {};

    if (status === "failure") {
      s.border = "2px solid red";
      s.boxShadow = "11px 12px 12px 0 rgba(182, 50, 50, 0.1)";
    }

    if (status === "success") {
      s.border = "2px solid green";
    }

    if (status === "idle") {
      s.border = "2px solid #000";
    }
    return s;
  }, [status]);

  useEffect(() => {
    num !== 0 && setShowResult(true);
  }, [num]);

  useEffect(() => {
    if (num - 1 === guess) {
      var myCanvas = document.createElement("canvas");
      document.body.appendChild(myCanvas);

      var end = Date.now() + 15 * 1000;

      // go Buckeyes!
      var colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [num, guess]);

  return (
    <div
      className={`pockeritem-container animate__animated animate__backInDown`}
      style={styles()}
    >
      <div className="pockeritem-guess">
        <div className="pockeritem-title">猜测扑克牌：</div>
        <div className="pocker-guess-item">
          {showResult && num - 1 === guess ? pockerEmojis[hs][guess] : "?"}
        </div>
      </div>
      <div className="pockeritem-choice">
        <div className="pockeritem-title">选择的扑克牌：</div>
        <div className="pocker-guess-item">
          {showResult && num !== 0 ? pockerEmojis[hs][num - 1] : "?"}
        </div>
      </div>
    </div>
  );
}
