import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";

import { Cpu } from "./components/cpu";
import { Disk } from "./components/disk";
import { Mem } from "./components/mem";
import { OsRuntime } from "./components/os-runtime";
import { PageContainer } from "@ant-design/pro-components";
import { ajax } from "rxjs/ajax";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";

export function Route() {
  const {
    dataSource = {
      nodeRuntime: {},
      osRuntime: {},
      diskInfo: {},
      memInfo: {},
      cupInfo: {},
      currentLoadInfo: {},
    },
  } = {};
  const [data, setData] = useState({
    nodeRuntime: {},
    osRuntime: {},
    diskInfo: {},
    memInfo: {},
    cupInfo: {},
    currentLoadInfo: {},
  });

  const {
    nodeRuntime,
    osRuntime,
    diskInfo,
    memInfo,
    cupInfo,
    currentLoadInfo,
  } = data;

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    const pollingInterval = 5000; // 10 秒
    const inter$ = interval(pollingInterval)
      .pipe(switchMap(() => ajax.getJSON("/api/admin/system/monitor/serve")))
      .subscribe({
        next(v: any) {
          setData(v.data);
        },
        error(e) {
          console.log(e);
          message.error(e?.message);
        },
      });

    return () => {
      inter$?.unsubscribe();
    };
  }, []);

  return (
    <PageContainer loading={data.cupInfo}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <OsRuntime data={{ nodeRuntime, osRuntime }} />
        </Col>
        <Col span={12}>
          <Disk data={{ diskInfo }} />
        </Col>
        <Col span={12}>
          <Cpu data={{ cupInfo, currentLoadInfo }} />
        </Col>
        <Col span={12}>
          <Mem data={{ memInfo }} />
        </Col>
      </Row>
    </PageContainer>
  );
}
