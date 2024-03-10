// types
import type { MetaFunction } from "@remix-run/node";

// react
import { useRef, useEffect } from "react";

// rxjs
import { fromEvent, merge } from "rxjs";
import { scan, filter, map } from "rxjs/operators";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "game-rl" }];
};

const step = 10;

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d") as any;

    const leftKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowLeft"),
      map(() => -step),
    );

    const rightKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowRight"),
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
}
