import { PageContainer, ProCard } from "@ant-design/pro-components";
import { filter, map, scan } from "rxjs/operators";
import { fromEvent, merge } from "rxjs";
import { useEffect, useRef } from "react";

const step = 10;

export function Component() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas.getContext("2d") as any;

    const leftKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowLeft"),
      map(() => ({ x: -step, y: 0 })),
    );

    const rightKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowRight"),
      map(() => ({ x: step, y: 0 })),
    );

    const upKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowUp"),
      map(() => ({ x: 0, y: -step })),
    );

    const downKeyStream = fromEvent(document, "keydown").pipe(
      filter((event: any) => event.key === "ArrowDown"),
      map(() => ({ x: 0, y: step })),
    );

    const moveStream = merge(
      leftKeyStream,
      rightKeyStream,
      upKeyStream,
      downKeyStream,
    ).pipe(
      scan(
        (position, delta) => {
          const x = Math.max(0, Math.min(400 - 50, position.x + delta.x));
          const y = Math.max(0, Math.min(200 - 50, position.y + delta.y));
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
    <PageContainer>
      <ProCard>
        <div className="flex flex-col items-center justify-center h-[70vh] bg-red-400">
          <h1>四方向移动方块游戏 (RxJS)</h1>
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
