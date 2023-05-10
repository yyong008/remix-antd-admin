import type { LinksFunction } from '@remix-run/node';

import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import { useState } from 'react'
import { cssBundleHref } from "@remix-run/css-bundle";

// css
import 'bytemd/dist/index.css'

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }]
      : []),
    // ...
  ];
};

// import 'bytemd/dist/index.css'


const plugins = [
  gfm(),
  // Add more plugins here
]

const App = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
}

export default App;
