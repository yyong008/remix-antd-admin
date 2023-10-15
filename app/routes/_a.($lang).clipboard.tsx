import { Button, Input, Space } from "antd";
import { useState } from "react";
import * as rctc from "react-copy-to-clipboard";

const { CopyToClipboard } = rctc.default;

export default function ClipboardRoute() {
  const [data, setData] = useState({
    value: "",
  });
  return (
    <Space direction="vertical">
      <Input
        width={500}
        value={data.value}
        onChange={({ target: { value } }) => setData({ ...data, value })}
      />

      <CopyToClipboard text={data.value} onCopy={() => setData({ ...data })}>
        <span>Copy to clipboard with span</span>
      </CopyToClipboard>

      <CopyToClipboard text={data.value} onCopy={() => setData({ ...data })}>
        <Button>Copy to clipboard with button</Button>
      </CopyToClipboard>
    </Space>
  );
}
