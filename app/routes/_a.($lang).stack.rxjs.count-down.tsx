// types
import type { MetaFunction } from "@remix-run/node";

// react
import { useState, useEffect } from "react";

// component
import { Button, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import { timer, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "Stack-RxJS-Count-down" }];
};

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState(60 * 1000);
  const [isRunning, setIsRunning] = useState(false);

  const countdownSubject = new Subject();
  const step = 100;

  useEffect(() => {
    const countdown$ = timer(step) // 每1000毫秒触发一次
      .pipe(takeUntil(countdownSubject))
      .subscribe((val) => {
        if (isRunning && countdown > 0) {
          setCountdown(countdown - step);
        }
      });

    return () => {
      countdown$.unsubscribe();
      countdownSubject.next(null);
      countdownSubject.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCountdown(6000_0); // 60秒（60000毫秒）
  };

  return (
    <PageContainer title="RxJS Count Down">
      <ProCard>
        <div className="mb-[20px]">
          <span className="text-2xl">倒计时: </span>
          <span className="text-4xl">{countdown / 100_0}</span> 秒
        </div>
        <Space>
          <Button onClick={startTimer}>开始</Button>
          <Button onClick={pauseTimer}>暂停</Button>
          <Button onClick={resetTimer}>复位</Button>
        </Space>
      </ProCard>
    </PageContainer>
  );
}
