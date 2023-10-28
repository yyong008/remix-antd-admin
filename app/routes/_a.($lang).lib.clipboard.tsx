import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Input, Space } from "antd";
import { useState } from "react";
import * as rctc from "react-copy-to-clipboard";

const { CopyToClipboard } = rctc.default;

export default function ClipboardRoute() {
  const [data, setData] = useState({
    value: "",
  });
  return (
    <PageContainer title="Clipboard">
      <ProCard>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            width={500}
            value={data.value}
            onChange={({ target: { value } }) => setData({ ...data, value })}
            placeholder="Input something to copy"
          />

          <CopyToClipboard
            text={data.value}
            onCopy={() => setData({ ...data })}
          >
            <Button>Copy to clipboard with button</Button>
          </CopyToClipboard>
        </Space>
      </ProCard>
    </PageContainer>
  );
}
