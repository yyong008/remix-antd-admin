// types
import type { MetaFunction } from "@remix-run/node";

// react
import { useState } from "react";

// components
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/react";

// styles
import "bytemd/dist/index.css";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "editor-markdown",
    },
  ];
};

const plugins = [
  gfm(),
  // Add more plugins here
];

export default function App() {
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
