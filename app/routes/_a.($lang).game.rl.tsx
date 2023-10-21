import { useRef, useEffect } from "react";
import { fromEvent, merge } from "rxjs";
import { scan, filter, map } from "rxjs/operators";

const step = 10;
const Game = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    const leftKeyStream = fromEvent(document, "keydown").pipe(
      filter((event) => event.key === "ArrowLeft"),
      map(() => -step),
    );

    const rightKeyStream = fromEvent(document, "keydown").pipe(
      filter((event) => event.key === "ArrowRight"),
      map(() => step),
    );

    const moveStream = merge(leftKeyStream, rightKeyStream).pipe(
      scan((x, dx) => Math.max(0, Math.min(400 - 50, x + dx)), 0),
    );

    const subscription = moveStream.subscribe((x) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(x, 90, 50, 50);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>左右移动方块游戏 (RxJS)</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default Game;
