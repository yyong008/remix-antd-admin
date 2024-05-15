import { Button, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Subject, timer } from "rxjs";
import { useEffect, useState } from "react";

import { takeUntil } from "rxjs/operators";

export function Component() {
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
    <PageContainer>
      <ProCard>
        <div className="flex flex-col items-center justify-center align-middle h-[70vh] bg-blue-400">
          <div className="mb-[20px]">
            <span className="text-2xl">倒计时: </span>
            <span className="text-4xl">{countdown / 100_0}</span> 秒
          </div>
          <Space>
            <Button onClick={startTimer}>开始</Button>
            <Button onClick={pauseTimer}>暂停</Button>
            <Button onClick={resetTimer}>复位</Button>
          </Space>
        </div>
      </ProCard>
    </PageContainer>
  );
}
