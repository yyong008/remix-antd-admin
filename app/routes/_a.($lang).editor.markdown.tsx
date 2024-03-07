// react
import { useState } from "react";

// editor
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/react";

// css
import "bytemd/dist/index.css";

// components
import { PageContainer, ProCard } from "@ant-design/pro-components";

const plugins = [
  gfm(),
  // Add more plugins here
];

const App = () => {
  const [value, setValue] = useState("");

  return (
    <PageContainer title="editor markdown">
      <ProCard>
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
};

export default App;
