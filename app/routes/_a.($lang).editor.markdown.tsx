import type { LinksFunction } from "@remix-run/node";

// react
import { useState } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";

// windows
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/react";

// css
import bytemdStyles from "bytemd/dist/index.css";

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [
          { rel: "stylesheet", href: cssBundleHref },
          { rel: "stylesheet", href: bytemdStyles },
        ]
      : []),
    // ...
  ];
};

const plugins = [
  gfm(),
  // Add more plugins here
];

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};

export default App;
