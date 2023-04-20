// types
import type { V2_MetaFunction } from "@remix-run/node";

// cores
import { useState } from "react";

// components:vendor
import { ProCard } from "@ant-design/pro-components";
import ReactFlow from "reactflow";

// styles
import reactflowStyleUrl from "reactflow/dist/style.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: reactflowStyleUrl,
    },
  ];
}

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "流程编辑器",
    },
  ];
};

function Flow() {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <ProCard
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </ProCard>
  );
}

export default Flow;
