import { Button, Input, message } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import _clipboard from "react-copy-to-clipboard";
import { useState } from "react";

const { CopyToClipboard } = _clipboard;

export function Route() {
  const [data, setData] = useState({
    value: "",
  });
  return (
    <PageContainer>
      <ProCard>
        <div className="flex flex-col justify-center items-center h-[70vh] bg-emerald-300">
          <Input
            className="w-[600px]"
            value={data.value}
            onChange={({ target: { value } }) => setData({ ...data, value })}
            placeholder="Input something to copy"
          />

          <CopyToClipboard
            text={data.value}
            onCopy={() => {
              setData({ ...data });
              message.info(`[coped:] ${data.value}`);
            }}
          >
            <Button type="primary" className="mt-[20px] w-[300px]">
              Copy
            </Button>
          </CopyToClipboard>
        </div>
      </ProCard>
    </PageContainer>
  );
}
