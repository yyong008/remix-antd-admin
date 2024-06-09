import { PageContainer, ProCard } from "@ant-design/pro-components";
import { filter, map, scan } from "rxjs/operators";
import { fromEvent, merge } from "rxjs";
import { useEffect, useRef } from "react";

const step = 10;

export function Route() {
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
    <PageContainer>
      <ProCard>
        <div className="flex flex-col items-center justify-center h-[70vh] bg-red-400">
          <h1>左右移动方块游戏 (RxJS)</h1>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            style={{ border: "1px solid black" }}
          />
        </div>
      </ProCard>
    </PageContainer>
  );
}
