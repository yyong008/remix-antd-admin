import "bytemd/dist/index.css";

import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import { useState } from "react";

const plugins = [gfm()];

export function Component() {
  const [value, setValue] = useState("");

  return (
    <PageContainer>
      <ProCard className="h-[70vh]">
        <Editor
          value={value}
          plugins={plugins}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </ProCard>
    </PageContainer>
  );
}
