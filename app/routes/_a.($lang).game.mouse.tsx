// types
import type { MetaFunction } from "@remix-run/node";

// react
import { useRef, useEffect } from "react";

// libs
import { fromEvent } from "rxjs";
import { map, scan } from "rxjs/operators";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "game-mouse" }];
};

const step = 10;

export default function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d") as any;

    const canvasRect = canvas.getBoundingClientRect();

    const mouseMoveStream = fromEvent(canvas, "mousemove").pipe(
      map((event: any) => {
        return {
          x: event.clientX - canvasRect.left - 25, // 25 is half of the square width
          y: event.clientY - canvasRect.top - 25, // 25 is half of the square height
        };
      }),
    );

    const moveStream = mouseMoveStream.pipe(
      scan(
        (position, target) => {
          const deltaX = target.x - position.x;
          const deltaY = target.y - position.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance <= step) {
            return target;
          }

          const ratio = step / distance;
          const x = position.x + deltaX * ratio;
          const y = position.y + deltaY * ratio;

          return { x, y };
        },
        { x: 0, y: 0 },
      ),
    );

    const subscription = moveStream.subscribe((position) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(position.x, position.y, 50, 50);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>使用鼠标控制方块移动 (RxJS)</h1>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}
