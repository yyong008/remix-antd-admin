// types
import type { V2_MetaFunction } from "@remix-run/node";

// cores
import { useCallback } from "react";

// components:vender
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { ProCard } from "@ant-design/pro-components";

// components
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "~/components/reactFlow/initial-element";

import CustomNode from "~/components/reactFlow/CustomNode";

// styles
import reactflowStyleUrl from "reactflow/dist/style.css";
import overviewcssStyleUrl from "~/styles/reactflow.css";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "脑图编辑器",
    },
  ];
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: reactflowStyleUrl,
    },
    {
      rel: "stylesheet",
      href: overviewcssStyleUrl,
    },
  ];
}

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <ProCard
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </ProCard>
  );
};

export default OverviewFlow;
